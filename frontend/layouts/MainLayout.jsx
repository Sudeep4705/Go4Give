import { Outlet } from 'react-router-dom';
import Navbar from '../src/landing_Page/Navbar';
import Footer from '../src/landing_Page/Footer';

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <div className="main-content">
          <Outlet />
      </div>
    
      <Footer />
    </>
  );
}
