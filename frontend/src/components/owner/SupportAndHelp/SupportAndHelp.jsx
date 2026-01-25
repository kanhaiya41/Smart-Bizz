import React, { useState } from 'react';
import { 
  Search, HelpCircle, Headset, BookOpen, ChevronDown, Mail, 
  MessageSquare, FileText, Video, Download, Users, ExternalLink, Wrench, Phone 
} from "lucide-react";
import "./SupportAndHelp.css";

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

  // REAL-TIME SEARCH logic retained
  const filteredFaqs = faqData.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // SMOOTH SCROLL logic retained
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
    <div className="sh-page-container">
      {/* Search Header - Executive White */}
      {/* <section className="sh-search-section">
        <div className="sh-search-inner">
          <h2>Support & Knowledge Base</h2>
          <p>Find technical documentation, setup guides, and direct support channels.</p>
          <div className="sh-search-bar">
            <Search size={18} className="sh-search-icon" />
            <input
              type="text"
              placeholder="Search for solutions or documentation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="sh-clear-search">Clear</button>
            )}
          </div>
        </div>
      </section> */}

      <div className="sh-main-grid">
        {/* Left Column: FAQ & Troubleshooting */}
        <div className="sh-content-col">
          
          {/* FAQ SECTION */}
          <div className="sh-card" id="faq-section">
            <div className="sh-card-header">
              <HelpCircle size={18} className="sh-primary-icon" />
              <h3>Frequently Asked Questions</h3>
            </div>
            <div className="sh-faq-list">
              {filteredFaqs.length > 0 ? filteredFaqs.map((faq, index) => (
                <div className={`sh-faq-item ${activeFaq === index ? 'active' : ''}`} key={index}>
                  <button className="sh-faq-trigger" onClick={() => toggleFaq(index)}>
                    <span>{faq.question}</span>
                    <ChevronDown size={16} className="sh-arrow" />
                  </button>
                  <div className="sh-faq-content">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              )) : (
                <p className="sh-no-results">No FAQs found matching "{searchQuery}"</p>
              )}
            </div>
          </div>

          {/* TROUBLESHOOTING SECTION */}
          <div className="sh-card mt-24" id="troubleshoot-section">
            <div className="sh-card-header">
              <Wrench size={18} className="sh-primary-icon" />
              <h3>Self-Service Troubleshooting</h3>
            </div>
            <div className="sh-steps">
              {[
                { t: "Connectivity", d: "Check your internet and firewall settings." },
                { t: "Cache", d: "Clear your browser cache and cookies." },
                { t: "Updates", d: "Ensure you are on the latest version of the app." }
              ].map((step, i) => (
                <div className="sh-step-row" key={i}>
                  <div className="sh-step-num">{i + 1}</div>
                  <div className="sh-step-info">
                    <strong>{step.t}</strong>
                    <p>{step.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Navigation & Contact */}
        <div className="sh-sidebar-col">
          {/* QUICK LINKS SECTION */}
          <div className="sh-card mb-24">
            <div className="sh-card-header">
              <ExternalLink size={16} />
              <h4>Quick Navigation</h4>
            </div>
            <div className="sh-nav-pills">
               <button onClick={() => scrollToSection('faq-section')}>FAQs</button>
               <button onClick={() => scrollToSection('troubleshoot-section')}>Troubleshoot</button>
               <button onClick={() => scrollToSection('contact-section')}>Contact Support</button>
               <button onClick={() => scrollToSection('resources-section')}>Resources</button>
            </div>
          </div>

          {/* CONTACT SECTION */}
          <div className="sh-card sh-contact-card" id="contact-section">
            <div className="sh-card-header">
              <Headset size={18} className="sh-primary-icon" />
              <h3>Get in Touch</h3>
            </div>
            <div className="sh-contact-links">
              <button className="sh-channel-btn"><MessageSquare size={16} /> Live Chat (24/7)</button>
              <button className="sh-channel-btn"><Mail size={16} /> Open Email Ticket</button>
              <button className="sh-channel-btn"><Phone size={16} /> Call Support</button>
            </div>
            <div className="sh-uptime">
              <div className="sh-dot"></div>
              <span>Support Team Online</span>
            </div>
          </div>

          {/* RESOURCES SECTION */}
          <div className="sh-card mt-24" id="resources-section">
            <div className="sh-card-header">
              <BookOpen size={16} />
              <h4>Documentation</h4>
            </div>
            <div className="sh-resource-links">
              <a href="#"><FileText size={14} /> User Manual</a>
              <a href="#"><Video size={14} /> Video Tutorials</a>
              <a href="#"><Download size={14} /> Download SDK</a>
              <a href="#"><Users size={14} /> Community Forum</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SupportAndHelp;