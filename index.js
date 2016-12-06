const express = require('express');
const request = require('request');
const app = express();
const link = 'https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=HK&maxResults=10&key=AIzaSyA5u7bNbwofHZBYcI583BkIMehRR45wG8k';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
	request(link, (err, response, body) => {
		res.send(body);
	});
});

app.listen(3000);