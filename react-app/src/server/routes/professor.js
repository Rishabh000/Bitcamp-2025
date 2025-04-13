const express = require('express');
const router = express.Router();
const { Professor, Student } = require('../models');

// Get professor portal data
router.get('/portal', async (req, res) => {
    try {
        // Get the professor's data
        const professor = await Professor.findOne({ userId: req.user.id })
            .populate({
                path: 'students',
                populate: {
                    path: 'researchInterests'
                }
            })
            .populate('researchInterests');

        if (!professor) {
            return res.status(404).json({ message: 'Professor not found' });
        }

        // Get all students who have expressed interest in this professor's research areas
        const students = await Student.find({
            researchInterests: { 
                $in: professor.researchInterests.map(ri => ri._id) 
            },
            desiredProfessors: professor._id
        }).populate('researchInterests');

        res.json({
            professor: {
                id: professor._id,
                name: professor.name,
                department: professor.department,
                researchInterests: professor.researchInterests,
                currentStudents: professor.students,
            },
            students: students.map(student => ({
                id: student._id,
                name: student.name,
                email: student.email,
                department: student.department,
                researchInterests: student.researchInterests,
                desiredRole: student.desiredRole,
                status: student.status,
            })),
        });
    } catch (error) {
        console.error('Error fetching professor portal data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router; 