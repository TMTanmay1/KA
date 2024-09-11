import React, { useState } from 'react';
import {
  Container,
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  IconButton,
  TextField,
  Typography,
  Box,
  Modal,
  Fade,
  Backdrop,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const AddExpenseModal = ({ open, onClose, onSubmit }) => {
  const [expenseReason, setExpenseReason] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');

  const handleSubmit = () => {
    onSubmit({ reason: expenseReason, amount: parseFloat(expenseAmount) });
    setExpenseReason('');
    setExpenseAmount('');
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box
          maxWidth="sm"
          sx={{
            bgcolor: 'background.paper',
            p: 4,
            borderRadius: 2,
            mt: '10%',
            mx: 'auto',
            position: 'relative',
            width: '90%',
            maxWidth: 600,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Add Expense
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            label="Expense Reason"
            value={expenseReason}
            onChange={(e) => setExpenseReason(e.target.value)}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Expense Amount"
            type="number"
            value={expenseAmount}
            onChange={(e) => setExpenseAmount(e.target.value)}
            required
            sx={{ mb: 2 }}
          />
          <Grid container spacing={2} justifyContent="flex-end">
            <Grid item>
              <Button variant="outlined" onClick={onClose}>
                Discard
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Fade>
    </Modal>
  );
};

const Expense = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [expenses, setExpenses] = useState([
    { id: 1, reason: 'Office Supplies', amount: 120 },
    { id: 2, reason: 'Travel', amount: 300 },
    { id: 3, reason: 'Software Subscription', amount: 200 },
    // Add more sample data as needed
  ]);
  const [modalOpen, setModalOpen] = useState(false);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAddExpense = (expense) => {
    setExpenses([...expenses, { id: expenses.length + 1, ...expense }]);
  };

  const filteredExpenses = expenses.filter((expense) =>
    expense.reason.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Grid container spacing={2} alignItems="center" justifyContent="space-between">
          <Grid item xs={12} sm={6} container alignItems="center">
            <Typography variant="h4" component="div">
              Expenses
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} container justifyContent="flex-end" alignItems="center">
            <Button
              variant="contained"
              color="primary"
              onClick={() => setModalOpen(true)}
              fullWidth={isMobile}
            >
              + Add Expense
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Display the total number of expenses */}
      <Box my={2}>
        <Typography variant="subtitle1">
          Total Expenses: {expenses.length}
        </Typography>
      </Box>

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search Expense Reason"
        value={searchTerm}
        onChange={handleSearch}
        sx={{ mb: 2 }}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Expense Reason</TableCell>
              <TableCell>Expense Amount</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredExpenses
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell>{expense.reason}</TableCell>
                  <TableCell>{expense.amount}</TableCell>
                  <TableCell align="right">
                    <IconButton aria-label="edit">
                      <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                    <IconButton aria-label="actions">
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredExpenses.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Add Expense Modal */}
      <AddExpenseModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleAddExpense}
      />
    </Container>
  );
};

export default Expense;
