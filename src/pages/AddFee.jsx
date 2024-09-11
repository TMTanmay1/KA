import React from 'react';
import { TextField, Button, Grid, Typography, Box } from '@mui/material';

function AddFee() {
  return (
    <Box 
      sx={{ 
        padding: '20px', 
        maxWidth: '600px', 
        margin: 'auto',
      }}
    >
      {/* Left aligned heading */}
      <Typography 
        variant="h4" 
        align="left" 
        style={{ marginBottom: '20px' }}
      >
        Add Fees
      </Typography>

      <Grid container spacing={2}>
        {/* Student Name with full width */}
        <Grid item xs={12}>
          <TextField
            label="Student Name"
            required
            variant="outlined"
            fullWidth
          />
        </Grid>

        {/* Belonging Batch and Belonging Course horizontally aligned */}
        <Grid item xs={12} md={6}>
          <TextField
            label="Belonging Batch"
            required
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Belonging Course"
            required
            variant="outlined"
            fullWidth
          />
        </Grid>

        {/* Paid Amount and Due Amount horizontally aligned */}
        <Grid item xs={12} md={6}>
          <TextField
            label="Paid Amount"
            required
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Due Amount"
            required
            variant="outlined"
            fullWidth
          />
        </Grid>

        {/* Course Amount */}
        <Grid item xs={12}>
          <TextField
            label="Course Amount"
            required
            variant="outlined"
            fullWidth
          />
        </Grid>

        {/* Monthly Fee Amount and Of Month horizontally aligned */}
        <Grid item xs={12} md={6}>
          <TextField
            label="Monthly Fee Amount"
            required
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Of Month"
            required
            variant="outlined"
            fullWidth
          />
        </Grid>
      </Grid>

      {/* Buttons aligned at the bottom */}
      <div 
        style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          marginTop: '20px' 
        }}
      >
        <Button 
          variant="outlined" 
          color="secondary"
        >
          Cancel
        </Button>
        <Button 
          variant="contained" 
          color="primary"
        >
          Save
        </Button>
      </div>
    </Box>
  );
}

export default AddFee;
