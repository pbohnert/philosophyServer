'use strict'

//dependencies
import Request from 'request'
import rp from 'request-promise'

import pathTaken from '../models/pathTaken.js'
import moment from 'moment'

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
	//findPhilo is our exported function to drive the search for Philosophy
    findPhilo(path) {
    	var jsonPage;
    	var hopCount = 0;
    	var hopLimit = 5;
    	var completePath = "Path Taken\n\n";
    	var searchTerm = path;
    	var philosophyFound = false;
    	var title = "";
    	var nextTerm = "";
    	var i = 1;

    	while (hopLimit > 0) {
    		hopCount++;
    		console.log("looping at hopcount: " + hopCount);
    		jsonPage = client(searchTerm);
    	    //console.log(jsonPage);
    	    // parse JSON to get title, next searchTerm
    	    // temp code
    	    nextTerm = "Richard term" + i++;
    	    title = "Richard Page" + i;
    	    completePath = completePath + "Title: " + title + "\n";
    	    if (title == "Philosophy") {
    	    	philosophyFound = true;
    	    	break;
    	    } else if (nextTerm = ""){
    	    	philosophyFound = false;
    	    	break;
    	    } else {
    	    	searchTerm = nextTerm;
    	    	hopLimit--;
    	    }
    	} // end of while loop

    	saveToDB(completePath, philosophyFound);
    	var ourJSON = {
                        "philosophyFound" : philosophyFound, 
                        "completePath" :  completePath,
                        "hopCount" : hopCount 
                                  };
        return(ourJSON);
    } // end of class member findPhilo
}

function client(path) {
	    return new Promise(
	      function (resolve, reject) {
		    	options.uri = url + "&titles=" + path + "&" + urlOptions;
		    	options.method = 'GET';
		    	//console.log("url is " + path + "and full wikipedia URL is " + options.uri);

				rp(options)
				    .then(function (response) {
				        resolve(response);
				    })
				    .catch(function (err) {
				       console.log(err); 
				       reject(err)
				    });
	      });
		} // end of client function

function saveToDB(completePath, philoFound) {
			var todayDate = moment().startOf('second');
			console.log("in saveToDB");
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
	} // end of saveToDB function



