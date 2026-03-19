const fs = require('fs').promises;

const getAllStudents = async (req, res) => {
    try {
        const fileData = await fs.readFile('./students.json', 'utf-8');
        const students = JSON.parse(fileData || '[]');

        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({
            message: "Error reading students data"
        });
    }
};

const createStudent = async (req, res) => {

    const { name, branch } = req.body;

    if (!name || !branch) {
        return res.status(400).json({
            message: "Name and branch are required"
        });
    }

    const fileData = await fs.readFile('./students.json', 'utf-8');
    const students = JSON.parse(fileData || '[]');

    const newStudent = {
        id: Date.now(),
        name,
        branch
    };

    students.push(newStudent);

    await fs.writeFile('./students.json', JSON.stringify(students, null, 2));

    res.status(201).json({
        message: "Student created successfully",
        student: newStudent
    });
};

module.exports = {
    getAllStudents,
    createStudent
};