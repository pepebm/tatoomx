var db = require('../db.js');
var Image = require('../models/image');
var fs = require('fs');
var path = require('path');

exports.getAll = function(req,res) {
	db.get().query('SELECT imageId FROM LikesImages WHERE personId='+req.params.id,function(e,r){
		var response = {};
		var liked = [];
		if(e){
			response.status = 2;
			response.message = e;
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
					res.send(response);
				}
				else{
					var lista = [];
					for (var i = 0; i < rows.length; i++) {
						lista.push( __dirname + '/../' + rows[i].imageblob.toString('utf8'));
						data.push(new Image(rows[i].imageId, "", rows[i].created_at, rows[i].tattooistId));
					}
					for (var i = 0; i < data.length; i++) {
						if(liked.indexOf(data[i].id) > -1) data[i].liked = true;
						else data[i].liked = false;
					}
					idx = 0;
					lista = lista.map(_path => {
						return new Promise((resolve,reject) => {
							var file = fs.readFile(path.resolve(_path),'utf8', (err,data2) => {
								if(err) throw err;
								data[idx].image = data2;
								idx += 1
								resolve();
							});
						});
					});
					Promise.all(lista).then(data3 => {
						response.status = 0;
						response.message = 'Success';
						response.data = data;
						res.send(response);
					}).catch(e => {console.log(e)});
				}
			});
		}
	});
}

exports.add = function(req,res) {
	var b64 = req.body.image;
	var img = b64.substring(b64.indexOf(",") + 1);
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