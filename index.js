const express = require('express');
const cors = require('cors');
require('./connection'); // Ensure this file is correctly set up to connect to your MongoDB
const User = require('./models/User'); // Ensure the correct path to the User model
const Admin = require('./models/Admin'); // Ensure the correct path to the Admin model

// Initialize Express app
const app = express();

app.use(express.json());
app.use(cors());

// Login endpoint
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Received login request for email:',email);

  try {
    const user = await User.findOne({ email: email.trim() });
    if (user) {
      if (user.password === password.trim()) {
        return res.json({ status: 'success', user: { email: user.email, name: user.name, role: user.role, id: user._id } });
      } else {
        return res.status(401).json({ status: 'error', message: 'Password incorrect' });
      }
    } else {
      return res.status(404).json({ status: 'error', message: 'User not found' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});

// Admin login route

app.post('/loginadmin', async (req, res) => {
  const { email, password } = req.body;
  console.log('Received admin login request for email:', email);


  try {
    const admin = await Admin.findOne({ email: email.trim() });
    
    if (admin) {
      if (admin.password === password.trim()) {
        console.log('sucess')
        return res.json({ status: 'success', user: { email: admin.email, name: admin.name, id: admin._id } });
      
      } else {
       
        return res.status(401).json({ status: 'error', message: 'Password incorrect' });
      }
    } else {
     
      return res.status(404).json({ status: 'error', message: 'Admin not found' });
    }
  } catch (error) {
    console.error('Error during admin login:', error);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});

// Add a new user
app.post('/add', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.send("Data Saved");
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).send("Error saving data");
  }
});

// Delete a transaction
app.get('/delete-expense', async (req, res) => {
  const { transactionId, userId } = req.query;

  try {
    const user = await User.findById(userId);
    if (user) {
      user.expenses = user.expenses.filter(expense => expense._id.toString() !== transactionId);
      await user.save();
      res.status(200).json({ status: 'success', message: 'Transaction deleted' });
    } else {
      res.status(404).json({ status: 'error', message: 'User not found' });
    }
  } catch (error) {
    console.error('Error deleting transaction:', error);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});

// Update an expense
app.post('/update-expense', async (req, res) => {
  const { userId, transactionId, category, description, amount, date } = req.body;

  try {
    const user = await User.findById(userId);
    if (user) {
      user.expenses = user.expenses.map(expense =>
        expense._id.toString() === transactionId
          ? { ...expense, category, description, amount: Number(amount), date: new Date(date) }
          : expense
      );
      await user.save();
      res.status(200).json({ status: 'success', message: 'Transaction updated' });
    } else {
      res.status(404).json({ status: 'error', message: 'User not found' });
    }
  } catch (error) {
    console.error('Error updating transaction:', error);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});

// Add an expense
app.post('/addexpense', async (req, res) => {
  const { email, category, description, amount, date } = req.body;

  if (!email || !category || !description || !amount || !date) {
    return res.status(400).json({ status: 'error', message: 'Missing required fields' });
  }

  try {
    const user = await User.findOne({ email: email.trim() });
    if (user) {
      const newExpense = { category, description, amount: Number(amount), date: new Date(date) };
      user.expenses.push(newExpense);
      await user.save();
      res.status(201).json({ status: 'success', user });
    } else {
      res.status(404).json({ status: 'error', message: 'User not found' });
    }
  } catch (error) {
    console.error('Error adding expense:', error);
    res.status(500).json({ status: 'error', message: 'Error adding expense' });
  }
});

// Get all expenses for a user
app.get('/expenses', async (req, res) => {
  const { userId } = req.query;

  try {
    const user = await User.findById(userId);
    if (user) {
      res.status(200).json({ status: 'success', expenses: user.expenses });
    } else {
      res.status(404).json({ status: 'error', message: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching expenses:', error);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});

// Get admin ID
app.get('/adminid', async (req, res) => {
  const { email } = req.query;

  try {
    const admin = await Admin.findOne({ email: email.trim() });
    if (admin) {
      res.status(200).json({ status: 'success', userId: admin._id });
    } else {
      res.status(404).json({ status: 'error', message: 'Admin not found' });
    }
  } catch (error) {
    console.error('Error fetching admin ID:', error);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});

// Get all users
app.get('/userview', async (req, res) => {
  try {
    const users = await User.find();
    const userData = users.map(user => ({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      transactionCount: user.expenses.length,
    }));
    res.json(userData);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ status: 'error', message: 'Error fetching user data' });
  }
});

// Delete a user (if necessary)
app.delete('/remove/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.send('Deleted');
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).send('Error deleting user');
  }
});
app.get('/adminview', async (req, res) => {
  try {
    const users = await Admin.find();
    const userData = users.map(user => ({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      transactionCount: user.expenses.length,
    }));
    res.json(userData);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ status: 'error', message: 'Error fetching user data' });
  }
});

// Start the server
const PORT = 3002;
app.listen(PORT, () => {
  console.log(`App is running on port`);
});