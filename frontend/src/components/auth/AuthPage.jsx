import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight, Github, Chrome, MessageCircle, Instagram, Facebook } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './AuthPage.css';
import { useApi } from '../../api/useApi';
import businessOwnerApi from '../../api/apiService';
import { toast } from 'react-toastify';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
        const navigate = useNavigate();
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
      const res = await loginRequest(loginData)
      toast.success("Login Success")
      localStorage.setItem("token", res?.token)
      localStorage.setItem("role", res?.user?.role)
      navigate("/owner/dashboard");
      setLoginData({
        email:'',
        password:''
      })
    } catch (err) {
      // toast.error();
    }
  };

  // REGISTER API
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await signupRequest(registerData)
      toast.success("Account created");
      setIsLogin(true);
      setRegisterData({
            firstName: "",
    lastName: "",
    email: "",
    password: ""
      })
    } catch (err) {
      // toast.error("Registration failed");
    }
  };

    return (
        <div className="auth-master-wrapper">
            {/* Animated Background Blobs - Professional Colors */}
            <div className="bg-blob blob-1"></div>
            <div className="bg-blob blob-2"></div>
            <div className="bg-blob blob-3"></div>

            <div className="auth-main-card">
                {/* LEFT: The Original Animation Side */}
                <div className="auth-visual-side">
                    {/* Floating Icons with Correct Logos */}
                    <div className="floating-icon wa-card">
                        <MessageCircle size={30} />
                        <span>WhatsApp</span>
                    </div>
                    <div className="floating-icon ig-card">
                        <Instagram size={30} />
                        <span>Instagram</span>
                    </div>
                    <div className="floating-icon fb-card">
                        <Facebook size={30} />
                        <span>Messenger</span>
                    </div>

                    <div className="visual-text-area">
                        <div className="pill-tag">SmartBizz 2.0</div>
                        <h1>Connect. <br/>Reply. Grow.</h1>
                        <p>Managing business chats across platforms has never been this smooth.</p>
                        
                        <div className="feature-row">
                            <span className="f-pill">⚡ Real-time</span>
                            <span className="f-pill">🛡️ Secure</span>
                        </div>
                    </div>
                </div>

    <div className="auth-form-side">
      <div className="form-content">

        {/* ================= LOGIN DIV ================= */}
        {isLogin && (
          <div className="login-div">
            <h2>Welcome Back</h2>
            <p className="subtitle">Enter your credentials to access the hub.</p>

            <form>
              <div className="input-box">
                <label>Email</label>
                <div className="field">
                  <Mail size={18} />
                  <input
                    type="email"
                    value={loginData.email}
                    onChange={(e) =>
                      setLoginData({ ...loginData, email: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="input-box">
                <label>Password</label>
                <div className="field">
                  <Lock size={18} />
                  <input
                    type="password"
                    value={loginData.password}
                    onChange={(e) =>
                      setLoginData({ ...loginData, password: e.target.value })
                    }
                  />
                </div>
              </div>

      <button
  className="main-auth-btn"
  onClick={handleLogin}
  disabled={loginLoading}
>
  {loginLoading ? "Logging in..." : "Login Now"}
  {!loginLoading && <ArrowRight size={20} />}
</button>

{loginError && <p className="error-text">{loginError}</p>}

            </form>

            <p className="toggle-msg">
              Don’t have an account?
              <button onClick={() => setIsLogin(false)}>Create one</button>
            </p>
          </div>
        )}

        {/* ================= REGISTER DIV ================= */}
        {!isLogin && (
          <div className="register-div">
            <h2>Create Account</h2>
            <p className="subtitle">Fill details to create your account.</p>

            <form >
              <div className="input-box">
                <label>First Name</label>
                <div className="field">
                  <User size={18} />
                  <input
                    type="text"
                    value={registerData.firstName}
                    onChange={(e) =>
                      setRegisterData({ ...registerData, firstName: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="input-box">
                <label>Last Name</label>
                <div className="field">
                  <User size={18} />
                  <input
                    type="text"
                    value={registerData.lastName}
                    onChange={(e) =>
                      setRegisterData({ ...registerData, lastName: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="input-box">
                <label>Email</label>
                <div className="field">
                  <Mail size={18} />
                  <input
                    type="email"
                    value={registerData.email}
                    onChange={(e) =>
                      setRegisterData({ ...registerData, email: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="input-box">
                <label>Password</label>
                <div className="field">
                  <Lock size={18} />
                  <input
                    type="password"
                    value={registerData.password}
                    onChange={(e) =>
                      setRegisterData({ ...registerData, password: e.target.value })
                    }
                  />
                </div>
              </div>

{signupError && <p className="error-text">{signupError}</p>}


    <button
  className="main-auth-btn"
  onClick={handleRegister}
  disabled={signupLoading}
>
  {signupLoading ? "Creating Account..." : "Sign Up"}
  {!signupLoading && <ArrowRight size={20} />}
  
</button>

            </form>

            <p className="toggle-msg">
              Already a member?
              <button onClick={() => setIsLogin(true)}>Login</button>
            </p>
          </div>
        )}

      </div>
    </div>
  
                
                
            </div>

        </div>
    );
};

export default AuthPage;