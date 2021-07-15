const mongoose = require('mongoose');
const { Schema } = mongoose;

const IndoorFormSchema = new Schema({
	vendorID: {
		type: Schema.Types.ObjectId,
		ref: 'Vendor',
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	fullName: {
		type: String,
		required: true,
	},

	dateOfVisit: {
		type: Date,
		required: true,
		default: Date.now,
	},
	timeOfVisit: {
		type: String,
		required: true,
	},
});

IndoorFormSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

module.exports = mongoose.model('IndoorForm', IndoorFormSchema);
