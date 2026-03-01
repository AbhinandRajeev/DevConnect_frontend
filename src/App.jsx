import { useState } from 'react'
import './App.css'
import { Button } from "flowbite-react";
import { Route, Routes } from 'react-router-dom';
import { useEffect } from "react";
import Home from './user/pages/Home';
import Contact from './user/pages/Contact';
import Auth from './pages/Auth';
import Preloader from './components/Preloader';
import Profile from './user/pages/profile';
import ProjectDetails from './user/pages/ProjectDetails';
import AllProjects from './user/pages/AllProjects';
import AdminHome from './admin/pages/AdminHome';
import AdminPosts from './admin/pages/AdminPosts';
import AdminJobs from './admin/pages/AdminJobs';
import AdminSettings from './admin/pages/AdminSettings';
import PageNotFound from './pages/PageNotFound'
import ProfileComplete from './user/pages/ProfileComplete';
import Careers from './company/pages/Careers';
import CompanyProfile from './company/pages/CompanyProfile'
import PaymentSuccess from './user/pages/PaymentSuccess';
import PaymentError from './user/pages/PaymentError';

function App() {

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true)
    }, 4000)
  })

  return (
    <>
      <Routes>
        <Route path='' element={isLoading ? <Home /> : <Preloader />} />
        <Route path='/contact' element={<Contact />} />
        <Route path="/login" element={<Auth register={false} />} />
        <Route path="/register" element={<Auth register={true} />} />
        <Route path='/user-profile' element={<Profile />} />
        <Route path='/project-details/:id' element={<ProjectDetails />} />
        <Route path='/allprojects' element={<AllProjects />} />
        <Route path='/profilecomplete' element={<ProfileComplete />} />
        <Route path='/payment-success' element={<PaymentSuccess />} />
        <Route path='/payment-error' element={<PaymentError />} />

        <Route path='/admin-home' element={<AdminHome />} />
        <Route path='/admin-posts' element={<AdminPosts />} />
        <Route path='/admin-jobs' element={<AdminJobs />} />
        <Route path='/admin-settings' element={<AdminSettings />} />

        <Route path='/careers' element={<Careers />} />
        <Route path='/company-profile' element={<CompanyProfile />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>

    </>
  )
}

export default App
