import express from 'express';
import Leave from '../models/Leave.js';

const router = express.Router();

// Create leave request
router.post('/', async (req, res) => {
  try {
    const { fromDate, toDate, leaveType, reason, employeeName } = req.body;

    if (!fromDate || !toDate || !reason || !employeeName) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const leave = await Leave.create({
      fromDate,
      toDate,
      leaveType,
      reason,
      employeeName,
      status: 'Pending',
    });

    res.status(201).json(leave);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all leaves (admin)
router.get('/', async (req, res) => {
  try {
    const leaves = await Leave.find().sort({ createdAt: -1 });
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get leaves by employee name
router.get('/employee/:name', async (req, res) => {
  try {
    const leaves = await Leave.find({ employeeName: req.params.name }).sort({ createdAt: -1 });
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update leave status (approve/reject)
router.put('/:id', async (req, res) => {
  try {
    const leave = await Leave.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(leave);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
