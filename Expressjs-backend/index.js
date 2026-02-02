const express = require("express");

const app = express();

const PORT = 8000;

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
    const filteredstudents = students.filter(s => s.branch === branch);
    res.json(filteredstudents);
})


app.get("/students/:id", (req, res) => {
    const id = req.params.id;
    //res.send(`You are requesting for user: ${id}`);

    const  arrayIndex = students.findIndex(s=> s.id == id);

    const data = students[arrayIndex];
    res.json(data);
    
});



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});