import mongoose from 'mongoose';

// Define the schema for college highlights
const collegeHighlightSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  particular: { type: String, required: true },
  highlights: { type: String, required: true }
});

// Define the schema for major updates
const majorUpdateSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  list_item: { type: String, required: true }
});

// Define the schema for notifications
const notificationSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  date: { type: String, required: true },
  link: { type: String, default: "" },
  title: { type: String, required: true }
});

// Define the schema for author paragraphs
const authorParaSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  para: { type: String, required: true }
});

// Define the schema for information
const infoSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  page_title: { type: String, required: true },
  college: { type: String, required: true },
  para_1: { type: String, required: true },
  major_updates: [majorUpdateSchema],
  notifications: [notificationSchema],
  authorImgSrc: { type: String, default: "" },
  author_name: { type: String, required: true },
  author_para: [authorParaSchema],
  h5: { type: String, required: true },
  h5_para: { type: String, required: true },
  collegeHighlights: [collegeHighlightSchema] // Add this line
});

// Export the model
export default mongoose.models.information || mongoose.model('information', infoSchema);
