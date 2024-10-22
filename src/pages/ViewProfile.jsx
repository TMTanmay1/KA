import React, { useEffect, useState, useRef } from "react";
import { Box, Grid, Typography, Card, CardContent, Button, Avatar,CircularProgress } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import FileDownloadIcon from '@mui/icons-material/FileDownload';

const ViewProfile = () => {
  const Token = localStorage.getItem('authToken');
  const user = localStorage.getItem('user');
  const location = useLocation();
  const navigate = useNavigate();
  const sData = location.state?.student;
  const studentId = sData.id;

  const [studentData, setStudentData] = useState(null);
  const idCardRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const profileCardRef = useRef(null);
  const [isDownloadingProfile, setIsDownloadingProfile] = useState(false);

  // Fetch student profile data using API call
  useEffect(() => {
    const fetchStudentProfile = async () => {
      try {
        const response = await axios.get(`https://crpch.in/api/ka/student_profile/?student_id=${studentId}`, {
          headers: {
            'Authorization': `Token ${Token}`
          }
        });
        
        if (response.data.status) {
          setStudentData(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    if (studentId) {
      fetchStudentProfile();
    }
  }, [studentId, Token]);

  if (!studentData) {
    return <Typography>Loading...</Typography>; // Loader while fetching data
  }

  const {
    name, email, mobile_no, address, student_photo, 
    BATCH, COURSE, start_date, end_date, gender, dob, password, reg_no
  } = studentData;

  // Handle multiple or single courses
  const courses = Array.isArray(COURSE) ? COURSE : [COURSE];
  // Handle multiple or single batches
  const batches = Array.isArray(BATCH) ? BATCH : [BATCH];

  // Function to download the profile as a PDF
  // const downloadPDF = () => {
  //   const profileContent = document.getElementById("profile-content");
  //   html2canvas(profileContent, { scale: 2 }).then((canvas) => {
  //     const imgData = canvas.toDataURL("image/png");
  //     const pdf = new jsPDF({
  //       orientation: "landscape",
  //       unit: "pt",
  //       format: "a4",
  //     });
  //     const pdfWidth = pdf.internal.pageSize.getWidth();
  //     const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  //     pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  //     pdf.save(`${studentData.name} Profile.pdf`);
  //   });
  // };

  const downloadProfilePDF = async () => {
    if (!profileCardRef.current) return;
    setIsDownloadingProfile(true);
    try {
      const canvas = await html2canvas(profileCardRef.current, { useCORS: true });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const imgWidth = pdfWidth - 20; // 10mm margin on each side
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      pdf.save(`${studentData.name}_Profile.pdf`);
    } catch (error) {
      console.error("Error generating Profile PDF:", error);
    } finally {
      setIsDownloadingProfile(false);
    }
  };


  const downloadIDCardPDF = async () => {
    if (!idCardRef.current) {
      console.error("ID Card element not found");
      return;
    }

    setIsDownloading(true);

    try {
      const canvas = await html2canvas(idCardRef.current, { useCORS: true });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = 180; // adjusted for the new card size
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      const x = (pdfWidth - imgWidth) / 2;
      const y = (pdfHeight - imgHeight) / 2;

      pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);
      pdf.save(`${name}_ID_Card.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      // You could add a user-facing error message here
    } finally {
      setIsDownloading(false);
    }
  };


  return (
    <Box sx={{ flexGrow: 1, p: 3, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Card sx={{ maxWidth: 900, mx: "auto", p: 3, borderRadius: 3 }}>
        <Box id="profile-content"> {/* The content to capture for the PDF */}
          <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
            {/* Profile Photo */}
            <Avatar
              src={`https://crpch.in${student_photo}`}
              sx={{
                width: 150,
                height: 150,
                border: "4px solid #1976d2",
                boxShadow: 3,
              }}
            />
          </Box>

          <Typography variant="h4" gutterBottom align="center">
            Student Profile
          </Typography>

          <Grid container spacing={3}>
            {/* Basic Details */}
            <Grid item xs={12} sm={6}>
              <CardContent>
              <Typography variant="body1" sx={{ mt: 2 }}>
                <strong>Student ID:</strong> {reg_no}
              </Typography>
                <Typography variant="h6" color="textSecondary">
                  Basic Details
                </Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>
                  <strong>Name:</strong> {name}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  <strong>Email:</strong> {email || "N/A"}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  <strong>Contact:</strong> {mobile_no}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  <strong>Address:</strong> {address}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  <strong>Date of Birth:</strong> {dob}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  <strong>Gender:</strong> {gender}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  <strong>Password:</strong> {password}
                </Typography>

              </CardContent>
            </Grid>

            {/* Batch and Course Details */}
            <Grid item xs={12} sm={6}>
              <CardContent>
                <Typography variant="h6" color="textSecondary">
                  Batch & Course Details
                </Typography>

                {batches.map((batch, index) => (
                  <Box key={index} sx={{ mt: 2 }}>
                    <Typography variant="body1">
                      <strong>Batch:</strong> {batch.BATCH_name}
                    </Typography>
                  </Box>
                ))}

                {courses.map((course, index) => (
                  <Box key={index} sx={{ mt: 2 }}>
                    <Typography variant="body1">
                      <strong>Course:</strong> {course.COURSE_name}
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                      <strong>Fee:</strong> ₹{course.COURSE_fee}
                    </Typography>
                  </Box>
                ))}

                <Typography variant="body1" sx={{ mt: 1 }}>
                  <strong>Overall Start Date:</strong> {start_date}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  <strong>Overall End Date:</strong> {end_date}
                </Typography>
              </CardContent>
            </Grid>
          </Grid>
        </Box>

        {/* Action Buttons */}
        <Grid container spacing={2} sx={{ mt: 4 }} justifyContent="center">
          {/* <Grid item>
            <Button
              variant="contained"
              color="primary"
              startIcon={<FileDownloadIcon />}
              onClick={downloadPDF} // Trigger the PDF download
              sx={{
                px: 4,
                py: 1,
                backgroundColor: "#1976d2",
                "&:hover": { backgroundColor: "#115293" },
              }}
            >
              Download Profile
            </Button>
          </Grid> */}

          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              startIcon={isDownloadingProfile ? <CircularProgress size={20} color="inherit" /> : <FileDownloadIcon />}
              onClick={downloadProfilePDF}
              disabled={isDownloadingProfile}
              sx={{
                px: 4,
                py: 1,
                backgroundColor: "#9c27b0",
                "&:hover": { backgroundColor: "#7b1fa2" },
              }}
            >
              {isDownloadingProfile ? "Downloading..." : "Download Profile"}
            </Button>
          </Grid>

          <Grid item>
            <Button
              variant="contained"
              color="primary"
              startIcon={isDownloading ? <CircularProgress size={20} color="inherit" /> : <FileDownloadIcon />}
              onClick={downloadIDCardPDF}
              disabled={isDownloading}
              sx={{
                px: 4,
                py: 1,
                backgroundColor: "#1976d2",
                "&:hover": { backgroundColor: "#115293" },
              }}
            >
              {isDownloading ? "Downloading..." : "Download ID"}
            </Button>
          </Grid> 

          <Grid item>
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate(-1)} // Go back to the previous page
              sx={{
                px: 4,
                py: 1,
                color: "#1976d2",
                borderColor: "#1976d2",
                "&:hover": { borderColor: "#115293" },
              }}
            >
              Go Back
            </Button>
          </Grid>
        </Grid>
      </Card>

       {/* Updated ID Card Design */}
       <Box 
  ref={idCardRef} 
  sx={{ 
    position: "absolute",
    left: "-9999px",
    top: 0,
    width: "350px", // Portrait width
    height: "600px", // Portrait height
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
  }}
>
  <Box
    sx={{
      width: "100%",
      height: "100%",
      background: "linear-gradient(135deg, #1976d2, #FFD700)",
      color: "#fff",
      borderRadius: 4,
      overflow: "hidden",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      display: "flex",
      flexDirection: "column", // Vertical alignment
    }}
  >
    {/* Header */}
    <Box sx={{ 
      p: 2, 
      background: "rgba(0, 0, 0, 0.1)", 
      display: "flex", 
      flexDirection: "column", // Stack the header items vertically
      alignItems: "center", // Center align header content
    }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", textAlign: "center" }}>{user}</Typography>
      <Typography variant="body2" sx={{ textAlign: "center" }}>Student ID Card</Typography>
    </Box>

    {/* Content */}
    <Box sx={{ display: "flex", flexDirection: "column", p: 2, flexGrow: 1, alignItems: "center" }}>
      {/* Top - Photo */}
      <Box sx={{ mb: 3 }}>
        <Avatar
          src={`https://crpch.in${student_photo}`}
          sx={{ width: 120, height: 120, border: "4px solid #fff" }}
        />
      </Box>

      {/* Bottom - Details */}
      <Box sx={{ width: "100%" }}>
        <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold", textAlign: "center" }}>{name}</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="body2" sx={{ textAlign: "center" }}>Reg No:</Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold", textAlign: "center" }}>{reg_no}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" sx={{ textAlign: "center" }}>Course:</Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold", textAlign: "center" }}>{courses[0]?.COURSE_name}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" sx={{ textAlign: "center" }}>Batch:</Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold", textAlign: "center" }}>{batches[0]?.BATCH_name}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" sx={{ textAlign: "center" }}>Valid Till:</Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold", textAlign: "center" }}>{end_date}</Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>

    {/* Footer */}
    <Box sx={{ 
      mt: "auto", 
      p: 2, 
      background: "rgba(0, 0, 0, 0.1)", 
      textAlign: "center"
    }}>
      <Typography variant="body2">
        This card is the property of student.
      </Typography>
    </Box>
  </Box>
