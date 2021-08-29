const mongoose = require('mongoose');
const { Schema } = mongoose;
// const uniqueValidator = require('mongoose-unique-validator');

const SchoolFormSchema = new Schema({
	schoolID: {
		type: Schema.Types.ObjectId,
		ref: 'School',
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
	studentID: {
		type: String,
		default: '',
	},
	roomNumber: {
		type: String,
		required: true,
	},
});

SchoolFormSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		// delete returnedObject.active;
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

// SchoolFormSchema.plugin(uniqueValidator);
module.exports = mongoose.model('SchoolForm', SchoolFormSchema);
