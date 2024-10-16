import React, { useState, useEffect , useRef} from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from 'axios';
import {
  Avatar ,
  Tooltip,
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
  CircularProgress
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


const AddStaffModal = ({ open, onClose, onSubmit}) => {
  const [staffName, setStaffName] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [password, setPassword] = useState('');
  const [designations, setDesignations] = useState('');

  const handleSubmit = () => {
    if (staffName) {
      onSubmit({
        staff_name: staffName,
        // category: selectedCategory,
        mobile_no: mobileNo,
        email : email,
        address: description,
        staff_image: image,
        password: password,
        designation: designations,
      });
      // Reset all fields
      setStaffName('');
    //   setSelectedCategory('');
      setMobileNo('');
      setEmail('');
      setDescription('');
      setImage(null);
        setPassword('');
        setDesignations('');
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
            Add Staff
          </Typography>

          {/* Course Name */}
          <TextField
            fullWidth
            variant="outlined"
            label="Staff Name"
            value={staffName}
            onChange={(e) => setStaffName(e.target.value)}
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
                label="Mobile No"
                value={mobileNo}
                onChange={(e) => setMobileNo(e.target.value)}
                required
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                variant="outlined"
                label="Email"   
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                sx={{ mb: 2 }}
              />
            </Grid>
          </Grid>

          {/* Designation */}
          <TextField
            fullWidth
            variant="outlined"
            label="Designation"
            value={designations}
            onChange={(e) => setDesignations(e.target.value)}
            required
            sx={{ mb: 2 }}
          />


          <TextField
            fullWidth
            variant="outlined"
            label="Staff Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={{ mb: 1 }}
          />

          {/* Course Description */}
          <TextField
            fullWidth
            variant="outlined"
            label="Staff Address"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            multiline
            rows={2}
            sx={{ mb: 1 }}
          />

          {/* Upload Image */}
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Button
                variant="outlined"
                component="label"
                startIcon={<UploadFileIcon />}
              >
                Upload Image
                <input
                  type="file"
                  hidden
                  onChange={handleImageUpload}
                />
              </Button>
            </Grid>
            <Grid item>
              {image && (
                <Typography variant="body2">
                  {image.name}
                </Typography>
              )}
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

const Staff = () => {
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
        const response = await axios.get(`https://crpch.in/api/ka/staff/`, {
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

  const handleAddStaff = async (course) => {
    console.log(course, "course");
    try {
      await axios.post(
        `https://crpch.in/api/ka/staff/`,
        {
            staff_name: course.staff_name,
            mobile_no: course.mobile_no,
            email : course.email ,
            password : course.password ,
            address: course.address,
            staff_image: course.staff_image,
            designation: course.designation,
        },
        {
          headers: {
            Authorization: `Token ${Token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setModalOpen(false);
      setSnackbarMessage('Staff added successfully!');
      setSnackbarSeverity('success');
    } catch (error) {
      console.error('Error adding staff:', error);
      setSnackbarMessage('Failed to add staff.');
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

  const idCardRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [studentData, setStudentData] = useState([]);
  const downloadIDCardPDF = async () => {
    if (!idCardRef.current) {
      console.error("ID Card element not found");
      return;
    }

    setIsDownloading(true);

    try {
      const canvas = await html2canvas(idCardRef.current);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = 180; // adjusted for the new card size
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      const x = (pdfWidth - imgWidth) / 2;
      const y = (pdfHeight - imgHeight) / 2;

      pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);
      pdf.save(`${staff_name}_ID_Card.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      // You could add a user-facing error message here
    } finally {
      setIsDownloading(false);
    }
  };

  const handleGetIDCard = async (staffId) => {
    try {
      const response = await axios.get(`https://crpch.in/api/ka/staff/profile/?id=${staffId}`, {
        headers: {
          Authorization: `Token ${Token}`,
        },
      });

 
      setStudentData(response.data.data);
      downloadIDCardPDF();
    }
    catch (error) {
      console.error('Error fetching ID card data:', error);
    }
  }

  const {
    staff_name, email, mobile_no, address, staff_image, staff_unique_ids, 
    BATCH, COURSE, start_date, end_date, gender, dob , password
  } = studentData;

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Grid container spacing={2} alignItems="center" justifyContent="space-between">
          <Grid item xs={12} sm={6}>
            <Typography variant="h4" component="div">
              Staff
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
              + Add Staff
            </Button>
          </Grid>
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
              <TableCell align='center'>ID</TableCell>
              <TableCell align='center'>Name</TableCell>
              <TableCell align='center'>Mobile No</TableCell>
              <TableCell align='center'>Email</TableCell>
              <TableCell align='center'>Password</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
<TableBody>
  {filteredCourses.length > 0 ? (
    filteredCourses
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((course) => (
        <TableRow key={course.id}>
          <TableCell align='center'>{course.staff_unique_ids}</TableCell>
          <TableCell align='center'>{course.staff_name}</TableCell>
          <TableCell align='center'>{course.mobile_no}</TableCell>
          <TableCell align='center'>{course.email}</TableCell>
          <TableCell align='center'>{course.password? course.password : "No Address found"
        }</TableCell>
          <TableCell align='center'>
            <IconButton >
              <DeleteIcon color="secondary" />
            </IconButton>

            <Tooltip title="ID Card" arrow>
            <IconButton onClick={() => handleGetIDCard(course.id)}>
              <VisibilityIcon color="primary" />
            </IconButton>
          </Tooltip>
          </TableCell>
        </TableRow>
      ))
  ) : (
    <TableRow>
      <TableCell colSpan={5} align='center'>
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

           {/* Updated ID Card Design */}
<Box 
  ref={idCardRef} 
  sx={{ 
    position: "absolute",
    left: "-9999px",
    top: 0,
    width: "600px",
    height: "350px",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
  }}
>
  <Box
    sx={{
      width: "100%",
      height: "100%",
      background: "linear-gradient(135deg, #FFD700, #ffffff)", // Updated gradient
      color: "#000", // Changed text color to black
      borderRadius: 4,
      overflow: "hidden",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      display: "flex",
      flexDirection: "column",
    }}
  >
    {/* Header */}
    <Box sx={{ 
      p: 2, 
      background: "rgba(0, 0, 0, 0.1)", 
      display: "flex", 
      justifyContent: "space-between", 
      alignItems: "center"
    }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", color: "#000" }}>Krishna Academy</Typography> {/* Changed text color */}
      <Typography variant="body2" sx={{ color: "#000" }}>Staff ID Card</Typography> {/* Changed text color */}
    </Box>

    {/* Content */}
    <Box sx={{ display: "flex", p: 3, flexGrow: 1 }}>
      {/* Left side - Photo */}
      <Box sx={{ mr: 3 }}>
        <Avatar
          src={`https://crpch.in${staff_image}`}
          sx={{ width: 120, height: 120, border: "4px solid #fff" }}
        />
      </Box>

      {/* Right side - Details */}
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold", color: "#000" }}>{staff_name}</Typography> {/* Changed text color */}
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="body2" sx={{ color: "#000" }}>Reg No:</Typography> {/* Changed text color */}
            <Typography variant="body1" sx={{ fontWeight: "bold", color: "#000" }}>{staff_unique_ids}</Typography> {/* Changed text color */}
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" sx={{ color: "#000" }}>Contact No:</Typography> {/* Changed text color */}
            <Typography variant="body1" sx={{ fontWeight: "bold", color: "#000" }}>{mobile_no}</Typography> {/* Changed text color */}
          </Grid>
  
          <Grid item xs={6}>
            <Typography variant="body2" sx={{ color: "#000" }}>Address:</Typography> {/* Changed text color */}
            <Typography variant="body1" sx={{ fontWeight: "bold", color: "#000" }}>{address}</Typography> {/* Changed text color */}
          </Grid>
        </Grid>
      </Box>
    </Box>

    {/* Footer */}
    <Box sx={{ 
      mt: "auto", 
      p: 1, 
      background: "rgba(0, 0, 0, 0.1)", 
      textAlign: "center"
    }}>
      <Typography variant="body2" sx={{ color: "#000" }}>
        This card is the property of Krishna Academy.
      </Typography> {/* Changed text color */}
    </Box>
  </Box>
</Box>

      <AddStaffModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleAddStaff}
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

export default Staff;
