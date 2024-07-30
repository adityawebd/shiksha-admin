import mongoose from 'mongoose';
// Define the schema for colleges
const departments = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    college: {
        type: String,
        required: true
    },
    imgSrc: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    fees: {
        type: Number,
        required: true
    },
    view_all_courses_link: {
        type: String,
        default: ''
    }
});

// Define the schema for tabs

// Create the models



export default mongoose.models.department || mongoose.model('department', departments);

