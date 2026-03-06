import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// __dirname replacement for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "../data/jobs.json");

/**
 * Read jobs from file
 */
const readJobs = () => {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data || "[]");
};

/**
 * Write jobs to file
 */
const writeJobs = (jobs) => {
  fs.writeFileSync(filePath, JSON.stringify(jobs, null, 2));
};

/**
 * CREATE job
 */
export const createJob = (jobId, status = "CREATED") => {
  const jobs = readJobs();

  if (jobs.some((job) => job.jobId === jobId)) {
    throw new Error(`Job with jobId ${jobId} already exists`);
  }

  const newJob = { jobId, status };
  jobs.push(newJob);

  writeJobs(jobs);
  return newJob;
};

/**
 * READ all jobs
 */
export const getAllJobs = () => {
  return readJobs();
};

/**
 * READ job by ID
 */
export const getJobById = (jobId) => {
  const jobs = readJobs();
  return jobs.find((job) => job.jobId === jobId) || null;
};

/**
 * UPDATE job status
 */
export const updateJobStatus = (jobId, status) => {
  const jobs = readJobs();
  const job = jobs.find((job) => job.jobId === jobId);

  if (!job) {
    throw new Error(`Job with jobId ${jobId} not found`);
  }

  job.status = status;
  writeJobs(jobs);

  return job;
};

/**
 * DELETE job
 */
export const deleteJob = (jobId) => {
  const jobs = readJobs();
  const index = jobs.findIndex((job) => job.jobId === jobId);

  if (index === -1) {
    throw new Error(`Job with jobId ${jobId} not found`);
  }

  const deleted = jobs.splice(index, 1)[0];
  writeJobs(jobs);

  return deleted;
};
