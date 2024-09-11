import React, { useState } from 'react';
import {
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  TextField,
  Typography,
  Box,
  InputAdornment,
  useMediaQuery,
  useTheme,
  Button,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Income = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Sample data for the table
  const [incomeData, setIncomeData] = useState([
    { id: 1, studentName: 'John Doe', date: '2024-09-01', amount: 500, batch: 'A1', dueAmount: 100, courseFees: 600 },
    { id: 2, studentName: 'Jane Smith', date: '2024-09-02', amount: 700, batch: 'B1', dueAmount: 200, courseFees: 900 },
    // Add more sample data as needed
  ]);

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

  const filteredIncomeData = incomeData.filter((income) =>
    income.studentName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalIncome = incomeData.reduce((sum, income) => sum + income.amount, 0);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h4" component="div" textAlign={{ xs: 'center', md: 'left' }}>
              Income
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
                p: 2,
                height: 50, // Ensure the height is the same as width for a square button-like card
                width: 300,
                bgcolor: 'red', // Maroon color
                color: 'white',
                borderRadius: 2,
                boxShadow: 3,
                textTransform: 'none',
                fontWeight: 'bold',
                mx: 'auto', // Center horizontally
              }}
            >
              <Typography variant="h6" component="div">
                Total Income =
              </Typography>
              <Typography variant="h4" component="div" sx={{ ml: 2 }}>
                ₹{totalIncome}
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </Box>

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search by Student Name"
        value={searchTerm}
        onChange={handleSearch}
        sx={{ mb: 2 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Student Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Batch</TableCell>
              <TableCell>Due Amount</TableCell>
              <TableCell>Course Fees</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredIncomeData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((income) => (
                <TableRow key={income.id}>
                  <TableCell>{income.studentName}</TableCell>
                  <TableCell>{income.date}</TableCell>
                  <TableCell>{income.amount}</TableCell>
                  <TableCell>{income.batch}</TableCell>
                  <TableCell>{income.dueAmount}</TableCell>
                  <TableCell>{income.courseFees}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box mt={2}>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredIncomeData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </Container>
  );
};

export default Income;
