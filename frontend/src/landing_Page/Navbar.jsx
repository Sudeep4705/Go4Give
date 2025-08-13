import './Navbar.css'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import axios from "axios";
  function Navbar(){
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const navigate = useNavigate();
    useEffect(() => {
 axios.get(`${import.meta.env.VITE_API_URL}/user/verify`, { withCredentials: true })
    .then((res) => res.json())
    .then((data) => {
      setIsLoggedIn(data.loggedIn);
    })
    .catch((err) => {
      console.error("Auth check failed", err);
      setIsLoggedIn(false);
    });
}, []);

const handleLogout = async () => {
  try {
    // await fetch("http://localhost:8000/user/logout", {
    //   method: "POST",
    //   credentials: "include",
    // });
    await axios.post(
  `${import.meta.env.VITE_API_URL}/user/logout`,
  { withCredentials: true }
);

    setIsLoggedIn(false);
    navigate("/login");
  } catch (err) {
    console.error("Logout failed", err);
  }
};
    return(
        <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="#"><img className='img' src="images/logo1.svg" alt="" /></a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    import { Link } from "react-router-dom";

<div className="collapse navbar-collapse" id="navbarNavDropdown">
  <ul className="navbar-nav">
    <li className="nav-item">
      <Link className="nav-link active" to="/">Home</Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link active" to="/about">About</Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link active" to="/contact">Contact</Link>
    </li>
    <li className="nav-item dropdown">
      <Link
        className="nav-link dropdown-toggle active"
        to="#"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Explore
      </Link>
      <ul className="dropdown-menu">
        <li><Link className="dropdown-item" to="/fundraiser">Fundraiser</Link></li>
        <li><Link className="dropdown-item" to="/blog">Blog</Link></li>
      </ul>
    </li>

    {/* ADD THIS INSIDE THE <ul> */}
    {isLoggedIn && (
      <li className="nav-item">
        <button className="btn btn-outline-danger ms-2" onClick={handleLogout}>
          Logout
        </button>
      </li>
    )}
  </ul>
</div>

  </div>
</nav>

        </>
    )
  }

  export default Navbar;