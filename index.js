/*
 * Primary file for API
 *
 */

// Dependencies
const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

 // Configure the server to respond to all requests with a string
let server = http.createServer(function(req,res){

  // Parse the url
  let parsedUrl = url.parse(req.url, true);

  // Get the path
  let path = parsedUrl.pathname;
  let trimmedPath = path.replace(/^\/+|\/+$/g, '');

  // Get the query string as an object
  let queryStringObject = parsedUrl.query;

  // Get the HTTP method
  let method = req.method.toLowerCase();

  //Get the headers as an object
  let headers = req.headers;

  // Get The Payload 
  let decoder = new StringDecoder('utf-8');
  let buffer = '';
  req.on('data', function(data){
    buffer += decoder.write(data);
  });
  req.on('end',function(){
    buffer += decoder.end();

    //Choose the request this handler should go to
    let chosenHandler = typeof(router[trimmedPath]) != 'undefined'? router[trimmedPath]: handlers.notFound;

    //construct data object to send to handler
    let data = {
        'trimmedPath': trimmedPath,
        'queryStringObject': queryStringObject,
        'method': method,
        'headers': headers,
        'payload': buffer
    };

    //Route the request to the handler specified in the router
    chosenHandler(data, function(statusCode, payload){
        // Use status code calledback by handler or default to 200 
        statusCode =typeof(statusCode) == 'number'? statusCode: 200;

        // Use payload called back by habdler or default to empty object 
        payload = typeof(payload) == 'object'? payload : {};

        //Convert the payload to a String 
        let payloadString =JSON.stringify(payload);

        //Return the response 
        res.writeHead(statusCode);
        res.end(payloadString);
         // Log the request/response
        console.log('Return this response :',statusCode, payloadString);
    });
 

  });


});

// Start the server
server.listen(3000,function(){
  console.log('The server is up and running now');
});

//Define Handlers
let handlers = {};

//Sample Handler
handlers.sample = function(data, callback){
    // Callback HTTP status code anda payload
    callback(406, {'name': 'sample handler'});

};

// Not found handlers 
handlers.notFound = function(data, callback){
    callback(404);
};

// Define a request router 
let router ={
    'sample': handlers.sample
}