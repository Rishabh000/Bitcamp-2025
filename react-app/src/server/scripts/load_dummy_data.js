const mongoose = require('mongoose');
const { Professor, Student, ResearchInterest } = require('../models');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/academic-assist', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Sample research interests
const researchInterests = [
    { name: 'Machine Learning', description: 'Study of algorithms that improve through experience' },
    { name: 'Computer Vision', description: 'AI field that enables computers to derive information from images' },
    { name: 'Natural Language Processing', description: 'Processing and analyzing natural language data' },
    { name: 'Robotics', description: 'Design and development of robots' },
    { name: 'Cybersecurity', description: 'Protection of computer systems and networks' }
];

// Sample professors
const professors = [
    {
        userId: 'prof1',
        name: 'Dr. John Smith',
        email: 'john.smith@university.edu',
        department: 'Computer Science',
        researchInterests: [0, 1] // indices of research interests
    },
    {
        userId: 'prof2',
        name: 'Dr. Sarah Johnson',
        email: 'sarah.johnson@university.edu',
        department: 'Computer Science',
        researchInterests: [2, 3]
    }
];

// Sample students
const students = [
    {
        userId: 'student1',
        name: 'Alice Brown',
        email: 'alice.brown@university.edu',
        department: 'Computer Science',
        researchInterests: [0, 2],
        desiredRole: 'Research Assistant',
        status: 'SEARCHING'
    },
    {
        userId: 'student2',
        name: 'Bob Wilson',
        email: 'bob.wilson@university.edu',
        department: 'Computer Science',
        researchInterests: [1, 3],
        desiredRole: 'Research Assistant',
        status: 'SEARCHING'
    }
];

async function loadDummyData() {
    try {
        // Clear existing data
        await Promise.all([
            Professor.deleteMany({}),
            Student.deleteMany({}),
            ResearchInterest.deleteMany({})
        ]);

        // Insert research interests
        const savedInterests = await ResearchInterest.insertMany(researchInterests);

        // Insert professors with research interests
        const savedProfessors = await Promise.all(
            professors.map(async prof => {
                const profInterests = prof.researchInterests.map(idx => savedInterests[idx]._id);
                return await Professor.create({
                    ...prof,
                    researchInterests: profInterests
                });
            })
        );

        // Insert students with research interests and desired professors
        await Promise.all(
            students.map(async (student, idx) => {
                const studentInterests = student.researchInterests.map(idx => savedInterests[idx]._id);
                const desiredProf = savedProfessors[idx % savedProfessors.length]._id;
                
                return await Student.create({
                    ...student,
                    researchInterests: studentInterests,
                    desiredProfessors: [desiredProf]
                });
            })
        );

        console.log('Dummy data loaded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error loading dummy data:', error);
        process.exit(1);
    }
}

loadDummyData(); 