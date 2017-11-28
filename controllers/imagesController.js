var db = require('../db.js');
var Image = require('../models/image');

export.getAll = function(req,res) {
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
	db.get().query("INSERT INTO Images (imageblob,tattooistId) VALUES ('"+req.body.blob+"','"+req.body.tattooistId+"')",function(err,rows) {
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