const mongoose = require('mongoose');

async function connectDB() {
  const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/housepainterssurat';
  await mongoose.connect(mongoUri);
}

module.exports = connectDB;
