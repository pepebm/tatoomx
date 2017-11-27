var db = require('../db.js');
var Tattooist = require('../models/tattooist');
var Image = require('../models/image');

exports.getAll = function(req,res){
	db.get().query('SELECT * FROM Tattooists', function(err,rows) {
		var response = {};
		var data = [];
		if(err){
			response.status = 2;
			response.message = err;
		}
		else{
			if(rows && rows.length > 0){
				for(var i=0;i<rows.length;i++){
					data.push(new Tattooist(rows[i].tattooistId,rows[i].name,rows[i].gender,rows[i].city,rows[i].userId,rows[i].studioId,rows[i].phone));
				}
				response.status = 0;
				response.message = 'Success';
			}
			else{
				response.status = 1;
				response.message = 'No tattooists found.';
			}
			response.data = data;
		}
		res.send(response);
	});
}

// CREO QUE NO LA NECESITO
exports.getOne = function(req,res){
	db.get().query('SELECT * FROM Tattooists WHERE tattooistId='+req.params.id, function(err,rows){
		var response = {};
		var data = null;
		if(err){
			response.status = 2;
			response.message = err;
		}
		else{
			if(rows && rows.length == 1){
				data = new Tattooist(rows[0].tattooistId,rows[0].name,rows[0].gender,rows[0].city,rows[0].userId,rows[0].studioId,rows[0].phone);
				response.status = 0;
				response.message = 'Success';
			}
			else{
				response.status = 1;
				response.message = 'No tattooist found with that id';
			}
			response.data = data;
		}
		res.send(response);
	});
}

exports.create = function(req,res){
	db.get().query("SELECT userId FROM Users WHERE mail='"+req.body.mail+"'",function(error,registros) {
		var response = {};
		if(error){
			response.status = 2;
			response.message = error;
			res.send(response);
		}
		else{
			if(registros.length == 0){
				db.get().query("INSERT INTO Users (mail,password) VALUES ('"+req.body.mail+"','"+req.body.password+"')",function(err,rows) {
					if(err){
						response.status = 2;
						response.message = err;
						res.send(response);
					}
					else{
						db.get().query("INSERT INTO Tattooists (name,gender,city,userId) VALUES ('"+req.body.name+"','"+req.body.gender+"','"+req.body.city+"',"+rows.insertId+")",function(err2,rows2) {
							if(err2){
								response.status = 3;
								response.message = err2;
								db.get().query("DELETE FROM Users WHERE userId="+rows.insertId,function(err3,rows3){
									if(err3){
										response.status = 4;
										response.message = 'FATAL ERROR!';
									}
									res.send(response);
								});
							}
							else{
								response.status = 0;
								response.message = 'Success';
								res.send(response);
							}
						});
					}
				});
			}
			else{
				response.status = 5;
				response.message = "That mail is already ocupied.";
				res.send(response);
			}
		}
	});
}

exports.getImages = function(req,res) {
	db.get().query("SELECT * FROM Images WHERE tattooistId="+req.params.id, function(err,rows) {
		var response = {};
		var data = [];
		if(err){
			response.status = 2;
			response.message = err;
		}
		else{
			if(rows && rows.length > 0){
				for (var i = 0; i < rows.length; i++) {
					data.push(new Image(rows[i].imageId, rows[i].imageblob, rows[i].created_at, rows[i].tattooistId));
				}
				response.status = 0;
				response.message = 'Success';
			}
			else{
				response.status = 1;
				response.message = 'No images found.';
			}
			response.data = data;
		}
		res.send(response);
	});
}