import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const run = async () => {
  if (!process.env.MONGO_URI) {
    console.error('MONGO_URI not set in .env');
    process.exit(1);
  }
  await mongoose.connect(process.env.MONGO_URI);
  const users = await User.find().sort({ createdAt: -1 }).limit(10).select('-password');
  console.log('Latest users:');
  users.forEach(u => console.log(u));
  await mongoose.disconnect();
  process.exit(0);
};

run().catch(err => { console.error(err); process.exit(1); });
