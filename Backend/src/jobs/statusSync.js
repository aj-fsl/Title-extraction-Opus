import { getAllJobs, updateJobStatus } from "../services/jobStore.js"
import { getJobStatus } from "../services/opusApiService.js"

export const syncStatus = async () => {
    console.log("SYNCING STATUSES")
    const jobs = getAllJobs()

    const inprogressJobs = jobs.filter(j => j.status === 'IN_PROGRESS' || j.status === 'WAITING')

    for(let job of inprogressJobs){
        console.log(`Processing status check for ${job.jobId}`)
        const jobStatus = await getJobStatus(job.jobId) 
      console.log(`status is ${jobStatus.status}`)
        if(jobStatus.status !== 'IN_PROGRESS'){
            await updateJobStatus(job.jobId, jobStatus.status)
        }
    }
}