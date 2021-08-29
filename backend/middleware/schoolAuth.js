const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/keys');
const School = require('../models/School');
const Admin = require('../models/Admin');

module.exports = async (request, response, next) => {
	try {
		const token = request.header('x-auth-token');

		if (!token) {
			throw new Error('You are not authorized. Use a admin account.');
		}

		const decodedToken = jwt.verify(token, secret);
		const school = await School.findById(decodedToken.id);
		if (!school) {
			const admin = await Admin.findById(decodedToken.id);
			if (!admin) {
				throw new Error('You are not authorized. Use an admin account.');
			}
		}
		request.school = school;

		next();
	} catch (err) {
		return response.status(401).send({ error: err.message });
	}
};
