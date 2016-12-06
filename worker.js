const request = require('request');
const link = 'https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=HK&maxResults=10&key=AIzaSyA5u7bNbwofHZBYcI583BkIMehRR45wG8k';
const db = require('./db/db');

let time = new Date();

const retrieve = () => {
	request(link, (err, response, body) => {
		if (err) {
			console.log('There is an error: ', err)
		} else {
			let resBody = JSON.parse(body);

			let resultArray = resBody['items'].map((videoObj) => {
				let video = {
					videoId: videoObj['id'],
					title: videoObj['snippet']['title'],
					description: videoObj['snippet']['description'],
					thumbnail: videoObj['snippet']['thumbnails']['standard']['url']
				};
				return video;
			});

			let newRecord = new db.Video({
				year: time.getFullYear(),
				month: time.getMonth() + 1,
				date: time.getDate(),
				minute: time.getMinutes(),
				result: resultArray
			});

			newRecord.save((err, success) => {
				if (err) {
					console.log(err);
				} else {
					console.log(success);
				}
			});
		}

	});
};

retrieve();