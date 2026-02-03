const express = require("express");

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
    const branch = req.query.branch;
    console.log("branch", branch);
    if(!branch){
        return res.json(students);
    }
    const foundStudents = students.filter(s => s.branch === branch);
    res.json(foundStudents);
});


app.get("/students/:id", (req, res) => {
    const id = req.params.id;

    //res.send(`You are requesting for user: ${id}`);
    const  arrayIndex = students.findIndex(s=> s.id == id);

    if(arrayIndex < 0){
        return res.status(404).send("student not found");
    }

    const foundStudent = students[arrayIndex];
    res.json(foundStudent);
    
});
app.post("/students/register", (req, res)=>{
    const data = req.body;
    students.push(data);
    res.json(students);
})



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});