import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim:true
    },
    url: {
        type: String,
        required: true,
        unique: true,
        trim:true
    },

    author: {
        type: String,
        required: true,
        trim:true
    },


    metatitle: {
        type: String,
        required: true,
        trim:true
    },

    metadesc: {
        type: String,
        required: true,
        trim:true
    },

    content: {
        type: String,
        required: true
    },
    meta: {
        type: String,
        // required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    
    cardImage: {
        type: String
    },
}, {
    timestamps: true
});

const Blog = mongoose.models.blogs || mongoose.model('blogs', BlogSchema);

export default Blog;

