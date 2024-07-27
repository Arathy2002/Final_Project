const express = require("express");
const cors = require("cors");
require("./connection"); // Ensure this file is correctly set up to connect to your MongoDB
const User = require("./model/user"); // Ensure the correct path to the User model
// Assuming there's no separate model for expenses as it's nested within the User schema

// Initializing
const app = express();

app.use(express.json());
app.use(cors());

// Login endpoint
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log(`Received login request for email: ${email}`);

  try {
    const user = await User.findOne({ email: email.trim() });
    if (user) {
      console.log(`User found: ${user.email}`);
      if (user.password === password.trim()) {
        console.log("Login successful");
        return res.json({ status: "success", user: { email: user.email, name: user.name, role: user.role } });
      } else {
        console.log("Incorrect password");
        return res.status(401).json("Password incorrect");
      }
    } else {
      console.log("User not found");
      return res.status(404).json("User not found");
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json("Internal server error");
  }
});

app.post('/add', async (req, res) => {
  try {
    console.log('Request Body:', req.body);  // Log the request body

    // Create a new User instance with the request body
    const newUser = new User(req.body);

    // Save the new user to the database
    await newUser.save();

    res.send("Data Saved");
  } catch (error) {
    console.error("Error saving data:", error);  // Log the error details
    res.status(500).send("Error saving data");
  }
});



// Other endpoints (e.g., for expenses) can remain as they are

app.listen(3002, () => {
  console.log('App is running on port 3002');
});
