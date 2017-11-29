var db = require('../db.js');
var Tattooist = require('../models/tattooist');
var Image = require('../models/image');

exports.getAll = function(req,res){
	db.get().query('SELECT tattooistId FROM LikesTattooists WHERE personId='+req.params.id,function(e,r){
		var response = {};
		var liked = [];
		if(e){
			response.status = 2;
			response.message = e;
			res.send(response);
		}
		else{
			for (var i = 0; i < r.length; i++) {
				liked.push(r[i].tattooistId);
			}
			db.get().query('SELECT * FROM Tattooists', function(err,rows) {
				var data = [];
				if(err){
					response.status = 2;
					response.message = err;
				}
				else{
					for(var i=0;i<rows.length;i++){
						data.push(new Tattooist(rows[i].tattooistId,rows[i].name,rows[i].gender,rows[i].city,rows[i].userId,rows[i].studioId,rows[i].phone));
					}
					for (var i = 0; i < data.length; i++) {
						if(liked.indexOf(data[i].id) > -1) data[i].liked = true;
						else data[i].liked = false;
					}
					response.status = 0;
					response.message = 'Success';
					response.data = data;
				}
				res.send(response);
			});
		}
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
						db.get().query("INSERT INTO Tattooists (name,gender,city,userId,phone) VALUES ('"+req.body.name+"','"+req.body.gender+"','"+req.body.city+"',"+rows.insertId+",'"+req.body.phone+"')",function(err2,rows2) {
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

exports.update = function(req, res) {
	var cnt = 0;
	var num = 0;
	if(!!req.body.body.name) num += 1;
	if(!!req.body.body.city) num += 1;
	if(!!req.body.body.phone) num += 1;
	if(!!req.body.body.mail) num += 1;
	if(!!req.body.body.password) num += 1;
	console.log(req.body);
	console.log(num);
	if(!!req.body.body.name){
		db.get().query("UPDATE Tattooists SET name='" + req.body.body.name + "' WHERE tattooistId=" + req.body.id,function(err,rows) {
			if(err){
				res.send({
					status:2,
					message:err
				});
			}
			cnt += 1;
			if(cnt == num){
				res.send({
					status:0,
					message:"Success"
				})
			}
		});
	}
	if(!!req.body.body.city){
		db.get().query("UPDATE Tattooists SET city='" + req.body.body.city + "' WHERE tattooistId=" + req.body.id,function(err,rows) {
			if(err){
				res.send({
					status:2,
					message:err
				});
			}
			cnt += 1;
			if(cnt == num){
				res.send({
					status:0,
					message:"Success"
				})
			}
		});
	}
	if(!!req.body.body.phone){
		db.get().query("UPDATE Tattooists SET phone='" + req.body.body.phone + "' WHERE tattooistId="+ req.body.id,function(err,rows) {
			if(err){
				res.send({
					status:2,
					message:err
				});
			}
			cnt += 1;
			if(cnt == num){
				res.send({
					status:0,
					message:"Success"
				})
			}
		});
	}
	if(!!req.body.body.mail){
		db.get().query("UPDATE Users SET mail='" + req.body.body.mail + "' WHERE userId=" + req.body.uid,function(err,rows) {
			if(err){
				res.send({
					status:2,
					message:err
				});
			}
			cnt += 1;
			if(cnt == num){
				res.send({
					status:0,
					message:"Success"
				})
			}
		});
	}
	if(!!req.body.body.password){
		db.get().query("UPDATE Users SET password='" + req.body.body.password + "' WHERE userId="+ req.body.uid,function(err,rows) {
			if(err){
				res.send({
					status:2,
					message:err
				});
			}
			cnt += 1;
			if(cnt == num){
				res.send({
					status:0,
					message:"Success"
				})
			}
		});
	}
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
					data.push(new Image(rows[i].imageId, rows[i].imageblob.toString('utf8'), rows[i].created_at, rows[i].tattooistId));
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
