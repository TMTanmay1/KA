import React, { useState } from 'react';
import { Container, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, TextField, Typography, Checkbox, Button, Snackbar,
    Alert,} from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function SettingsSPage() {
    const navigate = useNavigate();
    const id = useParams().id;
    const currentDate = new Date();
    const month = currentDate.toLocaleString('default', { month: 'long' });
    const year = currentDate.getFullYear();
    const Token = localStorage.getItem('authToken');

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // State for Base Pay
  const [basePay, setBasePay] = useState(0);

  // State for Work Timings (4 weeks with each day having punchInTime, punchOutTime, weekOff, and holiday properties)
  const [workTimings, setWorkTimings] = useState({
    week1: {
      Mon: { punchInTime: '', punchOutTime: '', weekOff: false, holiday: false },
      Tue: { punchInTime: '', punchOutTime: '', weekOff: false, holiday: false },
      Wed: { punchInTime: '', punchOutTime: '', weekOff: false, holiday: false },
      Thu: { punchInTime: '', punchOutTime: '', weekOff: false, holiday: false },
      Fri: { punchInTime: '', punchOutTime: '', weekOff: false, holiday: false },
      Sat: { punchInTime: '', punchOutTime: '', weekOff: false, holiday: false },
      Sun: { punchInTime: '', punchOutTime: '', weekOff: false, holiday: false },
    },
    week2: {
      Mon: { punchInTime: '', punchOutTime: '', weekOff: false, holiday: false },
      Tue: { punchInTime: '', punchOutTime: '', weekOff: false, holiday: false },
      Wed: { punchInTime: '', punchOutTime: '', weekOff: false, holiday: false },
      Thu: { punchInTime: '', punchOutTime: '', weekOff: false, holiday: false },
      Fri: { punchInTime: '', punchOutTime: '', weekOff: false, holiday: false },
      Sat: { punchInTime: '', punchOutTime: '', weekOff: false, holiday: false },
      Sun: { punchInTime: '', punchOutTime: '', weekOff: false, holiday: false },
    },
    week3: {
      Mon: { punchInTime: '', punchOutTime: '', weekOff: false, holiday: false },
      Tue: { punchInTime: '', punchOutTime: '', weekOff: false, holiday: false },
      Wed: { punchInTime: '', punchOutTime: '', weekOff: false, holiday: false },
      Thu: { punchInTime: '', punchOutTime: '', weekOff: false, holiday: false },
      Fri: { punchInTime: '', punchOutTime: '', weekOff: false, holiday: false },
      Sat: { punchInTime: '', punchOutTime: '', weekOff: false, holiday: false },
      Sun: { punchInTime: '', punchOutTime: '', weekOff: false, holiday: false },
    },
    week4: {
      Mon: { punchInTime: '', punchOutTime: '', weekOff: false, holiday: false },
      Tue: { punchInTime: '', punchOutTime: '', weekOff: false, holiday: false },
      Wed: { punchInTime: '', punchOutTime: '', weekOff: false, holiday: false },
      Thu: { punchInTime: '', punchOutTime: '', weekOff: false, holiday: false },
      Fri: { punchInTime: '', punchOutTime: '', weekOff: false, holiday: false },
      Sat: { punchInTime: '', punchOutTime: '', weekOff: false, holiday: false },
      Sun: { punchInTime: '', punchOutTime: '', weekOff: false, holiday: false },
    },
    month: month,
    year: year,
  });

    const workTimingsList = Object.entries(workTimings).map(([key, value]) => ({ key, value }));
  

  // State for Early Leaving Policy
  const [earlyLeavingPolicy, setEarlyLeavingPolicy] = useState({
    fineType: 'Daily',
    fineAmount: 0,
  });

  // State for Late Coming Policy
  const [lateComingPolicy, setLateComingPolicy] = useState({
    fineType: 'Daily',
    fineAmount: 0,
  });

  // State for Overtime Policy
  const [overtimePolicy, setOvertimePolicy] = useState({
    gracePeriod: 0,
    extraHoursPay: 0,
    publicHolidayPay: 0,
    weekOffPay: 0,
  });

  const [currentWeekIndex, setCurrentWeekIndex] = useState(0);
  const weeks = ['week1', 'week2', 'week3', 'week4'];

  // Handler for changing work timings
  const handleWorkTimingsChange = (day, field, value) => {
    setWorkTimings((prev) => ({
      ...prev,
      [weeks[currentWeekIndex]]: {
        ...prev[weeks[currentWeekIndex]],
        [day]: {
          ...prev[weeks[currentWeekIndex]][day],
          [field]: value,
        },
      },
    }));
  };

  const handleNextWeek = () => {
    if (currentWeekIndex < weeks.length - 1) {
      setCurrentWeekIndex(currentWeekIndex + 1);
    }
  };

  const handlePreviousWeek = () => {
    if (currentWeekIndex > 0) {
      setCurrentWeekIndex(currentWeekIndex - 1);
    }
  };

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];


  const [leaveApplicationPolicy, setLeaveApplicationPolicy] = useState({
    leaveType: 'Monthly',
    numberOfLeaves: 0,
  });