</Box>



       {/* Hidden Profile Card for PDF */}
<Box 
  ref={profileCardRef} 
  sx={{ 
    position: "absolute",
    left: "-9999px",
    top: 0,
    width: "800px",
    height: "1123px", // Standard A4 page height
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    backgroundColor: "#fff",
    padding: "40px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between", // To push the last element to the bottom
  }}
>
  {/* Header */}
  <Box>
    <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', mb: 4 }}>
      Student Profile
    </Typography>
    
    {/* Profile Section */}
    <Grid container spacing={3}>
      <Grid item xs={4}>
        <Avatar
          src={`https://crpch.in${studentData.student_photo}`}
          
          sx={{ width: 150, height: 150, margin: "0 auto", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)" }}
        />
      </Grid>
      <Grid item xs={8}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>{studentData.name}</Typography>
        <Typography>Reg No: {studentData.reg_no}</Typography>
        <Typography>Course: {studentData.COURSE.COURSE_name}</Typography>
        <Typography>Batch: {studentData.BATCH.BATCH_name}</Typography>
      </Grid>
    </Grid>
  </Box>

  {/* Personal and Contact Information */}
  <Grid container spacing={4} sx={{ mt: 4 }}>
    <Grid item xs={6}>
      <Typography variant="h6" sx={{ fontWeight: 'bold', borderBottom: '2px solid #ccc', pb: 1, mb: 2 }}>
        Personal Information
      </Typography>
      <Typography>Gender: {studentData.gender}</Typography>
      <Typography>Date of Birth: {studentData.dob}</Typography>
      <Typography>Father's Name: {studentData.father_name}</Typography>
      <Typography>Mother's Name: {studentData.mother_name}</Typography>
      <Typography>Marital Status: {studentData.marital_status}</Typography>
      <Typography>Religion: {studentData.religion}</Typography>
      <Typography>Category: {studentData.category}</Typography>
      <Typography>Qualification: {studentData.qualification}</Typography>
    </Grid>
    <Grid item xs={6}>
      <Typography variant="h6" sx={{ fontWeight: 'bold', borderBottom: '2px solid #ccc', pb: 1, mb: 2 }}>
        Contact Information
      </Typography>
      <Typography>Mobile: {studentData.mobile_no}</Typography>
      <Typography>Address: {studentData.address}</Typography>
      <Typography>Village: {studentData.village}</Typography>
      <Typography>City: {studentData.city}</Typography>
      <Typography>District: {studentData.district}</Typography>
      <Typography>State: {studentData.state}</Typography>
      <Typography>Pincode: {studentData.pincode}</Typography>
    </Grid>
  </Grid>

  {/* Course Details */}
  <Grid container sx={{ mt: 4 }}>
    <Grid item xs={12}>
      <Typography variant="h6" sx={{ fontWeight: 'bold', borderBottom: '2px solid #ccc', pb: 1, mb: 2 }}>
        Course Details
      </Typography>
      <Typography>Course: {studentData.COURSE.COURSE_name}</Typography>
      <Typography>Description: {studentData.COURSE.COURSE_description}</Typography>
      <Typography>Duration: {studentData.COURSE_duration} months</Typography>
      <Typography>Fee: ₹{studentData.COURSE.COURSE_fee}</Typography>
      <Typography>Start Date: {studentData.start_date}</Typography>
      <Typography>End Date: {studentData.end_date}</Typography>
      <Typography>Total Paid Amount: ₹{studentData.total_paid_amount}</Typography>
    </Grid>
  </Grid>

  {/* Footer Disclaimer */}
  <Box sx={{ 
    mt: 'auto', 
    borderTop: "1px solid #ccc", 
    paddingTop: 2, 
    textAlign: "center" 
  }}>
    <Typography variant="body2" sx={{ color: "#666" }}>
      This document is computer-generated and does not require a signature.
    </Typography>
  </Box>
</Box>

    </Box>
  );
};

export default ViewProfile;
