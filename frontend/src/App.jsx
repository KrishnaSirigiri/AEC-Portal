// ✅ App.jsx (Clean Final Version)
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import JobList from "./components/JobList";
import Login from "./components/Login";
import Register from "./components/Register";
import RecruiterDashboard from "./pages/RecruiterDashboard"; // updated path
import JobSeekerDashboard from "./pages/JobSeekerDashboard";
import JobApplicationPage from "./pages/JobApplicationPage";
import ApplicationSuccessPage from "./pages/ApplicationSuccessPage";
import JobDetailsPage from "./pages/JobDetailsPage";
import Companies from "./pages/Companies";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import CareerResources from "./pages/CareerResources";
import AuthProvider from "./context/AuthContext";
import ThemeProvider from "./context/ThemeContext";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./layouts/MainLayout";
import NotificationPanel from "./components/NotificationPanel";
import DashboardAnalytics from "./pages/DashboardAnalytics";

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route element={<MainLayout />}> 
              <Route path="/" element={<Home />} />
              <Route path="/jobs" element={<JobList />} />
              <Route path="/companies" element={<Companies />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />

              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/notifications" element={<ProtectedRoute><NotificationPanel /></ProtectedRoute>} />
              <Route path="/admin-dashboard/analytics" element={<ProtectedRoute allowedRole="Admin"><DashboardAnalytics /></ProtectedRoute>} />
              <Route path="/jobs/:id" element={<JobDetailsPage />} />
                <Route path="/career-resources" element={<CareerResources />} />
              <Route path="/jobs/:id/apply" element={<ProtectedRoute><JobApplicationPage /></ProtectedRoute>} />
              <Route path="/application-success" element={<ProtectedRoute><ApplicationSuccessPage /></ProtectedRoute>} />

              <Route
                path="/recruiter-dashboard"
                element={
                  <ProtectedRoute allowedRole="Recruiter">
                    <RecruiterDashboard />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/jobseeker-dashboard"
                element={
                  <ProtectedRoute allowedRole="JobSeeker">
                    <JobSeekerDashboard />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;