import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from "@mui/material";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const Header = ({ onAddCandidate }) => {
  return (
    <AppBar position="static" elevation={2}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box display="flex" alignItems="center" gap={1}>
          <ReceiptLongIcon />
          <Box>
            <Typography variant="h6">
              Transaction Dashboard
            </Typography>
            <Typography variant="caption">
              Manage transactions and candidates
            </Typography>
          </Box>
        </Box>

        <Button
          variant="contained"
          color="secondary"
          startIcon={<PersonAddIcon />}
          onClick={onAddCandidate}
        >
          Add Details
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
