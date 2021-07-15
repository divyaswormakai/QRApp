const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const fs = require('fs');

const Form = require('../models/Form');
const Vendor = require('../models/Vendor');
const IndoorForm = require('../models/IndoorForm');

const vendorAuth = require('../middleware/vendorAuth');

const awsSES = require('../controller/awsSES');

//set storage engine
const storage = multer.diskStorage({
	destination: './uploads/',
	filename: function (req, file, cb) {
		cb(
			null,
			`${Date.now()}-${Math.floor(Math.random() * 10000)}${path.extname(
				file.originalname
			)}`
		);
	},
});

//check file type
const fileFilter = (req, file, cb) => {
	if (
		['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'].includes(
			file.mimetype
		)
	) {
		cb(null, true);
	} else {
		cb(new Error('File type should be png, jpeg or pdf.'), false);
	}
};

//init upload
const upload = multer({
	storage: storage,
	limits: { fileSize: 1024 * 1024 * 10 },
	fileFilter: fileFilter,
});

// @Route   POST api/form/add
// @desc    Add new Form
// @access  Public
router.post('/add', async (req, res) => {
	try {
		const {
			vendorID,
			email,
			fullName,
			phoneNumber,
			dateOfVisit,
			timeOfVisit,
			temperature,
			cough,
			abroadIn14Days,
			contactIn14Days,
			noOfPeopleInGroup,
			vaccinationStatus,
			covidOver9Months,
			comments,
		} = req.body;

		const newForm = new Form({
			vendorID,
			email,
			fullName,
			phoneNumber,
			dateOfVisit,
			timeOfVisit,
			temperature,
			cough,
			abroadIn14Days,
			contactIn14Days,
			noOfPeopleInGroup,
			vaccinationStatus,
			covidOver9Months: covidOver9Months || false,
			comments,
		});

		let savedForm = await newForm.save();
		if (!savedForm) {
			res.status(400).json({ error: 'Could not save form data.' });
		}
		const savedFormPopulated = await savedForm
			.populate('vendorID')
			.execPopulate();
		await awsSES.emailViaAWS_SES(savedFormPopulated);

		res.status(200).json(savedForm.toJSON());
	} catch (err) {
		console.log(err);
		res
			.status(400)
			.json({ error: err.message || 'Could not add new form data.' });
	}
});

// @Route   POST api/form/indoor/add
// @desc    Add new Form for indoor (data will not be saved whatsoever
// @access  Public
router.post('/indoor/add', upload.any(), async (req, res, next) => {
	try {
		const certificate = req?.files[0];

		const { vendorID, email, fullName, dateOfVisit, timeOfVisit } = req.body;
		const vendor = await Vendor.findById(vendorID);
		if (!vendor || !vendor.vendorName) {
			throw new Error('The vendor could not be found.');
		}
		console.log(vendor.vendorName);

		const formContent = {
			vendor,
			email,
			fullName,
			dateOfVisit,
			timeOfVisit,
			certificate,
		};

		const newIndoorForm = new IndoorForm({
			vendorID,
			email,
			fullName,
			dateOfVisit,
			timeOfVisit,
		});

		let savedIndoorForm = await newIndoorForm.save();
		if (!savedIndoorForm) {
			res.status(400).json({ error: 'Could not save new indoor form data.' });
		}
		await awsSES.indorEmailviaAWS_SES(formContent, res);
		await fs.unlinkSync(certificate.path);
		// TODO: maybe save the data and not the file somewhere in the collection
		res.status(200).json({ message: 'Successful.' });
	} catch (err) {
		console.log(err);
		res
			.status(400)
			.json({ error: err.message || 'Could not add new form data.' });
	}
});

// @Route   POST api/form/:id
// @desc    Get individual form
// @access  Vendor & Admin
router.post('/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const form = await Form.findById(id).populate('vendorID');
		if (!form) {
			res.status(400).json({ error: 'Could not save form data for id:' + id });
		}
		res.status(200).json(form.toJSON());
	} catch (err) {
		res.status(400).json({ error: 'Could not load the form data.' });
	}
});

// @Route   POST api/form/vendor/:vendorid
// @desc    Get individual form
// @access  Vendor
router.post('/vendor/:id', vendorAuth, async (req, res) => {
	try {
		const vendorID = req.params.id;
		const forms = await Form.find({ vendorID: vendorID }).populate('vendorID');
		if (!forms) {
			res
				.status(400)
				.json({ error: 'Could not save form data for id:' + vendorID });
		}
		res.status(200).json(forms.map((form) => form.toJSON()));
	} catch (err) {
		res.status(400).json({ error: 'Could not load the form data.' });
	}
});

module.exports = router;
