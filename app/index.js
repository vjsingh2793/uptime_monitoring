/*
 * Primary file for the API
 *
 */

// Dependencies
var http = require('http');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;
//The server should respond to all the requests with a string
var server = http.createServer(function(req, res) {

    //Get the URL and parse it
    var parsedUrl = url.parse(req.url, true);

    //Get the path
    var path = parsedUrl.pathname;
    var trimmedPath = path.replace(/^\/+|\/+$/g, '');

    // Get the query string as an object
    var queryStringObject = parsedUrl.query;

    //Get the HTTP method
    var method = req.method.toUpperCase();

    // Get the headers
    var headers = req.headers;

    // Get the payload, if any
    var decoder = new StringDecoder('utf-8');
    var buffer = '';
    req.on('data', function(data) {
        buffer += decoder.write(data);
    });
    req.on('end', function() {
        buffer += decoder.end();
            //Send the response
        res.end('Hello World on \n');

        //Log the request/response
        // console.log('Request recieved on this path: ' + trimmedPath+ 'with method ' + method+ ' and with these query parameter ',queryStringObject);

        console.log('Request recieved with these headers: ', JSON.stringify(headers)+'payload: ', buffer);
        //
    });
});

//Start the server, and have it listen on port 3000
server.listen(3000, function() {
    console.log('Server listening on port 3000');
});

// Define handlers
var handlers = {};

//Sample handlers
handlers.sample = function(data, callback){
    //Callback http status code and payload object
    callback(406,{'name': 'sample handler'});

};

//Not found handlers
handlers.notFound = function(data, callback){
    callback(404);  
};

// Defining a request router
var router = {
    'sample' : handlers.sample
};
