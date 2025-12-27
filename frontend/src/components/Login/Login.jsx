import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../../apiConfig"; // Adjust path as needed
import "./Login.css";

const Login = () => {
  // State to track active form ('signup' or 'login')
  const [activeForm, setActiveForm] = useState("signup");

  // State to store input values
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  // Update state when user types
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- API FUNCTION: SIGNUP ---
  const handleSignup = async (e) => {
    e.preventDefault();
    console.log("Signing up with:", formData);

    try {
      const response = await fetch(API_ENDPOINTS.SIGNUP, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Account created successfully! Please Login.");
        setActiveForm("login"); // Switch view to login
      } else {
        alert(data.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Signup Error:", error);
      alert("Server error. Please check your connection.");
    }
  };

  // --- API FUNCTION: LOGIN (UPDATED) ---
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Logging in with:", formData);

    try {
      const response = await fetch(API_ENDPOINTS.LOGIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // 1. Save Token
        if (data.token) {
          localStorage.setItem("token", data.token);
        }

        // 2. Save Role (Backend sends user object with role)
        // Default to 'owner' if role is missing for some reason
        const userRole = data.user?.role || "owner";
        localStorage.setItem("role", userRole);

        alert("Login Successful!");

        // 3. Conditional Redirect based on Role
        if (userRole === "superAdmin") {
          navigate("/dashboard");
        } else {
          // If owner, go to connect page
          navigate("/connect");
        }
      } else {
        alert(data.message || "Invalid email or password.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Server error. Please check your connection.");
    }
  };

  return (
    <div className="app-background">
      {/* Main Floating Container */}
      <div className="main-container">
        {/* LEFT PANEL: Blue Branding */}
        <div className="left-panel">
          <div className="brand-logo">SMARTBIZZ.</div>

          {/* Animated Text Section */}
          <div className="hero-content" key={activeForm}>
            <h1 className="animate-text">
              {activeForm === "login" ? "Login page" : "Sign Up"}
            </h1>
            <p className="animate-text delay">
              {activeForm === "login"
                ? "Start your journey now with us"
                : "Join our community today"}
            </p>
          </div>
        </div>

        {/* RIGHT PANEL: Form Area */}
        <div className="right-panel">
          <div className="cards-wrapper">
            {/* --- SIGNUP CARD --- */}
            <div
              className={`auth-card signup-card ${
                activeForm === "signup" ? "focused" : "inactive"
              }`}
              onClick={() => setActiveForm("signup")}
            >
              <div className="form-header">
                <h3>Create an account</h3>
              </div>

              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="balamia@gmail.com"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="balamia@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <div className="password-input-wrapper">
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <span className="eye-icon">👁️</span>
                </div>
              </div>

              {/* CONNECTED SIGNUP BUTTON */}
              <button className="btn-primary" onClick={handleSignup}>
                Create account
              </button>

              <button className="btn-google">
                <span className="g-icon">G</span> Continue with Google
              </button>

              <p className="switch-text">
                Already have an account?{" "}
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveForm("login");
                  }}
                >
                  Log in
                </span>
              </p>
            </div>

            {/* --- LOGIN CARD --- */}
            <div
              className={`auth-card login-card ${
                activeForm === "login" ? "focused" : "inactive"
              }`}
              onClick={() => setActiveForm("login")}
            >
              <div className="form-header">
                <h3>Login to your account</h3>
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="balamia@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <div className="label-row">
                  <label>Password</label>
                  <span className="forgot-link">Forgot ?</span>
                </div>
                <div className="password-input-wrapper">
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <span className="eye-icon">👁️</span>
                </div>
              </div>

              {/* CONNECTED LOGIN BUTTON */}
              <button className="btn-primary" onClick={handleLogin}>
                Login now
              </button>

              <p className="switch-text">
                Don't have an account?{" "}
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveForm("signup");
                  }}
                >
                  Sign up
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;