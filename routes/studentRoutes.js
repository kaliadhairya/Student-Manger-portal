const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const protect = require('../middleware/authMiddleware');

// All routes are protected
router.get('/', protect, studentController.getAllStudents);
router.post('/', protect, studentController.createStudent);
router.put('/:username', protect, studentController.updateStudent);
router.delete('/:username', protect, studentController.deleteStudent);

module.exports = router;
