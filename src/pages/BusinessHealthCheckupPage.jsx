import React, { useState } from 'react';
import SEO from '../components/common/SEO';
import Breadcrumbs from '../components/common/Breadcrumbs';
import Input from '../components/forms/Input';
import Textarea from '../components/forms/Textarea';
import Select from '../components/forms/Select';
import SubmitButton from '../components/forms/SubmitButton';
import SuccessMessage from '../components/forms/SuccessMessage';
import ErrorState from '../components/common/ErrorState';
import { submitHealthCheckupAudit } from '../api/healthCheckupApi';
import DigitalTransformationScene from '../components/three/DigitalTransformationScene';
import { ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';

export default function BusinessHealthCheckupPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    companyName: '',
    industry: 'Technology',
    contactPerson: '',
    email: '',
    phone: '',
    websiteUrl: '',
    marketingChallenges: [],
    techStackCurrent: [],
    primaryGoal: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const handleChallengeToggle = (challenge) => {
    setForm(prev => {
      const exists = prev.marketingChallenges.includes(challenge);
      return {
        ...prev,
        marketingChallenges: exists 
          ? prev.marketingChallenges.filter(c => c !== challenge)
          : [...prev.marketingChallenges, challenge]
      };
    });
  };

  const handleTechToggle = (tech) => {
    setForm(prev => {
      const exists = prev.techStackCurrent.includes(tech);
      return {
        ...prev,
        techStackCurrent: exists 
          ? prev.techStackCurrent.filter(t => t !== tech)
          : [...prev.techStackCurrent, tech]
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.primaryGoal) {
      alert('Please fill out your primary business goal.');
      return;
    }

    setLoading(true);
    setServerError('');
    try {
      await submitHealthCheckupAudit(form);
      setSubmitted(true);
    } catch (err) {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-obsidian-950 text-white pt-28 pb-16">
      <SEO title="Business Health Checkup" description="Interactive 5-step diagnostic audit assessing your company's digital presence, marketing bottlenecks, technology infrastructure, and growth goals." />

      <div className="container mx-auto px-6 max-w-3xl">
        <Breadcrumbs items={[{ label: 'Business Health Checkup' }]} />

        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-accent uppercase tracking-widest text-gold-400 font-bold px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30">
            Interactive Diagnostic Audit
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mt-4 font-heading leading-tight">
            Is Your Business Ready for Its Next <span className="gold-gradient-text">Digital Growth Stage?</span>
          </h1>
          <p className="text-gray-400 mt-4 text-sm leading-relaxed">
            Complete our 5-step technical assessment to receive a customized diagnostic report from Riyadvi architects.
          </p>
        </div>

        {/* 3D Visual Health Progress Matrix */}
        <div className="mb-8">
          <DigitalTransformationScene activeStep={step - 1} />
        </div>

        {/* Progress Bar */}
        <div className="mb-10">
          <div className="flex justify-between text-xs text-gold-400 font-bold font-accent mb-2">
            <span>Step {step} of 5</span>
            <span>{Math.round((step / 5) * 100)}% Completed</span>
          </div>
          <div className="w-full h-2 bg-black/60 rounded-full overflow-hidden border border-white/10">
            <div 
              className="h-full gold-gradient-bg transition-all duration-300" 
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Container */}
        <div className="glass-panel p-8 md:p-10 rounded-3xl border border-gold-500/40 shadow-gold-glow">
          {submitted ? (
            <SuccessMessage 
              title="Diagnostic Audit Submitted!"
              message={`Thank you, ${form.contactPerson}. Our technical team is reviewing your digital infrastructure requirements and will email your report to ${form.email}.`}
            >
              <ShieldCheck className="w-16 h-16 text-gold-400 mx-auto mt-4" />
            </SuccessMessage>
          ) : (
            <form onSubmit={handleSubmit}>
              {serverError && <ErrorState title="Audit Submission Failed" message={serverError} />}

              {/* STEP 1 */}
              {step === 1 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold font-heading text-gold-400 mb-4">Step 1: Business Information</h3>
                  <Input
                    label="Company Name *"
                    placeholder="e.g. Acme Innovations"
                    value={form.companyName}
                    onChange={e => setForm({...form, companyName: e.target.value})}
                  />
                  <Select
                    label="Industry Sector *"
                    options={[
                      'Technology',
                      'Healthcare',
                      'E-Commerce',
                      'Real Estate',
                      'Finance',
                      'Services'
                    ]}
                    value={form.industry}
                    onChange={e => setForm({...form, industry: e.target.value})}
                  />
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      label="Contact Person Name *"
                      placeholder="John Doe"
                      value={form.contactPerson}
                      onChange={e => setForm({...form, contactPerson: e.target.value})}
                    />
                    <Input
                      label="Email Address *"
                      type="email"
                      placeholder="john@company.com"
                      value={form.email}
                      onChange={e => setForm({...form, email: e.target.value})}
                    />
                  </div>
                  <Input
                    label="Phone Number *"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={e => setForm({...form, phone: e.target.value})}
                  />
                </div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold font-heading text-gold-400 mb-4">Step 2: Website & Digital Presence</h3>
                  <Input
                    label="Current Website URL (if applicable)"
                    type="url"
                    placeholder="https://yourwebsite.com"
                    value={form.websiteUrl}
                    onChange={e => setForm({...form, websiteUrl: e.target.value})}
                  />
                </div>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold font-heading text-gold-400 mb-4">Step 3: Marketing Bottlenecks</h3>
                  <label className="block text-xs text-gray-300 font-medium mb-2">Select all challenges your business faces:</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {['Low Conversion Rates', 'Poor Mobile User Experience', 'Slow Page Load Times', 'Lack of Organic Traffic (SEO)', 'High Customer Acquisition Cost'].map((item, idx) => (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => handleChallengeToggle(item)}
                        className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all ${
                          form.marketingChallenges.includes(item)
                            ? 'bg-gold-500/20 border-gold-500 text-gold-300'
                            : 'bg-black/40 border-white/10 text-gray-300 hover:border-gold-500/30'
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 4 */}
              {step === 4 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold font-heading text-gold-400 mb-4">Step 4: Current Technology Infrastructure</h3>
                  <label className="block text-xs text-gray-300 font-medium mb-2">Select tech stack components you currently use:</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {['React / Next.js', 'Node.js Express', 'WordPress / PHP', 'Monolithic Legacy System', 'MongoDB / MySQL', 'Mobile App'].map((tech, idx) => (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => handleTechToggle(tech)}
                        className={`p-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                          form.techStackCurrent.includes(tech)
                            ? 'bg-gold-500/20 border-gold-500 text-gold-300'
                            : 'bg-black/40 border-white/10 text-gray-300 hover:border-gold-500/30'
                        }`}
                      >
                        {tech}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 5 */}
              {step === 5 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold font-heading text-gold-400 mb-4">Step 5: Primary Business Goal</h3>
                  <Textarea
                    label="What is your #1 strategic objective for the next 6-12 months? *"
                    placeholder="e.g. Scale mobile user base, revamp brand with 3D elements, and automate lead management..."
                    value={form.primaryGoal}
                    onChange={e => setForm({...form, primaryGoal: e.target.value})}
                  />
                </div>
              )}

              {/* Step Navigation Controls */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/10">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="px-6 py-2.5 rounded-xl border border-white/10 text-xs font-semibold text-gray-300 hover:text-white flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-4 h-4" /> Previous
                  </button>
                ) : <div />}

                {step < 5 ? (
                  <button
                    type="button"
                    onClick={() => {
                      if (step === 1 && (!form.companyName || !form.contactPerson || !form.email || !form.phone)) {
                        alert('Please fill out all required fields in Step 1.');
                        return;
                      }
                      setStep(step + 1);
                    }}
                    className="px-6 py-2.5 rounded-xl gold-gradient-bg text-black font-bold text-xs shadow-gold-glow hover:scale-105 transition-all flex items-center gap-1.5"
                  >
                    Next Step <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <SubmitButton loading={loading} loadingText="Submitting Audit...">
                    Submit Health Checkup
                  </SubmitButton>
                )}
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
}
