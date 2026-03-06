import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  Stack,
  CircularProgress,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import { getJobResult } from "../api/transactionApi";

const JobDetailsDialog = ({ open, onClose, jobId }) => {
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (jobId && open) {
      fetchResult();
    }
  }, [jobId, open]);

  const fetchResult = async () => {
    try {
      setLoading(true);
      const result = await getJobResult(jobId);

      const schema = result?.data?.result?.jobResultsPayloadSchema;

      const sections = schema?.sections?.value ?? [];
      const documentTitle = schema?.document_title?.value ?? null;
      const documentDate = schema?.document_date?.value ?? null;

      setDetails({ sections, documentTitle, documentDate });
    } catch (error) {
      console.error("Failed to fetch job result:", error);
    } finally {
      setLoading(false);
    }
  };

  const sections = details?.sections || [];
  const documentTitle = details?.documentTitle;
  const documentDate = details?.documentDate;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Job Screening Results</DialogTitle>
      <DialogContent dividers sx={{ maxHeight: "70vh" }}>
        {loading ? (
          <Stack alignItems="center" justifyContent="center" py={4}>
            <CircularProgress />
            <Typography mt={2}>Loading document...</Typography>
          </Stack>
        ) : (
          <Stack spacing={3}>
            {/* Document Info */}
            {(documentTitle || documentDate) && (
              <Paper variant="outlined" sx={{ p: 2 }}>
                {documentTitle && (
                  <Typography variant="h6">{documentTitle}</Typography>
                )}
                {documentDate && (
                  <Typography variant="body2" color="text.secondary">
                    Document Date: {documentDate}
                  </Typography>
                )}
              </Paper>
            )}

            {/* Empty state */}
            {sections.length === 0 && (
              <Typography color="text.secondary">
                No document sections found.
              </Typography>
            )}

            {/* Sections */}
            {sections.map((section, index) => (
              <Accordion key={index} defaultExpanded={index === 0}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography fontWeight={600}>
                    {section.heading || `Section ${index + 1}`}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography sx={{ whiteSpace: "pre-line", fontSize: "14px" }}>
                    {section.content}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Stack>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default JobDetailsDialog;