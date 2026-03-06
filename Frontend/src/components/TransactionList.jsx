import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Paper,
} from "@mui/material";

const statusColor = (status) => {
  switch (status) {
    case "COMPLETED":
      return "success";
    case "IN_PROGRESS":
      return "warning";
    case "FAILED":
      return "error";
    default:
      return "default";
  }
};

const TransactionList = ({ transactions, onRowClick }) => {
  return (
    <TableContainer component={Paper} variant="outlined">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><b>Seq</b></TableCell>
            <TableCell><b>Job ID</b></TableCell>
            <TableCell><b>Status</b></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {transactions.map((tx, index) => (
            <TableRow
              key={tx.jobId}
              hover
              sx={{ cursor: "pointer" }}
              onClick={() => onRowClick(tx)}
            >
              <TableCell>{index + 1}</TableCell>
              <TableCell>{tx.jobId}</TableCell>
              <TableCell>
                <Chip
                  label={tx.status}
                  color={statusColor(tx.status)}
                  size="small"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TransactionList;
