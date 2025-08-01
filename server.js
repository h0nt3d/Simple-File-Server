const fs = require("fs");
const http = require("http");
const path = require("path");
const formidable = require("formidable");


const port = 3000;
const fileDirectory = path.join(__dirname, "files");
console.log(new URL(`http://localhost:${port}`));

const server = http.createServer(function(req, res) {
	if (req.url == "/" && req.method == "GET") {
		fs.readFile(path.join(__dirname, "index.html"),"utf-8", function(error, data) {
			if (error) {
				console.log("Error loading index.html");
			}
			res.writeHead(200, {"Content-Type": "text/html"});
			res.end(data);
		});	
	}
	else if (req.url == "/files" && req.method == "GET") {
		fs.readdir(fileDirectory, function(error, files) {
			if (error) {
				console.log("Error reading directory");
			}

			res.writeHead(200, {"Content-Type": "application/json"});
			res.end(JSON.stringify(files));
		});
	}
	else if (req.url.startsWith("/files/") && req.method == "GET") {
		const fileName = req.url.split("/files/")[1];
		const filePath = path.join(fileDirectory, fileName);

		fs.exists(filePath, function(exist){
			if (exist) {
				res.writeHead(200, {"Content-Disposition": `attachment; filename:"${fileName}" `});
				fs.createReadStream(filePath).pipe(res);
			}
			else {
				console.log("Error, file not found");
			}
		});
	}
	else if (req.url == "/upload" && req.method == "POST") {
		const form = new formidable.IncomingForm({multiples: false});
		form.uploadDir = fileDirectory;
		form.keepExtensions = true;

		form.parse(req, function(err, fields, files) {
			if (err) {
			console.log("Upload Error");
			}

			console.log("Files received: ", fields);
			console.log("Files receivedL ", files);

			const uploadedFile = files.file[0];
			if (!uploadedFile) {
				res.writeHead(400);
				return res.end("No file uploaded");
			}

			const oldPath = uploadedFile.filepath;
			const newPath = path.join(fileDirectory, uploadedFile.originalFilename || "uploaded_file");

			fs.rename(oldPath, newPath, function(err){
				if (err) {
					console.log("File upload failed");		
				}
				res.writeHead(200);
				res.end("File uploaded succesfully");
			});


		});
	}
});

server.listen(port, function(error) {
	if (error) {
		console.log("Something went wrong!", error);
	}
	else {
		console.log("Server is listening on port " + port);
	}
});
