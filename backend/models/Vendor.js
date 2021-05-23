const mongoose = require('mongoose');
const { Schema } = mongoose;
const uniqueValidator = require('mongoose-unique-validator');

const VendorSchema = new Schema({
	vendorName: {
		type: String,
		required: true,
	},
	vendorLocation: {
		type: String,
		required: true,
	},
	vendorContact: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	vendorSecondaryContact: {
		type: String,
	},
	vendorEmail: {
		type: String,
		required: true,
		unique: true,
	},
	active: {
		type: Boolean,
		required: true,
		default: true,
	},
});

VendorSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject.password;
		// delete returnedObject.active;
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

VendorSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Vendor', VendorSchema);
