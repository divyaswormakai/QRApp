const AWS = require('aws-sdk');
const nodemailer = require('nodemailer');
const fs = require('fs');
const Form = require('../models/Form');
const Vendor = require('../models/Vendor');
const School = require('../models/School');
const SchoolForm = require('../models/SchoolForm');
const moment = require('moment');

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

exports.emailViaAWS_SES = function async(savedForm) {
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
									}"</i></b> and to protect our staff and our customers. Your personal data is being processed in accordance with Article 9(2)(i) of the General Data Protection Regulation, and Section 53 of the Data Protection Act 2018. The information you provide on this form will not be used for any other purpose, and will be strictly confidential. The form will be accessible only to administrator of e-society and the vendor for whom you have filled the form. 
									The Health Act 1947 (Section 31A - Temporary Restrictions) (Covid-19) (No. 2) Regulations 2021 (SI 217 of 2021) provide that a specified person shall retain and make available records made under paragraph (2) for the purposes of inspection by a member of the Garda Síochána acting in the course of his or her duties under these Regulations, or by a person appointed by the Health Service Executive for the purposes of the programme commonly known as the Covid-19 Contact Management Programme, for a period of 28 days after the records have been made. Should a confirmed case arise, the Contact Management Programme will take the necessary action to contact those who need to be contacted.
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
											<td>${moment(savedForm.dateOfVisit).format('YYYY-MM-DD')}</td>
										</tr>
										<tr>
											<td><b>Time Of visit</b></td>
											<td>${savedForm.timeOfVisit}</td>
										</tr>
										<tr>
											<td><b>How many people are there in your group/table?</b></td>
											<td>${savedForm.noOfPeopleInGroup || ''}</td>
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
								<th>How many people were there in your table/group?</th>
								<th>Comments</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>${form.fullName}</td>
								<td>${form.email}</td>
								<td>${moment(form.dateOfVisit).format('YYYY-MM-DD')}</td>
								<td>${form.timeOfVisit}</td>
								<td>${form.phoneNumber || ''}</td>
								<td>${form.noOfPeopleInGroup}</td>
								<td>${form.comments || ''}</td>
							</tr>
				`;
			} else {
				emailBodyForVendors[form.vendorID.vendorName].body += `
							<tr>
								<td>${form.fullName}</td>
								<td>${form.email}</td>
								<td>${moment(form.dateOfVisit).format('YYYY-MM-DD')}</td>
								<td>${form.timeOfVisit}</td>
								<td>${form.phoneNumber || ''}</td>
								<td>${form.noOfPeopleInGroup}</td>
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
	let transporter = nodemailer.createTransport({
		SES: ses,
	});
	let attachments = [];
	let vendorAttachments = [];
	if (formContent.certificate) {
		attachments.push({
			filename:
				formContent.fullName.split(' ')[0] +
				'-' +
				formContent.certificate.filename,
			content: fs.createReadStream(formContent.certificate.path),
		});
		vendorAttachments.push({
			filename:
				formContent.fullName.split(' ')[0] +
				'-' +
				formContent.certificate.filename,
			content: fs.createReadStream(formContent.certificate.path),
		});
	}
	if (formContent.identity) {
		attachments.push({
			filename:
				formContent.fullName.split(' ')[0] +
				'-' +
				formContent.identity.filename,
			content: fs.createReadStream(formContent.identity.path),
		});
		vendorAttachments.push({
			filename:
				formContent.fullName.split(' ')[0] +
				'-' +
				formContent.identity.filename,
			content: fs.createReadStream(formContent.identity.path),
		});
	}
	// send mail with defined transport object
	await transporter.sendMail({
		from: 'oisin@e-society.ie',
		to: formContent.email,
		subject: `Ref: ${
			formContent.refNo || ''
		}. Thanks for Uploading Verification Documents`, // Subject line
		html: `<html>
								<body>
									<h3>Dear ${formContent.fullName},</h3>
									<p>
									<b>Data Protection Notice:</b> 
									<br/>
									Personal data contained in a proof of immunity shall be processed only for the purpose of accessing and verifying the information included in such proof of immunity in connection with the admittance of permitted persons to relevant indoor premises.

									</p>
									<p>Thank you for filling out the verification form for ${
										formContent.vendor.vendorName
									}. The following table shows the information that is checked.</p>
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
											<td>${moment(formContent.dateOfVisit).format('YYYY-MM-DD')}</td>
										</tr>
										<tr>
											<td><b>Time Of visit</b></td>
											<td>${formContent.timeOfVisit}</td>
										</tr>
										<tr>
											<td><b>Reference Number</b></td>
											<td>${formContent.refNo}</td>
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
		attachments: [...attachments],
	});
	await transporter.sendMail({
		from: 'oisin@e-society.ie',
		to: formContent.vendor.vendorEmail,
		subject: `Ref: ${formContent.refNo || ''}. Details of ${
			formContent.fullName
		} for entry at ${formContent.dateOfVisit},${formContent.timeOfVisit}`, // Subject line
		html: `<html>
								<body>
									<h3>Dear ${formContent.vendor.vendorName},</h3>
									<p>
									<b>Data Protection Notice:</b> 
									<br/>
									Personal data contained in a proof of immunity shall be processed only for the purpose of accessing and verifying the information included in such proof of immunity in connection with the admittance of permitted persons to relevant indoor premises.
									</p>
									<p>Following are the details of ${formContent.fullName}.</p>
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
											<td>${moment(formContent.dateOfVisit).format('YYYY-MM-DD')}</td>
										</tr>
										<tr>
											<td><b>Time Of visit</b></td>
											<td>${formContent.timeOfVisit}</td>
										</tr>
										<tr>
											<td><b>Reference Number</b></td>
											<td>${formContent.refNo}</td>
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
		attachments: [...vendorAttachments],
	});

	// console.log('Message sent: %s', info.messageId);
	// console.log('To vendor', toVendor.messageId);
};

