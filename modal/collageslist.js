import mongoose from 'mongoose';

const CollegeSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  universitytype: {
    type: String,
    required: true
  },
  Estd: {
    type: String,
    required: true
  },
  collageIcon: {
    type: Array,
    required: true
  },
  rating: {
    type: String,
    required: true
  },
  shortAddress: {
    type: String,
    required: true
  },
  shortDiscription: {
    type: String,
    required: true
  },
},{
    timestamps: true,
  
});

export default mongoose.models.College || mongoose.model('College', CollegeSchema);
