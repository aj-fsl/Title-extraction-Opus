import axios from "axios";

const BASE_URL = "http://localhost:3000/api/jobs/run";
const TOTAL_REQUESTS = 100; // total jobs to trigger
const DELAY_MS = 1000; // 1 second gap
const START_FROM = 1000

// Wait helper
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Random time slot generator
const randomTimeSlot = () => {
  const hours = Math.floor(Math.random() * 10) + 1;
  const nextHours = hours + 1;
  const ampm = Math.random() > 0.5 ? "AM" : "PM";
  return `Check if I am available on 30 Oct 2025 from ${hours}${ampm} to ${nextHours}${ampm}`;
};

// Job payload creator
const createJobPayload = (index) => ({
  jobId: `JOB-TEST_BATCH-${String(index + START_FROM).padStart(3, "0")}`,
  jobName: `Testing batch for Job ${String(index + START_FROM).padStart(3, "0")}`,
  jobDescription: "Running workflow for selected time slot",
  inputData: {
    time_slot_string: randomTimeSlot(),
  },
});

// ---------------- FIRE-AND-FORGET MODE ----------------
const fireAndForgetJobs = async () => {
  console.log(`🚀 Starting ${TOTAL_REQUESTS} fire-and-forget jobs...`);

  for (let i = 1; i <= TOTAL_REQUESTS; i++) {
    console.log("Running for index ", i)
    const payload = createJobPayload(i);

    axios
      .post(BASE_URL, payload)
      .then(() => {
        console.log(`[${i}/${TOTAL_REQUESTS}] ✅ Triggered ${payload.jobId}`);
      })
      .catch((error) => {
        console.error(
          `[${i}/${TOTAL_REQUESTS}] ❌ Failed to trigger ${payload.jobId}: ${error.message}`
        );
      });

    await delay(DELAY_MS); // wait 1 second before next trigger
  }

  console.log("\n🔥 All API calls fired!");
};

// Run it
fireAndForgetJobs();
