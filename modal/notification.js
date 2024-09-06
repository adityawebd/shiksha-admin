import mongoose from 'mongoose';

// Table subdocument schema
const tableSchema = new mongoose.Schema({
  tableHeading: String,
  tableRow: [
    {
      id: Number,
      row: [
        {
          id: Number,
          colData: String
        }
      ]
    }
  ],
  tableCol: [
    {
      id: Number,
      col: String
    }
  ],
  tableFooter: String
});

// Notification schema
const notificationSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['normal', 'live'], // Adjust enums based on types you expect
  },
  image: {
    type: String,
  },
  title: {
    type: String,
  },
  message: {
    type: String,
  },
  date: {
    type: Date,
  },
  notificationData: {
    type: String,
  },
  table: {
    type: [tableSchema],
    required: true // Ensure table is always provided
  }
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
});

const Notification = mongoose.models.notifications || mongoose.model('notifications', notificationSchema);

export default Notification;
