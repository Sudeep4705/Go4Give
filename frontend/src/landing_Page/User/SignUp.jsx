  import { useState } from "react";
  import { Link } from "react-router-dom";
  import axios from 'axios'
  import { useNavigate } from "react-router-dom";

  function Signup() {
    const [user, setUser] = useState({
      email: "",
      username: "",
      password: ""
    });

    const handleChange = (e) => {
      setUser({ ...user, [e.target.name]: e.target.value });
    };

      const navigate = useNavigate()
    const loginsubmit = async(e)=>{
    
      e.preventDefault()
      try{
      // let res =  await axios.post("http://localhost:8000/user/register",user,{
      //     withCredentials:true
      //   })
      let res =  await axios.post( `${import.meta.env.VITE_API_URL}/user/register`,user,{
          withCredentials:true
        })
        console.log(res);
        
        alert(res.data.message)
        setUser({email:"",username:"",password:""})
        navigate("/")
      }
      catch(error){
        console.log(error);
        
      }
    }



    return (
      <div
        style={{
          position: "relative",
          backgroundImage: `url("/images/signup.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          color: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
        }}
      >
        {/* Overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1,
          }}
        />

        {/* Form Card */}
        <div
          className="shadow"
          style={{
            position: "relative",
            zIndex: 2,
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            backdropFilter: "blur(6px)",
            borderRadius: "20px",
            padding: "35px 30px",
            width: "100%",
            maxWidth: "420px",
            boxShadow: "0 15px 35px rgba(0,0,0,0.3)",
            color: "#fff"
          }}
        >
          <h2 className="text-center mb-4" style={{ fontWeight: "600" }}>
            Create an Account
          </h2>
          
          <form onSubmit={loginsubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label" style={{ fontSize: "15px" }}>
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={user.email}
                onChange={handleChange}
                className="form-control rounded-3"
                style={{
                  padding: "10px",
                  fontSize: "14px",
                  backgroundColor: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  color: "#fff"
                }}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="username" className="form-label" style={{ fontSize: "15px" }}>
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                value={user.username}
                onChange={handleChange}
                className="form-control rounded-3"
                style={{
                  padding: "10px",
                  fontSize: "14px",
                  backgroundColor: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  color: "#fff"
                }}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="form-label" style={{ fontSize: "15px" }}>
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={user.password}
                onChange={handleChange}
                className="form-control rounded-3"
                style={{
                  padding: "10px",
                  fontSize: "14px",
                  backgroundColor: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  color: "#fff"
                }}
                required
              />
            </div>

            <button type="submit" className="btn btn-light w-100 rounded-pill py-2" style={{ fontWeight: "500" }}>
              Sign Up
            </button>
          </form>

          <p className="text-center mt-3" style={{ fontSize: "14px", color: "#ddd" }}>
            Already have an account?{" "}
            <Link to="/login" className="text-decoration-none" style={{ color: "#4dabf7", fontWeight: 500 }}>
              Login here
            </Link>
          </p>
        </div>
      </div>
    );
  }

  export default Signup;
