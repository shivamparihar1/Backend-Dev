const express = require("express");
const app = express();
const fs = require("fs").promises;

app.set("view engine", "ejs");
app.use(express.urlencoded({extended:true}));


const readStudentsFromFile = async () => {
  const data = await fs.readFile("./students.json", "utf-8");
  return JSON.parse(data || "[]");
};

const writeStudentsToFile = async (records) => {
  await fs.writeFile("./students.json", JSON.stringify(records, null, 2));
};


app.get("/", async (req,res)=>{
  let students = await readStudentsFromFile();

  const branchFilter = req.query.branch;
  if(branchFilter){
    students = students.filter(s => s.branch === branchFilter);
  }

  res.render("form", {
    allStudents: students,
    total: students.length
  });
});


app.post("/students/register", async (req,res)=>{
  const students = await readStudentsFromFile();

  const newStudent = {
    id: Date.now(),
    name: req.body.name,
    branch: req.body.branch
  };

  students.push(newStudent);
  await writeStudentsToFile(students);

  res.redirect("/");
});


app.get("/students/delete/:id", async (req,res)=>{
  const students = await readStudentsFromFile();
  const id = Number(req.params.id);

  const updated = students.filter(s => s.id !== id);
  await writeStudentsToFile(updated);

  res.redirect("/");
});

app.listen(3000, ()=>{
  console.log("Server running on http://localhost:3000");
});
