// Import the packages
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');

// Create an instance for express
const app = express();

// Importing the routes
const VendorRoute = require('./routes/VendorRoute');
const SummaryRoute = require('./routes/summaryRoute');
const FormRoute = require('./routes/FormRoute');
const AdminRoute = require('./routes/AdminRoute');

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

// Apply the routes of /api/cpontent/work-experience

app.use('/summary', SummaryRoute);
app.use('/api/vendor', VendorRoute);
app.use('/api/form', FormRoute);
app.use('/api/admin', AdminRoute);
app.use('*', (req, res) =>
	res.sendFile(path.join(`${__dirname}/build`, 'index.html'))
);

// Get the mongoURI for database
const db = require('./config/keys').mongoURI;

// Connecting with database
mongoose
	.connect(db, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: true,
	})
	// If all run ok, console log the message
	.then(() => console.log('MongoDB connected'))
	// For console log any error
	.catch((err) => console.log(err));

// Port declaration
const port = process.env.PORT || 3001;

// Init the express.js server
app.listen(port, () => console.log(`Server running on ${port}`));
