import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    message: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
}, {
    timestamps: true
});

const Contacts = mongoose.models.contacts || mongoose.model('contacts', ContactSchema);

export default Contacts;

