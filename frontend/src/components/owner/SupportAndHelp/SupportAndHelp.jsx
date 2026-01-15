import React, { useState, useEffect } from 'react';
import "./SupportAndHelp.css"
const  SupportAndHelp = ()=> {
  const [activeFaq, setActiveFaq] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const faqData = [
    {
      question: "How do I reset my password?",
      answer: "To reset your password, go to the login page and click on 'Forgot Password'. Enter your email address and we'll send you a link to reset your password. Make sure to check your spam folder if you don't see the email within a few minutes."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for annual plans. For enterprise customers, we also accept wire transfers and purchase orders."
    },
    {
      question: "How can I upgrade my subscription plan?",
      answer: "To upgrade your plan, log into your account, go to the 'Billing' section, and select 'Upgrade Plan'. You'll be able to choose a new plan and the change will take effect immediately. Any prorated amount will be charged or credited to your account."
    },
    {
      question: "Is there a mobile app available?",
      answer: "Yes, we have mobile apps for both iOS and Android. You can download them from the Apple App Store or Google Play Store. The mobile app includes most of the features available on the web version with an optimized mobile interface."
    },
    {
      question: "How do I cancel my subscription?",
      answer: "To cancel your subscription, go to your account settings, select 'Billing', and click 'Cancel Subscription'. Your subscription will remain active until the end of your current billing period, after which you'll lose access to premium features."
    }
  ];

  const handleSearch = () => {
    if (searchQuery.trim()) {
      alert(`Searching for: "${searchQuery}"\nIn a real application, this would trigger a search through help articles.`);
      // In a real implementation, you would redirect to search results or filter content
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? -1 : index);
  };

  // Auto-open first FAQ on load
  useEffect(() => {
    setActiveFaq(0);
  }, []);

  return (
    <div>
      {/* Header */}
      <header>
        <div className="container">
          <div className="logo">
            <i className="fas fa-life-ring"></i>
            <h1>Help & Support Center</h1>
          </div>
          <p className="tagline">Find answers to your questions, troubleshoot issues, or get in touch with our support team</p>
          
          <div className="search-container">
            <input 
              type="text" 
              className="search-bar" 
              placeholder="Search for help articles, FAQs, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button className="search-btn" onClick={handleSearch}>
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>
      </header>
      
      <div className="container">
        <div className="main-content">
          {/* Quick Help Section */}
          <section className="quick-help">
            <div className="help-card">
              <i className="fas fa-question-circle"></i>
              <h3>FAQs</h3>
              <p>Find quick answers to the most frequently asked questions</p>
              <button className="help-btn" onClick={() => scrollToSection('faq-section')}>
                Browse FAQs
              </button>
            </div>
            
            <div className="help-card">
              <i className="fas fa-tools"></i>
              <h3>Troubleshooting</h3>
              <p>Step-by-step guides to resolve common issues</p>
              <button className="help-btn" onClick={() => scrollToSection('troubleshoot-section')}>
                Get Help
              </button>
            </div>
            
            <div className="help-card">
              <i className="fas fa-comments"></i>
              <h3>Contact Support</h3>
              <p>Reach out to our support team via chat, email, or phone</p>
              <button className="help-btn" onClick={() => scrollToSection('contact-section')}>
                Contact Us
              </button>
            </div>
            
            <div className="help-card">
              <i className="fas fa-book"></i>
              <h3>Knowledge Base</h3>
              <p>Browse our comprehensive documentation and guides</p>
              <button className="help-btn" onClick={() => scrollToSection('resources-section')}>
                View Resources
              </button>
            </div>
          </section>
          
          {/* FAQ Section */}
          <section className="faq-section" id="faq-section">
            <h2 className="section-title">
              <i className="fas fa-question-circle"></i> Frequently Asked Questions
            </h2>
            <div className="faq-container">
              {faqData.map((faq, index) => (
                <div 
                  className={`faq-item ${activeFaq === index ? 'active' : ''}`} 
                  key={index}
                >
                  <div className="faq-question" onClick={() => toggleFaq(index)}>
                    <span>{faq.question}</span>
                    <i className="fas fa-chevron-down"></i>
                  </div>
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
          
          {/* Contact Section */}
          <section className="contact-section" id="contact-section">
            <h2 className="section-title">
              <i className="fas fa-headset"></i> Contact Support
            </h2>
            <p>Our support team is available to help you with any questions or issues you may have.</p>
            
            <div className="contact-options">
              <div className="contact-card">
                <i className="fas fa-comment-dots"></i>
                <h4>Live Chat</h4>
                <p>Chat with a support agent in real-time</p>
                <p><strong>Availability:</strong> 24/7</p>
                <a href="#" className="contact-link">
                  Start Chat <i className="fas fa-arrow-right"></i>
                </a>
              </div>
              
              <div className="contact-card">
                <i className="fas fa-envelope"></i>
                <h4>Email Support</h4>
                <p>Send us an email and we'll respond within 24 hours</p>
                <p><strong>Response Time:</strong> Within 24 hours</p>
                <a href="mailto:support@example.com" className="contact-link">
                  support@example.com
                </a>
              </div>
              
              <div className="contact-card">
                <i className="fas fa-phone"></i>
                <h4>Phone Support</h4>
                <p>Speak directly with a support representative</p>
                <p><strong>Availability:</strong> Mon-Fri, 9AM-6PM EST</p>
                <a href="tel:+18005551234" className="contact-link">
                  +1 (800) 555-1234
                </a>
              </div>
            </div>
          </section>
          
          {/* Troubleshooting Section */}
          <section className="troubleshooting-section" id="troubleshoot-section">
            <h2 className="section-title">
              <i className="fas fa-tools"></i> Troubleshooting Guides
            </h2>
            <p>Follow these step-by-step guides to resolve common issues.</p>
            
            <div className="troubleshooting-steps">
              <div className="step">
                <div className="step-number">1</div>
                <div>
                  <h4>Check Your Internet Connection</h4>
                  <p>Ensure you have a stable internet connection. Try loading other websites to verify connectivity.</p>
                </div>
              </div>
              
              <div className="step">
                <div className="step-number">2</div>
                <div>
                  <h4>Clear Browser Cache</h4>
                  <p>Clearing your browser cache can resolve many loading and display issues.</p>
                </div>
              </div>
              
              <div className="step">
                <div className="step-number">3</div>
                <div>
                  <h4>Update Your Browser</h4>
                  <p>Make sure you're using the latest version of your web browser for optimal performance.</p>
                </div>
              </div>
              
              <div className="step">
                <div className="step-number">4</div>
                <div>
                  <h4>Disable Browser Extensions</h4>
                  <p>Some browser extensions can interfere with website functionality. Try disabling them temporarily.</p>
                </div>
              </div>
            </div>
          </section>
          
          {/* Resources Section */}
          <section className="resources-section" id="resources-section">
            <h2 className="section-title">
              <i className="fas fa-book-open"></i> Helpful Resources
            </h2>
            <p>Explore our documentation, guides, and community resources.</p>
            
            <div className="resource-links">
              <a href="#" className="resource-link">
                <i className="fas fa-file-alt"></i>
                <span>User Manual</span>
              </a>
              
              <a href="#" className="resource-link">
                <i className="fas fa-video"></i>
                <span>Video Tutorials</span>
              </a>
              
              <a href="#" className="resource-link">
                <i className="fas fa-download"></i>
                <span>Download Center</span>
              </a>
              
              <a href="#" className="resource-link">
                <i className="fas fa-users"></i>
                <span>Community Forum</span>
              </a>
              
              <a href="#" className="resource-link">
                <i className="fas fa-blog"></i>
                <span>Blog & Updates</span>
              </a>
              
              <a href="#" className="resource-link">
                <i className="fas fa-cogs"></i>
                <span>API Documentation</span>
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default SupportAndHelp;