import {
  Container,
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import TransactionList from "../components/TransactionList";
import AddCandidateDialog from "../components/AddCandidateDialog";
import JobDetailsDialog from "../components/JobDetailsDialog";
import { getJobs } from "../api/transactionApi";

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [addOpen, setAddOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    // Mock data (replace with API)
    // setTransactions([
    //   {
    //     jobId: "JOB-1001",
    //     status: "COMPLETED",
    //     createdAt: "2025-01-20 10:30",
    //     description: "Candidate onboarding job",
    //   },
    //   {
    //     jobId: "JOB-1002",
    //     status: "IN_PROGRESS",
    //     createdAt: "2025-01-21 09:15",
    //     description: "Resume parsing workflow",
    //   },
    //   {
    //     jobId: "JOB-1003",
    //     status: "FAILED",
    //     createdAt: "2025-01-22 14:40",
    //     description: "Document upload failure",
    //   },
    // ]);
    fetchJobs()
  }, []);

  const fetchJobs = async () => {
    const result = await getJobs()
    setTransactions(result.data.result)
  }

  const handleRowClick = (job) => {
    setSelectedJob(job);
    setDetailsOpen(true);
  };

  return (
    <>
      <Header onAddCandidate={() => setAddOpen(true)} />

      <Container maxWidth="lg">
        <Box mt={4}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Job Transactions
              </Typography>

              <Typography variant="body2" color="text.secondary" mb={2}>
                Click any job to view detailed information
              </Typography>

              <TransactionList
                transactions={transactions}
                onRowClick={handleRowClick}
              />
            </CardContent>
          </Card>
        </Box>
      </Container>

      {/* Popups */}
      <AddCandidateDialog
        open={addOpen}
        handleClose={() => {
          setAddOpen(false)
          fetchJobs()
        }}
      />

      {detailsOpen && <JobDetailsDialog
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        jobId={selectedJob?.jobId}
      />}
    </>
  );
};

export default TransactionsPage;
