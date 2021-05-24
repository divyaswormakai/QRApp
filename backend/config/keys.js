module.exports = {
	mongoURI:
		process.env.MONGO_URI ||
		'mongodb+srv://Test108:Test108@cluster0.ausqe.mongodb.net/scanMe?retryWrites=true&w=majority',
	saltRound: process.env.SALTROUND || 13,
	secret: process.env.SECRET || 'esociety',
	adminSaltRound: process.env.ADMINSALT_ROUND || 10,
};
