const fs = require("fs").promises;
const express = require("express");
const app = express();

app.set("view engine","ejs");

app.use(express.urlencoded({extended:true}));

const readStudentsFromFile = async () => {
  const data = await fs.readFile("./students.json", "utf-8");
  console.log(data)
  return JSON.parse(data || "[]");
};

const writeStudentsToFile = async (records) => {
  await fs.writeFile("./students.json", JSON.stringify(records, null, 2));
};

app.get("/", async(req, res) => {
    const filedata= await readStudentsFromFile();
    console.log(filedata);
    res.render("form",{allStudents:filedata});
}) 

app.post("/Students/register", async (req, res)=>{
    const {name, branch} = req.body;
    if(!name || !branch){
        return res.status(400).send("Invalid student data");
    }
    console.log(name)

    try {
        const students = await readStudentsFromFile();
        console.log(students)
        const newStudent = {
            id: students.length > 0 ? students[students.length - 1].id + 1 : 1,
            name,
            branch,
        };
        students.push(newStudent);

        await writeStudentsToFile(students);
        // only send response after successfully writing to the file
        res.status(201).json({message: "Student registered successfully", student: newStudent });
    } catch (err) {
        res.status(500).send("Error processing request");
    }
});




const PORT= 3000;
app.listen(PORT, () => {
  console.log("Server is listening on port:3000");
});