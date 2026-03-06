import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  TextField,
  Stack,
  Divider,
} from "@mui/material";
import { useState } from "react";
import {
  executeWorkflow,
  getPresignedUrlOnly,
} from "../api/transactionApi";
import axios from "axios";

const AddCandidateDialog = ({ open, handleClose }) => {
  //const [emailId, setEmailId] = useState(null);
  const [knowledgeBase, setKnowledgeBase] = useState(null);
  //const [threadId, setThreadId] = useState(null);
  //const [emailBody, setEmailBody] = useState(null);
  const [loading, setLoading] = useState(false);
  //const [validation, setValidation] = useState(null);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const pdfData = await getPresignedUrlOnly();
      const pdfResult = pdfData?.data?.result;

      await axios.put(pdfResult.presignedUrl, knowledgeBase, {
        headers: { "Content-Type": knowledgeBase.type },
      });

      // let csvFileUrl = "";

      // if (validation) {
      //   const csvData = await getPresignedUrlOnly();
      //   const csvResult = csvData?.data?.result;
      //   csvFileUrl = csvResult.fileUrl;

      //   await axios.put(csvResult.presignedUrl, validation, {
      //     headers: {
      //       "Content-Type": validation.type || "text/csv",
      //     },
      //   });
      // }

      console.log("PDF URL:", pdfResult.fileUrl);
      //console.log("CSV URL:", csvFileUrl);

      await executeWorkflow({
        //email_body: emailBody,
        //email_thread_id: threadId,
        knowledge_base_pdf: pdfResult.fileUrl,
        //sender_email_address: emailId,
        //validation_csv_url: csvFileUrl, // 👈 FIXED
      });

      handleClose();
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Add Details</DialogTitle>

      <DialogContent dividers>
        <Stack spacing={3}>
          {/* Knowledge Base */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Document Upload (PDF)
            </Typography>
            <Button variant="outlined" component="label" fullWidth>
              Upload File
              <input
                hidden
                type="file"
                onChange={(e) => setKnowledgeBase(e.target.files[0])}
              />
            </Button>
            {knowledgeBase && (
              <Typography variant="caption">{knowledgeBase.name}</Typography>
            )}
          </Box>

          <Divider />

          {/* Email Body */}
          {/* <TextField
            label="Email Body"
            multiline
            rows={4}
            placeholder="Paste full email content here..."
            onChange={(e) => setEmailBody(e.target.value)}
            fullWidth
          /> */}

          {/* Email ID */}
          {/* <TextField
            label="Sender Email ID"
            placeholder="example@company.com"
            onChange={(e) => setEmailId(e.target.value)}
            fullWidth
          /> */}

          {/* Thread ID */}
          {/* <TextField
            label="Email Thread ID"
            placeholder="Thread reference ID"
            onChange={(e) => setThreadId(e.target.value)}
            fullWidth
          /> */}

          <Divider />

          {/* Validation File */}
          {/* <Box>
            <Typography variant="subtitle2" gutterBottom>
              Validation File
            </Typography>
            <Button variant="outlined" component="label" fullWidth>
              Upload Validation File
              <input
                hidden
                type="file"
                onChange={(e) => setValidation(e.target.files[0])}
              />
            </Button>
            {validation && (
              <Typography variant="caption">{validation.name}</Typography>
            )}
          </Box> */}
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Uploading..." : "Submit"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCandidateDialog;

