import React, { useState, useEffect } from 'react';
import {
  Modal,
  Fade,
  Backdrop,
  Grid,
  useMediaQuery,
  Container,
  Button,
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
  InputAdornment,
  Box,
  Snackbar,
  Alert,
  useTheme,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';

const AddStudyMaterialModal = ({ open, onClose, onSubmit, courses }) => {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState([]);

  const handleFileChange = (event) => {
    setFiles([...event.target.files]);
  };

  console.log(files);

  const handleSubmit = () => {
    onSubmit({ course: selectedCourse, description, files });
    clearForm();  // Clear form after submitting
    onClose();
  };

  const clearForm = () => {
    setSelectedCourse('');
    setDescription('');
    setFiles([]);
  };

  const handleDiscard = () => {
    clearForm();  // Clear form when discarding
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
      aria-labelledby="add-study-material-modal-title"
      aria-describedby="add-study-material-modal-description"
    >
      <Fade in={open}>
        <Box
          sx={{
            bgcolor: 'background.paper',
            p: 4,
            borderRadius: 2,
            mt: '10%',
            mx: 'auto',
            width: { xs: '90%', sm: '70%', md: '50%' },
            maxWidth: 600,
            outline: 'none',
            position: 'relative',
          }}
        >
          <Typography id="add-study-material-modal-title" variant="h6" gutterBottom>
            Add Study Material
          </Typography>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="course-select-label">Course</InputLabel>
            <Select
              labelId="course-select-label"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              required
              label="Course"
            >
              {courses.map((course) => (
                <MenuItem key={course.id} value={course.id}>
                  {course.COURSE_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            variant="outlined"
            label="Description"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            sx={{ mb: 2 }}
          />

          <Button
            variant="outlined"
            component="label"
            fullWidth
            sx={{ mb: 2 }}
          >
            Upload Files
            <input
              type="file"
              multiple
              hidden
              onChange={handleFileChange}
            />
          </Button>

          {/* Display list of uploaded file names */}
          {files.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1">Uploaded Files:</Typography>
              <ul>
                {Array.from(files).map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            </Box>
          )}

          <Grid container spacing={2} justifyContent="flex-end">
            <Grid item>
              <Button variant="outlined" onClick={handleDiscard}>
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



const StudyMaterial = () => {
  const Token = localStorage.getItem('authToken');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [studyMaterials, setStudyMaterials] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('https://crpch.in/api/ka/course/',{
          headers: {
            Authorization: `Token ${Token}`,
          },
        });
        if (response.data.status) {
          setCourses(response.data.table_data);
        } else {
          console.error('Failed to fetch courses');
        }
      } catch (error) {
        console.error(error);
      }
    };

    const fetchStudyMaterials = async () => {
      try {
        const response = await axios.get('https://crpch.in/api/ka/study_material/', {
          headers: {
            Authorization: `Token ${Token}`,
          },
        });
        if (response.data.status) {
          // Map the response data to match the structure expected in the table
          const formattedData = response.data.table_data.map((material) => ({
            id: material.id,
            course: material.COURSE.COURSE_name,
            description: material.file_description,
            files: material.file ? [{ name: material.file.split('/').pop(), url: material.file }] : [],
          }));
          setStudyMaterials(formattedData);
        } else {
          console.error('Failed to fetch study materials');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchStudyMaterials();

    fetchCourses();
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

  const handleAddStudyMaterial = async (material) => {
    const formData = new FormData();
    formData.append('file_description', material.description);
    formData.append('COURSE', material.course); // Pass course ID
    material.files.forEach((file, index) => {
      formData.append('file', file); // Append each file
    });
  
    try {
      const response = await axios.post('https://crpch.in/api/ka/study_material/', formData, {
        headers: {
          'Authorization': `Token ${Token}`,
          'Content-Type': 'multipart/form-data', // Required for file uploads
        },
      });
  
        setSnackbarMessage('Study material added successfully');
        setSnackbarSeverity('success');

        setStudyMaterials(prevMaterials => [
          ...prevMaterials, // Spread the existing materials
          {
            id: response.data.id,
            course: material.course,
            description: material.description,
            files: material.files.map((file) => ({ name: file.name, url: file.url })),
          },
        ]);
      
    } catch (error) {
      console.error(error);
      setSnackbarMessage('Error occurred while adding study material');
      setSnackbarSeverity('error');
    }
  
    setSnackbarOpen(true); // Open snackbar to show message
  };
  

  const filteredStudyMaterials = studyMaterials.filter((material) =>
    material.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteStudyMaterial = async (id) => {
    try {
      const response = await axios.delete(`https://crpch.in/api/ka/study_material/?id=${id}`, {
        headers: {
          Authorization: `Token ${Token}`,
        },
      });

      setSnackbarMessage('Study material deleted successfully');
      setSnackbarSeverity('success');
      setStudyMaterials(studyMaterials.filter((material) => material.id !== id));
    } catch (error) {
      console.error('Error deleting study material:', error);
      setSnackbarMessage('Failed to delete study material');
      setSnackbarSeverity('error');
    } finally {
      setSnackbarOpen(true);
    }
  };

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
            <Typography variant="h4" component="div" gutterBottom>
              Study Materials
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} container justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              onClick={() => setModalOpen(true)}
              startIcon={<AddIcon />}
              fullWidth={isMobile}
            >
              Add Study Material
            </Button>
          </Grid>
        </Grid>
      </Box>

      <TextField
        variant="outlined"
        label="Search Study Material"
        value={searchTerm}
        onChange={handleSearch}
        fullWidth
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
              <TableCell align='center'>Course</TableCell>
              <TableCell align='center'>Description</TableCell>
              <TableCell align='center'>Files</TableCell>
              <TableCell align='center'>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStudyMaterials.length > 0 ? (
              filteredStudyMaterials
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((material) => (
                  <TableRow key={material.id}>
                    <TableCell align='center'>{material.course}</TableCell>
                    <TableCell align='center'>{material.description}</TableCell>
                    <TableCell align='center'>
                    {material.files.length > 0 ? material.files.map((file, index) => (
                        <a key={index} href={`https://crpch.in${file.url}`} download target="_blank" rel="noopener noreferrer">{file.name}</a>
                      )) : 'No files'}
                    </TableCell>
                    <TableCell align='center'>
                    <IconButton onClick={()=>
                      handleDeleteStudyMaterial(material.id)
                    }>
                        <DeleteIcon color='secondary' />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align='center'>
                  No study materials found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredStudyMaterials.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <AddStudyMaterialModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleAddStudyMaterial}
        courses={courses}
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

export default StudyMaterial;
