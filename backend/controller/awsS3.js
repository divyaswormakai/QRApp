const AWS = require('aws-sdk');
const bucketName = 'contacttracingbucket';
const fs = require('fs');
const async = require('async');

AWS.config.loadFromPath('./aws.json');

AWS.config.getCredentials(function (err) {
	if (err) {
		console.log(err.stack);
		exit(0);
	}
});

AWS.config.update({ region: 'eu-west-1' });

const s3 = new AWS.S3({ region: 'eu-west-1' });

const createMainBucket = (callback) => {
	// Create the parameters for calling createBucket
	const bucketParams = {
		Bucket: bucketName,
	};
	s3.headBucket(bucketParams, function (err, data) {
		if (err) {
			console.log('ErrorHeadBucket', err);
			s3.createBucket(bucketParams, function (err, data) {
				if (err) {
					console.log('Error', err);
					callback(err, null);
				} else {
					callback(null, data);
				}
			});
		} else {
			callback(null, data);
		}
	});
};

const createItemObject = (callback) => {
	const params = {
		Bucket: bucketName,
		Key: `${imageName}`,
		ACL: 'public-read',
		Body: image,
	};
	s3.putObject(params, function (err, data) {
		if (err) {
			console.log('Error uploading image: ', err);
			callback(err, null);
		} else {
			console.log('Successfully uploaded image on S3', data);
			callback(null, data);
		}
	});
};

exports.upload = (req, res, next) => {
	console.log(req.files);
	var tmp_path = req.files[0].path;
	// console.log("item", req.files.file)
	image = fs.createReadStream(tmp_path);
	imageName = req.files[0].filename;
	console.log(imageName);
	async.series([createMainBucket, createItemObject], (err, result) => {
		if (err) {
			console.log(err);
			throw new Error('Could not upload file.');
			// return res.status(400).json({ error: 'Error in async' });
		} else {
			console.log(result);

			next();
		}
	});
};
