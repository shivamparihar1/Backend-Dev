const express = require("express");
const fs = require("fs"); 

const app = express();

const PORT = 8000;
app.use(express.json());

const students = [
    { id: 1, name: "Alice", branch: "CSE" },
    { id: 2, name: "Bob", branch: "ECE" },
    { id: 3, name: "Charlie", branch: "MECH" },
];

app.get("/", (req, res) => {
    res.send("Welcome to Expressjs Backend!");
});

// app.get("/user", (req, res) => {
//     res.send("<h1>this is users page</h1>");
// });

app.get("/students", (req, res) => {
    res.json(students);
});

app.get("/students/search", (req ,res) => {
    // const branch = req.query.branch;
    // console.log("branch", branch);
    // if(!branch){
    //     return res.json(students);
    // }
    // const foundStudents = students.filter(s => s.branch === branch);
    // res.json(foundStudents);
});


app.get("/students/:id", (req, res) => {
    // const id = req.params.id;

    //res.send(`You are requesting for user: ${id}`);
    // const  arrayIndex = students.findIndex(s=> s.id == id);

    // if(arrayIndex < 0){
    //     return res.status(404).send("student not found");
    // }

    // const foundStudent = students[arrayIndex];
    // res.json(foundStudent);
    
});
app.post("/students/register", (req, res)=>{
    const {name, branch} = req.body;
    if(!name || !branch){
        return res.status(400).send("Invalid student data");
    }

// read the file first
fs.readFile("students.json", "utf-8", (err, data) => {
    if(err){
        return res.status(500).send("could not read students file");
    }
    // parse existing data or start with an empty array
    const students = JSON.parse(data || "[]");
    console.log("<<<<<>>>>>",typeof students);

     const newStudent = {
        id: students.length > 0 ? students[students.length - 1].id + 1 : 1,
        name,
        branch,
     };
    students.push(newStudent);

    //write the whole array back to the file (overwriting)
    fs.writeFile("./students.json", JSON.stringify(students, null, 2), (err) => {
        if(err){
            return res.status(500).send("error writing to students file");
            
        }
        // only send response after successfully writing to the file
        return res.status(201).json({message: "Student registered successfully", student: newStudent });
        res.json(students);
    });
});
});




app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});