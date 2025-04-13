const express = require('express');
const router = express.Router();
const { User } = require('../models');

// Get student profile
router.get('/profile', async (req, res) => {
    try {
        const student = await User.findById(req.user._id);
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        res.json({
            id: student._id,
            name: student.name,
            email: student.email,
            major: student.major,
            educationLevel: student.educationLevel,
            desiredRole: student.desiredRole,
            researchInterests: student.researchInterests,
            skills: student.skills,
            resumeUploaded: student.resumeUploaded
        });
    } catch (error) {
        console.error('Error fetching student profile:', error);
        res.status(500).json({ error: 'Failed to fetch student profile' });
    }
});

// Update student profile
router.put('/profile', async (req, res) => {
    try {
        const { major, educationLevel, desiredRole, researchInterests, skills } = req.body;
        
        const student = await User.findByIdAndUpdate(
            req.user._id,
            {
                major,
                educationLevel,
                desiredRole,
                researchInterests,
                skills
            },
            { new: true }
        );

        res.json({
            message: 'Profile updated successfully',
            student: {
                id: student._id,
                name: student.name,
                email: student.email,
                major: student.major,
                educationLevel: student.educationLevel,
                desiredRole: student.desiredRole,
                researchInterests: student.researchInterests,
                skills: student.skills
            }
        });
    } catch (error) {
        console.error('Error updating student profile:', error);
        res.status(500).json({ error: 'Failed to update student profile' });
    }
});

// Get available professors
router.get('/professors', async (req, res) => {
    try {
        const professors = await User.find({ role: 'professor' })
            .select('name department researchInterests positionsAvailable');

        res.json(professors);
    } catch (error) {
        console.error('Error fetching professors:', error);
        res.status(500).json({ error: 'Failed to fetch professors' });
    }
});

module.exports = router; 