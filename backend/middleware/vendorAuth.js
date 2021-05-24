const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/keys');
const Vendor = require('../models/Vendor');
const Admin = require('../models/Admin');
module.exports = async (request, response, next) => {
	try {
		const token = request.header('x-auth-token');

		if (!token) {
			throw new Error('You are not authorized. Use a vendor account.');
		}

		const decodedToken = jwt.verify(token, secret);
		const vendor = await Vendor.findById(decodedToken.id);
		if (!vendor) {
			const admin = await Admin.findById(decodedToken.id);
			if (!admin) {
				throw new Error('You are not authorized. Use an admin account.');
			}
		}
		request.vendor = vendor;

		next();
	} catch (err) {
		return response.status(401).send({ error: err.message });
	}
};
