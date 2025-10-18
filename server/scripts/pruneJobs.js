import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import Job from '../models/Job.js';
import dotenv from 'dotenv';

// Usage: node ./scripts/pruneJobs.js
// This will keep the newest N jobs and delete the rest. It writes a backup of deleted job IDs to ./pruned_jobs_backup.json

dotenv.config();

const MONGO = process.env.MONGO_URI;
if (!MONGO) {
  console.error('MONGO_URI not set in .env');
  process.exit(1);
}

const keep = 100; // change this number if needed

const run = async () => {
  await mongoose.connect(MONGO);
  console.log('Connected to DB');

  // get ids of jobs to keep
  const keepJobs = await Job.find().sort({ createdAt: -1 }).limit(keep).select('_id');
  const keepIds = keepJobs.map(j => j._id.toString());

  // find jobs to delete
  const toDelete = await Job.find({ _id: { $nin: keepIds } }).select('_id title createdAt');
  if (toDelete.length === 0) {
    console.log('Nothing to prune. Database already has <=', keep, 'jobs');
    process.exit(0);
  }

  const backup = {
    date: new Date().toISOString(),
    keep,
    deletedCount: toDelete.length,
    jobs: toDelete,
  };

  const outPath = path.resolve(process.cwd(), 'pruned_jobs_backup.json');
  fs.writeFileSync(outPath, JSON.stringify(backup, null, 2));
  console.log('Backup written to', outPath);

  // delete the jobs
  const ids = toDelete.map(j => j._id);
  const res = await Job.deleteMany({ _id: { $in: ids } });
  console.log('Deleted', res.deletedCount, 'jobs');

  await mongoose.disconnect();
  process.exit(0);
};

run().catch(err => {
  console.error(err);
  process.exit(1);
});