exports.schoolFormEmail_SES = async (savedForm) => {
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
									<b> Data Protection Notice:</b> Your personal data is being collected for Covid - 19
										contact tracing. The information you provide on this form will not be used for any other
										purpose, and will be strictly confidential. Your information will be kept for 28 days in
										accordance with: The Health Act 1947 (Section 31A - Temporary Restrictions) (Covid-19)
										(No. 2) Regulations 2021 (SI 217 of 2021).  <br/>
									</p>
									</p>
									<p>Thank you for filling out the contact tracing form for ${
										savedForm.schoolID.schoolName
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
											<td><b>Student ID</b></td>
											<td>${savedForm.studentID || ''}</td>
										</tr>
										<tr>
											<td><b>Contact</b></td>
											<td>${savedForm.phoneNumber}</td>
										</tr>
										<tr>
											<td><b>Date Of Visit</b></td>
											<td>${moment(savedForm.dateOfVisit).format('YYYY-MM-DD')}</td>
										</tr>
										<tr>
											<td><b>Time Of visit</b></td>
											<td>${savedForm.timeOfVisit}</td>
										</tr>
										<tr>
											<td><b>Room Number</b></td>
											<td>${savedForm.roomNumber}</td>
										</tr>

									</table>
									<br/>
									<i>If you have any queries, please feel free to contact the school adminstration.</i>
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
				Data: 'Thanks for filling out the contact form.',
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

exports.schoolFormsForSchool_SES = async () => {
	try {
		let transporter = nodemailer.createTransport({
			SES: ses,
		});
		const schools = await School.find();
		await schools.forEach(async (school) => {
			school = school.toJSON();

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

			const forms = await SchoolForm.find({
				schoolID: school.id,
				dateOfVisit: { $gt: today },
			}).populate('schoolID');

			let bodyTableText = '';
			forms.forEach((form) => {
				bodyTableText += `
					<tr>
						<td>${form.fullName}</td>
						<td>${form.email}</td>
						<td>${form.phoneNumber}</td>
						<td>${moment(form.dateOfVisit).format('YYYY-MM-DD')}</td>
						<td>${form.timeOfVisit}</td>
						<td>${form.studentID}</td>
						<td>${form.roomNumber}</td>
					</tr>
				`;
			});

			await transporter.sendMail({
				from: 'oisin@e-society.ie',
				to: school.schoolEmail,
				subject: `Forms filled for ${todayString}`,
				html: `
					<html>
						<head>
							<style>
								table, th, td {
									border: 1px solid black;
								}
							</style>
						</head>
						<body>
							<h2>Hello ${school.schoolName},</h2>
							<p>The forms that heve been filled on the date ${todayString} is as follows:</p>
							<table>
								<thead>
									<tr>
										<th>Full Name</th>
										<th>Email</th>
										<th>Contact Number</th>
										<th>Date Of Visit</th>
										<th>Time Of Visit</th>
										<th>Student Number</th>
										<th>Room Number</th>
									</tr>
								</thead>
								<tbody>
									${bodyTableText}
								</tbody>
							</table>
						</body>
					</html>
				`,
			});
		});
	} catch (error) {
		console.log(error);
	}
};
