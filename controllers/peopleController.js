var db = require('../db.js');
var Person = require('../models/person');
var Image = require('../models/image');
var Tattooist = require('../models/tattooist');
var Studio = require('../models/studio');

exports.create = function(req,res) {
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
					var response = {};
					if(err){
						response.status = 2;
						response.message = err;
						res.send(response);
					}
					else{
						db.get().query("INSERT INTO People (name,gender,city,userId) VALUES ('"+req.body.name+"','"+req.body.gender+"','"+req.body.city+"',"+rows.insertId+")",function(err2,rows2) {
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
	console.log(req.body);
	if(!!req.body.body.name) num += 1;
	if(!!req.body.body.city) num += 1;
	if(!!req.body.body.mail) num += 1;
	if(!!req.body.body.password) num += 1;

	if(!!req.body.body.name){
		db.get().query("UPDATE People SET name='" + req.body.body.name + "' WHERE personId=" + req.body.id,function(err,rows) {
			if(err){
				res.send({
					status:2,
					message:err
				});
			}
			cnt += 1
			if(cnt == num){
				res.send({
					status:0,
					message:"Success"
				})
			}
		});
	}
	if(!!req.body.body.city){
		db.get().query("UPDATE People SET city='" + req.body.body.city + "' WHERE personId=" + req.body.id,function(err,rows) {
			if(err){
				res.send({
					status:2,
					message:err
				});
			}
			cnt += 1
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
			cnt += 1
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
			cnt += 1
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
	db.get().query("SELECT * FROM Images i,People p,LikesImages l WHERE l.personId=p.personId AND l.imageId=i.imageId AND p.personId="+req.params.id,function(err,rows) {
		var response = {};
		var data = [];
		if(err){
			response.status = 2;
			response.message = error;
		}
		else{
			for (var i = 0; i < rows.length; i++) {
				data.push(new Image(rows[i].imageId, rows[i].imageblob.toString('utf8'), rows[i].created_at, rows[i].tattooistId));
			}
			response.status = 0;
			response.message = "Success";
			res.data = data;
		}
		res.send(response);
	});
}

exports.getTattooists = function(req,res){
	db.get().query("SELECT * FROM Tattooists t,People p,LikesTattooists l WHERE l.personId=p.personId AND l.tattooistId=t.tattooistId AND p.personId="+req.params.id,function(err,rows) {
		var response = {};
		var data = [];
		if(err){
			response.status = 2;
			response.message = error;
		}
		else{
			for (var i = 0; i < rows.length; i++) {
				data.push(new Tattooist(rows[i].tattooistId, rows[i].name, rows[i].gender, rows[i].city, rows[i].userId, rows[i].studioId, rows[i].phone));
			}
			response.status = 0;
			response.message = "Success";
			res.data = data;
		}
		res.send(response);
	});
}

exports.getStudios = function(req,res) {
	db.get().query("SELECT * FROM Studios s,People p,LikesStudios l WHERE l.personId=p.personId AND l.studioId=s.studioId AND p.personId="+req.params.id,function(err,rows) {
		var response = {};
		var data = [];
		if(err){
			response.status = 2;
			response.message = error;
		}
		else{
			for (var i = 0; i < rows.length; i++) {
				data.push(new Studio(rows[i].studioId, rows[i].name, rows[i].description, rows[i].ubicacion));
			}
			response.status = 0;
			response.message = "Success";
			res.data = data;
		}
		res.send(response);
	});
}

exports.likeImage = function(req,res) {
	db.get().query("INSERT INTO LikesImages (personId,imageId) VALUES ("+req.body.personId+","+req.body.imageId+")",function(err,rows) {
		var response = {};
		if(err){
			response.status = 2;
			response.message = err;
		}
		else{
			response.status = 0;
			response.message = "Success";
		}
		res.send(response);
	});
}

exports.likeTattooist = function(req,res) {
	db.get().query("INSERT INTO LikesTattooists (personId,tattooistId) VALUES ("+req.body.personId+","+req.body.tattooistId+")",function(err,rows) {
		var response = {};
		if(err){
			response.status = 2;
			response.message = err;
		}
		else{
			response.status = 0;
			response.message = "Success";
		}
		res.send(response);
	});
}

exports.likeStudio = function(req,res) {
	db.get().query("INSERT INTO LikesStudios (personId,studioId) VALUES ("+req.body.personId+","+req.body.studioId+")",function(err,rows) {
		var response = {};
		if(err){
			response.status = 2;
			response.message = err;
		}
		else{
			response.status = 0;
			response.message = "Success";
		}
		res.send(response);
	});
}

exports.deleteLikeImage = function(req,res) {
	db.get().query("DELETE FROM LikesImages WHERE personId="+req.body.personId+" AND imageId="+req.body.imageId,function(err,rows) {
		var response = {};
		if(err){
			response.status = 2;
			response.message = err;
		}
		else{
			response.status = 0;
			response.message = "Success";
		}
		res.send(response);
	});
}

exports.deleteLikeTattooist = function(req,res) {
	db.get().query("DELETE FROM LikesTattooists WHERE personId="+req.body.personId+" AND tattooistId="+req.body.tattooistId,function(err,rows) {
		var response = {};
		if(err){
			response.status = 2;
			response.message = err;
		}
		else{
			response.status = 0;
			response.message = "Success";
		}
		res.send(response);
	});
}

exports.deleteLikeStudio = function(req,res) {
	db.get().query("DELETE FROM LikesStudios WHERE personId="+req.body.personId+" AND studioId="+req.body.studioId,function(err,rows) {
		var response = {};
		if(err){
			response.status = 2;
			response.message = err;
		}
		else{
			response.status = 0;
			response.message = "Success";
		}
		res.send(response);
	});
}
