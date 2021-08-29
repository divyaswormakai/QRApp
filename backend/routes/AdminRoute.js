const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Form = require('../models/Form');
const Vendor = require('../models/Vendor');
const Admin = require('../models/Admin');
const School = require('../models/School');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { saltRound, adminSaltRound } = require('../config/keys');

//set storage engine
const storage = multer.diskStorage({
	destination: './logos/',
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

// @Route   POST api/admin/forms
// @desc    Get list of forms
// @access  Admin
router.post('/form', async (req, res) => {
	try {
		const forms = await Form.find().populate('vendorID');
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
			password,
		} = req.body;

		if (password.length < 4) {
			return res
				.status(400)
				.json({ error: 'Password length should be greater than 4.' });
		}

		const passwordHashed = await bcrypt.hash(password, saltRound);

		const newVendor = new Vendor({
			vendorName,
			vendorLocation,
			vendorContact,
			vendorSecondaryContact,
			vendorEmail,
			password: passwordHashed,
		});

		let savedVendor = await newVendor.save();
		if (!savedVendor) {
			return res.status(400).json({ error: 'Could not save vendor data.' });
		}
		return res.status(200).json(savedVendor.toJSON());
	} catch (err) {
		console.log(err);
		return res
			.status(400)
			.json({ error: err.message || 'Could not add new vendor data.' });
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
			password,
			active,
		} = req.body;

		if (password.length < 4) {
			return res
				.status(400)
				.json({ error: 'Password length should be greater than 4.' });
		}

		const passwordHashed = await bcrypt.hash(password, saltRound);

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
				password: passwordHashed,
				active,
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

// @Route   POST api/admin/add
// @desc    Add a admin
// @access  Admin
router.post('/add', async (req, res) => {
	try {
		const { username, password } = req.body;

		if (password.length < 6) {
			throw new Error('Password should not be less than 6 letters.');
		}

		const hashedPassword = await bcrypt.hash(password, adminSaltRound);
		const newAdmin = new Admin({
			username,
			password: hashedPassword,
		});

		let savedAdmin = await newAdmin.save();
		if (!savedAdmin) {
			throw new Error('Could not save Admin data.');
		}
		return res.status(200).json(savedAdmin.toJSON());
	} catch (err) {
		res.status(400).json({
			error: err.message,
		});
	}
});

// @Route   POST api/admin/list-all
// @desc    Lista all admin
// @access  Admin
router.post('/list-all', async (req, res) => {
	try {
		const adminList = await Admin.find();

		if (!adminList) {
			throw new Error('Could not fetch admin list data');
		}

		return res.status(200).json(adminList.map((admin) => admin.toJSON()));
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

// @Route   POST api/admin/school
// @desc    Get list of schools
// @access  Admin
router.post('/school', async (req, res) => {
	try {
		const schools = await School.find();
		if (!schools) {
			res.status(400).json({ error: 'Could not load vendor data.' });
		}
		res.status(200).json(schools.map((school) => school.toJSON()));
	} catch (err) {
		res.status(400).json({ error: 'Could not load data.' });
	}
});

// @Route   POST api/admin/school/add
// @desc    Add new school
// @access  Admin
router.post('/school/add', upload.any(), async (req, res) => {
	try {
		const {
			schoolName,
			schoolLocation,
			schoolContact,
			schoolEmail,
			password,
			classRoomList,
		} = req.body;
		let arrClassRoomList = classRoomList?.split(',');

		if (arrClassRoomList.length <= 0) {
			return res
				.status(400)
				.json({ error: 'The classroom file is incorrect.' });
		}

		const logoFile = req.files[0];
		if (!logoFile) {
			return res.status(400).json({ error: 'Please upload the school logo.' });
		}
		console.log(logoFile);

		if (password.length < 4) {
			return res
				.status(400)
				.json({ error: 'Password length should be greater than 4.' });
		}

		const passwordHashed = await bcrypt.hash(password, saltRound);

		const newSchool = new School({
			schoolName,
			schoolLocation,
			schoolContact,
			schoolEmail,
			classRoomList: arrClassRoomList,
			password: passwordHashed,
			logoURL: logoFile.path,
		});

		let savedSchool = await newSchool.save();
		if (!savedSchool) {
			return res.status(400).json({ error: 'Could not save vendor data.' });
		}
		return res.status(200).json(savedSchool.toJSON());
	} catch (err) {
		console.log(err);
		return res
			.status(400)
			.json({ error: err.message || 'Could not add new vendor data.' });
	}
});

// @Route   PUT api/admin/school/:id
// @desc    Update school data for schoolid= id
// @access  Admin
router.put('/school/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const { schoolName, schoolLocation, schoolContact, schoolEmail, password } =
			req.body;

		if (password.length < 4) {
			return res
				.status(400)
				.json({ error: 'Password length should be greater than 4.' });
		}

		const passwordHashed = await bcrypt.hash(password, saltRound);

		const updatedSchool = await School.findOneAndUpdate(
			{
				_id: { $eq: id },
			},
			{
				schoolName,
				schoolLocation,
				schoolContact,
				schoolEmail,
				password,
				password: passwordHashed,
			},
			{ new: true }
		);
		if (!updatedSchool) {
			res
				.status(400)
				.json({ error: 'Could not update vendor data for' + schoolName });
		}
		res.status(200).json(updatedSchool.toJSON());
	} catch (err) {
		res.status(400).json({ error: 'Could not update data.' });
	}
});

module.exports = router;
