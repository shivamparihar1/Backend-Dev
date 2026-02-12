const express = require('express');
const app = express();
const PORT = 5000;
const fs = require('fs');

//TO SERVE STATIC FILES (JS, CSS, IMAGES)
app.use(express.static('public'));

//TO PARSE JSON AND URL-ENCODED DATA
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//HOME ROUTE
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/form.html');
    //res.send("hello");
});

app.post('/students/register', (req, res) => {
    console.log("form data:", req.body);
    // res.send("Student registered successfully");
    fs.readFile('students.json', 'utf-8', (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
            return res.status(500).send("Internal Server Error");
        }   
        const students = JSON.parse(data || '[]');
        students.push(req.body);
        fs.writeFile('students.json', JSON.stringify(students, null, 2), (err) => {
            if (err) {
                console.error("Error writing file:", err);
                return res.status(500).send("Internal Server Error");
            }
            res.send("Student registered successfully");
        });
}); 
    
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});