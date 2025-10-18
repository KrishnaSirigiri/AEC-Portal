import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Job from '../models/Job.js';
import User from '../models/User.js';

dotenv.config();

const titles = [
  'Civil Engineer', 'Structural Engineer', 'Architect', 'Project Manager', 'Construction Manager',
  'Mechanical Engineer', 'Electrical Engineer', 'Site Supervisor', 'BIM Coordinator', 'Urban Planner',
  'Quality Assurance Engineer', 'Safety Officer', 'CAD Technician', 'Estimating Engineer', 'Surveyor'
];

const companies = Array.from({ length: 120 }, (_, i) => `AEC Company ${i + 1}`);
const locations = ['New York, NY', 'San Francisco, CA', 'Austin, TX', 'Seattle, WA', 'Remote', 'Chicago, IL', 'Boston, MA'];
const skills = ['AutoCAD', 'Revit', 'Project Management', 'Python', 'Excel', 'Structural Analysis', 'Civil 3D', 'SketchUp', 'BIM', 'Construction Management', 'Cost Estimation', 'Primavera', 'MS Project'];

async function connect() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('✅ Connected to MongoDB');
}

async function ensureRecruiter() {
  let recruiter = await User.findOne({ email: 'recruiter@aecjobs.com' });
  if (!recruiter) {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash('Password123!', salt);
    recruiter = await User.create({
      name: 'Default Recruiter',
      email: 'recruiter@aecjobs.com',
      password: hashed,
      role: 'recruiter',
    });
    console.log('👤 Created recruiter user:', recruiter.email);
  } else {
    console.log('👤 Using existing recruiter:', recruiter.email);
  }
  return recruiter;
}

async function seedJobs(recruiterId) {
  const count = 2030;
  const docs = [];
  for (let i = 0; i < count; i++) {
    const title = `${titles[i % titles.length]} ${i + 1}`;
    const company = companies[i % companies.length];
    const location = locations[i % locations.length];
    const salaryRange = `$${70 + (i % 50)}k - $${90 + (i % 60)}k`;
    const skillsRequired = [
      skills[i % skills.length],
      skills[(i + 3) % skills.length],
      skills[(i + 7) % skills.length],
    ];

    docs.push({
      title,
      description: `We are seeking a ${title} to join ${company}. You will collaborate across disciplines to deliver high-quality AEC projects.`,
      company,
      location,
      salaryRange,
      skillsRequired,
      createdBy: recruiterId,
    });
  }

  const inserted = await Job.insertMany(docs);
  console.log(`📦 Inserted ${inserted.length} jobs`);
}

async function run() {
  try {
    await connect();
    const recruiter = await ensureRecruiter();
    await seedJobs(recruiter._id);
  } catch (err) {
    console.error('❌ Seed error:', err);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
    console.log('✅ Disconnected');
  }
}

run();