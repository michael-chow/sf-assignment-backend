const request = require('request');
const link = 'https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=HK&maxResults=10&key=AIzaSyA5u7bNbwofHZBYcI583BkIMehRR45wG8k';
const db = require('./db/db');

const retrieve = () => {
	request(link, (err, response, body) => {
		let items = JSON.parse(body);
		console.log(items["items"]);
	});
};