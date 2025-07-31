const fs = require("fs");  // file system
const http = require("http");  // http server
const path = require("path");  // file directories
const url = require("url");  //url

const port = 3000;
const fileDirectory = __dirname;

const server = http.createServer(function(req, res) {
	const reqURL = new URL(`http://localhost:${port}`);
	const fileName = reqURL.pathname.replace("/", "");
	const filePath = path.join(fileDirectory, fileName);

	console.log(reqURL);
	console.log("Working Directory: " + fileDirectory);
	console.log("Current File: " + fileName);
	res.write("This is a response.");

	fs.readdir(fileDirectory, function(error, files) { //reading through directory
		if (error) {
			console.log("Error reading directory");
		}
		console.log("Files in directory: ", files);
	});

	res.end();

});

server.listen(port, function(error) { //port listening
	if (error) {
		console.log("Something went wrong!", error);
	}
	else {
		console.log("Server is listening on port " + port);
	}
});
