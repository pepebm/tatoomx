function Image(_id, _blob, _tattoistId, _created_at){
	this.id = _id;
	this.tattooistId = _tattoistId;
	this.image = _blob;
	this.created_at = _created_at;
}

module.exports = Image;