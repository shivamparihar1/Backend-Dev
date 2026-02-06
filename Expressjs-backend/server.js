const fs = require("fs").promises;
const express = require("express");
const app = express();

app.use(express.json());

const PORT = 8000;

const readStudentsFromFile = async () => {
  const data = await fs.readFile("./students.json", "utf-8");
  return JSON.parse(data || "[]");
};

const writeStudentsToFile = async (records) => {
  await fs.writeFile("./students.json", JSON.stringify(records, null, 2));
};

/* Home route */
app.get("/", (req, res) => {
  res.send("Server is running");
});

/* GET all students */
app.get("/students", async (req, res) => {
  const students = await readStudentsFromFile();
  return res.status(200).json(students);
});

/* POST student */
app.post("/students", async (req, res) => {
  const students = await readStudentsFromFile();

  const newStudent = {
    id: students.length ? students[students.length - 1].id + 1 : 1,
    ...req.body,
  };

  students.push(newStudent);
  await writeStudentsToFile(students);

  return res.status(201).json(newStudent);
});

/* PUT update */
app.put("/students/:id", async (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    const existingStudents = await readStudentsFromFile();
    const foundIndex = existingStudents.findIndex((s) => s.id === userId);

    if (foundIndex === -1) {
      return res.status(404).send("Student not found");
    }

    existingStudents[foundIndex] = {
      ...existingStudents[foundIndex],
      ...req.body,
    };

    await writeStudentsToFile(existingStudents);

    return res.status(200).json(existingStudents[foundIndex]);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

/* DELETE */
app.delete("/students/:id", async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const existingStudents = await readStudentsFromFile();

    const foundIndex = existingStudents.findIndex((s) => s.id === userId);
    if (foundIndex === -1) {
      return res.status(404).send("Student not found");
    }

    const deletedStudent = existingStudents.splice(foundIndex, 1);
    await writeStudentsToFile(existingStudents);

    return res.status(200).json(deletedStudent[0]);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

/* LISTEN MUST BE LAST */
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
