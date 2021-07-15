const AWS = require('aws-sdk');
const nodemailer = require('nodemailer');
const fs = require('fs');
const Form = require('../models/Form');
const Vendor = require('../models/Vendor');

exports.emailViaAWS_SES = function async(savedForm) {
	// AWS configuration
	AWS.config.loadFromPath('./aws.json');

	AWS.config.getCredentials(function (err) {
		if (err) {
			console.log(err.stack);
			exit(0);
		}
	});

	AWS.config.update({ region: 'us-west-2' });

	const ses = new AWS.SES({ apiVersion: '2010-12-01' });
	const params = {
		Destination: {
			ToAddresses: [savedForm.email], // Email address/addresses that you want to send your email
		},
		Message: {
			Body: {
				Html: {
					// HTML Format of the email
					Charset: 'UTF-8',
					Data: `<html>
								<body>
									<h3>Dear ${savedForm.fullName},</h3>
									<p>
									<b>Data Protection Notice:</b> Your personal data is being collected on this form in order to help prevent the spread of COVID-19 in <b><i>"${
										savedForm.vendorID.vendorName
									}"</i></b> and to protect our staff and our customers. Your personal data is being processed in accordance with Article 9(2)(i) of the General Data Protection Regulation, and Section 53 of the Data Protection Act 2018. The information you provide on this form will not be used for any other purpose, and will be strictly confidential. The form will be accessible only to administrator of e-society and the vendor for whom you have filled the form. Your data will be retained for 12 weeks.
									</p>
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
											<td><b>Date Of Visit</b></td>
											<td>${savedForm.dateOfVisit}</td>
										</tr>
										<tr>
											<td><b>Time Of visit</b></td>
											<td>${savedForm.timeOfVisit}</td>
										</tr>
										<tr>
											<td><b>Do you have temperature?</b></td>
											<td ${
												savedForm.temperature
													? "style='background-color:red; color:white;'"
													: ''
											}>${savedForm.temperature ? 'Yes' : 'No'}</td>
										</tr>
										<tr>
											<td><b>Do you have cough?</b></td>
											<td ${savedForm.cough ? "style='background-color:red; color:white;'" : ''}>
												${savedForm.cough ? 'Yes' : 'No'}
											</td>
										</tr>
										<tr>
											<td><b>Have you been abroad in the past 14 days?</b></td>
											<td ${
												savedForm.abroadIn14Days
													? "style='background-color:red; color:white;'"
													: ''
											}>
												${savedForm.abroadIn14Days ? 'Yes' : 'No'}
											</td>
										</tr>
										<tr>
											<td><b>Have you had contact with COVID positive person in the pas 14 days?</b></td>
											<td ${
												savedForm.contactIn14Days
													? "style='background-color:red; color:white;'"
													: ''
											}>
												${savedForm.contactIn14Days ? 'Yes' : 'No'}
											</td>
										</tr>
										<tr>
											<td><b>How many people are there in your group/table?</b></td>
											<td>${savedForm.noOfPeopleInGroup || ''}</td>
										</tr>
										<tr>
											<td><b>Are you vaccinated?</b></td>
											<td>${savedForm.vaccinationStatus ? 'Yes' : 'No'}</td>
										</tr>
										<tr>
											<td><b>Have contracted COVID-19 over the past 9 months?</b></td>
											<td>${savedForm.covidOver9Months ? 'Yes' : 'No'}</td>
										</tr>
										<tr>
											<td><b>Comment</b></td>
											<td>${savedForm.comments || ''}</td>
										</tr>
									</table>
									<br/>
									<i>If you have any queries, please feel free to contact the venue.</i>
									<br/>
									<p>Thank you.</p>
									<div style="background:#e7e9eb;">
										<b>Powered by:</b><br/>
										<a href="https://e-society.ie"><b>E-Society.ie</b></a>
									</div>
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
		Source: 'oisin@e-society.ie',
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

exports.vendorEmailAWS_SES = async () => {
	AWS.config.loadFromPath('./aws.json');

	AWS.config.getCredentials(function (err) {
		if (err) {
			console.log(err.stack);
			exit(0);
		}
	});

	AWS.config.update({ region: 'us-west-2' });

	const ses = new AWS.SES({ apiVersion: '2010-12-01' });
	const now = new Date();
	const yesterday = new Date();
	yesterday.setDate(now.getDate() - 1);
	// Yesterday to get data from yesterday
	const today = new Date(
		yesterday.getFullYear(),
		yesterday.getMonth(),
		yesterday.getDate()
	);
	const todayString = `${today.getFullYear()}/${
		today.getMonth() + 1
	}/${now.getDate()}`;

	const forms = await Form.find({ dateOfVisit: { $gt: today } }).populate(
		'vendorID'
	);

	const vendors = await Vendor.find({ active: true }).select([
		'vendorName',
		'vendorEmail',
	]);
	const emailBodyForVendors = {};
	vendors.forEach((vendor) => {
		emailBodyForVendors[vendor.vendorName] = {
			email: vendor.vendorEmail,
			body: '',
		};
	});
	const activeVendorList = Object.keys(emailBodyForVendors);

	forms.forEach((form) => {
		if (
			form.vendorID &&
			form.vendorID.vendorName &&
			activeVendorList.includes(form.vendorID.vendorName)
		) {
			if (emailBodyForVendors[form.vendorID.vendorName].body.length <= 0) {
				emailBodyForVendors[form.vendorID.vendorName].body = `
				<html>
				<head>
					<style>
						table, th, td {
							border: 1px solid black;
						}
					</style>
				</head>
				<body>
					<h2>Hello ${form.vendorID.vendorName},</h2>
					<p>The forms that heve been filled on the date ${todayString} is as follows:</p>
					<table>
						<thead>
							<tr>
								<th>Full Name</th>
								<th>Email</th>
								<th>Date Of Visit</th>
								<th>Time Of Visit</th>
								<th>Contact Number</th>
								<th>Do you have temperature?</th>
								<th>Do you have cough?</th>
								<th>Have you been abroad in the past 14 days?</th>
								<th>Have you had contact with COVID positive person in the pas 14 days? </th>
								<th>How many people were there in your table/group?</th>
								<th>Comments</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>${form.fullName}</td>
								<td>${form.email}</td>
								<td>${form.dateOfVisit}</td>
								<td>${form.timeOfVisit}</td>
								<td>${form?.phoneNumber || ''}</td>
								<td ${form.temperature ? "style='background-color:red; color:white;'" : ''}>
									${form.temperature ? 'Yes' : 'No'}
								</td>
								<td ${form.cough ? "style='background-color:red; color:white;'" : ''}>
									${form.cough ? 'Yes' : 'No'}
								</td>
								<td ${form.abroadIn14Days ? "style='background-color:red; color:white;'" : ''}>
									${form.abroadIn14Days ? 'Yes' : 'No'}
								</td>
								<td ${form.contactIn14Days ? "style='background-color:red; color:white;'" : ''}>
									${form.contactIn14Days ? 'Yes' : 'No'}
								</td>
								<td>${form.noOfPeopleInGroup}</td>
								<td>${form.vaccinationStatus ? 'Yes' : 'No'}</td>
								<td>${form.covidOver9Months ? 'Yes' : 'No'}</td>
								<td>${form.comments || ''}</td>
							</tr>
				`;
			} else {
				emailBodyForVendors[form.vendorID.vendorName].body += `
							<tr>
								<td>${form.fullName}</td>
								<td>${form.email}</td>
								<td>${form.dateOfVisit}</td>
								<td>${form.timeOfVisit}</td>
								<td>${form?.phoneNumber || ''}</td>
								<td ${form.temperature ? "style='background-color:red; color:white;'" : ''}>
									${form.temperature ? 'Yes' : 'No'}
								</td>
								<td ${form.cough ? "style='background-color:red; color:white;'" : ''}>
									${form.cough ? 'Yes' : 'No'}
								</td>
								<td ${form.abroadIn14Days ? "style='background-color:red; color:white;'" : ''}>
									${form.abroadIn14Days ? 'Yes' : 'No'}
								</td>
								<td ${form.contactIn14Days ? "style='background-color:red; color:white;'" : ''}>
									${form.contactIn14Days ? 'Yes' : 'No'}
								</td>
								<td>${form.noOfPeopleInGroup}</td>
								<td>${form.vaccinationStatus ? 'Yes' : 'No'}</td>
								<td>${form.covidOver9Months ? 'Yes' : 'No'}</td>
								<td>${form.comments || ''}</td>
							</tr>
							`;
			}
		}
	});

	activeVendorList.forEach((vendorName) => {
		if (emailBodyForVendors[vendorName].body.length > 0) {
			emailBodyForVendors[vendorName].body += `
						</tbody>
					</table>

					<p>You can get the entire list by visiting our portal built for you or by contacting our adminstrator.</p>

					<i>Regards,</i><br/>
					<a href="https://e-society.ie"><b>E-Society.ie</b></a>
				</body>
				<footer>
					
				</footer>
				</html>
			`;
			const params = {
				Destination: {
					ToAddresses: [emailBodyForVendors[vendorName].email],
				},
				Message: {
					Body: {
						Html: {
							// HTML Format of the email
							Charset: 'UTF-8',
							Data: emailBodyForVendors[vendorName].body,
						},
						Text: {
							Charset: 'UTF-8',
							Data: `List of forms for the day - ${todayString}`,
						},
					},
					Subject: {
						Charset: 'UTF-8',
						Data: `List of forms for the day - ${todayString}`,
					},
				},
				Source: 'oisin@e-society.ie',
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
		}
	});
};

exports.indorEmailviaAWS_SES = async (formContent, res) => {
	// console.log(formContent);
	// AWS configuration
	AWS.config.loadFromPath('./aws.json');

	AWS.config.getCredentials(function (err) {
		if (err) {
			console.log(err.stack);
			exit(0);
		}
	});

	AWS.config.update({ region: 'us-west-2' });
	const ses = new AWS.SES({ apiVersion: '2010-12-01' });

	let transporter = nodemailer.createTransport({
		SES: ses,
	});

	var tmp_path = formContent.certificate.path;
	// send mail with defined transport object
	let info = await transporter.sendMail({
		from: 'oisin@e-society.ie',
		to: formContent.email,
		subject: 'Thanks for filling out the contact form', // Subject line
		html: `<html>
								<body>
									<h3>Dear ${formContent.fullName},</h3>
									<p>
									<b>Data Protection Notice:</b> Your personal data is being collected on this form in order to help prevent the spread of COVID-19 in <b><i>"${formContent.vendor.vendorName}"</i></b> and to protect our staff and our customers. Your personal data is being processed in accordance with Article 9(2)(i) of the General Data Protection Regulation, and Section 53 of the Data Protection Act 2018. The information you provide on this form will not be used for any other purpose, and will be strictly confidential. The form will be accessible only to administrator of e-society and the vendor for whom you have filled the form. Your data will be retained for 12 weeks.
									</p>
									<p>Thank you for filling out the contact tracing form for ${formContent.vendor.vendorName}. The following table shows the information that was collected.</p>
									<table>
										<tr>
											<td><b>Full Name</b></td>
											<td>${formContent.fullName}</td>
										</tr>
										<tr>
											<td><b>Email</b></td>
											<td>${formContent.email}</td>
										</tr>
										<tr>
											<td><b>Date Of Visit</b></td>
											<td>${formContent.dateOfVisit}</td>
										</tr>
										<tr>
											<td><b>Time Of visit</b></td>
											<td>${formContent.timeOfVisit}</td>
										</tr>							
									</table>
									<br/>
									
									<i>If you have any queries, please feel free to contact the venue.</i>
									<br/>
									<p>Thank you.</p>
									<div style="background:#e7e9eb;">
										<b>Powered by:</b><br/>
										<a href="https://e-society.ie"><b>E-Society.ie</b></a>
									</div>
								</body>
							</html>`, // html version
		attachments: [
			{
				filename:
					formContent.fullName.split(' ')[0] +
					'-' +
					formContent.certificate.filename,
				content: fs.createReadStream(tmp_path),
			},
		],
	});

	let toVendor = await transporter.sendMail({
		from: 'oisin@e-society.ie',
		to: formContent.vendor.vendorEmail,
		subject: `Details of Person for entry at ${formContent.dateOfVisit},${formContent.timeOfVisit}`, // Subject line
		html: `<html>
								<body>
									<h3>Dear ${formContent.vendor.vendorName},</h3>
									<p>
									<b>Data Protection Notice:</b> Your personal data is being collected on this form in order to help prevent the spread of COVID-19 in <b><i>"${formContent.vendor.vendorName}"</i></b> and to protect our staff and our customers. Your personal data is being processed in accordance with Article 9(2)(i) of the General Data Protection Regulation, and Section 53 of the Data Protection Act 2018. The information you provide on this form will not be used for any other purpose, and will be strictly confidential. The form will be accessible only to administrator of e-society and the vendor for whom you have filled the form. Your data will be retained for 12 weeks.
									</p>
									<p>Thank you for filling out the contact tracing form for ${formContent.vendor.vendorName}. The following table shows the information that was collected.</p>
									<table>
										<tr>
											<td><b>Full Name</b></td>
											<td>${formContent.fullName}</td>
										</tr>
										<tr>
											<td><b>Email</b></td>
											<td>${formContent.email}</td>
										</tr>
										<tr>
											<td><b>Date Of Visit</b></td>
											<td>${formContent.dateOfVisit}</td>
										</tr>
										<tr>
											<td><b>Time Of visit</b></td>
											<td>${formContent.timeOfVisit}</td>
										</tr>							
									</table>
									<br/>
									
									<i>If you have any queries, please feel free to contact the venue.</i>
									<br/>
									<p>Thank you.</p>
									<div style="background:#e7e9eb;">
										<b>Powered by:</b><br/>
										<a href="https://e-society.ie"><b>E-Society.ie</b></a>
									</div>
								</body>
							</html>`, // html version
		attachments: [
			{
				filename:
					formContent.fullName.split(' ')[0] +
					'-' +
					formContent.certificate.filename,
				content: fs.createReadStream(tmp_path),
			},
		],
	});

	console.log('Message sent: %s', info.messageId);
	console.log('To vendor', toVendor.messageId);
};
