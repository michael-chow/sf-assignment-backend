const express = require('express');
const app = express();
const db = require('./db/db');
const fetcher = require('./worker');
const CronJob = require('cron').CronJob;

app.get('/', (req, res) => {
	res.send("Hello");
});

app.listen(3000);