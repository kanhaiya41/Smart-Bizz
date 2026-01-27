
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../../apiConfig";
import "./Login2.css";

// import Illustration1 from "../../assets/Visual data-amico.png";
// import Illustration2 from "../../assets/Site Stats-pana.png";
// import Illustration3 from "../../assets/Data report-pana.png";
// import Illustration4 from "../../assets/Fingerprint-bro.png";
// import Illustration5 from "../../assets/At the office-pana.png";

import Illustration1 from "../../assets/Online world-amico.png";
import Illustration5 from "../../assets/Chat bot-amico.png";
import Illustration2 from "../../assets/Telecommuting-pana.png";
import Illustration3 from "../../assets/Business Plan-bro.png";
import Illustration4 from "../../assets/Business Plan-pana.png";

const Login2 = () => {
    const navigate = useNavigate();

    // 🔥 Login/Signup toggle
    const [activeForm, setActiveForm] = useState("login"); // "login" | "signup"

    // 🔥 Form Data
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    // 🔥 Illustrations slider
    const illustrations = [
        Illustration1,
        Illustration2,
        Illustration3,
        Illustration4,
        Illustration5,
    ];

    const [activeIndex, setActiveIndex] = useState(0);
    const [fadeKey, setFadeKey] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % illustrations.length);
            setFadeKey((k) => k + 1);
        }, 3500);

        return () => clearInterval(interval);
    }, []);

    // 🔥 Handle Input Change
    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    // ✅ SIGNUP
    const handleSignup = async (e) => {
        e.preventDefault();

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
                setActiveForm("login");
            } else {
                alert(data.message || "Signup failed. Please try again.");
            }
        } catch (error) {
            console.error("Signup Error:", error);
            alert("Server error. Please check your connection.");
        }
    };

    // ✅ LOGIN
    const handleLogin = async (e) => {
        e.preventDefault();

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
                // Save Token
                if (data.token) localStorage.setItem("token", data.token);

                // Save Role
                const userRole = data.user?.role || "owner";
                localStorage.setItem("role", userRole);

                alert("Login Successful!");

                // Redirect
                if (userRole === "superAdmin") {
                    navigate("/dashboard");
                } else {
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
        <div className="login3-page">
            <div className="bg-dots"></div>
            {/* <div style={{padding:"10px 10px " ,border:"0.5px", backgroundColor:"white",borderRadius:"25px"}}> */}

                <div className="login3-wrapper">
                    {/* LEFT */}
                    <div className="login3-left">
                        <div className="login3-illust-box">
                            <img
                                key={fadeKey}
                                src={illustrations[activeIndex]}
                                alt="Login Illustration"
                                className="login3-illust login3-illust-animate"
                            />
                        </div>

                        <div className="login3-left-text">
                            <h2>AI Automation</h2>
                            <p>
                                Smart replies that convert leads into customers — instantly.
                                <br />
                                Fast • Accurate • 24/7 Support
                            </p>

                            <div className="login3-dots">
                                {illustrations.map((_, i) => (
                                    <span
                                        key={i}
                                        className={`login3-dot ${i === activeIndex ? "active" : ""}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="login3-right">
                        <div className="login3-card">
                            <h1 className="login3-title">
                                {activeForm === "login" ? "Welcome Back" : "Create Account"}
                            </h1>

                            <p className="login3-subtitle">
                                {activeForm === "login"
                                    ? "Enter your credentials to access the hub."
                                    : "Sign up to get started with SmartBizz."}
                            </p>

                            {/* 🔥 Form */}
                            <form
                                className="login3-form"
                                onSubmit={activeForm === "login" ? handleLogin : handleSignup}
                            >
                                {/* Name only for Signup */}
                                {activeForm === "signup" && (
                                    <div className="login3-input-group">
                                        <span className="login3-icon">👤</span>
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Full Name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                )}

                                <div className="login3-input-group">
                                    <span className="login3-icon">✉</span>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email Address"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="login3-input-group">
                                    <span className="login3-icon">🔒</span>
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <button className="login3-btn" type="submit">
                                    {activeForm === "login" ? "Login Now →" : "Create Account →"}
                                </button>

                                {/* Bottom Switch */}
                                {activeForm === "login" ? (
                                    <>
                                        <a className="login3-forgot" href="#">
                                            Forgot Password
                                        </a>

                                        <p className="login3-switch">
                                            Don’t have an account?{" "}
                                            <span onClick={() => setActiveForm("signup")}>
                                                Create one
                                            </span>
                                        </p>
                                    </>
                                ) : (
                                    <p className="login3-switch">
                                        Already have an account?{" "}
                                        <span onClick={() => setActiveForm("login")}>Log in</span>
                                    </p>
                                )}
                            </form>
                        </div>

                        <div className="login3-circle one"></div>
                        <div className="login3-circle two"></div>
                    </div>
                </div>
            {/* </div> */}
        </div>
    );
};

export default Login2;
