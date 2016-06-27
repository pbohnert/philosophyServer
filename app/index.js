// entry point var koa = require('koa');
import Express from 'express';
import Utility from '../modules/utility';

const app = new Express();
const utility = new Utility();

// set up mongoose
var mongoose = require('mongoose');

//Setting a 30 second DB connection timeout
var dbOptions = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } };

//other dependencies
var pathTaken = require("../models/pathTaken.js");
var moment = require("moment");                

//Connect to our database using the DB server URL.
mongoose.connect('mongodb://127.0.0.1/philo', dbOptions);
mongoose.set('debug', true); 

/*
Our one entry point. Change path passed to client to change endpoint
*/
app.get('/search', function(req, res) {
	//utility.client('/posts/1')  // test url
	var data;
    data = utility.findPhilo(req.query.url);
	return res.send(data);
});

app.listen(4000);
console.log('Server is running at http://localhost:4000');

/* app.get('/search', function(req, res) {
	//utility.client('/posts/1')  // test url
	utility.findPhilo(req.query.url)
		.then(data =>  {
		return res.send(data);
	});
});*/