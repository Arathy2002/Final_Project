const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  category: { type: String, required: true },
  body: { type: String, required: true },
  amount: { type: Number, required: true }
}, {
  timestamps: true
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  expense:[[expenseSchema]] 
});

module.exports = mongoose.model('User', userSchema);