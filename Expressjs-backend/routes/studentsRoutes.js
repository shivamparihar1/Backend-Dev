const express = require('express');
const router = express.Router();
const {getAllStudents, createStudent} = require('../controllers/studentController');
router.get('/', getAllStudents);
router.post('/', createStudent);

// router.get('/:id', getStudent);
 

module.exports = router;