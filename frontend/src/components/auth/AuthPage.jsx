import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight, Github, Chrome, MessageCircle, Instagram, Facebook } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './AuthPage.css';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();

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

                {/* RIGHT: Pure White Form Side */}
                <div className="auth-form-side">
                    <div className="form-content">
                        <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
                        <p className="subtitle">Enter your credentials to access the hub.</p>

                        <form onSubmit={(e) => e.preventDefault()}>
                            {!isLogin && (
                                <div className="input-box">
                                    <label>Full Name</label>
                                    <div className="field">
                                        <User size={18} />
                                        <input type="text" placeholder="Vishal Saini" />
                                    </div>
                                </div>
                            )}

                            <div className="input-box">
                                <label>Email</label>
                                <div className="field">
                                    <Mail size={18} />
                                    <input type="email" placeholder="vishal@smartbizz.com" />
                                </div>
                            </div>

                            <div className="input-box">
                                <label>Password</label>
                                <div className="field">
                                    <Lock size={18} />
                                    <input type="password" placeholder="••••••••" />
                                </div>
                            </div>

                            <button className="main-auth-btn" onClick={() => navigate('/dashboard')}>
                                {isLogin ? 'Login Now' : 'Sign Up'} <ArrowRight size={20} />
                            </button>
                        </form>

                        <div className="form-sep"><span>OR</span></div>

                        <div className="social-grid">
                            <button className="s-btn"><Chrome size={18}/> Google</button>
                            <button className="s-btn"><Github size={18}/> GitHub</button>
                        </div>

                        <p className="toggle-msg">
                            {isLogin ? "Don't have an account?" : "Already a member?"}
                            <button onClick={() => setIsLogin(!isLogin)}>
                                {isLogin ? 'Create one' : 'Login'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;