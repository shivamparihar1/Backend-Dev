const express = require("express");
const app = express();
const fs = require("fs").promises;

app.set("view engine", "ejs");


app.use(express.urlencoded({extended: true}));
const students = [
    {name: "Alice", branch: "CSE"},
    {name: "Bob", branch: "Civil"},
    {name: "Charlie", branch: "Mechanical"}
];


// const readStudentsFromFile = async () => {
//   const data = await fs.readFile("./students.json", "utf-8");
//   return JSON.parse(data || "[]");
// };

// const writeStudentsToFile = async (records) => {
//   await fs.writeFile("./students.json", JSON.stringify(records, null, 2));
// };



app.get("/",(req, res) => {
    // const fileData = await readStudentsFromFile();
    // console.log(fileData);
    res.render("form", { allStudents: students });
});

app.post("/students/register", (req, res) => {
    console.log("form data:", req.body);
    students.push(req.body);
    res.redirect("/");
    
});

app.listen(8000, () => {
    console.log("Server is running on port 8000");
})