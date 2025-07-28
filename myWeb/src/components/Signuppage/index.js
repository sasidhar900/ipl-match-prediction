import React, { useState } from "react";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";

function Signuppage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/homepage");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="signupbody">
      <div className="form-container">
        <div className="animated-form container">
          <form onSubmit={handleSignup}>
            <h1>
              <i className="bx bxs-cricket-ball"></i>Sign Up
            </h1>
            <div className="inputBox">
              <input
                type="email"
                placeholder="Email"
                aria-label="Email"
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
                aria-label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <i className="bx bxs-lock"></i>
            </div>
            <div className="inputBox">
              <input
                type="password"
                placeholder="Re-enter Password"
                aria-label="Re-enter Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <i className="bx bxs-lock"></i>
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button className="submit" type="submit">
              Sign Up
            </button>
          </form>
          <Link to="/loginpage">
            <button className="submit" type="button">
              Back
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signuppage;
