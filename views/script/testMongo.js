require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB is live!");
    process.exit(0);
  })
  .catch(err => {
    console.error("❌ MongoDB failed:", err);
    process.exit(1);
  });