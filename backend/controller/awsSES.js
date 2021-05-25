const AWS = require('aws-sdk');

exports.emailViaAWS_SES = function async(savedForm) {
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
			ToAddresses: ['makaidivya@gmail.com'], // Email address/addresses that you want to send your email
		},
		Message: {
			Body: {
				Html: {
					// HTML Format of the email
					Charset: 'UTF-8',
					Data: `<html>
								<body>
									<h1>Dear ${savedForm.fullName},</h1>
									<p>Thank you for filling out the contact tracing form for ${
										savedForm.vendorID.vendorName
									}. The following table shows the information that was collected.</p>
									<table>
										<tr>
											<td><b>Full Name</b></td>
											<td>${savedForm.fullName}</td>
										</tr>
										<tr>
											<td><b>Email</b></td>
											<td>${savedForm.email}</td>
										</tr>
										<tr>
											<td><b>Vendor Visited</b></td>
											<td>${savedForm.vendorID.vendorName}</td>
										</tr>
										<tr>
											<td><b>Date Of Visit</b></td>
											<td>${savedForm.dateOfVisit}</td>
										</tr>
										<tr>
											<td><b>Time Of visit</b></td>
											<td>${savedForm.timeOfVisit}</td>
										</tr>
										<tr>
											<td><b>Do you have temperature?</b></td>
											<td>${savedForm.temperature ? 'Yes' : 'No'}</td>
										</tr>
										<tr>
											<td><b>Do you have cough?</b></td>
											<td>${savedForm.cough ? 'Yes' : 'No'}</td>
										</tr>
										<tr>
											<td><b>Have you been abroad in the past 14 days?</b></td>
											<td>${savedForm.abroadIn14Days ? 'Yes' : 'No'}</td>
										</tr>
										<tr>
											<td><b>Have you had contact with COVID positive person in the pas 14 days?</b></td>
											<td>${savedForm.contactIn14Days ? 'Yes' : 'No'}</td>
										</tr>
										<tr>
											<td><b>Comment</b></td>
											<td>${savedForm.comments || ''}</td>
										</tr>
									</table>
									<br/>
									<i>If you have any queries, please feel free to contact us.</i>
									<br/>
									<p>Thank you.</p>
								</body>
							</html>`,
				},
				Text: {
					Charset: 'UTF-8',
					Data: 'Thanks for reaching out. This is a test mail.',
				},
			},
			Subject: {
				Charset: 'UTF-8',
				Data: 'Thanks for filling out the contact form',
			},
		},
		Source: 'appyvote@gmail.com',
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
