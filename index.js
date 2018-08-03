const http = require('http');
const url = require('url');

const server = http.createServer(function(req, res){

    // Get URL and parse it 
    let parsedUrl = url.parse(req.url, true);

    // Get the Path
    let path = parsedUrl.pathname;
    let trimmedPath = path.replace(/^\/+|\?+$/g,'');
    
    //Get the Http request 
    var method = req.method.toLowerCase();

    // Send the response
    res.end('Hello Worlds \n');

    //Log the request
    console.log('request received on path ' + trimmedPath + 'with this method :' +method);


    
});

server.listen(3000,function(){
    console.log('Listening on port 3000');
});