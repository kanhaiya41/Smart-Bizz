import React, { useState } from 'react';
import './Rulesheet.css';

const Rulesheet = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [formData, setFormData] = useState({
    business: {
      name: '',
      type: '',
      description: '',
      targetCustomers: ''
    },
    aiBehaviour: {
      personality: '',
      responseStyle: '',
      language: 'english',
      restrictions: {
        noSlang: false,
        noJargon: false,
        noEmojis: false,
        noPromises: false
      }
    },
    dosAndDonts: {
      canDo: '',
      cannotDo: '',
      restrictions: {
        discountAllowed: false,
        competitorComparison: false,
        priceNegotiation: false,
        futurePromises: false
      }
    }
  });

  const sections = [
    { id: 'section1', title: 'Business Basics', icon: 'store' },
    { id: 'section2', title: 'AI Behaviour', icon: 'comment-dots' },
    { id: 'section3', title: "Do's & Don'ts", icon: 'ban' }
  ];

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleCheckboxChange = (section, subSection, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [subSection]: {
          ...prev[section][subSection],
          [field]: value
        }
      }
    }));
  };

  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const handlePrev = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Form Data:', formData);
    alert('AI Rules Configuration Submitted Successfully!\n\nYour AI assistant has been configured with the provided rules.');
  };

  const renderBusinessBasics = () => (
    <div className="form-section">
      <h2 className="section-title"><i className="fas fa-store"></i> Business Basics</h2>
      <p className="section-description">Provide basic information about your business so AI can understand what your business is and who it serves.</p>
      
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="businessName">Business Name *</label>
          <input 
            type="text" 
            id="businessName" 
            value={formData.business.name}
            onChange={(e) => handleInputChange('business', 'name', e.target.value)}
            placeholder="Enter your business name" 
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="businessType">Business Type *</label>
          <select 
            id="businessType"
            value={formData.business.type}
            onChange={(e) => handleInputChange('business', 'type', e.target.value)}
          >
            <option value="">Select business type</option>
            <option value="retail">Retail</option>
            <option value="service">Service Provider</option>
            <option value="ecommerce">E-commerce</option>
            <option value="restaurant">Restaurant/Food</option>
            <option value="consulting">Consulting</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
      
      <div className="form-group">
        <label htmlFor="businessDescription">Business Description *</label>
        <textarea 
          id="businessDescription" 
          value={formData.business.description}
          onChange={(e) => handleInputChange('business', 'description', e.target.value)}
          placeholder="Describe your business in detail. What products/services do you offer? What makes you unique?"
        ></textarea>
        <div className="input-hint">This will help AI understand your business context better.</div>
      </div>
      
      <div className="form-group">
        <label htmlFor="targetCustomers">Target Customers *</label>
        <textarea 
          id="targetCustomers" 
          value={formData.business.targetCustomers}
          onChange={(e) => handleInputChange('business', 'targetCustomers', e.target.value)}
          placeholder="Describe your ideal customers. Include demographics, interests, needs, etc."
        ></textarea>
        <div className="input-hint">Example: "Young professionals aged 25-40, tech-savvy, value convenience"</div>
      </div>
    </div>
  );

  const renderAIBehaviour = () => (
    <div className="form-section">
      <h2 className="section-title"><i className="fas fa-comment-dots"></i> AI Behaviour & Language</h2>
      <p className="section-description">Set how your AI should communicate with customers. Control the tone, style, and language preferences.</p>
      
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="aiPersonality">AI Personality *</label>
          <select 
            id="aiPersonality"
            value={formData.aiBehaviour.personality}
            onChange={(e) => handleInputChange('aiBehaviour', 'personality', e.target.value)}
          >
            <option value="">Select AI personality</option>
            <option value="friendly">Friendly & Casual</option>
            <option value="professional">Professional & Formal</option>
            <option value="enthusiastic">Enthusiastic & Energetic</option>
            <option value="helpful">Helpful & Supportive</option>
            <option value="humorous">Humorous & Witty</option>
          </select>
          <div className="input-hint">How should your AI sound to customers?</div>
        </div>
        
        <div className="form-group">
          <label htmlFor="responseStyle">Response Style *</label>
          <select 
            id="responseStyle"
            value={formData.aiBehaviour.responseStyle}
            onChange={(e) => handleInputChange('aiBehaviour', 'responseStyle', e.target.value)}
          >
            <option value="">Select response style</option>
            <option value="concise">Concise & Direct</option>
            <option value="detailed">Detailed & Thorough</option>
            <option value="conversational">Conversational & Engaging</option>
            <option value="technical">Technical & Precise</option>
          </select>
        </div>
      </div>
      
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="languagePreference">Language Preference *</label>
          <select 
            id="languagePreference"
            value={formData.aiBehaviour.language}
            onChange={(e) => handleInputChange('aiBehaviour', 'language', e.target.value)}
          >
            <option value="english">English</option>
            <option value="hindi">Hindi</option>
            <option value="spanish">Spanish</option>
            <option value="french">French</option>
            <option value="bilingual">Bilingual (English + Hindi)</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Tone Restrictions</label>
          <div className="checkbox-group">
            <div className="checkbox-item">
              <input 
                type="checkbox" 
                id="noSlang" 
                checked={formData.aiBehaviour.restrictions.noSlang}
                onChange={(e) => handleCheckboxChange('aiBehaviour', 'restrictions', 'noSlang', e.target.checked)}
              />
              <label htmlFor="noSlang">No slang/informal language</label>
            </div>
            <div className="checkbox-item">
              <input 
                type="checkbox" 
                id="noJargon" 
                checked={formData.aiBehaviour.restrictions.noJargon}
                onChange={(e) => handleCheckboxChange('aiBehaviour', 'restrictions', 'noJargon', e.target.checked)}
              />
              <label htmlFor="noJargon">Avoid technical jargon</label>
            </div>
            <div className="checkbox-item">
              <input 
                type="checkbox" 
                id="noEmojis" 
                checked={formData.aiBehaviour.restrictions.noEmojis}
                onChange={(e) => handleCheckboxChange('aiBehaviour', 'restrictions', 'noEmojis', e.target.checked)}
              />
              <label htmlFor="noEmojis">No emojis</label>
            </div>
            <div className="checkbox-item">
              <input 
                type="checkbox" 
                id="noPromises" 
                checked={formData.aiBehaviour.restrictions.noPromises}
                onChange={(e) => handleCheckboxChange('aiBehaviour', 'restrictions', 'noPromises', e.target.checked)}
              />
              <label htmlFor="noPromises">Avoid making promises</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDosAndDonts = () => (
    <div className="form-section">
      <h2 className="section-title"><i className="fas fa-ban"></i> Do's & Don'ts</h2>
      <p className="section-description">Define boundaries for your AI to avoid wrong promises or misinformation.</p>
      
      <div className="form-group">
        <label>What AI CAN Do</label>
        <textarea 
          id="canDo" 
          value={formData.dosAndDonts.canDo}
          onChange={(e) => handleInputChange('dosAndDonts', 'canDo', e.target.value)}
          placeholder="Examples: Provide product information, Answer FAQs, Schedule appointments, Process returns within policy"
        ></textarea>
      </div>
      
      <div className="form-group">
        <label>What AI CANNOT Do</label>
        <textarea 
          id="cannotDo" 
          value={formData.dosAndDonts.cannotDo}
          onChange={(e) => handleInputChange('dosAndDonts', 'cannotDo', e.target.value)}
          placeholder="Examples: Offer discounts without authorization, Compare with competitors, Make promises about delivery times, Share customer data"
        ></textarea>
      </div>
      
      <div className="form-group">
        <label>Specific Restrictions</label>
        <div className="checkbox-group">
          <div className="checkbox-item">
            <input 
              type="checkbox" 
              id="discountAllowed" 
              checked={formData.dosAndDonts.restrictions.discountAllowed}
              onChange={(e) => handleCheckboxChange('dosAndDonts', 'restrictions', 'discountAllowed', e.target.checked)}
            />
            <label htmlFor="discountAllowed">Discounts allowed</label>
          </div>
          <div className="checkbox-item">
            <input 
              type="checkbox" 
              id="competitorComparison" 
              checked={formData.dosAndDonts.restrictions.competitorComparison}
              onChange={(e) => handleCheckboxChange('dosAndDonts', 'restrictions', 'competitorComparison', e.target.checked)}
            />
            <label htmlFor="competitorComparison">Competitor comparison allowed</label>
          </div>
          <div className="checkbox-item">
            <input 
              type="checkbox" 
              id="priceNegotiation" 
              checked={formData.dosAndDonts.restrictions.priceNegotiation}
              onChange={(e) => handleCheckboxChange('dosAndDonts', 'restrictions', 'priceNegotiation', e.target.checked)}
            />
            <label htmlFor="priceNegotiation">Price negotiation allowed</label>
          </div>
          <div className="checkbox-item">
            <input 
              type="checkbox" 
              id="futurePromises" 
              checked={formData.dosAndDonts.restrictions.futurePromises}
              onChange={(e) => handleCheckboxChange('dosAndDonts', 'restrictions', 'futurePromises', e.target.checked)}
            />
            <label htmlFor="futurePromises">Can make promises about future features</label>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="rulesheet-container">
      <header className="rulesheet-header">
        <div className="header-content">
          <div className="logo">
            <div className="logo-icon">
              <i className="fas fa-robot"></i>
            </div>
            <div>
              <h1>SmartBizz AI Rules</h1>
              <p>Configure your AI assistant behavior and response rules</p>
            </div>
          </div>
          
          <div className="progress-container">
            <div className="progress-bar">
              {sections.map((_, index) => (
                <div 
                  key={index}
                  className={`progress-step ${index <= currentSection ? 'active' : ''}`}
                >
                  {index + 1}
                </div>
              ))}
              <div className="progress-line">
                <div 
                  className="progress-fill" 
                  style={{ width: `${(currentSection / (sections.length - 1)) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <div className="rulesheet-content">
        <div className="form-wrapper">
          <div className="form-nav">
            {sections.map((section, index) => (
              <div 
                key={section.id}
                className={`nav-item ${currentSection === index ? 'active' : ''}`}
                onClick={() => setCurrentSection(index)}
              >
                <i className={`fas fa-${section.icon}`}></i> {section.title}
              </div>
            ))}
          </div>
          
          {currentSection === 0 && renderBusinessBasics()}
          {currentSection === 1 && renderAIBehaviour()}
          {currentSection === 2 && renderDosAndDonts()}
          
          <div className="button-container">
            <button 
              className={`btn btn-prev ${currentSection === 0 ? 'hidden' : ''}`} 
              onClick={handlePrev}
            >
              <i className="fas fa-arrow-left"></i> Previous
            </button>
            
            <div>
              <button 
                className={`btn btn-next ${currentSection === sections.length - 1 ? 'hidden' : ''}`} 
                onClick={handleNext}
              >
                Next <i className="fas fa-arrow-right"></i>
              </button>
              <button 
                className={`btn btn-submit ${currentSection === sections.length - 1 ? '' : 'hidden'}`} 
                onClick={handleSubmit}
              >
                <i className="fas fa-check-circle"></i> Submit AI Rules
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <footer className="rulesheet-footer">
        <p>SmartBizz AI Rules Configuration Guide | Designed for Business Owners</p>
        <p>All data entered is securely stored and only used for configuring your AI assistant.</p>
      </footer>
    </div>
  );
};

export default Rulesheet;