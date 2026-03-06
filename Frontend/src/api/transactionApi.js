import axiosInstance from "../services/axiosInstance";

export const getJobs = () => {
  return axiosInstance.get("/list");
};

export const getJobResult = (jobId) => {
  return axiosInstance.get(`/${jobId}/result`);
};

export const uploadCandidateFiles = (formData) => {
  return axiosInstance.post("/candidates/upload", formData);
};

export const getPresignedUrlOnly = () => {
  return axiosInstance.get("/presigned-url-only-url");
};

export const getPresignedUrl = (file) => {
  const formData = new FormData();
  formData.append("file", file);

  return axiosInstance.post("/presigned-url", formData, {
    headers:{ 
      "Content-Type": "multipart/form-data"
    }
  });
};

export const executeWorkflow = (body) => {
  return axiosInstance.post("/execute", body);
};
