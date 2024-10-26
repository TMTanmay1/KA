import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Grid, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import CL from '../assets/CL.webp';

function CreateLicense() {
  const [formData, setFormData] = useState({
    instituteName: '',
    ownerName: '',
    mobileNo: '',
    email: '',
    adminPassword: '',
    staffIdSlno: '',
    studentIdSlno: '',
    logo: ''
  });
  const [fileName, setFileName] = useState('');

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({ ...prevData, logo: reader.result }));
      };
      reader.readAsDataURL(file);
      setFileName(file.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

        // const response = await axios.post('http://localhost:5000/api/license', formData,{
        //     headers: {
        //         'Content-Type': 'multipart/form-data',
        //         'Authorization': `Token ${localStorage.getItem('token')}`,
        //     },

        // });
   
      console.log(formData);
      setSnackbarMessage('License created successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage('Failed to create license.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5', py: 5 }}>
      <Box
        sx={{
          height: 200,
          backgroundImage: `url(${CL})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 4,
        }}
      >

{/*         
        <Typography variant="h4" color="black" sx={{ fontWeight: 'bold' }}>
          Create License
        </Typography> */}
      </Box>

      <Box sx={{ maxWidth: 800, mx: 'auto', px: 2 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Institute Name"
                name="instituteName"
                variant="outlined"
                value={formData.instituteName}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Owner Name"
                name="ownerName"
                variant="outlined"
                value={formData.ownerName}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Mobile No"
                name="mobileNo"
                variant="outlined"
                type="tel"
                value={formData.mobileNo}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                variant="outlined"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Admin Password"
                name="adminPassword"
                variant="outlined"
                type="password"
                value={formData.adminPassword}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Staff ID Serial No"
                name="staffIdSlno"
                variant="outlined"
                value={formData.staffIdSlno}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Student ID Serial No"
                name="studentIdSlno"
                variant="outlined"
                value={formData.studentIdSlno}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button variant="contained" component="label" sx={{ width: '100%', height: '56px' }}>
                Upload Logo
                <input type="file" hidden onChange={handleFileChange} />
              </Button>
              {fileName && (
                <Typography variant="body2" sx={{ mt: 1, color: 'gray', textAlign: 'center' }}>
                  {fileName}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2}}>
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>

      <Snackbar open={snackbarOpen} autoHideDuration={4000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default CreateLicense;
