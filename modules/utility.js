'use strict'

//dependencies
import Request from 'request'
import rp from 'request-promise'
//var pathTaken = require("../models/pathTaken.js");
var moment = require("moment");

const testurl = `http://jsonplaceholder.typicode.com`;
const origurl = `https://en.wikipedia.org/w/api.php?action=query&titles=Theoretical physics&prop=revisions&rvprop=content&format=json`;
const url = "https://en.wikipedia.org/w/api.php?action=query";
const urlOptions = "prop=revisions&rvprop=content&format=json";
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
		    	//options.uri = url + path;
		    	console.log("about to construct url");
		    	options.uri = url + "&titles=" + path + "&" + urlOptions;
		    	options.method = 'GET';
		    	console.log("url is " + path + "and full wikipedia URL is " + options.uri);

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
		saveToDB(completePath, philoFound) {
			var todayDate = moment().startOf('second');
			 var newPath = new pathTaken(
                                        {  
                                             'uniqueRequestID': todayDate,
                                             'entirePath': completePath,
                                             'philosophyFound': philoFound,
                                             'creation_date' :  todayDate
                                         });  

                                    newPath.save(function (err, result) {
                                    if (err) {
                                                log.error(JSON.stringify(err)); 
                                                return;
                                            }
                                        else {
                                        	console.log("saved path taken");
                                        	return;
                                                  }
                                       }); // end of save new pathTaken
		} // end of saveToDB

}



