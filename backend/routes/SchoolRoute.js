const express = require('express');
const router = express.Router();
const School = require('../models/School');

// @Route   POST api/school/:id
// @desc    Get individual school
// @access  Public
router.post('/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const school = await School.findById(id);

		if (!school) {
			throw new Error('Could not find data');
		}

		return res.status(200).json(school.toJSON());
	} catch (err) {
		return res.status(400).json({ error: 'Could not find school data.' });
	}
});

module.exports = router;
