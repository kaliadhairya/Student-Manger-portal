const Student = require('../models/Student');
const emailService = require('../utils/emailService');

// Get all students
exports.getAllStudents = async (req, res) => {
    try {
        const students = await Student.find().populate('createdBy', 'username email');
        res.json(students);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
};

// Create a new student
exports.createStudent = async (req, res) => {
    try {
        const { username, email, contact, course, year } = req.body;

        // Basic validation
        if (!username || !email || !course || !year) {
            return res.status(400).send("Please fill all required fields");
        }

        const newStudent = new Student({
            username,
            email,
            contact,
            course,
            year,
            createdBy: req.user.id // From auth middleware
        });

        const savedStudent = await newStudent.save();

        // Send email notification
        await emailService.sendEmail(
            savedStudent.email,
            'Welcome to Student Portal',
            `<p>Hi ${savedStudent.username},</p><p>You have been successfully added to the Student Portal.</p>`
        );

        res.json(savedStudent);

    } catch (err) {
        console.error(err);
        if (err.code === 11000) {
            return res.status(400).send("Student with this username/email already exists");
        }
        res.status(500).send("Server Error");
    }
};

// Update a student
exports.updateStudent = async (req, res) => {
    try {
        const { username } = req.params;
        const updateData = req.body;

        const updatedStudent = await Student.findOneAndUpdate(
            { username: username.trim() },
            updateData,
            { new: true }
        );

        if (!updatedStudent) {
            return res.status(404).send("Student not found");
        }

        res.json(updatedStudent);

        // Send email notification
        await emailService.sendEmail(
            updatedStudent.email,
            'Profile Updated',
            `<p>Hi ${updatedStudent.username},</p><p>Your student profile has been updated.</p>`
        );

    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
};

// Delete a student
exports.deleteStudent = async (req, res) => {
    try {
        const { username } = req.params;

        const deletedStudent = await Student.findOneAndDelete({ username: username.trim() });

        if (!deletedStudent) {
            return res.status(404).send("Student not found");
        }

        res.send("Student Deleted Successfully");

    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
};
