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

  // Send the response
  res.end('Hello World!\n');

  // Log the request/response
  console.log('Request received with this payload: ',buffer);

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
    
};

// Define a request router 
let router ={
    'sample': handlers.sample
}