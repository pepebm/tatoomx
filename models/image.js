function Image(_id, _blob, _created_at, _tattoistId){
	this.id = _id;
	this.image = _blob;
	this.created_at = _created_at;
	this.tattooistId = _tattoistId;
}

module.exports = Image;