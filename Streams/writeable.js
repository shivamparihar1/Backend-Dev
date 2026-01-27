const fs = require("fs");
const path = require("path");
const inputFilepath = path.join(__dirname,"input.txt");
const outputFilepath = path.join(__dirname, "output.txt");
const readStream = fs.createReadStream(inputFilepath);
const writeStream = fs.createWriteStream(outputFilepath);

readStream.pipe(writeStream);

writeStream.on("finish", () => {
    console.log("Data has been written to output.txt successfully.");
});

writeStream.on("error", (err) => {
    console.error("Error occurred while writing to the file:", err);
});         