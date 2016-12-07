const express = require('express');
const app = express();
const db = require('./db/db');
const fetcher = require('./worker');
const CronJob = require('cron').CronJob;

const dailyFetcher = new CronJob({
  cronTime: '00 00 * * * *',
  onTick: fetcher.retrieve,
  start: false,
});
dailyFetcher.start();

app.get('/', (req, res) => {
	res.send("Hello");
});

app.listen(3000);