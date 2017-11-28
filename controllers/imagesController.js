var db = require('../db.js');
var Image = require('../models/image');
var fs = require('fs');

exports.getAll = function(req,res) {
	db.get().query('SELECT * FROM Images',function (err,rows) {
		var response = {};
		var data = [];
		if(err){
			response.status = 2;
			response.message = err;
		}
		else{
			for (var i = 0; i < rows.length; i++) {
				data.push(new Image(rows[i].imageId, rows[i].imageblob, rows[i].created_at, rows[i].tattooistId));
			}
			response.status = 0;
			response.message = 'Success';
		}
		res.send(response);
	});
}

exports.add = function(req,res) {
	var b64 = req.body.blob;
	var created_at = new Date();
	created_at = a.getFullYear().toString() + a.getMonth() + a.getDate() + a.getHours() + a.getMinutes() + a.getSeconds();
	var bufferedImg = new Buffer(b64.substring(b64.indexOf(',')+1),'base64');
	fs.writeFile('../storage/'+created_at, bufferedImg,function(err) {
		if(err){

		}
		else{
			db.get().query("INSERT INTO Images (imageblob,tattooistId) VALUES ('http://localhost:3000/storage/"+created_at+"','"+req.body.tattooistId+"')",function(err,rows) {
				var response = {};
				if(err){
					response.status = 2;
					response.message = err;
				}
				else{
					response.status = 0;
					response.message = 'Success';
				}
				res.send(response);
			});
		}
	});
}

exports.delete = function(req,res) {
	db.get().query("DELETE FROM Images WHERE imageId="+req.body.imageId,function(err,rows) {
		var response = {};
		if(err){
			response.status = 2;
			response.message = err;
		}
		else{
			response.status = 0;
			response.message = 'Success';
		}
		res.send(response);
	});
}