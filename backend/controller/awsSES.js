const AWS = require('aws-sdk');

exports.emailViaAWS_SES = function (req, res, next) {
	// AWS configuration
	AWS.config.loadFromPath('./aws.json');

	AWS.config.getCredentials(function (err) {
		if (err) {
			console.log(err.stack);
			exit(0);
		}
		// // credentials not loaded
		// else {
		// 	console.log('Access key:', AWS.config.credentials.accessKeyId);
		// }
	});

	AWS.config.update({ region: 'us-west-2' });

	const ses = new AWS.SES({ apiVersion: '2010-12-01' });
	const params = {
		Destination: {
			ToAddresses: ['appyvote@gmail.com'], // Email address/addresses that you want to send your email
		},
		Message: {
			Body: {
				Html: {
					// HTML Format of the email
					Charset: 'UTF-8',
					Data: "<html><body><h1>Dear participants,</h1><p style='color:red'>Thank you for reaching out</p></body></html>",
				},
				Text: {
					Charset: 'UTF-8',
					Data: 'Thanks for reaching out. This is a test mail.',
				},
			},
			Subject: {
				Charset: 'UTF-8',
				Data: 'Thanks for reaching out',
			},
		},
		Source: 'makaidivya@gmail.com',
	};

	const sendEmailReceiver = ses.sendEmail(params).promise();

	sendEmailReceiver
		.then((data) => {
			console.log('email submitted to SES', data);
		})
		.catch((error) => {
			console.log(error);
			res.status(404).send({
				message: 'Failed to send !',
			});
		});
};
