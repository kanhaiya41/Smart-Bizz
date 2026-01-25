import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Store, MessageSquare, ShieldAlert, ChevronRight,
  ChevronLeft, CheckCircle2, Bot, Target, Languages
} from 'lucide-react';
import './Rulesheet.css';

const Rulesheet = () => {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(0);
  const [formData, setFormData] = useState({
    business: { name: '', type: '', description: '', targetCustomers: '' },
    aiBehaviour: { personality: '', responseStyle: '', language: 'english', restrictions: { noSlang: false, noJargon: false, noEmojis: false, noPromises: false } },
    dosAndDonts: { canDo: '', cannotDo: '', restrictions: { discountAllowed: false, competitorComparison: false, priceNegotiation: false, futurePromises: false } }
  });

  const sections = [
    { id: 'section1', title: 'Business Identity', desc: 'Core business info', icon: <Store size={20} /> },
    { id: 'section2', title: 'AI Personality', desc: 'Tone & behavior', icon: <MessageSquare size={20} /> },
    { id: 'section3', title: "Rules & Safety", desc: 'Compliance & limits', icon: <ShieldAlert size={20} /> }
  ];

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({ ...prev, [section]: { ...prev[section], [field]: value } }));
  };

  const handleCheckboxChange = (section, subSection, field, value) => {
    setFormData(prev => ({ ...prev, [section]: { ...prev[section], [subSection]: { ...prev[section][subSection], [field]: value } } }));
  };

  const handleSubmit = () => {
    console.log('Final Data:', formData);
    // Add your API call here
    navigate('/owner/inventory'); // Redirect back after success
  };

  return (
    <div className="rs-container">
      {/* Sidebar Navigation - Professional Look */}
      <aside className="rs-sidebar">
        <div className="rs-sidebar-header">
          <div className="rs-logo-box"><Bot color="white" /></div>
          <div>
            <h3>AI Configurator</h3>
            <p>Rulesheet Builder</p>
          </div>
        </div>

        <nav className="rs-nav">
          {sections.map((s, i) => (
            <div
              key={s.id}
              className={`rs-nav-item ${currentSection === i ? 'active' : ''} ${currentSection > i ? 'completed' : ''}`}
              onClick={() => setCurrentSection(i)}
            >
              <div className="rs-nav-icon">{currentSection > i ? <CheckCircle2 size={18} /> : s.icon}</div>
              <div className="rs-nav-text">
                <span className="rs-nav-title">{s.title}</span>
                <span className="rs-nav-desc">{s.desc}</span>
              </div>
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="rs-main">
        <div className="rs-card">
          {currentSection === 0 && (
            <div className="rs-section-body anim-slide-up">
              <header className="rs-section-header">
                <div className="rs-icon-circle"><Store color="#4f46e5" /></div>
                <div>
                  <h2>Business Identity</h2>
                  <p>Help AI understand your brand and target audience.</p>
                </div>
              </header>

              <div className="rs-form-grid">
                <div className="rs-input-group">
                  <label>Business Name</label>
                  <input type="text" placeholder="e.g. HealthKart Pharmacy" value={formData.business.name} onChange={(e) => handleInputChange('business', 'name', e.target.value)} />
                </div>
                <div className="rs-input-group">
                  <label>Business Type</label>
                  <select value={formData.business.type} onChange={(e) => handleInputChange('business', 'type', e.target.value)}>
                    <option value="">Select Type</option>
                    <option value="retail">Retail</option>
                    <option value="service">Service</option>
                    <option value="ecommerce">E-commerce</option>
                  </select>
                </div>
              </div>

              <div className="rs-input-group">
                <label>Brand Description</label>
                <textarea placeholder="Tell the AI what you sell and what makes you special..." value={formData.business.description} onChange={(e) => handleInputChange('business', 'description', e.target.value)} />
              </div>

              <div className="rs-input-group">
                <label><Target size={14} style={{ marginRight: '5px' }} /> Ideal Customers</label>
                <input type="text" placeholder="e.g. Local residents, chronic patients" value={formData.business.targetCustomers} onChange={(e) => handleInputChange('business', 'targetCustomers', e.target.value)} />
              </div>
            </div>
          )}

          {currentSection === 1 && (
            <div className="rs-section-body anim-slide-up">
              <header className="rs-section-header">
                <div className="rs-icon-circle"><MessageSquare color="#4f46e5" /></div>
                <div>
                  <h2>AI Personality</h2>
                  <p>Define how the AI talks and carries your brand voice.</p>
                </div>
              </header>

              <div className="rs-form-grid">
                <div className="rs-input-group">
                  <label>Voice Tone</label>
                  <select value={formData.aiBehaviour.personality} onChange={(e) => handleInputChange('aiBehaviour', 'personality', e.target.value)}>
                    <option value="friendly">Friendly & Helpful</option>
                    <option value="professional">Strictly Professional</option>
                    <option value="humorous">Casual & Witty</option>
                  </select>
                </div>
                <div className="rs-input-group">
                  <label><Languages size={14} style={{ marginRight: '5px' }} /> Response Language</label>
                  <select value={formData.aiBehaviour.language} onChange={(e) => handleInputChange('aiBehaviour', 'language', e.target.value)}>
                    <option value="english">English</option>
                    <option value="hindi">Hindi</option>
                    <option value="bilingual">Bilingual (Hinglish)</option>
                  </select>
                </div>
              </div>

              <div className="rs-checkbox-section">
                <label className="rs-label-sm">Behavioral Constraints</label>
                <div className="rs-checkbox-grid">
                  {Object.keys(formData.aiBehaviour.restrictions).map((key) => (
                    <label key={key} className="rs-checkbox-card">
                      <input type="checkbox" checked={formData.aiBehaviour.restrictions[key]} onChange={(e) => handleCheckboxChange('aiBehaviour', 'restrictions', key, e.target.checked)} />
                      <span>{key.replace(/([A-Z])/g, ' $1').replace(/^no/, 'No')}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentSection === 2 && (
            <div className="rs-section-body anim-slide-up">
              <header className="rs-section-header">
                <div className="rs-icon-circle"><ShieldAlert color="#4f46e5" /></div>
                <div>
                  <h2>Rules & Safety</h2>
                  <p>Set boundaries on what the AI can and cannot say.</p>
                </div>
              </header>

              <div className="rs-form-grid">
                <div className="rs-input-group">
                  <label className="text-success">Allowed Actions (Do's)</label>
                  <textarea placeholder="e.g. Mention current store offers..." value={formData.dosAndDonts.canDo} onChange={(e) => handleInputChange('dosAndDonts', 'canDo', e.target.value)} />
                </div>
                <div className="rs-input-group">
                  <label className="text-danger">Restricted Actions (Don'ts)</label>
                  <textarea placeholder="e.g. Never discuss competitors..." value={formData.dosAndDonts.cannotDo} onChange={(e) => handleInputChange('dosAndDonts', 'cannotDo', e.target.value)} />
                </div>
              </div>
            </div>
          )}

          <footer className="rs-footer">
            <button className={`rs-btn-secondary ${currentSection === 0 ? 'invisible' : ''}`} onClick={() => setCurrentSection(prev => prev - 1)}>
              <ChevronLeft size={18} /> Back
            </button>
            {currentSection < sections.length - 1 ? (
              <button className="rs-btn-primary" onClick={() => setCurrentSection(prev => prev + 1)}>
                Continue <ChevronRight size={18} />
              </button>
            ) : (
              <button className="rs-btn-submit" onClick={handleSubmit}>
                Save Rulesheet <CheckCircle2 size={18} />
              </button>
            )}
          </footer>
        </div>
      </main>
    </div>
  );
};

export default Rulesheet;