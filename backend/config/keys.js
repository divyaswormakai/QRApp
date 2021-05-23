module.exports = {
	mongoURI:
		process.env.MONGO_URI ||
		'mongodb+srv://Test108:Test108@cluster0.ausqe.mongodb.net/scanMe?retryWrites=true&w=majority',
	saltRound: process.env.SALTROUND || 13,
	secret: process.env.SECRET || 'esociety',
	adminSecret: process.env.ADMIN_SECRET || 'esociety-admin',
	adminSaltRound: process.env.ADMINSALT_ROUND || 10,
};
