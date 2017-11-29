var db = require('../db.js');
var Image = require('../models/image');
var fs = require('fs');
//var path = require('path'); //path.resolve(image) // IF FORBIDEN ERROR

exports.getAll = function(req,res) {
	db.get().query('SELECT imageId FROM LikesImages WHERE personId='+req.params.id,function(e,r){
		var response = {};
		var liked = [];
		if(e){
			response.status = 2;
			response.message = err;
			res.send(response);
		}
		else{
			for (var i = 0; i < r.length; i++) {
				liked.push(r[i].imageId);
			}
			db.get().query('SELECT * FROM Images',function (err,rows) {
				var data = [];
				if(err){
					response.status = 2;
					response.message = err;
				}
				else{
					for (var i = 0; i < rows.length; i++) {
						data.push(new Image(rows[i].imageId, rows[i].imageblob, rows[i].created_at, rows[i].tattooistId));
					}
					data.forEach(image => {
						if(image.imageId in liked) image.liked = true;
						else liked = false;
					});
					response.status = 0;
					response.message = 'Success';
					response.data = data;
				}
				res.send(response);
			});
		}
	});
}

exports.add = function(req,res) {
	var b64 = req.body.image;
	var img = b64.substring(b64.indexOf(",") + 1);
	console.log("---");
	console.log(req.body.image);
	console.log("---");
	var created_at = new Date();
	created_at = created_at.getFullYear().toString() + created_at.getMonth() + created_at.getDate() + created_at.getHours() + created_at.getMinutes() + created_at.getSeconds();
	
	fs.writeFile('storage/'+created_at, req.body.image, function(err) {
		if(err){
			console.log(err);
		}
		else{
			db.get().query("INSERT INTO Images (imageblob,tattooistId) VALUES ('storage/"+created_at+"','"+req.body.tattooistId+"')",function(err,rows) {
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