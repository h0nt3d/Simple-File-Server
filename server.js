fs = require("fs");  // file system
http = require("http");  // http server
path = require("path");  // file directories

const port = 3000;

const server = http.createServer(function(req, res) {
	
});

server.listen(port, function(error) {
	if (error) {
		console.log('Something went wrong!', error);
	}
	else {
		console.log('Server is listening on port ' + port);
	}
});
