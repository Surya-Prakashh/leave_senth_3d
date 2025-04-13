import mongoose from 'mongoose';

const leaveSchema = new mongoose.Schema({
  fromDate: {
    type: String,
    required: true,
  },
  toDate: {
    type: String,
    required: true,
  },
  leaveType: {
    type: String,
    default: 'Casual',
  },
  reason: {
    type: String,
    required: true,
  },
  employeeName: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending',
  },
}, { timestamps: true });

const Leave = mongoose.model('Leave', leaveSchema);

export default Leave;
