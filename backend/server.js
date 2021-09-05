// Import the packages
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const multer = require('multer');

require('dotenv').config();

// Cron job import
const cron = require('node-cron');

// Create an instance for express
const app = express();

// Importing the routes
const VendorRoute = require('./routes/VendorRoute');
const FormRoute = require('./routes/FormRoute');
const AdminRoute = require('./routes/AdminRoute');
const LoginRoute = require('./routes/LoginRoute');
const ErrorRoute = require('./routes/ErrorRoute');
const SchoolRoute = require('./routes/SchoolRoute');

// Middlewares
const adminAuth = require('./middleware/adminAuth');

// AWS Service
const awsSES = require('./controller/awsSES');
// purgeData servce
const purgeData = require('./controller/purgeData');
app.use(
	morgan(':method :url :status :res[content-length] - :response-time ms')
);

// Apply the bodyParser middleware, to get json data from requests (Body)
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.set('view engine', 'jade');
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'build')));

// Apply the routes

app.use('/api/uploads', express.static(path.join(`${__dirname}/uploads`)));
app.use('/api/logos', express.static(path.join(`${__dirname}/logos`)));
app.use('/api/form', FormRoute);
app.use('/api/login', LoginRoute);
app.use('/api/vendor', VendorRoute);
app.use('/api/school', SchoolRoute);
app.use('/api/admin', adminAuth, AdminRoute);
app.use('/api/*', ErrorRoute);
app.use('*', (req, res) =>
	res.sendFile(path.join(`${__dirname}/build`, 'index.html'))
);

// Get the mongoURI for database
const db = require('./config/keys').mongoURI;
const { exit } = require('process');

// Connecting with database
mongoose
	.connect(db, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	})
	// If all run ok, console log the message
	.then(() => console.log('MongoDB connected'))
	// For console log any error
	.catch((err) => console.log(err));

// Port declaration
const port = process.env.PORT || 3001;
// Init the express.js server
app.listen(port, () => console.log(`Server running on ${port}`));

// Schedule cron job
cron.schedule('0 23  * * *', () => {
	// SEND MAIL TO ALL ACTIVE VENDORS WITH LIST OF FORMS THAT THEY HAVE BEEN SUBMITTED
	awsSES.vendorEmailAWS_SES();
	// SEND MAIL TO SCHOOLS
	awsSES.schoolFormsForSchool_SES();
	// PURGE OLD DATA
	purgeData.purgeOldData();
});
