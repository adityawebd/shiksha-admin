const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the schema for important events
const importantEventSchema = new Schema({
  event_name: String,
  event_tag: String,
  event_date: Date,
});

// Define the schema for expired events
const expiredEventSchema = new Schema({
  event_name: String,
  event_date: Date,
});

// Define the schema for cutoff data
const cutoffDataSchema = new Schema({
  title: String,
  para: String,
  cutOffDataTable: [
    {
      courses: String,
      cutoff_year1: String,
      cutoff_year2: String,
      cutoff_year3: String,
      cutoff_year4: String,
    }
  ],
  exam_name: String,
  year: String,
});

// Define the main schema
const mainSchema = new Schema({
  
  name: String,
  className: String,
  h5_1: String,
  importantEventsTableData: [importantEventSchema],
  h5_2: String,
  expiredEventsTableData: [expiredEventSchema],
  cutOffData: [cutoffDataSchema],
  college: String,
});

// Create the model from the schema


export default mongoose.models.inneradmissiondata || mongoose.model('inneradmissiondata', mainSchema);