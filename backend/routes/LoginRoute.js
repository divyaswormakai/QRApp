const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const Vendor = require('../models/Vendor');
const Admin = require('../models/Admin');
const School = require('../models/School');

const { secret } = require('../config/keys');
const jwt = require('jsonwebtoken');

// @Route   POST api/login/vendor
// @desc    Login for vendor
// @access  Public
router.post('/vendor', async (req, res) => {
	try {
		const { vendorEmail, password } = req.body;

		const vendor = await Vendor.findOne({
			vendorEmail,
		});
		if (!vendor) {
			throw new Error('Could not find user');
		}

		const isPasswordMatch = await bcrypt.compare(password, vendor.password);

		if (!isPasswordMatch) {
			throw new Error('Password do not match');
		}

		if (!vendor.active) {
			return res.status(201).json({
				message:
					'You have been inactive, please contact the admin to reactivate the account.',
			});
		}

		const tokenDetails = {
			email: vendor.vendorEmail,
			id: vendor._id,
			name: vendor.vendorName,
		};
		const token = jwt.sign(tokenDetails, secret);

		return res.status(200).send({ token, vendor: vendor.toJSON() });
	} catch (err) {
		return res.status(400).json({ error: 'Could not load the vendor data.' });
	}
});

// @Route   POST api/login/admin
// @desc    Login for admin
// @access  Public
router.post('/admin', async (req, res) => {
	try {
		const { username, password } = req.body;

		const admin = await Admin.findOne({
			username,
		});

		if (!admin) {
			throw new Error('Could not find admin with that username.');
		}

		const isPasswordMatch = await bcrypt.compare(password, admin.password);

		if (!isPasswordMatch) {
			throw new Error('Password do not match.');
		}

		const adminDetails = {
			username: admin.username,
			id: admin._id,
		};
		const token = jwt.sign(adminDetails, secret);
		return res.status(200).send({ token });
	} catch (err) {
		return res.status(400).json({ error: err.message });
	}
});

// @Route   POST api/login/school
// @desc    Login for school
// @access  Public
router.post('/school', async (req, res) => {
	try {
		const { schoolEmail, password } = req.body;

		const school = await School.findOne({
			schoolEmail,
		});
		if (!school) {
			throw new Error('Could not find user');
		}

		const isPasswordMatch = await bcrypt.compare(password, school.password);

		if (!isPasswordMatch) {
			throw new Error('Password do not match');
		}

		const tokenDetails = {
			email: school.vendorEmail,
			id: school._id,
			name: school.vendorName,
		};
		const token = jwt.sign(tokenDetails, secret);

		return res.status(200).send({ token, school: school.toJSON() });
	} catch (err) {
		return res.status(400).json({ error: 'Could not load the vendor data.' });
	}
});

module.exports = router;
