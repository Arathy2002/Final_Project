const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Ensure the correct path

// Add a transaction
router.post('/add-transaction', async (req, res) => {
  try {
    const { userId, transaction } = req.body;
    const user = await User.findById(userId);
    if (user) {
      user.expenses.push(transaction);
      await user.save();
      res.status(200).json({ message: 'Transaction added successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error adding transaction:', error);
    res.status(500).json({ message: 'Error adding transaction' });
  }
});

// Get all transactions for a user
router.get('/transactions/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (user) {
      res.status(200).json(user.expenses);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching transactions', error });
  }
});

module.exports = router;
