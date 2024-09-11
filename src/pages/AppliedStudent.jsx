import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Grid,
  TextField,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  InputAdornment,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom'; 

const AppliedStudent = () => {
  const Token = "3f17479bd1399b6b048d06a6eba63281f3a0aff5";
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const [studentsData, setStudentsData] = useState([]);

  useEffect(() => {
    const fetchAppliedStudents = async () => {
      try {
        const response = await axios.get('https://crpch.in/api/ka/student/',{
          headers: {
            Authorization: `Token ${Token}`,
          },
        });
        setStudentsData(response.data.table_data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAppliedStudents();
  }, []);



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

  const handleMenuClick = (event, student) => {
    setAnchorEl(event.currentTarget);
    setSelectedStudent(student);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedStudent(null);
  };

  const handleOnboardClick = () => {
    navigate('/onboarding-student' , { state: { student: selectedStudent } }); // Navigate to OnboardingStudent page
    handleMenuClose();
  };

  const filteredStudentsData = studentsData.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Grid container spacing={2} alignItems="center" justifyContent="space-between">
          <Grid item xs={12} sm={6}>
            <Typography variant="h4" component="div">
              Applied Students
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} container justifyContent="flex-end">
            <Typography variant="h6" component="div">
              Total Students: {studentsData.length}
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center" mb={2}>
        <TextField
          label="Search Students"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearch}
          fullWidth={!(window.innerWidth > 600)}
          sx={{ mb: { xs: 2, sm: 0 }, width: { xs: '100%', sm: 'auto' } }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align='center'>Name</TableCell>
              <TableCell align='center'>D.O.B</TableCell>
              <TableCell align='center'>Mobile No</TableCell>
              <TableCell align='center'>Course</TableCell>
              <TableCell align='center'>Total Fees</TableCell>
              <TableCell align='center'>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStudentsData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((student) => (
                <TableRow key={student.id}>
                  <TableCell align='center'>{student.name}</TableCell>
                  <TableCell align='center'>{student.dob}</TableCell>
                  <TableCell align='center'>{student.mobile_no}</TableCell>
                  <TableCell align='center'>{student.COURSE.COURSE_name}</TableCell>
                  <TableCell align='center'>{student.COURSE.COURSE_fee}</TableCell>
                  <TableCell align='center'>
                    <IconButton
                      onClick={(event) => handleMenuClick(event, student)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl) && selectedStudent?.id === student.id}
                      onClose={handleMenuClose}
                    >
                      <MenuItem onClick={handleMenuClose}>View</MenuItem>
                      <MenuItem onClick={handleOnboardClick}>Onboard</MenuItem>
                      <MenuItem onClick={handleMenuClose}>Delete</MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredStudentsData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Container>
  );
};

export default AppliedStudent;
