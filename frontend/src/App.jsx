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

import Orphanage from './Admin//Orphanage'
import Orphan  from  './landing_Page/Orphanage/Orphans'
import ShowPage from './landing_Page/Orphanage/Show';
import Support from "./Admin/Support"

import Blog from './landing_Page/Blog/Blog';
import UserFundraiser from './landing_Page/Fund/ShowFundraiser'
import Donation from './landing_Page/Donation/Donation';
import FundsDonation from './landing_Page/Fund/FundsDonation';
import AddFundraiser from './Admin/AddFundrasier';
import Fundraisers from './Admin/Fundraisers';
import BlogDetail from './landing_Page/Blog/BlogDetails';
import Chat from './landing_Page/chatbot/chatbot';





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
          <Route path="donation/:id" element={<Donation/>} />
          <Route path="fund/:id" element={<FundsDonation/>} />
          <Route path="blog/:id" element={<BlogDetail />} />
          <Route path="chatbot" element={<Chat />} />


        </Route>

        
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/dashboard" element={<AdminLayout />}>
        <Route path="home" element={<Home />} />
        <Route path="feedback" element={<Feedback/>} />
        <Route path="donors" element={<Donor/>} />
        
        <Route path="orphanage" element={<Orphanage/>} />
        <Route path="support" element={<Support/>} />
        <Route path="addfundraiser" element={<AddFundraiser/>} />
        <Route path="funds" element={<Fundraisers/>} />
        </Route>
        
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;
