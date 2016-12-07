const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./db/db');
const fetcher = require('./worker');
const CronJob = require('cron').CronJob;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const dailyFetcher = new CronJob({
  cronTime: '00 00 * * * *',
  onTick: fetcher.retrieve,
  start: false,
});
dailyFetcher.start();

app.get('/', (req, res) => {
	res.send("Hello");
});

app.get('/youtube', (req, res) => {
	let query = req.query.q;
	if(query.length !== 10) {
		res.status(500).send("Wrong Query Format")
	} else {
		let queryObj = {
		year: query.substr(0,4),
		month: query.substr(4,2),
		date: query.substr(6,2),
		hour: query.substr(8,2)
		};
		db.Video.findOne(queryObj, (err, data) => {
			if (err) {
				res.status(500).send(err)
			} else {
				if (data === null) {
					res.send("No Result Found");
				} else {
					res.send(data.result);
				}
			}
		});
	}
});

app.listen(3000);