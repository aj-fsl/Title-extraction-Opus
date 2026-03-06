import express from "express";
import {
    executeJobController,
    executeWorkflowController,
    getAllJobsController,
    getJobResultController,
    getJobSchemaController,
    getPresignedUrlController,
    getPresignedUrlControllerOnlyUrl,
    prepareLanguageDetectionController,
} from "../controllers/jobController.js";
import {upload} from "../middleware/upload.js";

const router = express.Router();

router.get("/schema", getJobSchemaController);
router.post("/language-detection/prepare", prepareLanguageDetectionController);
router.post("/run", executeJobController);
router.post("/execute", executeWorkflowController);
router.get("/list", getAllJobsController);
router.get("/:jobId/result", getJobResultController);

router.get("/presigned-url-only-url", getPresignedUrlControllerOnlyUrl)

router.post(
  "/presigned-url",
  upload.single("file"), // field name = "file"
  getPresignedUrlController
);

export default router;
