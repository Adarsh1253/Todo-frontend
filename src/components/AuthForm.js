import React, { useState } from "react";
import axios from "axios";

const AuthForm = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError("");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? "login" : "register";
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/${endpoint}`, form);

      if (isLogin) {
        localStorage.setItem("token", res.data.token);
        onAuthSuccess(); // let App know user is logged in
      } else {
        alert("Registration successful. Please login.");
        setIsLogin(true);
      }
    } catch (err) {
      setError(err.response?.data?.msg || "Something went wrong");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto" }}>
      <h2>{isLogin ? "Login" : "Register"}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">{isLogin ? "Login" : "Register"}</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
      <p onClick={toggleMode} style={{ cursor: "pointer", color: "blue" }}>
        {isLogin ? "Don't have an account? Register" : "Already registered? Login"}
      </p>
    </div>
  );
};

export default AuthForm;
