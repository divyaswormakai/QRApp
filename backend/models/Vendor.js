const mongoose = require('mongoose');
const { Schema } = mongoose;

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
	vendorSecondaryContact: {
		type: String,
	},
	vendorEmail: {
		type: String,
	},
});

VendorSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

module.exports = mongoose.model('Vendor', VendorSchema);
