import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight, Github, Chrome, MessageCircle, Instagram, Facebook } from 'lucide-react';
import './AuthPage.css';
import { useNavigate } from 'react-router-dom'

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();

    return (
        <div className="auth-container">
            {/* LEFT SIDE: Enhanced Visual with Platform Icons */}
            <div className="auth-visual">
                <div className="visual-overlay"></div>

                {/* Floating Platform Icons/Images */}
                <div className="platform-float wa-float">
                    <MessageCircle size={32} />
                    <span>WhatsApp</span>
                </div>
                <div className="platform-float ig-float">
                    <Instagram size={32} />
                    <span>Instagram</span>
                </div>
                <div className="platform-float fb-float">
                    <Facebook size={32} />
                    <span>Messenger</span>
                </div>

                <div className="visual-content">
                    <div className="logo-badge">SmartBizz</div>
                    <h1>Connect. Reply. Grow.</h1>
                    <p>The ultimate hub for your social media business conversations.</p>

                    <div className="mini-stats">
                        <div className="stat-pill">⚡ 2ms Response Time</div>
                        <div className="stat-pill">🔒 End-to-End Secure</div>
                    </div>
                </div>
            </div>

            {/* RIGHT SIDE: Auth Form */}
            <div className="auth-form-section">
                <div className="form-card animate-fade-in">
                    <div className="form-header">
                        <h2>{isLogin ? 'Welcome Back!' : 'Get Started'}</h2>
                        <p>{isLogin ? 'Sign in to manage your channels.' : 'Join 500+ businesses today.'}</p>
                    </div>

                    <form onSubmit={(e) => e.preventDefault()} className="auth-inner-form">
                        {!isLogin && (
                            <div className="input-group">
                                <label>Full Name</label>
                                <div className="input-wrapper">
                                    <User size={18} />
                                    <input type="text" placeholder="Vishal Saini" />
                                </div>
                            </div>
                        )}

                        <div className="input-group">
                            <label>Email Address</label>
                            <div className="input-wrapper">
                                <Mail size={18} />
                                <input type="email" placeholder="name@smartbizz.com" />
                            </div>
                        </div>

                        <div className="input-group">
                            <label>Password</label>
                            <div className="input-wrapper">
                                <Lock size={18} />
                                <input type="password" placeholder="••••••••" />
                            </div>
                        </div>

                        {isLogin && (
                            <div className="form-helper">
                                <label className="remember-me">
                                    <input type="checkbox" /> Remember me
                                </label>
                                <button type="button" className="forgot-btn">Forgot Password?</button>
                            </div>
                        )}

                        <button className="auth-submit-btn" onClick={()=>navigate('/dashboard')}>
                            {isLogin ? 'Login Now' : 'Create Free Account'} <ArrowRight size={18} />
                        </button>
                    </form>

                    <div className="divider"><span>Or continue with</span></div>

                    <div className="social-auth">
                        <button className="social-btn"><Chrome size={20} /> Google</button>
                        <button className="social-btn"><Github size={20} /> GitHub</button>
                    </div>

                    <p className="auth-switch">
                        {isLogin ? "New to SmartBizz?" : "Already a member?"}
                        <button onClick={() => setIsLogin(!isLogin)}>
                            {isLogin ? 'Sign up' : 'Login'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;