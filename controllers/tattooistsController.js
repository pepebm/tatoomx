var db = require('../db.js');
var Tattooist = require('../models/tattooist');

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
					var tattooist = new Tattooist(rows[i].tattooistId,rows[i].name,rows[i].gender,rows[i].city,rows[i].userId);
					data.push(tattooist);
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
				data = new Tattooist(rows[0].tattooistId,rows[0].name,rows[0].gender,rows[0].city,rows[0].userId);
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

exports.insert = function(req,res){
	db.get().query("INSERT INTO Users (mail,password) VALUES ('"+req.body.mail+"','"+req.body.pass+"')",function(err,rows) {
		var response = {};
		if(err){
			response.status = 2;
			response.message = err;
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
					});
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