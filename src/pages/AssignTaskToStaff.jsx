import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Grid,
  Button,
  Table,
  CircularProgress,
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
import PreviewIcon from '@mui/icons-material/Preview';

const AddTaskStaffModal = ({ open, onClose, onSubmit}) => {
  const [taskName, setTaskName] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    if (taskName) {
      onSubmit({
        task: taskName,
        task_from: startDate,
        task_to : endDate,
        task_description: description,

      });
      // Reset all fields
      setTaskName('');
    setStartDate('');
    setEndDate('');
      setDescription('');
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
            Assign Task
          </Typography>

          {/* Course Name */}
          <TextField
            fullWidth
            variant="outlined"
            label="Task Name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            required
            sx={{ mb: 2 }}
          />

          {/* Course Category */}
          {/* <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
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
          </FormControl> */}

          {/* Fee and Duration Fields */}
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                variant="outlined"
                label="Task From"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                variant="outlined"
                label="Task To"   
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
                sx={{ mb: 2 }}
              />
            </Grid>
          </Grid>

          {/* Course Description */}
          <TextField
            fullWidth
            variant="outlined"
            label="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            required
            rows={3}
            sx={{ mb: 2 }}
          />

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

const TaskPreviewModal = ({ open, onClose, staffId }) => {
    const Token = localStorage.getItem('authToken');
    const [loading, setLoading] = useState(true);
    const [taskData, setTaskData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
  
    useEffect(() => {
      const fetchTaskData = async () => {
        try {
          const response = await axios.get(
            `https://crpch.in/api/ka/staff/task-assign/?id=${staffId}`,
            {
              headers: {
                Authorization: `Token ${Token}`,
              },
            }
          );
          setTaskData(response.data.table_data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching task data:', error);
          setLoading(false);
        }
      };
  
      if (staffId && open) {
        setLoading(true);
        fetchTaskData();
      }
    }, [staffId, open, Token]);
  
    const filteredTasks = taskData.filter((task) =>
      task.task.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
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
            sx={{
              bgcolor: 'background.paper',
              p: 4,
              borderRadius: 2,
              mt: '10%',
              mx: 'auto',
              maxWidth: '700px',
              position: 'relative',
              height: '60vh', // Adjust height to make the modal take most of the viewport height
              display: 'flex',
              flexDirection: 'column',
              overflowY: 'auto', // Enable vertical scroll within this container
            }}
          >
            <Typography variant="h6" gutterBottom>
              Assigned Tasks
            </Typography>
            
            {/* Search Bar */}
            <TextField
              variant="outlined"
              label="Search Tasks"
              fullWidth
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ mb: 2 }}
            />
  
            {loading ? (
              <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                <CircularProgress />
              </Box>
            ) : (
              <>
                {taskData.length > 0 ? (
                  <TableContainer
                    component={Paper}
                    sx={{
                      flexGrow: 1,
                      overflowY: 'auto', // Enable vertical scroll within this container
                      mb: 2, // Add margin at the bottom to create space for the button
                    }}
                  >
                    <Table>
                      <TableHead sx={{backgroundColor: '#f5f5f5',}}>
                        <TableRow>
                          <TableCell align='center'>Task</TableCell>
                          <TableCell align='center'>Description</TableCell>
                          <TableCell align='center'>Task To</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filteredTasks.map((task) => (
                          <TableRow key={task.id}>
                            <TableCell
                              sx={{
                                color: task.task_complete
                                  ? 'green'
                                  : task.task_pending
                                  ? 'red'
                                  : 'inherit',
                              }}
                              align='center'
                            >
                              {task.task}
                            </TableCell>
                            <TableCell  sx={{
                                color: task.task_complete
                                  ? 'green'
                                  : task.task_pending
                                  ? 'red'
                                  : 'inherit',
                              }} 
                              align='center'>{task.task_description}</TableCell>
                            <TableCell  sx={{
                                color: task.task_complete
                                  ? 'green'
                                  : task.task_pending
                                  ? 'red'
                                  : 'inherit',
                              }}
                              align='center'>{task.task_to}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <Typography variant="subtitle1" align="center">
                    No tasks assigned.
                  </Typography>
                )}
              </>
            )}
  
            {/* Close Button at the bottom */}
            <Grid
              container
              spacing={2}
              justifyContent="flex-end"
              sx={{
                mt: 'auto', // Ensures that the Close button is always at the bottom
              }}
            >
              <Grid item>
                <Button variant="outlined" onClick={onClose}>
                  Close
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Modal>
    );
  };
  

const AssignTaskToStaff = () => {
  const Token = localStorage.getItem('authToken');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [courses, setCourses] = useState([]);
  const [selectedStaffId, setSelectedStaffId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleOpenModal = (id) => {
    setSelectedStaffId(id);
    setModalOpen(true);
  };

  const handleOpenPreview = (id) => {
    setSelectedStaffId(id);
    setPreviewOpen(true);
  };
  
  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await axios.get(`https://crpch.in/api/ka/staff/`, {
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
  }, []);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await axios.get(`https://crpch.in/api/ka/staff/`, {
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

  const handleTaskAddStaff = async (course) => {
    console.log(course);
    try {
      await axios.post(
        `https://crpch.in/api/ka/staff/task-assign/`,
        {
            task: course.task,
            task_description: course.task_description,
            task_from : course.task_from ,
            task_to : course.task_to ,
            task_complete: 'False',
            task_pending: 'True',
            staff: selectedStaffId,
        },
        {
          headers: {
            Authorization: `Token ${Token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setModalOpen(false);
      setSnackbarMessage('Task Assigned successfully!');
      setSnackbarSeverity('success');
    } catch (error) {
      console.error('Error adding task:', error);
      setSnackbarMessage('Failed to add task.');
      setSnackbarSeverity('error');
    } finally {
      setSnackbarOpen(true);
    }
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



  const filteredCourses = courses.filter((course) =>
    course.staff_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Grid container spacing={2} alignItems="center" justifyContent="space-between">
          <Grid item xs={12} sm={6}>
            <Typography variant="h4" component="div">
            Task Assign To Staff
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
              <TableCell align='center'>Email</TableCell>
              <TableCell align='center'>Assign</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
<TableBody>
  {filteredCourses.length > 0 ? (
    filteredCourses
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((course) => (
        <TableRow key={course.id}>
          <TableCell align='center'>{course.staff_name}</TableCell>
          <TableCell align='center'>{course.mobile_no}</TableCell>
          <TableCell align='center'>{course.email}</TableCell>
          <TableCell align='center'>
            <Button
                variant="contained"
                color="primary"
                onClick={() => handleOpenModal(course.id)}
                fullWidth={!(window.innerWidth > 600)}
                >
                Assign Task
            </Button>
          </TableCell>
          <TableCell align='center'>
            <IconButton>
              <PreviewIcon color="primary" onClick={() => handleOpenPreview(course.id)}/>
            </IconButton>
            <IconButton >
              <DeleteIcon color="secondary" />
            </IconButton>
          </TableCell>
        </TableRow>
      ))
  ) : (
    <TableRow>
      <TableCell colSpan={4} align='center'>
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
      <AddTaskStaffModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleTaskAddStaff}
      />

    <TaskPreviewModal
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        staffId={selectedStaffId}
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

export default AssignTaskToStaff;
