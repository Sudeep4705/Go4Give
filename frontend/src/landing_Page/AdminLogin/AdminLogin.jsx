import { useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import "./AdminLogin.css";
function AdminLogin(){
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

  e.preventDefault()
  const res = await axios.post(`${import.meta.env.VITE_API_URL}/admin/login`,login,{
    withCredentials:true
  })
if(res.data.success){
 setlogin({username:"",password:""})
  navigate("/dashboard")
}
 else{
setmessage(res.data.message)
 }
}


    return(
       <section className="admin-login-section">
      <div className="overlay"></div>

      <div className="login-card">
        <h2 className="login-title">Admin Login</h2>
        {message && <p className="login-message">{message}</p>}

        <form onSubmit={handlelogin} className="login-form">
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={login.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={login.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn-login">
            Login
          </button>
        </form>
      </div>
    </section>
    )
}

export default AdminLogin;