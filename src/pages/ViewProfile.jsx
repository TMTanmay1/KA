import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, Card, CardContent, Button, Avatar } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ViewProfile = () => {
  const Token = localStorage.getItem('authToken');
  const location = useLocation();
  const navigate = useNavigate();
  const sData = location.state?.student;
  const studentId = sData.id;

  const [studentData, setStudentData] = useState(null);

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
    BATCH, COURSE, start_date, end_date, gender, dob, password
  } = studentData;

  // Handle multiple or single courses
  const courses = Array.isArray(COURSE) ? COURSE : [COURSE];
  // Handle multiple or single batches
  const batches = Array.isArray(BATCH) ? BATCH : [BATCH];

  // Function to download the profile as a PDF
  const downloadPDF = () => {
    const profileContent = document.getElementById("profile-content");
    html2canvas(profileContent, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "a4",
      });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("StudentProfile.pdf");
    });
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
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              startIcon={<EditIcon />}
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
    </Box>
  );
};

export default ViewProfile;
