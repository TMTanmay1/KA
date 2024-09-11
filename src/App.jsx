import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppLayout from './components/AppLayout.jsx';
import BatchRegistration from './pages/BatchRegistration.jsx';
import Home from './pages/Home.jsx';
import StudentRegistration from './pages/StudentRegistration.jsx';
import CourseCategory from './pages/CourseCategory.jsx';
import Course from './pages/Course.jsx';
import Income from './pages/Income.jsx';
import Expense from './pages/Expense.jsx';
import RegisteredStudents from './pages/RegisteredStudents.jsx';
import AppliedStudent from './pages/AppliedStudent.jsx';
import OnboardingStudent from './pages/OnboardingStudent.jsx';
import AddFee from './pages/AddFee.jsx';

function App() {
  return (
    // <ThemeProvider theme={theme}>
      <Router>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="batch-registration" element={<BatchRegistration />} />
          <Route path="student-registration" element={<StudentRegistration />} />
          <Route path="manage-course-category" element={<CourseCategory />} />
          <Route path="course" element={<Course />} />
          <Route path="income" element={<Income />} />
          <Route path="expense" element={<Expense />} />
          <Route path="registered-students" element={<RegisteredStudents />} />
          <Route path="applied-student" element={<AppliedStudent />} />
          <Route path="onboarding-student" element={<OnboardingStudent />} />
          <Route path="add-fee" element={<AddFee />} />
        </Route>
      </Routes>
      </Router>
    // </ThemeProvider>
  );
}

export default App;
