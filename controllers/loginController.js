var db = require('../db.js');
var Person = require('../models/person');
var Tattooist = require('../models/tattooist');

exports.login = function(req,res) {
	db.get().query("SELECT userId FROM Users WHERE mail='"+req.body.mail+"' AND password='"+req.body.password+"'",function(err,rows) {
		var response = {};
		if(err){
			response.status = 2;
			response.message = err;
			response.data = null;
			res.send(response);
		}
		else{
			if(rows && rows.length == 1){
				console.log(req.body.type);
				if(req.body.type == 'tattooist'){
					db.get().query("SELECT * FROM Tattooists WHERE userId="+rows[0].userId,function(err2,rows2) {
						if(err2){
							response.status = 3;
							response.message = err2;
							response.data = null;
						}
						else{
							if(rows2 && rows2.length == 1){
								response.status = 0;
								response.message = "Success";
								response.data = new Tattooist(rows2[0].tattooistId,rows2[0].name,rows2[0].gender,rows2[0].city,rows2[0].userId,rows2[0].phone);
							}
							else{
								response.status = 1;
								response.message = "No tattooist found with those credentials.";
								response.data = null;
							}
						}
						res.send(response);
					});
				}
				else{
					db.get().query("SELECT * FROM People WHERE userId="+rows[0].userId,function(err2,rows2) {
						if(err2){
							response.status = 3;
							response.message = err2;
							response.data = null;
						}
						else{
							if(rows2 && rows2.length == 1){
								response.status = 0;
								response.message = "Success";
								response.data = new Person(rows2[0].personId,rows2[0].name,rows2[0].gender,rows2[0].city,rows2[0].userId);
							}
							else{
								response.status = 1;
								response.message = "No person found with those credentials.";
								response.data = null;
							}
						}
						res.send(response);
					});
				}
			}
			else{
				response.status = 1;
				response.message = 'Wrong credentials.';
				response.data = null;
				res.send(response);
			}
		}
	});
}