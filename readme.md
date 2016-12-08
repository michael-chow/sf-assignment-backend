# Top 10 YouTube Videos (HK) Database

Running this Node.js server will get the Top 10 Youtube videos in Hong Kong on an hourly basis and store the results in MongoDB. Past results can be accessed through a RESTful API.

## Getting Started

Install all dependencies

```
npm install
```
Run MongoDB

```
mongod
```
In the root directory, create a new file called settings.js, and paste your Google API Key in this format:

```
module.exports = { key: [API-KEY-HERE] };
```
Start server with index.js as entry point

```
npm start
```

## Database Structure

The Video schema has the following fields:

* Time String - identify the time when the record is saved
* Result - an array of YouTube videos, with information including Video ID, Title, Description, Thumbnail, Viewcount

```
{
	'timeString': String,
	'result': [{
		videoId: String,
		title: String,
		description: String,
		thumbnail: String,
		viewCount: Number
	}]
}
```

## RESTful API

To access database records, sends a GET request to /youtube with a query in this format

```
q=yyyymmddhh
```
For example, running the server locally and retriving the record for 7 December 2016 16:00 should look like this

```
http://localhost:3000/youtube?q=2016120716
```
If there is a matching record, it returns in JSON format.