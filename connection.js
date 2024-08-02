const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://ArathyBabu:Arathybabu@cluster0.twc9uen.mongodb.net/CreateAccount?retryWrites=true&w=majority&appName=Cluster0")
.then(() => {
  console.log("Connected to MongoDB Atlas");
})
.catch((error) => {
  console.error("Error connecting to MongoDB Atlas:", error);
});
