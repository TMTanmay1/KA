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
import Login from './pages/Login.jsx';
import LedgerPage from './pages/LedgerPage.jsx';
import ViewProfile from './pages/ViewProfile.jsx';
import AllStudents from './pages/AllStudents.jsx';
import StudyMaterial from './pages/StudyMaterial.jsx';

function App() {
  return (
    // <ThemeProvider theme={theme}>
      <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="/dashboard/batch-registration" element={<BatchRegistration />} />
          <Route path="/dashboard/student-registration" element={<StudentRegistration />} />
          <Route path="/dashboard/manage-course-category" element={<CourseCategory />} />
          <Route path="/dashboard/course" element={<Course />} />
          <Route path="/dashboard/income" element={<Income />} />
          <Route path="/dashboard/expense" element={<Expense />} />
          <Route path="/dashboard/registered-students" element={<RegisteredStudents />} />
          <Route path="/dashboard/applied-student" element={<AppliedStudent />} />
          <Route path="/dashboard/onboarding-student" element={<OnboardingStudent />} />
          <Route path="/dashboard/add-fee" element={<AddFee />} />
          <Route path="/dashboard/view-ledger" element={<LedgerPage />} />
          <Route path="/dashboard/view-profile" element={<ViewProfile />} />
          <Route path="/dashboard/all-students" element={<AllStudents />} />
          <Route path="/dashboard/study-material" element={<StudyMaterial />} />
        </Route>
      </Routes>
      </Router>
    // </ThemeProvider>
  );
}

export default App;
