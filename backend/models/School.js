const mongoose = require('mongoose');
const { Schema } = mongoose;
// const uniqueValidator = require('mongoose-unique-validator');

const SchoolSchema = new Schema({
	schoolName: {
		type: String,
		required: true,
	},
	schoolLocation: {
		type: String,
		required: true,
	},
	schoolContact: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	schoolEmail: {
		type: String,
		required: true,
	},
	classRoomList: [
		{
			type: String,
		},
	],
	logoURL: {
		type: String,
		default: null,
	},
});

SchoolSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject.password;
		// delete returnedObject.active;
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

// SchoolSchema.plugin(uniqueValidator);
module.exports = mongoose.model('School', SchoolSchema);
