const express = require('express');
const router = express.Router();

const Vendor = require('../models/Vendor');

// @Route   POST api/vendor/:id
// @desc    Get individual vendor
// @access  Public
router.post('/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const vendor = await Vendor.findById(id);
		if (!vendor) {
			res
				.status(400)
				.json({ error: 'Could not save vendor data for id:' + id });
		}

		res.status(200).json(vendor.toJSON());
	} catch (err) {
		res.status(400).json({ error: 'Could not load the vendor data.' });
	}
});

module.exports = router;
