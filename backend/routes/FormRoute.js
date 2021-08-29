const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const fs = require('fs');

const Form = require('../models/Form');
const Vendor = require('../models/Vendor');
const IndoorForm = require('../models/IndoorForm');
const SchoolForm = require('../models/SchoolForm');

const vendorAuth = require('../middleware/vendorAuth');
const schoolAuth = require('../middleware/schoolAuth');

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
		req.error = 'File type should be png, jpeg or pdf.';
		cb(null, false);
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
			noOfPeopleInGroup,
			comments,
		} = req.body;

		const newForm = new Form({
			vendorID,
			email,
			fullName,
			phoneNumber,
			dateOfVisit,
			timeOfVisit,
			noOfPeopleInGroup,
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
		if (req.error) {
			throw new Error(req.error);
		}
		const certificate = req.files[0];
		const identity = req.files[1];

		if (!certificate) {
			throw new Error('Please upload the certificate');
		}
		// if (!identity) {
		// 	await fs.unlinkSync(certificate.path);
		// 	throw new Error('Please upload your identity.');
		// }
		if (certificate && certificate.size / (1024 * 1024) > 5) {
			throw new Error('File is greater than 5MB. Please select other file.');
		}

		// if (identity && identity.size / (1024 * 1024) > 5) {
		// 	throw new Error('File is greater than 5MB. Please select other file.');
		// }

		const { vendorID, email, fullName, dateOfVisit, timeOfVisit, refNo } =
			req.body;
		const vendor = await Vendor.findById(vendorID);
		if (!vendor || !vendor.vendorName) {
			throw new Error('The vendor could not be found.');
		}

		const formContent = {
			vendor,
			email,
			fullName,
			dateOfVisit,
			timeOfVisit,
			certificate,
			identity,
			refNo,
		};

		await awsSES.indorEmailviaAWS_SES(formContent, res);
		setTimeout(async () => {
			if (certificate) {
				await fs.unlinkSync(certificate.path);
			}
			if (identity) {
				await fs.unlinkSync(identity.path);
			}
		}, 10000);
		// TODO: maybe save the data and not the file somewhere in the collection
		res.status(200).json({ message: 'Successful.' });
	} catch (err) {
		console.log('ERROR', err);
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

// @Route   POST api/form/school/add
// @desc    Add new school form
// @access  Public
router.post('/school/add', async (req, res) => {
	try {
		const {
			schoolID,
			email,
			fullName,
			phoneNumber,
			dateOfVisit,
			timeOfVisit,
			studentID,
			roomNumber,
		} = req.body;

		const newForm = new SchoolForm({
			schoolID,
			email,
			fullName,
			phoneNumber,
			dateOfVisit,
			timeOfVisit,
			studentID,
			roomNumber,
		});
		let savedForm = await newForm.save();

		if (!savedForm) {
			res.status(400).json({ error: 'Could not save form data.' });
		}

		const savedFormPopulated = await savedForm
			.populate('schoolID')
			.execPopulate();

		await awsSES.schoolFormEmail_SES(savedFormPopulated);

		res.status(200).json(savedForm.toJSON());
	} catch (err) {
		console.log(err);
		return res.status(400).json({ error: 'Could not load the form data.' });
	}
});

// @Route   POST api/form/school/:schoolid
// @desc    Get individual form
// @access  Vendor
router.post('/school/:id', schoolAuth, async (req, res) => {
	try {
		const schoolID = req.params.id;
		const forms = await SchoolForm.find({ schoolID });
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
