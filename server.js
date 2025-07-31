const fs = require("fs");
const http = require("http");
const path = require("path");

const port = 3000;
const fileDirectory = __dirname;

const server = http.createServer(function(req, res) {
	console.log("Working Directory: " + fileDirectory);
	res.write("This is a response.");

	fs.readdir(fileDirectory, function(error, files) {
		if (error) {
			console.log("Error reading directory");
		}
		console.log("Files in directory: ", files);
	});

	res.end();

});

server.listen(port, function(error) {
	if (error) {
		console.log("Something went wrong!", error);
	}
	else {
		console.log("Server is listening on port " + port);
	}
});
