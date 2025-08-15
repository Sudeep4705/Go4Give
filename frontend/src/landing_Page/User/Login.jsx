import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Login(){

const [login,setlogin]= useState({
    username:"",
    password:""
})

const [message,setmessage] = useState()

const handleChange=((e)=>{
    setlogin({...login,[e.target.name]:e.target.value})
})


const navigate = useNavigate()
const handlelogin = async(e)=>{
  try{
 e.preventDefault()
  const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/login`,login,{
    withCredentials: true,
  });
 if (res.data.success) {
  alert(res.data.message)
      setlogin({ username: "", password: "" });
      navigate("/");
    } else {
      // alert(res.data.message || "Login failed");
      setmessage(res.data.message)
    }
  }
  catch(err){
    console.log(err);
    
  }
  
 
}
    return(
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
         Login to your account
        </h2>
        <h2>{message}</h2>

        <form onSubmit={handlelogin}>
       

          <div className="mb-3">
            <label htmlFor="username" className="form-label" style={{ fontSize: "15px" }}>
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={login.username}
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
              value={login.password}
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
        Login
          </button>
        </form>

        
       
      </div>
    </div>
    )
}

export default Login;


