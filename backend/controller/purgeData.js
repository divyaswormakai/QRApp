const moment = require('moment');
const SchoolForm = require('../models/SchoolForm');
const Form = require('../models/Form');

exports.purgeOldData = async () => {
	try {
		const oldDate = moment().subtract('28', 'days');
		console.log(oldDate);
		console.log('Purging old data');
		await Form.deleteMany({
			dateOfVisit: { $lte: oldDate.toISOString() },
		});
		await SchoolForm.deleteMany({
			dateOfVisit: { $lte: oldDate.toISOString() },
		});
	} catch (err) {
		console.log(err);
	}
};