const earlyLeavingPolicyList = Object.entries(earlyLeavingPolicy).map(([key, value]) => ({ key, value }));
const lateComingPolicyList = Object.entries(lateComingPolicy).map(([key, value]) => ({ key, value }));
const overtimePolicyList = Object.entries(overtimePolicy).map(([key, value]) => ({ key, value }));
const leaveApplicationPolicyList = Object.entries(leaveApplicationPolicy).map(([key, value]) => ({ key, value }));

  const handleSave = async() => {

    console.log("Base Pay: ", basePay);
    console.log("Work Timings: ", workTimingsList);
    console.log("Early Leaving Policy: ", earlyLeavingPolicyList);
    console.log("Late Coming Policy: ", lateComingPolicyList);
    console.log("Overtime Policy: ", overtimePolicyList);
    console.log("Leave Application Policy: ", leaveApplicationPolicyList);

    try {
        const response = await axios.post(`https://crpch.in/api/ka/staff/settings/?id=${id}`, {
            base_salary: basePay,
            work_timming: workTimingsList,
            early_leaving: earlyLeavingPolicyList,
            late_coming: lateComingPolicyList,
            over_time: overtimePolicyList,
            leave_application: leaveApplicationPolicyList,
        },{
            headers: {
                Authorization: `Token ${Token}`,
                "Content-Type": "application/json",
            },

        });
        setSnackbarMessage('Settings saved successfully');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);

        navigate('/dashboard/staff-settings');

    } catch (error) {
        console.error('Error saving settings:', error);
        setSnackbarMessage('Failed to save settings');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
    }
  }

  return (
    <Container fluid className="d-flex flex-column align-items-center mt-5 p-4" style={{ maxWidth: '1200px' }}>
      {/* Main Heading */}
      <Typography variant="h4" className="mb-4 text-center">
        Settings Page
      </Typography>

      {/* Base Pay Section */}
      <div className="mb-4 w-100">
        <TextField
          fullWidth
          label="* Enter Base Pay"
          variant="outlined"
          value={basePay}
          onChange={(e) => setBasePay(e.target.value)}
          className="mb-3"
        />
      </div>

      {/* Subheading aligned to the left */}
       <div className="d-flex justify-content-between w-100 mb-4">
        <Typography variant="h6" className="mb-4 text-left">
          {`Work Timings for ${weeks[currentWeekIndex].charAt(0).toUpperCase() + weeks[currentWeekIndex].slice(1)}`}
        </Typography>
        <Typography variant="h6" className="mb-4 text-right">
          {`${month} ${year}`}
        </Typography>
      </div>



      {/* Table for Weekdays and Shift Selection */}
       <div className="table-responsive w-100">
        <table className="table table-bordered text-center">
          <thead className="thead-light">
            <tr>
              <th>Day</th>
              <th>Punch In</th>
              <th>Punch Out</th>
              <th>Week Off</th>
              <th>Holiday</th>
            </tr>
          </thead>
          <tbody>
            {days.map((day) => (
              <tr key={day}>
                <td>{day}</td>
                <td>
                  <TextField
                    label="Punch In"
                    type="time"
                    variant="outlined"
                    value={workTimings[weeks[currentWeekIndex]][day].punchInTime}
                    onChange={(e) => handleWorkTimingsChange(day, 'punchInTime', e.target.value)}
                    style={{ width: '150px' }}
                  />
                </td>
                <td>
                  <TextField
                    label="Punch Out"
                    type="time"
                    variant="outlined"
                    value={workTimings[weeks[currentWeekIndex]][day].punchOutTime}
                    onChange={(e) => handleWorkTimingsChange(day, 'punchOutTime', e.target.value)}
                    style={{ width: '150px' }}
                  />
                </td>
                <td>
                  <Checkbox
                    checked={workTimings[weeks[currentWeekIndex]][day].weekOff}
                    onChange={(e) => handleWorkTimingsChange(day, 'weekOff', e.target.checked)}
                  />
                </td>
                <td>
                  <Checkbox
                    checked={workTimings[weeks[currentWeekIndex]][day].holiday}
                    onChange={(e) => handleWorkTimingsChange(day, 'holiday', e.target.checked)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Navigation Buttons */}
      <div className="d-flex justify-content-between w-100 mt-4">
        <Button 
          variant="outlined" 
          onClick={handlePreviousWeek} 
          disabled={currentWeekIndex === 0}
          startIcon={<ArrowBack />}
        >
          Previous
        </Button>
        <Button 
          variant="outlined" 
          onClick={handleNextWeek} 
          disabled={currentWeekIndex === weeks.length - 1}
          endIcon={<ArrowForward />}
        >
          Next
        </Button>
      </div>


       {/* Subheading for Leave Application Policy */}
       <Typography variant="h6" className="mb-4 mt-5 text-left w-100">
        Leave Application Policy
      </Typography>

      {/* Leave Type - Radio Buttons */}
      <FormControl component="fieldset" className="mb-4 w-100">
        <FormLabel component="legend" className="d-block mb-2">Leave Type:</FormLabel>
        <RadioGroup
          row
          aria-label="leave-type"
          name="leave-type"
          value={leaveApplicationPolicy.leaveType}
          onChange={(e) => setLeaveApplicationPolicy({ ...leaveApplicationPolicy, leaveType: e.target.value })}
        >
          <FormControlLabel value="Monthly" control={<Radio />} label="Monthly" />
          <FormControlLabel value="Yearly" control={<Radio />} label="Yearly" />
        </RadioGroup>
      </FormControl>

      {/* Number of Leaves Input */}
      <div className="mb-3 w-100">
        <TextField
          fullWidth
          label="* Number of Leaves"
          variant="outlined"
          value={leaveApplicationPolicy.numberOfLeaves}
          onChange={(e) => setLeaveApplicationPolicy({ ...leaveApplicationPolicy, numberOfLeaves: e.target.value })}
          className="mb-3"
        />
      </div>

      {/* Subheading for Early Leaving Policy */}
      <Typography variant="h6" className="mb-4 mt-5 text-left w-100">
        Early Leaving Policy
      </Typography>

      {/* Fine Type - Radio Buttons */}
      <FormControl component="fieldset" className="mb-4 w-100">
        <FormLabel component="legend" className="d-block mb-2">Fine Type:</FormLabel>
        <RadioGroup
          row
          aria-label="fine-type"
          name="fine-type"
          value={earlyLeavingPolicy.fineType}
          onChange={(e) => setEarlyLeavingPolicy({ ...earlyLeavingPolicy, fineType: e.target.value })}
        >
          <FormControlLabel value="Daily" control={<Radio />} label="Daily" />
          <FormControlLabel value="Hourly" control={<Radio />} label="Hourly" />
        </RadioGroup>
      </FormControl>

      {/* Grace Period, Fine Amount, Waive Off Days */}
      {/* <div className="mb-3 w-100">
        <TextField
          fullWidth
          label="* Grace Period (mins)"
          variant="outlined"
          value={earlyLeavingPolicy.gracePeriod}
          onChange={(e) => setEarlyLeavingPolicy({ ...earlyLeavingPolicy, gracePeriod: e.target.value })}
          className="mb-3"
        />
      </div> */}

      <div className="mb-3 w-100">
        <TextField
          fullWidth
          label="* Fine Amount"
          variant="outlined"
          value={earlyLeavingPolicy.fineAmount}
          onChange={(e) => setEarlyLeavingPolicy({ ...earlyLeavingPolicy, fineAmount: e.target.value })}
          className="mb-3"
        />
      </div>

      {/* <div className="mb-3 w-100">
        <TextField
          fullWidth
          label="* Waive Off Days"
          variant="outlined"
          value={earlyLeavingPolicy.waiveOffDays}
          onChange={(e) => setEarlyLeavingPolicy({ ...earlyLeavingPolicy, waiveOffDays: e.target.value })}
          className="mb-3"
        />
      </div> */}

      {/* Subheading for Late Coming Policy */}
      <Typography variant="h6" className="mb-4 mt-5 text-left w-100">
        Late Coming Policy
      </Typography>

      {/* Fine Type - Radio Buttons for Late Coming Policy */}
      <FormControl component="fieldset" className="mb-4 w-100">
        <FormLabel component="legend" className="d-block mb-2">Fine Type:</FormLabel>
        <RadioGroup
          row
          aria-label="late-fine-type"
          name="late-fine-type"
          value={lateComingPolicy.fineType}
          onChange={(e) => setLateComingPolicy({ ...lateComingPolicy, fineType: e.target.value })}
        >
          <FormControlLabel value="Daily" control={<Radio />} label="Daily" />
          <FormControlLabel value="Hourly" control={<Radio />} label="Hourly" />
        </RadioGroup>
      </FormControl>

      {/* Grace Period, Fine Amount, Waive Off Days for Late Coming */}
      {/* <div className="mb-3 w-100">
        <TextField
          fullWidth
          label="* Grace Period (mins)"
          variant="outlined"
          value={lateComingPolicy.gracePeriod}
          onChange={(e) => setLateComingPolicy({ ...lateComingPolicy, gracePeriod: e.target.value })}
          className="mb-3"
        />
      </div> */}

      <div className="mb-3 w-100">
        <TextField
          fullWidth
          label="* Fine Amount"
          variant="outlined"
          value={lateComingPolicy.fineAmount}
          onChange={(e) => setLateComingPolicy({ ...lateComingPolicy, fineAmount: e.target.value })}
          className="mb-3"
        />
      </div>

      {/* <div className="mb-3 w-100">
        <TextField
          fullWidth
          label="* Waive Off Days"
          variant="outlined"
          value={lateComingPolicy.waiveOffDays}
          onChange={(e) => setLateComingPolicy({ ...lateComingPolicy, waiveOffDays: e.target.value })}
          className="mb-3"
        />
      </div> */}

      {/* Subheading for Overtime Policy */}
      <Typography variant="h6" className="mb-4 mt-5 text-left w-100">
        Overtime Policy
      </Typography>

      {/* Overtime Policy Inputs */}
      <div className="mb-3 w-100">
        <TextField
          fullWidth
          label="* Grace Period (mins)"
          variant="outlined"
          value={overtimePolicy.gracePeriod}
          onChange={(e) => setOvertimePolicy({ ...overtimePolicy, gracePeriod: e.target.value })}
          className="mb-3"
        />
      </div>

      <div className="mb-3 w-100">
        <TextField
          fullWidth
          label="* Extra Hours Pay"
          variant="outlined"
          value={overtimePolicy.extraHoursPay}
          onChange={(e) => setOvertimePolicy({ ...overtimePolicy, extraHoursPay: e.target.value })}
          className="mb-3"
        />
      </div>

      <div className="mb-3 w-100">
        <TextField
          fullWidth
          label="* Public Holiday Pay"
          variant="outlined"
          value={overtimePolicy.publicHolidayPay}
          onChange={(e) => setOvertimePolicy({ ...overtimePolicy, publicHolidayPay: e.target.value })}
          className="mb-3"
        />
      </div>

      <div className="mb-3 w-100">
        <TextField
          fullWidth
          label="* Week Off Pay"
          variant="outlined"
          value={overtimePolicy.weekOffPay}
          onChange={(e) => setOvertimePolicy({ ...overtimePolicy, weekOffPay: e.target.value })}
          className="mb-3"
        />
      </div>

        {/* Save Button */}
        <Button variant="contained" color="primary" className="mt-5" fullWidth onClick={handleSave}>
            Save
        </Button>

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
}

export default SettingsSPage;
