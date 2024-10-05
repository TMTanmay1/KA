import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  InputAdornment, 
  Snackbar,
  Alert,
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';

const ViewSAttendance = () => {
  const Token = localStorage.getItem('authToken');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  
  
  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await axios.get(`https://crpch.in/api/ka/student/punchin_punchout/`, {
          headers: {    
            Authorization: `Token ${Token}`,
          },
        });
        console.log(response.data);
        
        setCourses(response.data.table_data);
      } catch (error) {
        console.error('Error fetching staff:', error);
      }
    };

    fetchStaff();
  }, []);

  console.log(courses);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await axios.get(`https://crpch.in/api/ka/student/punchin_punchout/`, {
          headers: {
            Authorization: `Token ${Token}`,
          },
        });
        setCourses(response.data.table_data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchStaff();
  }, [snackbarOpen]);

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

  const handleImageClick = (image) => {
    // Open the image in a new tab
    const fullImageUrl = `https://crpch.in${image}`;
    window.open(fullImageUrl, '_blank');
  };


  const handleDeleteCourse = async (courseId) => {
    try {
      await axios.delete(`https://crpch.in/api/ka/course/?id=${courseId}`, {
        headers: {
          Authorization: `Token ${Token}`,
        },
      });

      setSnackbarMessage('Course deleted successfully!');
      setSnackbarSeverity('success');

      const updatedCourses = courses.filter((course) => course.id !== courseId);
      setCourses(updatedCourses);
    } catch (error) {
      console.error('Error deleting course:', error);
      setSnackbarMessage('Failed to delete course.');
      setSnackbarSeverity('error');
    } finally {
      setSnackbarOpen(true);
    }
  }

  const openMap = (lat, longt) => {
    const mapUrl = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${longt}#map=15/${lat}/${longt}`;
    window.open(mapUrl, '_blank');
  };


  const filteredCourses = courses.filter((course) =>
    course.staff.staff_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleActionClick = async (courseId) => {
    try {
      const response = await axios.put(
        `https://crpch.in/api/ka/student/punchin_punchout/?id=${courseId}`,
        {
          login_true: 'False',
          login_false: 'True',
        },
        {
          headers: {
            Authorization: `Token ${Token}`, // Pass the token in the headers
          },
        }
      );
      setSnackbarMessage('Marked as Absent!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error during API request:', error);
      setSnackbarMessage('Failed to mark as Absent.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Grid container spacing={2} alignItems="center" justifyContent="space-between">
          <Grid item xs={12} sm={6}>
            <Typography variant="h4" component="div">
              Review Staff Attendance
            </Typography>
          </Grid>
          {/* <Grid item xs={12} sm={6} container justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              style={{ marginRight: '10px' }}
              onClick={() => setModalOpen(true)}
              fullWidth={!(window.innerWidth > 600)}
            >
              + Add Staff
            </Button>
          </Grid> */}
        </Grid>
      </Box>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search Staff"
        value={searchTerm}
        onChange={handleSearch}
        style={{ marginBottom: '20px' }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <Typography variant="subtitle1" gutterBottom>
        Total Staff: {filteredCourses.length}
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align='center'>Name</TableCell>
              <TableCell align='center'>Mobile No</TableCell>
                <TableCell align='center'>PunchIn</TableCell>
                <TableCell align='center'>PunchOut</TableCell>
                <TableCell align='center'>Image</TableCell>
              <TableCell align='center'>Location</TableCell>
              <TableCell align='center'>Date</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
<TableBody>
  {filteredCourses.length > 0 ? (
    filteredCourses
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((course) => (
        <TableRow key={course.id}>
          <TableCell align='center'>{course.staff.staff_name}</TableCell>
          <TableCell align='center'>{course.staff.mobile_no}</TableCell>
          <TableCell align='center'>{course.login_time ? course.login_time: "N/A"}</TableCell>
          <TableCell align='center'>{course.logout_time? course.logout_time : "N/A"}</TableCell>  
          <TableCell align="center">
                <span
                  style={{ color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}
                  onClick={() => handleImageClick(course.image)}
                >
                  View
                </span>
              </TableCell>
          <TableCell align='center'>
          <IconButton onClick={() => openMap(course.lat, course.longt)}>
                      <VisibilityIcon color="secondary" />
            </IconButton>
          </TableCell>

          <TableCell align='center'>{course.date}</TableCell>

          <TableCell align="center">
                {course.login_time && (
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: 'red',
                      color: 'white',
                      fontWeight: 'bold',
                      borderRadius: '5px',
                    }}
                    onClick={() => handleActionClick(course.id)}
                    disabled={!course.login_true}
                  >
                    A
                  </Button>
                )}
              </TableCell>
        </TableRow>
      ))
  ) : (
    <TableRow>
      <TableCell colSpan={7} align='center'>
        No Staff found.
      </TableCell>
    </TableRow>
  )}
</TableBody>

        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredCourses.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />  
    <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ViewSAttendance;
