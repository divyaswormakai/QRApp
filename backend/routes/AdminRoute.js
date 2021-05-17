const express = require('express');
const router = express.Router();

const Form = require('../models/Form');
const Vendor = require('../models/Vendor');

// @Route   POST api/admin/forms
// @desc    Get list of forms
// @access  Admin
router.post('/form', async (req, res) => {
	try {
		const forms = await Form.find();
		if (!forms) {
			res.status(400).json({ error: 'Could not load form data.' });
		}
		res.status(200).json(forms.map((form) => form.toJSON()));
	} catch (err) {
		res.status(400).json({ error: 'Could not load data.' });
	}
});

// @Route   POST api/admin/vendor
// @desc    Get list of vendors
// @access  Admin
router.post('/vendor', async (req, res) => {
	try {
		const vendors = await Vendor.find();
		if (!vendors) {
			res.status(400).json({ error: 'Could not load vendor data.' });
		}
		res.status(200).json(vendors.map((vendor) => vendor.toJSON()));
	} catch (err) {
		res.status(400).json({ error: 'Could not load data.' });
	}
});

// @Route   POST api/admin/vendor/add
// @desc    Add new vendor
// @access  Admin
router.post('/vendor/add', async (req, res) => {
	try {
		const {
			vendorName,
			vendorLocation,
			vendorContact,
			vendorSecondaryContact,
			vendorEmail,
		} = req.body;

		const newVendor = new Vendor({
			vendorName,
			vendorLocation,
			vendorContact,
			vendorSecondaryContact: vendorSecondaryContact,
			vendorEmail: vendorEmail,
		});

		let savedVendor = await newVendor.save();
		if (!savedVendor) {
			res.status(400).json({ error: 'Could not save vendor data.' });
		}
		res.status(200).json(savedVendor.toJSON());
	} catch (err) {
		res.status(400).json({ error: 'Could not add new vendor data.' });
	}
});

// @Route   PUT api/admin/vendor/:id
// @desc    Update vendor data for vendorid= id
// @access  Admin
router.put('/vendor/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const {
			vendorName,
			vendorLocation,
			vendorContact,
			vendorSecondaryContact,
			vendorEmail,
		} = req.body;
		const updatedVendor = await Vendor.findOneAndUpdate(
			{
				_id: { $eq: id },
			},
			{
				vendorName,
				vendorLocation,
				vendorContact,
				vendorSecondaryContact,
				vendorEmail,
			},
			{ new: true }
		);
		if (!updatedVendor) {
			res
				.status(400)
				.json({ error: 'Could not update vendor data for' + vendorName });
		}
		res.status(200).json(updatedVendor.toJSON());
	} catch (err) {
		res.status(400).json({ error: 'Could not update data.' });
	}
});

// @Route   DELETE api/admin/vendor/:id
// @desc    Delete a vendor
// @access  Admin
router.delete('/vendor/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const deleteStatus = await Vendor.findByIdAndDelete(id);
		if (!deleteStatus) {
			res.status(400).json({ error: 'Could not delete vendor data' });
		}
		res.status(200).json({ msg: 'Deleted vendor data successfully.' });
	} catch (err) {
		res.status(400).json({ error: 'Could not delete vendor data' });
	}
});

module.exports = router;
