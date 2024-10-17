import React, { useState, useEffect } from 'react';
import { Container, Grid, TextField, Button, Typography, MenuItem, Select, InputLabel, FormControl, Checkbox, ListItemText } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function Notify() {
    const Token = localStorage.getItem('authToken');
    
    const [batches, setBatches] = useState([]); // State to store fetched batches
    const [selectedBatches, setSelectedBatches] = useState([]); // State for selected batches
    const [staffList, setStaffList] = useState([]); // State to store fetched staff data
    const [selectedStaff, setSelectedStaff] = useState([]); // State for selected staff members
    const [fileName, setFileName] = useState('');
    const [msg, setMsg] = useState(''); // State for message text area
    const [fileData, setFileData] = useState(null); // State to store the uploaded file content (Base64)

    // Fetch batch data from the API
    useEffect(() => {
        axios.get('https://crpch.in/api/ka/batch/', {
            headers: {
                Authorization: `Token ${Token}`,
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (response.data.status) {
                    setBatches(response.data.data);
                }
            })
            .catch(error => console.log('Error fetching batch data:', error));
    }, [Token]);

    // Fetch staff data from the API
    useEffect(() => {
        axios.get('https://crpch.in/api/ka/staff/', {
            headers: {
                Authorization: `Token ${Token}`,
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (response.data.status) {
                    setStaffList(response.data.table_data);
                }
            })
            .catch(error => console.log('Error fetching staff data:', error));
    }, [Token]);

    // Handle file upload and convert it to Base64
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileName(file.name);

            const reader = new FileReader();
            reader.onloadend = () => {
                setFileData(reader.result.split(',')[1]); // Store Base64 data
            };
            reader.readAsDataURL(file);
        } else {
            setFileName('');
            setFileData(null);
        }
    };

    const handleBatchChange = (event) => {
        const value = event.target.value;
        if (value.includes('all')) {
            setSelectedBatches(selectedBatches.length === batches.length ? [] : batches.map(batch => batch.id));
        } else {
            setSelectedBatches(value);
        }
    };

    const handleStaffChange = (event) => {
        const value = event.target.value;
        if (value.includes('all')) {
            setSelectedStaff(selectedStaff.length === staffList.length ? [] : staffList.map(staff => staff.id));
        } else {
            setSelectedStaff(value);
        }
    };

    // Handle form submit
    const handleSubmit = () => {
        const payload = {
            batches: selectedBatches, // Send selected batch IDs
            staff: selectedStaff,     // Send selected staff IDs
            message: msg,             // Send the message text
            media: fileData,          // Send the Base64 string of the file
        };

        console.log('Payload:', payload);

        // Post payload to the API
        // axios.post('https://crpch.in/', payload, {
        //     headers: {
        //         Authorization: `Token ${Token}`,
        //         'Content-Type': 'application/json',
        //     },
        // })
        //     .then(response => {
        //         console.log('Notification sent successfully:', response.data);
        //     })
        //     .catch(error => {
        //         console.error('Error sending notification:', error);
        //     });
    };

    return (
        <Container className="mt-5">
            {/* Centered Heading */}
            <Typography variant="h4" align="center" gutterBottom>
                Notify Here
            </Typography>

            {/* Dropdowns */}
            <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth>
                        <InputLabel>Select Batch</InputLabel>
                        <Select
                            label="Select Batch"
                            multiple
                            value={selectedBatches}
                            onChange={handleBatchChange}
                            renderValue={(selected) =>
                                selected.length === batches.length
                                    ? 'All Batches'
                                    : batches.filter(batch => selected.includes(batch.id)).map(batch => batch.BATCH_name).join(', ')
                            }
                        >
                            <MenuItem value="all">
                                <Checkbox checked={selectedBatches.length === batches.length} />
                                <ListItemText primary="Select All" />
                            </MenuItem>
                            {batches.map((batch) => (
                                <MenuItem key={batch.id} value={batch.id}>
                                    <Checkbox checked={selectedBatches.includes(batch.id)} />
                                    <ListItemText primary={batch.BATCH_name} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                {/* Second Dropdown for Staff */}
                <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth>
                        <InputLabel>Select Staff</InputLabel>
                        <Select
                            label="Select Staff"
                            multiple
                            value={selectedStaff}
                            onChange={handleStaffChange}
                            renderValue={(selected) =>
                                selected.length === staffList.length
                                    ? 'All Staff'
                                    : staffList.filter(staff => selected.includes(staff.id)).map(staff => staff.staff_name).join(', ')
                            }
                        >
                            <MenuItem value="all">
                                <Checkbox checked={selectedStaff.length === staffList.length} />
                                <ListItemText primary="Select All" />
                            </MenuItem>
                            {staffList.map((staff) => (
                                <MenuItem key={staff.id} value={staff.id}>
                                    <Checkbox checked={selectedStaff.includes(staff.id)} />
                                    <ListItemText primary={staff.staff_name} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>

            {/* Textarea for message */}
            <Grid container spacing={3} justifyContent="center" className="mt-4">
                <Grid item xs={12} sm={10} md={8}>
                    <TextField
                        fullWidth
                        label="Write your message"
                        multiline
                        rows={4}
                        variant="outlined"
                        value={msg}
                        onChange={(e) => setMsg(e.target.value)} // Update message state
                    />
                </Grid>
            </Grid>

            {/* Upload Media Button */}
            <Grid container spacing={3} justifyContent="center" className="mt-4">
                <Grid item xs={12} sm={10} md={8}>
                    <Button variant="contained" component="label" fullWidth>
                        Upload Media
                        <input type="file" hidden onChange={handleFileUpload} />
                    </Button>
                    {fileName && (
                        <Typography variant="body1" align="center" className="mt-2">
                            File uploaded: {fileName}
                        </Typography>
                    )}
                </Grid>
            </Grid>

            {/* Submit Button */}
            <Grid container spacing={3} justifyContent="center" className="mt-4">
                <Grid item xs={12} sm={10} md={8}>
                    <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
                        Submit
                    </Button>
                </Grid>
            </Grid>

            <Typography variant="body1" align="center" className="mt-4">
                Note: This is a dummy form. The actual API endpoint is not implemented.
            </Typography>
        </Container>
    );
}

export default Notify;
