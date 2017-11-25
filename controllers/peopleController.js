var db = require('../db.js');

exports.insert = function(req,res) {
	db.get().query("INSERT INTO Users (mail,password) VALUES ('"+req.body.mail+"','"+req.body.pass+"')",function(err,rows) {
		var response = {};
		if(err){
			response.status = 2;
			response.message = err;
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