import React, { useEffect, useState } from 'react';
import { Box, Typography, Divider, Avatar, Grid, Paper, Card, CardContent, Button , Tooltip} from '@mui/material';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import DownloadIcon from '@mui/icons-material/Download';

const LedgerPage = () => {
  const [student, setStudent] = useState(null);
  const [ledger, setLedger] = useState([]);
  const location = useLocation();
  const Token = localStorage.getItem('authToken');

  const sData = location.state?.student;
  const studentId = sData.id;

  useEffect(() => {
    if (studentId) {
      axios
        .get(`https://crpch.in/api/ka/ledger/?student_id=${studentId}`, {
          headers: {
            Authorization: `Token ${Token}`,
          },
        })
        .then((response) => {
          if (response.data.status) {
            setStudent(response.data.student);  // Set the student details
            setLedger(response.data.ledger);    // Set the ledger entries
          }
        })
        .catch((error) => {
          console.error('Error fetching ledger data:', error);
        });
    }
  }, [studentId, Token]);

  if (!student) {
    return <Typography>Loading...</Typography>;
  }

  const downloadPDF = () => {
    const doc = new jsPDF();
  
    // Title
    doc.setFontSize(20);
    const title = 'Student Ledger';
    const titleWidth = doc.getTextWidth(title);
    const titleX = (doc.internal.pageSize.width - titleWidth) / 2; // Center the title
    doc.text(titleX, 22, title);
    
    // Underline the title
    const titleY = 22; // Y position of the title
    doc.setLineWidth(0.5);
    doc.line(titleX, titleY + 2, titleX + titleWidth, titleY + 2); // Underline
  
    // Student details
    doc.setFontSize(12);
    const detailsX = 14; // Starting X position for details
    const detailsYStart = 40; // Starting Y position for details
  
    // Prepare student details in two columns
    const details = [
      `Name: ${student.name}`,
      `Batch: ${student.BATCH.BATCH_name}`,
      `Course: ${student.COURSE.COURSE_name}`,
      `Mobile: ${student.mobile_no}`,
      `DOB: ${student.dob}`,
    ];
  
    const halfPageWidth = doc.internal.pageSize.width / 2;
  
    // Add details to the PDF
    details.forEach((detail, index) => {
      const isEven = index % 2 === 0;
      const xPos = isEven ? detailsX : halfPageWidth + 10; // Add some margin to the second column
      const yPos = detailsYStart + Math.floor(index / 2) * 10; // Increment Y position for every 2 rows
      doc.text(xPos, yPos, detail);
    });
  
    // Add a space before the table
    doc.text('', 14, detailsYStart + 20); // Adjust for spacing before table
  
    // Add ledger table
    const tableData = ledger.map(entry => [
      new Date(entry.payment_date).toLocaleDateString(),
      entry.payment_amount,
      entry.due_amount,
    ]);
    
    const tableColumns = ['Transaction Date', 'Amount', 'Due Amount'];
  
    doc.autoTable({
      head: [tableColumns],
      body: tableData,
      startY: detailsYStart + 30, // Starting position of the table
      margin: { horizontal: 10 },
      theme: 'grid',
    });
  
    // Save the PDF
    doc.save(`${student.name} Ledger.pdf`);
  };
  

  return (
    <Box sx={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* Top Section with Student Image and Details */}
      <Paper elevation={4} sx={{ padding: '20px', borderRadius: '12px', marginBottom: '30px', display: 'flex', alignItems: 'center', backgroundColor: '#f0f4f8' }}>
        <Avatar
          src={`https://crpch.in${student.student_photo}`}
          alt={student.name}
          sx={{ width: 100, height: 100, marginRight: '20px', border: '2px solid #3f51b5' }}
        />
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{student.name}</Typography>
          <Typography variant="subtitle1" color="textSecondary">Batch: {student.BATCH.BATCH_name}</Typography>
          <Typography variant="subtitle1" color="textSecondary">Course: {student.COURSE.COURSE_name}</Typography>
          <Typography variant="subtitle1" color="textSecondary">Mobile: {student.mobile_no}</Typography>
          <Typography variant="subtitle1" color="textSecondary">DOB: {student.dob}</Typography>
        </Box>
        <Box sx={{ marginLeft: 'auto', textAlign: 'right' }}>
        <Tooltip title="Download Ledger" arrow>
            <Button 
              variant="contained" 
              onClick={downloadPDF} 
              sx={{
                backgroundColor: '#FF5722', // Custom color
                color: 'white', // Text color
                borderRadius: '50%', // Make the button round
                minWidth: '56px', // Minimum width to accommodate the icon
                minHeight: '56px', // Minimum height to accommodate the icon
                '&:hover': {
                  backgroundColor: '#E64A19', // Darker shade on hover
                }
              }}
            >
              <DownloadIcon />
            </Button>
          </Tooltip>
        </Box>
      </Paper>

      {/* Divider */}
      <Divider sx={{ marginBottom: '30px' }} />

      {/* Ledger Section */}
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '20px' }}>Ledger</Typography>

        {/* Ledger Entries */}
        <Grid container spacing={3}>
        {ledger.length > 0 ? (
            ledger.map((entry) => (
              <Grid item xs={12} md={4} key={entry.id}>
                <Card
  elevation={2}
  sx={{
    borderRadius: '12px',
    background: 'linear-gradient(135deg, #f2994a, #f2c94c)', // Orange to yellow gradient
    color: '#ffffff', // White text for better contrast
  }}
>
  <CardContent>
    <Typography variant="body2" sx={{ opacity: 1 }}>
      Transaction Date
    </Typography>
    <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px', color:"black" }}>
      {new Date(entry.payment_date).toLocaleDateString()}
    </Typography>

    <Typography variant="body2" sx={{ opacity: 1 }}>
      Amount
    </Typography>
    <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px', color:"black" }}>
      ₹{entry.payment_amount}
    </Typography>

    <Typography variant="body2" sx={{ opacity: 1 }}>
      Due Amount
    </Typography>
    <Typography variant="h6" sx={{ fontWeight: 'bold', color:"black" }}>
      ₹{entry.due_amount}
    </Typography>
  </CardContent>
</Card>

              </Grid>
            ))
          ) : (
            <Typography>No ledger entries available</Typography>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default LedgerPage;
