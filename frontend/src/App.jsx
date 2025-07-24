// import {BrowserRouter,Routes,Route} from 'react-router-dom'
// import Navbar from './landing_Page/Navbar'
// import './App.css'
// import Footer from './landing_Page/Footer'
// import HomePage from "./landing_Page/Home/HomePage"
// import AboutPage from './landing_Page/About/AboutPage'
// import ContactPage from './landing_Page/contact/ContactPage'
// import SignUp from "./landing_Page/User/SignUp"
// import Login from "./landing_Page/User/Login"
// import AdminLogin from './landing_Page/AdminLogin/AdminLogin'
// import AdminPage from './Admin/AdminPage'
// function App() {
// return (
 
//     <BrowserRouter>
//     <Navbar/>
//     <Routes>
//        <Route path='/' element={<HomePage/>}></Route>
//        <Route path='/about' element={<AboutPage/>}></Route>
//        <Route path='/contact' element={<ContactPage/>}></Route>
//        <Route path='/signup' element={<SignUp/>}></Route>
//        <Route path='/login' element={<Login/>}></Route>
//        <Route path='/admin/login' element={<AdminLogin/>}></Route>
//        <Route path='/dashboard' element={<AdminPage/>}></Route>
//     </Routes>
//     <Footer/>
//     </BrowserRouter>

//     )
// }

// export default App


import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';

import HomePage from "./landing_Page/Home/HomePage";
import AboutPage from './landing_Page/About/AboutPage';
import ContactPage from './landing_Page/contact/ContactPage';
import SignUp from "./landing_Page/User/SignUp";
import Login from "./landing_Page/User/Login";
import AdminLogin from './landing_Page/AdminLogin/AdminLogin';
import MainLayout from '../layouts/MainLayout';
import AdminLayout from '../layouts/AdminLayout';
import Home from './Admin/Home'
import Feedback from './Admin/Feedback'
import Donor from './Admin/Donor'
import Report from './Admin/Report'
import Orphanage from './Admin//Orphanage'
import Orphan  from  './landing_Page/Orphanage/Orphans'
import ShowPage from './landing_Page/Orphanage/Show';
import Support from "./Admin/Support"
import Fundraiser from './Admin/Fundrasier';
import Blog from './landing_Page/Blog/Blog';
import UserFundraiser from './landing_Page/Fund/Fundraiser'
import Donation from './landing_Page/Donation/Donation';





function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<Login />} />
          <Route path="index" element={<Orphan />} />
          <Route path="show/:id" element={<ShowPage/>} />
          <Route path="blog" element={<Blog/>} />
          <Route path="fundraiser" element={<UserFundraiser/>} />
          <Route path="donation" element={<Donation/>} />
        </Route>

        
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/dashboard" element={<AdminLayout />}>
        <Route path="home" element={<Home />} />
        <Route path="feedback" element={<Feedback/>} />
        <Route path="donors" element={<Donor/>} />
        <Route path="report" element={<Report/>} />
        <Route path="orphanage" element={<Orphanage/>} />
        <Route path="support" element={<Support/>} />
        <Route path="fundraiser" element={<Fundraiser/>} />
         
       
             
        </Route>
        
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;
