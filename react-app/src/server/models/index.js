const mongoose = require('mongoose');
const User = require('./User');

const researchInterestSchema = new mongoose.Schema({
    name: String,
    description: String
});

const studentSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    department: { type: String, required: true },
    researchInterests: [researchInterestSchema],
    desiredRole: String,
    status: {
        type: String,
        enum: ['SEARCHING', 'MATCHED', 'INACTIVE'],
        default: 'SEARCHING'
    },
    desiredProfessors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Professor' }]
});

const professorSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    department: { type: String, required: true },
    researchInterests: [researchInterestSchema],
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }]
});

const Professor = mongoose.model('Professor', professorSchema);
const Student = mongoose.model('Student', studentSchema);
const ResearchInterest = mongoose.model('ResearchInterest', researchInterestSchema);

module.exports = {
    Professor,
    Student,
    ResearchInterest,
    User
}; 