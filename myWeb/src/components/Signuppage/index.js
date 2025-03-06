import React from "react";
import "./index.css";
import { Link } from "react-router-dom";

function Signuppage() {
    return (
        <div className="signupbody">
            <div className="form-container">
                <div className="animated-form container">
                    <form action="#">
                        <h1><i className='bx bxs-cricket-ball'></i>Sign Up</h1>
                        <div className="inputBox">
                            <input type="text" placeholder="Username" aria-label="Username" required/>
                            <i className='bx bxs-user-circle'></i>
                        </div>
                        <div className="inputBox">
                            <input type="password" placeholder="Password" aria-label="Password" required/>
                            <i className='bx bxs-lock'></i>
                        </div>
                        <div className="inputBox">
                            <input type="password" placeholder="Re-enter Password" aria-label="Re-enter Password" required/>
                            <i className='bx bxs-lock'></i>
                        </div>
                        
                        <button className="submit" type="submit">Sign Up</button>
                    </form>
                    <Link to="/loginpage">
                        <button className="submit" type="button">Back</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Signuppage;
