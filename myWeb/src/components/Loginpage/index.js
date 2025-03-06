import React from "react"
import "./index.css"
import { Link } from "react-router-dom";


function Loginpage(){
    return (
        <div className="loginbody">
                    <div className="form-container1">
                    <div className="slide-form container ">
                        <form action="#">
                            <h1><i className='bx bxs-cricket-ball'></i>Login</h1>
                            <div className="inputBox">
                                <input type="text" placeholder="Username" required/>
                                <i className='bx bxs-user-circle'></i>
                            </div>
                            <div className="inputBox">
                                <input type="password" placeholder="Password" required/>
                                <i className='bx bxs-lock' ></i>
                            </div>
                            <div className="remember-forgot">
                                <label><input type="checkbox" />Remember Me</label>
                                
                            </div>
                            <button className="submit loginBtn" type="submit">Login</button>
                            
                            
                        </form>
                        
                        <form>
                        <Link to="/homepage"><button className="submit loginBtn" type="submit">Skip</button></Link>
                        <div className="register">
                            <p style={{ color:'black' }}>Dont have a account?<Link to="/signup"> Register..</Link></p>
                        </div>
                        </form>
                </div>
            </div>
        </div>
    )
}

export default Loginpage;