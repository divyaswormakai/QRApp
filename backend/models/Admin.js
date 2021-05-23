const mongoose = require('mongoose');
const { Schema } = mongoose;
const uniqueValidator = require('mongoose-unique-validator');

const AdminSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
});

AdminSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject.password;
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});
AdminSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Admin', AdminSchema);
