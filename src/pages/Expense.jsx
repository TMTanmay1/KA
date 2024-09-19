import React, { useState, useEffect } from 'react';
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
  InputAdornment,
  Box,
  Modal,
  Fade,
  Backdrop,
  useMediaQuery,
  useTheme,
  Snackbar,
  Alert
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';

// AddExpenseModal component with disableEnforceFocus and disableAutoFocus fixes
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
      aria-labelledby="add-expense-modal-title"
      aria-describedby="add-expense-modal-description"
      disableEnforceFocus={true}  // Disable automatic focus enforcement
      disableAutoFocus={true}     // Disable automatic focus on open
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
            outline: 'none', // Ensure no outline on modal
          }}
        >
          <Typography id="add-expense-modal-title" variant="h6" gutterBottom>
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
  const Token = localStorage.getItem('authToken');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get('https://crpch.in/api/ka/assets/', {
          headers: {
            Authorization: `Token ${Token}`,
          },
        });

        if (response.status === 200) {
          setExpenses(response.data.table_data);
        } else {
          console.error('Failed to fetch expenses');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchExpenses();
  }, [Token]);

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

  const handleAddExpense = async (expense) => {
  
    try {
      const response = await axios.post('https://crpch.in/api/ka/assets/', {
        reason: expense.reason,
        expence_daily: expense.amount,
      }, {
        headers: {
          Authorization: `Token ${Token}`,
        },
      });

        setSnackbarMessage('Expense added successfully');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);

        setExpenses([...expenses, response.data]);

    } catch (error) {
      console.error(error);
      setSnackbarMessage('Failed to add expense');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  // update ecpense a

  const handleDeleteExpense = async (id) => {
    try {
      const response = await axios.delete(`https://crpch.in/api/ka/assets/?id=${id}`, {
        headers: {
          Authorization: `Token ${Token}`,
        },
      });
      
      setSnackbarMessage('Expense deleted successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      setExpenses(expenses.filter((expense) => expense.id !== id));
    } catch (error) {
      console.error(error);
      setSnackbarMessage('Failed to delete expense');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  }


  const filteredExpenses = expenses.filter((expense) =>
    expense.reason.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

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
        variant="outlined"
        label="Search Expense Reason"
        value={searchTerm}
        onChange={handleSearch}
        fullWidth={!(window.innerWidth > 600)}
        sx={{ mb: 2 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align='center'>Expense Reason</TableCell>
              <TableCell align='center'>Expense Amount</TableCell>
              <TableCell align='center'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredExpenses.length > 0 ? (
              filteredExpenses
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((expense) => (
                  <TableRow key={expense.id}>
                    <TableCell align='center'>{expense.reason}</TableCell>
                    <TableCell align='center'>₹{expense.expence_daily}</TableCell>
                    <TableCell align='center'>
                      <IconButton>
                        <EditIcon color='primary' />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteExpense(expense.id)}>  
                        <DeleteIcon color='secondary' />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align='center'>
                  No expenses found
                </TableCell>
              </TableRow>
            )}
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

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Expense;
