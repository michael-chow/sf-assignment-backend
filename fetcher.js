const request = require('request');
const db = require('./db/db');
const settings = require('./settings'); //this file stores the API Key in this format {key: [API-KEY]}
const link = 'https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&regionCode=HK&maxResults=10&key=' + settings['key'];

// function to fetch YouTube video list
const retrieve = () => {

	// construct the time string
	let time = new Date();
	let year = time.getFullYear();
	let month = (time.getMonth() + 1) < 10 ? '0'+ time.getMonth() + 1 : time.getMonth() + 1;
	let date = time.getDate() < 10 ? '0'+ time.getDate() : time.getDate();
	let hour = time.getHours() < 10 ? '0'+ time.getHours() : time.getHours();
	let timeString = ''+year+month+date+hour;

	// send GET request to YouTube API
	request(link, (err, response, body) => {
		if (err) {
			console.log('There is an error: ', err)
		} else {
			let resBody = JSON.parse(body);

			//construct array of videos for storage in database
			let resultArray = resBody['items'].map((videoObj) => {
				let video = {
					videoId: videoObj['id'],
					title: videoObj['snippet']['title'],
					description: videoObj['snippet']['description'],
					thumbnail: videoObj['snippet']['thumbnails']['standard']['url'],
					viewCount: videoObj['statistics']['viewCount']
				};
				return video;
			});

			let newRecord = new db.Video({
				timeString: timeString,
				result: resultArray
			});

			newRecord.save((err, success) => {
				if (err) {
					console.log(err);
				} else {
					console.log("Record Saved");
				}
			});
		}
	});
};

retrieve();

module.exports.retrieve = retrieve;