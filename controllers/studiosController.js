var db = require('../db.js');
var Studio = require('../models/studio');

exports.getAll = function(req,res) {
	db.get().query('SELECT * FROM Studios',function(err,rows) {
		var response = {};
		var data = [];
		if(err){
			response.status = 2;
			response.message = err;
		}
		else{
			if(rows && rows.length > 0){
				for (var i = 0; i < rows.length; i++) {
					data.push(new Studio(rows[i].studioId, rows[i].name, rows[i].description, rows[i].ubicacion))
				}
				response.status = 0;
				response.message = "Success";
			}
			else{
				response.status = 1;
				response.message = "No studios found.";
			}
			response.data = data;
		}
		res.send(response);
	});
}