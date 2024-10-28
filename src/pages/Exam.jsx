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

const AddExamModal = ({ open, onClose, onSubmit, categories, courses }) => {
    const [examName, setExamName] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [examFrom, setExamFrom] = useState('');
    const [examTo, setExamTo] = useState('');
  
    const handleSubmit = () => {
      if (examName && selectedCategory && selectedCourse && examFrom && examTo) {
        onSubmit({
          name: examName,
          category: selectedCategory,
          course: selectedCourse,
          description: description,
          image: image,
          examFrom: examFrom,
          examTo: examTo,
        });
        // Reset all fields
        setExamName('');
        setSelectedCategory('');
        setSelectedCourse('');
        setDescription('');
        setImage(null);
        setExamFrom('');
        setExamTo('');
        onClose();
      }
    };
  
    const handleImageUpload = (event) => {
      setImage(event.target.files[0]);
    };

  return (
    <Modal
    open={open}
    onClose={onClose}
    closeAfterTransition
    BackdropComponent={Backdrop}
    BackdropProps={{ timeout: 500 }}
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
          Add Exam
        </Typography>

        {/* Exam Name */}
        <TextField
          fullWidth
          variant="outlined"
          label="Exam Name"
          value={examName}
          onChange={(e) => setExamName(e.target.value)}
          required
          sx={{ mb: 2 }}
        />

        {/* Exam Category */}
        <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
          <InputLabel id="category-label">Exam Category</InputLabel>
          <Select
            labelId="category-label"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            label="Exam Category"
            required
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.COURSE_category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Course Selection */}
        <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
          <InputLabel id="course-label">Select Course</InputLabel>
          <Select
            labelId="course-label"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            label="Select Course"
            required
          >
            {courses.map((course) => (
              <MenuItem key={course.id} value={course.id}>
                {course.COURSE_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Exam Time Fields */}
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Exam From"
              type="time"
              value={examFrom}
              onChange={(e) => setExamFrom(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Exam To"
              type="time"
              value={examTo}
              onChange={(e) => setExamTo(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
          </Grid>
        </Grid>

        {/* Action Buttons */}
        <Grid container spacing={2} justifyContent="flex-end" sx={{ mt: 2 }}>
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

const Exam = () => {
  const Token = localStorage.getItem('authToken');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [exams, setExams] = useState([]);
  const [categories, setCategories] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axios.get(`https://crpch.in/api/ka/exam/`, {
          headers: {
            Authorization: `Token ${Token}`,
          },
        });
        setExams(response.data.table_data);
      } catch (error) {
        console.error('Error fetching exams:', error);
      }
    };

    const fetchExamCategories = async () => {
      try {
        const response = await axios.get(`https://crpch.in/api/ka/exam/category/`, {
          headers: {
            Authorization: `Token ${Token}`,
          },
        });
        setCategories(response.data.table_data);
      } catch (error) {
        console.error('Error fetching exam categories:', error);
      }
    };

    fetchExams();
    fetchExamCategories();
  }, []);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axios.get(`https://crpch.in/api/ka/exam/`, {
          headers: {
            Authorization: `Token ${Token}`,
          },
        });
        setExams(response.data.table_data);
      } catch (error) {
        console.error('Error fetching exams:', error);
      }
    };

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

    fetchExams();
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

  const handleAddExam = async (exam) => {
    try {
      await axios.post(
        `https://crpch.in/api/ka/exam/`,
        {
          EXAM_name: exam.name,
          EXAM_fee: exam.fee,
          EXAM_cat: exam.category,
          EXAM_duration: exam.duration,
          EXAM_description: exam.description,
          EXAM_image: exam.image,
        },
        {
          headers: {
            Authorization: `Token ${Token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setModalOpen(false);
      setSnackbarMessage('Exam added successfully!');
      setSnackbarSeverity('success');
    } catch (error) {
      console.error('Error adding exam:', error);
      setSnackbarMessage('Failed to add exam.');
      setSnackbarSeverity('error');
    } finally {
      setSnackbarOpen(true);
    }
  };

  const handleDeleteExam = async (examId) => {
    try {
      await axios.delete(`https://crpch.in/api/ka/exam/?id=${examId}`, {
        headers: {
          Authorization: `Token ${Token}`,
        },
      });

      setSnackbarMessage('Exam deleted successfully!');
      setSnackbarSeverity('success');

      const updatedExams = exams.filter((exam) => exam.id !== examId);
      setExams(updatedExams);
    } catch (error) {
      console.error('Error deleting exam:', error);
      setSnackbarMessage('Failed to delete exam.');
      setSnackbarSeverity('error');
    } finally {
      setSnackbarOpen(true);
    }
  }

  const filteredExams = exams.filter((exam) =>
    exam.EXAM_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Exams
      </Typography>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <TextField
          label="Search Exams"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearch}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button color="primary" onClick={() => setModalOpen(true)}>
          + Add Exam
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Exam Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Course</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredExams.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((exam) => (
              <TableRow key={exam.id}>
                <TableCell>{exam.id}</TableCell>
                <TableCell>{exam.EXAM_name}</TableCell>
                <TableCell>{exam.EXAM_cat}</TableCell>
                <TableCell>{exam.EXAM_course}</TableCell>
                <TableCell>{exam.EXAM_duration}</TableCell>
                <TableCell>
                  <IconButton color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDeleteExam(exam.id)}>
                    <DeleteIcon />
                  </IconButton>
                  <IconButton>
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
        count={filteredExams.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <AddExamModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleAddExam}
        categories={categories}
        courses={courses}
      />

      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={() => setSnackbarOpen(false)}>
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Exam;
