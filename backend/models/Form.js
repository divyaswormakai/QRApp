const mongoose = require('mongoose');
const { Schema } = mongoose;

const FormSchema = new Schema({
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
	phoneNumber: {
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
	temperature: {
		type: Boolean,
		required: true,
	},
	cough: {
		type: Boolean,
		required: true,
	},
	abroadIn14Days: {
		type: Boolean,
		required: true,
	},
	contactIn14Days: {
		type: Boolean,
		required: true,
	},
	noOfPeopleInGroup: {
		type: Number,
	},
	comments: {
		type: String,
	},
});

FormSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

module.exports = mongoose.model('Form', FormSchema);
