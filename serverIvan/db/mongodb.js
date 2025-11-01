const mongoose = require('mongoose');
require('dotenv').config();

let db = null;

const connectDB = async () => {
  if (db) return db;
  
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    db = mongoose.connection.db;
    console.log('MongoDB connected directly');
    return db;
  } catch (err) {
    console.error('MongoDB connection error:', err);
    throw err;
  }
};

const getDB = () => {
  if (!db) {
    throw new Error('Database not connected. Call connectDB() first.');
  }
  return db;
};

module.exports = { connectDB, getDB };

