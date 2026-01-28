const fs = require("fs");
const path = require("path");
const {Transform} = require("stream");
const inputFilepath = path.join(__dirname,"input.txt");
const transformOutputFilepath = path.join(__dirname, "transferOutput.txt");
const readStream = fs.createReadStream(inputFilepath);
const writeStream = fs.createWriteStream(transformOutputFilepath);

const upperCasetransform = new  Transform({
    transform(chunk, encoding, callback){
        const tranformedData = chunk.toString().toUpperCase();

        this.push(tranformedData)
        callback(null,chunk.toString().toUpperCase())
    }
});
readStream.pipe(upperCasetransform).pipe(writeStream);