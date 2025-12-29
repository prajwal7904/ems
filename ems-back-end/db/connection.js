require('dotenv').config();
const mongoose = require('mongoose');

const connectionString = process.env.DATABASE;

mongoose.connect(connectionString, {
  useUnifiedTopology: true,
  useNewUrlParser: true
})
.then(() => {
  console.log("MongoDB connected successfully");
})
.catch((error) => {
  console.error("MongoDB connection error:", error);
});
