import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import SEO from '../components/common/SEO';
import Breadcrumbs from '../components/common/Breadcrumbs';
import Input from '../components/forms/Input';
import SubmitButton from '../components/forms/SubmitButton';
import SuccessMessage from '../components/forms/SuccessMessage';
import ErrorState from '../components/common/ErrorState';
import { submitLeadMagnetDownload } from '../api/leadMagnetApi';
import { Download, CheckCircle2, FileText } from 'lucide-react';

export default function LeadMagnetPage() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
  const [downloadReady, setDownloadReady] = useState(false);
  const [serverError, setServerError] = useState('');

  const onSubmit = async (data) => {
    setServerError('');
    try {
      await submitLeadMagnetDownload(data);
      setDownloadReady(true);
      reset();
    } catch (err) {
      setDownloadReady(true);
    }
  };

  return (
    <div className="min-h-screen bg-obsidian-950 text-white pt-28 pb-16">
      <SEO title="Software Project Planning Guide" description="Download the free Software Project Planning Guide blueprint for CTOs, product managers, and founders on scoping software architectures and estimating budgets." />

      <div className="container mx-auto px-6 max-w-5xl">
        <Breadcrumbs items={[{ label: 'Software Project Planning Guide' }]} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column */}
          <div>
            <span className="text-xs font-accent uppercase tracking-widest text-gold-400 font-bold px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30">
              Free Engineering Resource
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mt-4 font-heading leading-tight">
              Download Software Project <span className="gold-gradient-text">Planning Guide</span>
            </h1>
            <p className="text-gray-300 mt-4 text-base leading-relaxed">
              A comprehensive blueprint for CTOs, product managers, and founders on scoping MERN stack software architectures, estimating budgets, and avoiding costly technical debt.
            </p>

            <div className="space-y-4 mt-8">
              <div className="flex items-start gap-3 text-sm text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                <span>Architecture Scoping & Tech Stack Evaluation Framework</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                <span>Database Indexing & API Security Checklist</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                <span>Budget & Timeline Estimator Matrix</span>
              </div>
            </div>

            <div className="mt-10 glass-panel p-6 rounded-2xl border border-gold-500/30 flex items-center gap-4">
              <div className="w-16 h-20 bg-gradient-to-tr from-gold-600 to-gold-400 rounded-lg flex items-center justify-center text-black font-bold font-heading shadow-gold-glow">
                <FileText className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-white font-bold font-heading">Software Project Planning Guide (PDF)</h4>
                <p className="text-xs text-gray-400">Version 2026 • 24 Pages • Scoping Master Blueprint</p>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="glass-panel p-8 md:p-10 rounded-3xl border border-gold-500/40 shadow-gold-glow">
            {downloadReady ? (
              <SuccessMessage 
                title="Access Granted!"
                message="Your Software Project Planning Guide PDF download is ready."
              >
                <a
                  href="/assets/Software_Project_Planning_Guide_Riyadvi.pdf"
                  download="Software_Project_Planning_Guide_Riyadvi.pdf"
                  onClick={() => alert('Guide PDF Download Triggered!')}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl gold-gradient-bg text-black font-bold text-sm shadow-gold-glow hover:scale-105 transition-all mt-4"
                >
                  <Download className="w-5 h-5" /> Instant PDF Download
                </a>
              </SuccessMessage>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <h3 className="text-xl font-bold font-heading text-white mb-2">Get Instant Access</h3>
                <p className="text-xs text-gray-400 mb-6">Enter your details to unlock the free Software Project Planning Guide PDF.</p>

                {serverError && <ErrorState title="Download Error" message={serverError} />}

                <Input
                  label="Full Name *"
                  placeholder="John Smith"
                  error={errors.name?.message}
                  {...register('name', { required: 'Full Name is required' })}
                />

                <Input
                  label="Company Name *"
                  placeholder="Acme Inc."
                  error={errors.company?.message}
                  {...register('company', { required: 'Company is required' })}
                />

                <Input
                  label="Work Email Address *"
                  type="email"
                  placeholder="john@company.com"
                  error={errors.email?.message}
                  {...register('email', { 
                    required: 'Work Email is required',
                    pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email address' }
                  })}
                />

                <Input
                  label="Phone Number *"
                  type="tel"
                  placeholder="+91 98765 43210"
                  error={errors.phone?.message}
                  {...register('phone', { required: 'Phone is required' })}
                />

                <SubmitButton loading={isSubmitting} loadingText="Unlocking Download...">
                  Download Free Guide PDF
                </SubmitButton>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
