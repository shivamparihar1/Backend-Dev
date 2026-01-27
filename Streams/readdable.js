const fs = require("fs");
const path = require("path");
const inputFilepath = path.join(__dirname,"input.txt");
const readStream = fs.createReadStream(inputFilepath);

 readStream.on("data", (chunk) => {
    console.log("Data is recieved in chunk:", chunk.toString()); 
      
    });
readStream.on("end", () => {
        console.log("no more data to read");
    });
readStream.on("error", (err) => {
            console.log("Error occured while reading the file", err);
    }); 