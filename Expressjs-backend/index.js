const express = require("express");
const fs = require("fs").promises;

const app = express();
app.use(express.json());

const PORT = 8000;


/* ---------------- Helper Functions ---------------- */

const readStudentsFromFile = async () => {
  const data = await fs.readFile("./Students.json", "utf-8");
  return JSON.parse(data || "[]");
};

const writeStudentsToFile = async (records) => {
  await fs.writeFile("./Students.json", JSON.stringify(records, null, 2));
};

/* ---------------- Routes ---------------- */

// Home
app.get("/", (req, res) => {
  res.send("<h1>Welcome to Home Page</h1>");
});

// Get All Students
app.get("/students", async (req, res) => {
  const students = await readStudentsFromFile();
  res.status(200).json(students);
});


// Get Student by ID
app.get("/students/:id", async (req, res) => {
  const userId = parseInt(req.params.id);
  const students = await readStudentsFromFile();

  const student = students.find((s) => s.id === userId);
  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  res.json(student);
});

// Add New Student
app.post("/students/register", async (req, res) => {
  const { name, branch } = req.body;

  if (!name || !branch) {
    return res.status(400).json({ message: "Name and branch required" });
  }

  const students = await readStudentsFromFile();

  const newStudent = {
    id: students.length ? students[students.length - 1].id + 1 : 1,
    name,
    branch,
  };

  students.push(newStudent);
  await writeStudentsToFile(students);

  res.status(201).json({
    message: "Student registered successfully",
    student: newStudent,
  });
});

// Update Student
app.put("/students/:id", async (req, res) => {
  const userId = parseInt(req.params.id);
  const students = await readStudentsFromFile();

  const foundIndex = students.findIndex((s) => s.id === userId);
  if (foundIndex === -1) {
    return res.status(404).json({ message: "Student not found" });
  }

  students[foundIndex] = {
    ...students[foundIndex],
    ...req.body,
  };

  await writeStudentsToFile(students);

  res.json({
    message: "Student updated successfully",
    student: students[foundIndex],
  });
});

// Delete Student
app.delete("/students/:id", async (req, res) => {
  const userId = parseInt(req.params.id);
  const students = await readStudentsFromFile();

  const foundIndex = students.findIndex((s) => s.id === userId);
  if (foundIndex === -1) {
    return res.status(404).json({ message: "Student not found" });
  }

  const deletedStudent = students.splice(foundIndex, 1);
  await writeStudentsToFile(students);

  res.json({ 
    message: "Student deleted successfully",
    student: deletedStudent[0],
  });
});

/* ---------------- Start Server ---------------- */

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});