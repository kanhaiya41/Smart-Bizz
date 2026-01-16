import React, { useState, useEffect } from 'react';
import { Search, LifeBuoy, HelpCircle, Headset, BookOpen, ChevronDown, Mail, Phone, MessageSquare, FileText, Video, Download, Users, Globe, ExternalLink, ToolCase } from "lucide-react";
import "./SupportAndHelp.css"

const SupportAndHelp = () => {
  const [activeFaq, setActiveFaq] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const faqData = [
    {
      question: "How do I reset my password?",
      answer: "To reset your password, go to the login page and click on 'Forgot Password'. Enter your email address and we'll send you a link to reset your password. Make sure to check your spam folder if you don't see the email."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for annual plans."
    },
    {
      question: "How can I upgrade my subscription plan?",
      answer: "Log into your account, go to the 'Profile' section, and select 'Upgrade Plan'. Your new features will unlock immediately after payment."
    },
    {
      question: "Is there a mobile app available?",
      answer: "Yes, we have mobile apps for both iOS and Android available on the App Store and Google Play Store."
    }
  ];

  // REAL-TIME SEARCH FILTER
  const filteredFaqs = faqData.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? -1 : index);
  };

  return (
    <div className="support-page-wrapper">
      {/* MODERN HERO HEADER */}
      <header className="support-hero">
        <div className="support-container">
          <div className="support-logo-area">
            <LifeBuoy size={40} className="hero-icon" />
            <h1>Help & Support Center</h1>
          </div>
          <p className="hero-tagline">How can we help you today? Search our knowledge base or contact us.</p>

          <div className="hero-search-box">
            <Search size={20} className="search-icon-inside" />
            <input
              type="text"
              placeholder="Search for articles, FAQs, or setup guides..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && <button onClick={() => setSearchQuery('')} className="clear-search">Clear</button>}
          </div>
        </div>
      </header>

      <div className="support-container">
        {/* QUICK CATEGORIES */}
        <section className="support-grid-cards">
          {[
            { id: 'faq-section', icon: <HelpCircle />, title: "FAQs", desc: "Common questions & answers" },
            { id: 'troubleshoot-section', icon: <ToolCase />, title: "Troubleshoot", desc: "Guides to fix common issues" },
            { id: 'contact-section', icon: <Headset />, title: "Support", desc: "Talk to our expert team" },
            { id: 'resources-section', icon: <BookOpen />, title: "Resources", desc: "User manuals & tutorials" }
          ].map((item) => (
            <div key={item.id} className="glass-help-card" onClick={() => scrollToSection(item.id)}>
              <div className="card-icon-circle">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <button className="link-btn">Explore <ExternalLink size={14} /></button>
            </div>
          ))}
        </section>

        <div className="support-main-layout">
          {/* FAQ SECTION */}
          <section className="content-block" id="faq-section">
            <h2 className="block-title"><HelpCircle className="title-icon" /> Frequently Asked Questions</h2>
            <div className="faq-accordion">
              {filteredFaqs.length > 0 ? filteredFaqs.map((faq, index) => (
                <div className={`faq-row ${activeFaq === index ? 'active' : ''}`} key={index}>
                  <div className="faq-header" onClick={() => toggleFaq(index)}>
                    <span>{faq.question}</span>
                    <ChevronDown size={18} className="arrow-icon" />
                  </div>
                  <div className="faq-body">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              )) : <p className="no-results">No FAQs found matching "{searchQuery}"</p>}
            </div>
          </section>

          {/* CONTACT OPTIONS */}
          <section className="content-block" id="contact-section">
            <h2 className="block-title"><Headset className="title-icon" /> Get in Touch</h2>
            <div className="contact-grid">
              <div className="contact-box">
                <MessageSquare size={24} />
                <h4>Live Chat</h4>
                <p>Real-time help (24/7)</p>
                <button className="contact-action-btn">Start Chat</button>
              </div>
              <div className="contact-box">
                <Mail size={24} />
                <h4>Email Support</h4>
                <p>Reply within 24 hours</p>
                <button className="contact-action-btn">Open Ticket</button>
              </div>
              <div className="contact-box">
                <Phone size={24} />
                <h4>Phone Call</h4>
                <p>Mon-Fri, 9AM-6PM</p>
                <button className="contact-action-btn">Call Now</button>
              </div>
            </div>
          </section>

          {/* TROUBLESHOOTING STEPS */}
          <section className="content-block" id="troubleshoot-section">
            <h2 className="block-title"><ToolCase className="title-icon" /> Troubleshooting Steps</h2>
            <div className="stepper-container">
              {[
                { t: "Connectivity", d: "Check your internet and firewall settings." },
                { t: "Cache", d: "Clear your browser cache and cookies." },
                { t: "Updates", d: "Ensure you are on the latest version of the app." }
              ].map((step, i) => (
                <div className="step-item" key={i}>
                  <div className="step-circle">{i + 1}</div>
                  <div className="step-info">
                    <strong>{step.t}</strong>
                    <p>{step.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* RESOURCE LINKS */}
          <section className="content-block" id="resources-section">
            <h2 className="block-title"><BookOpen className="title-icon" /> Documentation</h2>
            <div className="resources-list">
              {[
                { n: "User Manual", i: <FileText size={18} /> },
                { n: "Video Tutorials", i: <Video size={18} /> },
                { n: "Download SDK", i: <Download size={18} /> },
                { n: "Community Forum", i: <Users size={18} /> }
              ].map((res, i) => (
                <a href="#" className="res-pill" key={i}>{res.i} {res.n}</a>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default SupportAndHelp;