'use strict'

import Request from 'request'
import rp from 'request-promise'

const url = `http://jsonplaceholder.typicode.com`;
const options = {
  headers: {
      'User-Agent': 'Request-Promise'
  },
  json: true
}

export default class Utility { 
		client(path) {
	    return new Promise(
	      function (resolve, reject) {
		    	options.uri = url + path;
		    	options.method = 'GET';

					rp(options)
				    .then(function (response) {
				        resolve(response);
				    })
				    .catch(function (err) {
				       console.log(err); 
				       reject(err)
				    });
	      });
		}

}



