const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./db/db');
const fetcher = require('./fetcher');
const CronJob = require('cron').CronJob;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cronjob invoking the fetcher function per hour at :00
const hourlyFetcher = new CronJob({
  cronTime: '00 00 * * * *',
  onTick: fetcher.retrieve,
  start: false,
});
hourlyFetcher.start();

// API for getting video information, query in format of "q=yyyymmddhh"
app.get('/youtube', (req, res) => {
	let query = req.query.q.toString();
	if (query === undefined) {
		res.send('Please provide a query string')
	} else if (query.length !== 10) {
		res.status(500).send('Wrong query format')
	} else {
		db.Video.findOne({timeString: query}, (err, data) => {
			if (err) {
				res.status(500).send(err)
			} else {
				if (data === null) {
					res.send('No Result Found');
				} else {
					res.json(data);
				}
			}
		});
	}
});

app.get('/*', (req, res) => {
	res.send('Hello! Please use "/youtube" for query.');
});

app.listen(3000);