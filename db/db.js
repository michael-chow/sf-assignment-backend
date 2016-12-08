const mongoose = require('mongoose');
const Schema = mongoose.Schema
mongoose.connect('mongodb://localhost/youtube');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected");
});

const videoSchema = new Schema({
	timeString: String,
	result: [{
		videoId: String,
		title: String,
		description: String,
		thumbnail: String, //standard thumbnail is stored in db
		viewCount: Number
	}]
});

const Video = mongoose.model('Video', videoSchema);

module.exports.db = db;
module.exports.Video = Video;