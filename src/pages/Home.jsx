import React, { useState } from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, IconButton, TablePagination } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

// Sample data for the table
const sampleData = [
  { id: 1, name: 'John Doe', status: 'Passed', age: 22, course: 'Mathematics', grade: 'A' },
  { id: 2, name: 'Jane Smith', status: 'Current', age: 21, course: 'Science', grade: 'B' },
  { id: 3, name: 'Emily Johnson', status: 'Passed', age: 23, course: 'English', grade: 'A' },
  { id: 4, name: 'Michael Brown', status: 'Current', age: 24, course: 'History', grade: 'C' },
  { id: 5, name: 'Chris Evans', status: 'Passed', age: 25, course: 'Biology', grade: 'B' },
  { id: 6, name: 'Natalie Portman', status: 'Current', age: 22, course: 'Chemistry', grade: 'A' },
  { id: 7, name: 'Tom Hiddleston', status: 'Passed', age: 23, course: 'Physics', grade: 'B' },
  { id: 8, name: 'Scarlett Johansson', status: 'Current', age: 24, course: 'Arts', grade: 'A' },
];

const cardStyles = [
  {
    backgroundColor: '#ff6f61', // Coral
    color: '#fff',
  },
  {
    backgroundColor: '#6a1b9a', // Deep Purple
    color: '#fff',
  },
  {
    backgroundColor: '#1e88e5', // Blue
    color: '#fff',
  },
  {
    backgroundColor: '#43a047', // Green
    color: '#fff',
  }
];

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Filter data based on search term
  const filteredData = sampleData.filter(row =>
    row.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Container maxWidth="xl" sx={{ px: 0, py: { xs: 2, sm: 3, md: 4 } }}>
      <Box sx={{ textAlign: 'center', my: 2 }}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <Grid container spacing={2}>
          {/* Cards */}
          {cardStyles.map((style, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  backgroundColor: style.backgroundColor,
                  color: style.color,
                  backdropFilter: 'blur(10px)',
                  borderRadius: 2,
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  p: 2,
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
                  },
                }}
              >
                <CardContent sx={{ textAlign: 'center', px: 2, py: 3 }}>
                  <Typography variant="h4" component="div">
                    {index === 0 ? '150' : index === 1 ? '50' : index === 2 ? '₹25,000' : '100'}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    {index === 0 ? 'Total Students' : index === 1 ? 'Total Passout Students' : index === 2 ? 'Total Income' : 'Current Students'}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Table with Search Bar */}
        <Box sx={{ mt: 4, mb: 2, display: 'flex', flexDirection: 'row', sm: 'row', alignItems: 'center', gap: 2, justifyContent: 'space-between' }}>
          <Typography variant="h6" gutterBottom>
            Batch Details
          </Typography>
          <TextField
            variant="outlined"
            placeholder="Search..."
            size="small"
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ maxWidth: 300, flexGrow: 1 }}
            InputProps={{
              endAdornment: (
                <IconButton edge="end" sx={{ p: '10px' }}>
                  <SearchIcon />
                </IconButton>
              ),
            }}
          />
        </Box>

        <Box sx={{ mt: 2, overflowX: 'auto' }}>
          <TableContainer component={Paper} sx={{ borderRadius: 2, overflow: 'hidden' }}>
          <Table sx={{ minWidth: 300, maxWidth: '100%' }}>
  <TableHead>
    <TableRow>
      <TableCell sx={{ backgroundColor: '#f5f5f5', fontWeight: 'bold', textAlign: 'center' }}>ID</TableCell>
      <TableCell sx={{ backgroundColor: '#f5f5f5', fontWeight: 'bold', textAlign: 'center' }}>Name</TableCell>
      <TableCell sx={{ backgroundColor: '#f5f5f5', fontWeight: 'bold', textAlign: 'center' }}>Status</TableCell>
      <TableCell sx={{ backgroundColor: '#f5f5f5', fontWeight: 'bold', textAlign: 'center' }}>Age</TableCell>
      <TableCell sx={{ backgroundColor: '#f5f5f5', fontWeight: 'bold', textAlign: 'center' }}>Course</TableCell>
      <TableCell sx={{ backgroundColor: '#f5f5f5', fontWeight: 'bold', textAlign: 'center' }}>Grade</TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
    {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
      <TableRow
        key={row.id}
        sx={{
          '&:nth-of-type(even)': {
            backgroundColor: '#f9f9f9',
          },
          '&:hover': {
            backgroundColor: '#e0f7fa',
          },
        }}
      >
        <TableCell sx={{ textAlign: 'center' }}>{row.id}</TableCell>
        <TableCell sx={{ textAlign: 'center' }}>{row.name}</TableCell>
        <TableCell sx={{ textAlign: 'center' }}>{row.status}</TableCell>
        <TableCell sx={{ textAlign: 'center' }}>{row.age}</TableCell>
        <TableCell sx={{ textAlign: 'center' }}>{row.course}</TableCell>
        <TableCell sx={{ textAlign: 'center' }}>{row.grade}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>

          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{ mt: 2 }}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
