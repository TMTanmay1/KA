import React, { useState , useEffect } from 'react';
import axios from 'axios';
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
  const Token = localStorage.getItem('authToken');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Sample data for the table
  const [incomeData, setIncomeData] = useState([]);
  const [total_income , setTotalIncome] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(`https://crpch.in/api/ka/dashboard_counter/`, {
          headers: {
            Authorization: `Token ${Token}`,
          },
        });
        setTotalIncome(response.data.income);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  },[])

  useEffect(() => {
    const fetchIncomeData = async () => {
      try {
        const response = await axios.get('https://crpch.in/api/ka/income/', {
          headers: {
            Authorization: `Token ${Token}`,
          },
        });
        setIncomeData(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchIncomeData();
  } , []);

  console.log(incomeData);
  

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
    income.student.name.toLowerCase().includes(searchTerm.toLowerCase())
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
                ₹{total_income}
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </Box>

      <TextField
        variant="outlined"
        label="Search by Student Name"
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

      <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align='center'>Student Name</TableCell>
              <TableCell align='center'>Date</TableCell>
              <TableCell align='center'>Paid Amount</TableCell>
              <TableCell align='center'>Batch</TableCell>
              <TableCell align='center'>Due Amount</TableCell>
              <TableCell align='center'>Course Fees</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredIncomeData.length > 0 ? (
              filteredIncomeData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((income, index) => (
                  <TableRow key={income.id}>
                    <TableCell align='center'>{income.student.name}</TableCell>
                    <TableCell align='center'>{income.payment_date}</TableCell>
                    <TableCell align='center'>₹{income.payment_amount}</TableCell>
                    <TableCell align='center'>{
                      income.student.BATCH.BATCH_name ? income.student.BATCH.BATCH_name : "Batch not registered"
                      }</TableCell>
                    <TableCell align='center'>₹{income.due_amount}</TableCell>
                    <TableCell align='center'>₹{
                      income.student.COURSE.COURSE_fee ? income.student.COURSE.COURSE_fee : "Course not registered"
                      }</TableCell>
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align='center'>
                  No income data found
                </TableCell>
              </TableRow>
            )}
            
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
