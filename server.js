// server.js

const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db = require('./config/db');

const app = express();
app.use(bodyParser.urlencoded({extended: true }));

const port = 5000;
//const port = 5858;

MongoClient.connect(db.url, (err, database) =>
{
	if (err)
	{
		return console.log(err);
	}

	require('./app/routes')(app, database);

	app.listen(port, () =>
	{
		console.log("We are live and running on port: " + port);

	});

});

/*
require('./app/routes')(app, {});

app.listen(port, () => 
{
	console.log('We are live on port: ' + port);

});
*/