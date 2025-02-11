import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GameContext } from "../context/GameContext";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { loginUser } = useContext(GameContext); //  Get loginUser from context

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", { username, password });
      localStorage.setItem("jwtToken", response.data.token);
      loginUser(username); //  Updates username in context
      navigate("/start-page");
    } catch (error) {
      setErrorMessage("Invalid username or password");
    }
  };

  return (
    <div className="login-box">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="user-box">
          <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          <label>Username</label>
        </div>
        <div className="user-box">
          <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <label>Password</label>
        </div>
        <button type="submit" className="submit-btn">Submit</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default Login;
