import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login2.css";
import { useApi } from '../../api/useApi';
import businessOwnerApi from '../../api/apiService';
import { toast } from 'react-toastify';

import Illustration1 from "../../assets/Online world-amico.png";
import Illustration5 from "../../assets/Chat bot-amico.png";
import Illustration2 from "../../assets/Telecommuting-pana.png";
import Illustration3 from "../../assets/Business Plan-bro.png";
import Illustration4 from "../../assets/Business Plan-pana.png";

const Login2 = () => {
    const navigate = useNavigate();

    // 🔥 Login/Signup toggle
    const [activeForm, setActiveForm] = useState("login"); // "login" | "signup"
    const [isLogin, setIsLogin] = useState(true);

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
        setLoginData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };
    const handleChangeInRegister = (e) => {
        setRegisterData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };


    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });

    const [registerData, setRegisterData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });

    const {
        request: loginRequest,
        loading: loginLoading,
        error: loginError
    } = useApi(businessOwnerApi.login);

    const {
        request: signupRequest,
        loading: signupLoading,
        error: signupError
    } = useApi(businessOwnerApi.signup);

    // LOGIN API
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            console.log("loig", loginData);

            const res = await loginRequest(loginData);
            toast.success("Login Success");

            localStorage.setItem("token", res?.token);
            localStorage.setItem("role", res?.user?.role);
            localStorage.setItem("businessId", res?.user?.id);

            navigate("/owner/dashboard");

            setLoginData({
                email: "",
                password: ""
            });
        } catch (err) { }
    };

    // REGISTER API
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await signupRequest(registerData);
            toast.success("Account created");
            setIsLogin(true);

            setRegisterData({
                firstName: "",
                lastName: "",
                email: "",
                password: ""
            });
        } catch (err) { }
    };

    return (
        <div className="login3-page">
            <div className="bg-dots"></div>

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

                        {/* ---------------- LOGIN DIV ---------------- */}
                        {activeForm === "login" && (
                            <>
                                <h1 className="login3-title">Welcome Back</h1>

                                <p className="login3-subtitle">
                                    Enter your credentials to access the hub.
                                </p>

                                <form className="login3-form" onSubmit={handleLogin}>
                                    <div className="login3-input-group">
                                        <span className="login3-icon">✉</span>
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Email Address"
                                            value={loginData.email}
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
                                            value={loginData.password}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <button disabled={loginLoading} className="login3-btn" type="submit">
                                        {loginLoading ? <div className="loader-mini"></div> : "Login Now →"}
                                    </button>

                                    <a className="login3-forgot" href="#">
                                        Forgot Password
                                    </a>

                                    <p className="login3-switch">
                                        Don’t have an account?{" "}
                                        <span onClick={() => setActiveForm("signup")}>
                                            Create one
                                        </span>
                                    </p>
                                </form>
                            </>
                        )}

                        {/* ---------------- REGISTER DIV ---------------- */}
                        {activeForm === "signup" && (
                            <>
                                <h1 className="login3-title">Create Account</h1>

                                <p className="login3-subtitle">
                                    Sign up to get started with SmartBizz.
                                </p>

                                <form className="login3-form" onSubmit={handleRegister}>
                                    <div className="login3-input-group">
                                        <span className="login3-icon">👤</span>
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="First Name"
                                            value={registerData.firstName}
                                            onChange={handleChangeInRegister}
                                            required
                                        />
                                    </div>

                                    <div className="login3-input-group">
                                        <span className="login3-icon">👤</span>
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Last Name"
                                            value={registerData.lastName}
                                            onChange={handleChangeInRegister}
                                            required
                                        />
                                    </div>
                                    <div className="login3-input-group">
                                        <span className="login3-icon">✉</span>
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Email Address"
                                            value={registerData.email}
                                            onChange={handleChangeInRegister}
                                            required
                                        />
                                    </div>

                                    <div className="login3-input-group">
                                        <span className="login3-icon">🔒</span>
                                        <input
                                            type="password"
                                            name="password"
                                            placeholder="Password"
                                            value={registerData.password}
                                            onChange={handleChangeInRegister}
                                            required
                                        />
                                    </div>

                                    <button className="login3-btn" type="submit">
                                        {signupLoading ? <div className="loader-mini"></div> : "Create Account →"}

                                    </button>

                                    <p className="login3-switch">
                                        Already have an account?{" "}
                                        <span onClick={() => setActiveForm("login")}>
                                            Log in
                                        </span>
                                    </p>
                                </form>
                            </>
                        )}

                    </div>


                    <div className="login3-circle one"></div>
                    <div className="login3-circle two"></div>
                </div>
            </div>
        </div>
    );
};

export default Login2;
