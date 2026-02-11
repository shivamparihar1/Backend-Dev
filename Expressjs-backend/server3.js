const express = require("express");
const app = express();
const fs = require("fs").promises;

app.set("view engine", "ejs");


app.use(express.urlencoded({extended: true}));


// const readStudentsFromFile = async () => {
//   const data = await fs.readFile("./students.json", "utf-8");
//   return JSON.parse(data || "[]");
// };

// const writeStudentsToFile = async (records) => {
//   await fs.writeFile("./students.json", JSON.stringify(records, null, 2));
// };



app.get("/",async (req, res) => {
    // const fileData = await readStudentsFromFile();
    // console.log(fileData);
    res.render("form");
});

app.post("/students/register", async (req, res) => {
    console.log(req.body);
    return res.send("Student registered successfully");
});

app.listen(8000, () => {
    console.log("Server is running on port 8000");
})