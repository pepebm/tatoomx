var mysql = require('mysql')
var pool = {}

exports.connect = function(done){
	pool = mysql.createPool({
		host: 'localhost',
		user: 'root',
		password: 'Iv4n.Y34h',
		port:'3306',
		database:'tattoomx'
	});
	done();
}

exports.get = function(){
	return pool;
}
