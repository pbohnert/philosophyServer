// entry point var koa = require('koa');
import Express from 'express';
import Utility from '../modules/utility';

const app = new Express();
const utility = new Utility();

/*
Only entry point. Change path passed to client to change endpoint
*/
app.get('/search', function(req, res) {
	utility.client('/posts/1')
		.then(data =>  {
		return res.send(data);
	});
});

app.listen(4000);
console.log('Server is running at http://localhost:4000');