import axios from "axios";

const API_URL = "http://localhost:3000/api/jobs/run";
const TOTAL_REQUESTS = 5;

// Helper to pad numbers
const pad = (num, size = 3) => String(num + 50).padStart(size, "0");

// Helper to generate random time slot string
const randomTimeSlot = () => {
  const day = Math.floor(Math.random() * 28) + 1;
  const month = "Oct";
  const year = 2025;
  const startHour = Math.floor(Math.random() * 23);
  const endHour = startHour + Math.floor(Math.random() * 2) + 1;

  const formatHour = (h) =>
    `${(h % 12) || 12}${h < 12 ? "am" : "pm"}`;

  return `Check if I am available on ${day} ${month} ${year} from ${formatHour(
    startHour
  )} to ${formatHour(endHour)}`;
};

// Helper to create a single job payload
const createJobPayload = (index) => ({
  jobId: `JOB-TEST_BATCH-${pad(index)}`,
  jobName: `Testing batch for Job JOB-TEST_BATCH-${pad(index)}`,
  jobDescription: "Running workflow for selected time slot",
  inputData: {
    time_slot_string: randomTimeSlot(),
  },
});

// Function to execute one job
const runJob = async (payload) => {
  const start = Date.now();
  try {
    const response = await axios.post(API_URL, payload);
    const duration = Date.now() - start;
    console.log(
      `✅ ${payload.jobId} | ${response.status} | ${duration}ms | ${payload.inputData.time_slot_string}`
    );
    return { jobId: payload.jobId, status: response.status, duration };
  } catch (error) {
    const duration = Date.now() - start;
    console.error(
      `❌ ${payload.jobId} | ${error.response?.status || 500} | ${duration}ms | ${error.message}`
    );
    return {
      jobId: payload.jobId,
      status: error.response?.status || 500,
      duration,
      error: error.message,
    };
  }
};

// Run all jobs in parallel (50 requests)
const runBatch = async () => {
  console.log(`🚀 Starting batch of ${TOTAL_REQUESTS} job requests...\n`);
  const jobs = Array.from({ length: TOTAL_REQUESTS }, (_, i) => createJobPayload(i + 1));
  const results = await Promise.all(jobs.map((job) => runJob(job)));

  console.log("\n📊 Batch execution summary:");
  const success = results.filter((r) => r.status === 200).length;
  const failed = results.length - success;
  const avgTime =
    results.reduce((sum, r) => sum + r.duration, 0) / results.length;
  console.log(`✅ Success: ${success}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`⏱️ Avg Duration: ${avgTime.toFixed(2)}ms`);
};

runBatch();
