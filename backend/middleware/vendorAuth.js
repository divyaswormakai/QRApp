const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/keys');
const Vendor = require('../models/Vendor');

module.exports = async (request, response, next) => {
	try {
		const token = request.header('x-auth-token');

		if (!token) {
			throw new Error('You are not authorized. Use a vendor account.');
		}

		const decodedToken = jwt.verify(token, secret);
		const vendor = await Vendor.findById(decodedToken.id);
		if (!vendor) {
			throw new Error('You are not authorized. Use a vendor account.');
		}
		request.vendor = vendor;

		next();
	} catch (err) {
		return response.status(401).send({ error: err.message });
	}
};
