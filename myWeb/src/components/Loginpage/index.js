import React, { useState } from "react";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";

function Loginpage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/homepage");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="loginbody">
      <div className="form-container1">
        <div className="slide-form container ">
          <form onSubmit={handleLogin}>
            <h1>
              <i className="bx bxs-cricket-ball"></i>Login
            </h1>
            <div className="inputBox">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <i className="bx bxs-user-circle"></i>
            </div>
            <div className="inputBox">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <i className="bx bxs-lock"></i>
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div className="remember-forgot">
              <label>
                <input type="checkbox" />Remember Me
              </label>
            </div>
            <button className="submit loginBtn" type="submit">
              Login
            </button>
          </form>

          <form>
            <Link to="/homepage">
              <button className="submit loginBtn" type="submit">
                Skip
              </button>
            </Link>
            <div className="register">
              <p style={{ color: "black" }}>
                Dont have a account?<Link to="/signup"> Register..</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Loginpage;
