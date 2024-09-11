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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';

const AddCourseModal = ({ open, onClose, onSubmit, categories }) => {
  const [courseName, setCourseName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [courseFee, setCourseFee] = useState('');

  const handleSubmit = () => {
    if (courseName && selectedCategory) {
      onSubmit({ name: courseName, category: selectedCategory, fee: courseFee });
      setCourseName('');
      setSelectedCategory('');
      setCourseFee('');
      onClose();
    }
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
          }}
        >
          <Typography variant="h6" gutterBottom>
            Add Course
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            label="Course Name"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            required
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
            <InputLabel id="category-label">Course Category</InputLabel>
            <Select
              labelId="category-label"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              label="Course Category"
              required
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.COURSE_category}  
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            variant="outlined"
            label="Course Fee"
            value={courseFee}
            onChange={(e) => setCourseFee(e.target.value)}
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

const Course = () => {
  const Token = "3f17479bd1399b6b048d06a6eba63281f3a0aff5";
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
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`https://crpch.in/api/ka/course/`, {
          headers: {
            Authorization: `Token ${Token}`,
          },
        });
        setCourses(response.data.table_data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    const fetchCourseCategories = async () => {
      try {
        const response = await axios.get(`https://crpch.in/api/ka/course/category/`, {
          headers: {
            Authorization: `Token ${Token}`,
          },
        });
        setCategories(response.data.table_data);
      } catch (error) {
        console.error('Error fetching course categories:', error);
      }
    };

    fetchCourses();
    fetchCourseCategories();
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`https://crpch.in/api/ka/course/`, {
          headers: {
            Authorization: `Token ${Token}`,
          },
        });
        setCourses(response.data.table_data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
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

  const handleAddCourse = async (course) => {
    console.log(course);
    
    try {
      await axios.post(
        `https://crpch.in/api/ka/course/`,
        {
          COURSE_name: course.name,
          COURSE_fee: course.fee,
          COURSE_cat: course.category,
        },
        {
          headers: {
            Authorization: `Token ${Token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setModalOpen(false);
      setSnackbarMessage('Course added successfully!');
      setSnackbarSeverity('success');
    } catch (error) {
      console.error('Error adding course:', error);
      setSnackbarMessage('Failed to add course.');
      setSnackbarSeverity('error');
    } finally {
      setSnackbarOpen(true);
    }
  };


  const filteredCourses = courses.filter((course) =>
    course.COURSE_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Grid container spacing={2} alignItems="center" justifyContent="space-between">
          <Grid item xs={12} sm={6}>
            <Typography variant="h4" component="div">
              Courses
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} container justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              style={{ marginRight: '10px' }}
              onClick={() => setModalOpen(true)}
              fullWidth={!(window.innerWidth > 600)}
            >
              + Add Course
            </Button>
          </Grid>
        </Grid>
      </Box>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search Course"
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
        Total Courses: {filteredCourses.length}
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align='center'>Course Name</TableCell>
              <TableCell align='center'>Category</TableCell>
              <TableCell align='center'>Fees</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
  {filteredCourses
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((course) => (
      <TableRow key={course.id}>
        <TableCell align='center'>{course.COURSE_name}</TableCell>
        <TableCell align='center'>
          {course.COURSE_cat && course.COURSE_cat.COURSE_category 
            ? course.COURSE_cat.COURSE_category 
            : "No category"} {/* Safely handle null values */}
        </TableCell>
        <TableCell align='center'>{course.COURSE_fee}</TableCell>
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
<TableBody>
  {filteredCourses
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((course) => (
      <TableRow key={course.id}>
        <TableCell align='center'>{course.COURSE_name}</TableCell>
        <TableCell align='center'>
          {course.COURSE_cat && course.COURSE_cat.COURSE_category 
            ? course.COURSE_cat.COURSE_category 
            : "No category"} {/* Safely handle null values */}
        </TableCell>
        <TableCell align='center'>{course.COURSE_fee}</TableCell>
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
        count={filteredCourses.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <AddCourseModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleAddCourse}
        categories={categories}
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

export default Course;
