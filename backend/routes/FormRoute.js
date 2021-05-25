const express = require('express');
const router = express.Router();

const Form = require('../models/Form');
const vendorAuth = require('../middleware/vendorAuth');

const awsSES = require('../controller/awsSES');

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
			comments,
		});

		let savedForm = await newForm.save();
		if (!savedForm) {
			res.status(400).json({ error: 'Could not save form data.' });
		}
		await awsSES.emailViaAWS_SES(savedForm);
		res.status(200).json(savedForm.toJSON());
	} catch (err) {
		res.status(400).json({ error: 'Could not add new form data.' });
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
