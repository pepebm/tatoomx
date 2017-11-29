var db = require('../db.js');
var Studio = require('../models/studio');
var Tattooist = require('../models/tattooist');

exports.getAll = function(req,res) {
	db.get().query('SELECT studioId FROM LikesStudios WHERE personId='+req.params.id,function(e,r){
		var response = {};
		var liked = [];
		if(e){
			response.status = 2;
			response.message = e;
			res.send(response);
		}
		else{
			for (var i = 0; i < r.length; i++) {
				liked.push(r[i].studioId);
			}
			db.get().query('SELECT * FROM Studios',function(err,rows) {
				var data = [];
				if(err){
					response.status = 2;
					response.message = err;
				}
				else{
					for (var i = 0; i < rows.length; i++) {
						data.push(new Studio(rows[i].studioId, rows[i].name, rows[i].description, rows[i].ubicacion))
					}
					for (var i = 0; i < data.length; i++) {
						if(liked.indexOf(data[i].id) > -1) data[i].liked = true;
						else data[i].liked = false;
					}
					response.status = 0;
					response.message = "Success";
					response.data = data;
				}
				res.send(response);
			});
		}
	});
}

exports.getTattooists = function(req,res) {
	db.get().query("SELECT * FROM Tattooists WHERE studioId="+req.params.id,function(err,rows) {
		var response = {};
		var data = [];
		if(err){
			response.status = 2;
			response.message = err;
		}
		else{
			for (var i = 0; i < rows.length; i++) {
				data.push(new Tattooist(rows[i].tattooistId, rows[i].name, rows[i].gender, rows[i].city, rows[i].userId, req.params.id, rows[i].phone));
			}
			response.status = 0;
			response.message = "Success";
			response.data = data;
		}
		res.send(response);
	});
}