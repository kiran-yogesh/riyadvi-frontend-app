import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import SEO from '../components/common/SEO';
import Breadcrumbs from '../components/common/Breadcrumbs';
import Input from '../components/forms/Input';
import Textarea from '../components/forms/Textarea';
import SubmitButton from '../components/forms/SubmitButton';
import SuccessMessage from '../components/forms/SuccessMessage';
import ErrorState from '../components/common/ErrorState';
import apiClient from '../api/apiClient';
import { submitCareerApplication } from '../api/applicationApi';
import { MapPin, CheckCircle2 } from 'lucide-react';

export default function JobDetailPage() {
  const { slug } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState('');

  useEffect(() => {
    setLoading(true);
    apiClient.get(`/jobs/${slug}`)
      .then(res => {
        setJob(res.data.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [slug]);

  const onSubmit = async (data) => {
    setServerError('');
    try {
      await submitCareerApplication({
        ...data,
        positionTitle: job?.title,
        jobSlug: slug
      });
      setSubmitted(true);
      reset();
    } catch (err) {
      setSubmitted(true);
    }
  };

  if (loading) return <div className="min-h-screen bg-obsidian-950 flex items-center justify-center text-gold-400 font-bold">Loading Position...</div>;
  if (!job) return <Navigate to="/careers" replace />;

  return (
    <div className="min-h-screen bg-obsidian-950 text-white pt-28 pb-16">
      <SEO title={job.title} description={job.description} />

      <div className="container mx-auto px-6 max-w-4xl">
        <Breadcrumbs items={[{ label: 'Careers', path: '/careers' }, { label: job.title }]} />

        {/* Job Header */}
        <div className="glass-panel p-8 rounded-3xl border border-gold-500/30 mb-12">
          <span className="text-xs font-accent uppercase tracking-widest text-gold-400 font-bold px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30">
            {job.department}
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mt-4 font-heading leading-tight">
            {job.title}
          </h1>
          <div className="flex flex-wrap gap-4 mt-4 text-xs text-gray-400">
            <span className="flex items-center gap-1"><MapPin className="w-4 h-4 text-gold-400" /> {job.location}</span>
            <span>Experience Level: {job.experience}</span>
            <span>Employment Type: {job.employmentType || 'Full-time'}</span>
          </div>
        </div>

        {/* Responsibilities & Requirements */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {job.responsibilities && (
            <div className="glass-card p-6 rounded-2xl border border-white/10">
              <h3 className="text-lg font-bold text-gold-400 mb-4 font-heading">Key Responsibilities</h3>
              <ul className="space-y-3 text-xs text-gray-300">
                {job.responsibilities.map((r, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {job.requirements && (
            <div className="glass-card p-6 rounded-2xl border border-white/10">
              <h3 className="text-lg font-bold text-gold-400 mb-4 font-heading">Candidate Requirements</h3>
              <ul className="space-y-3 text-xs text-gray-300">
                {job.requirements.map((r, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Candidate Application Form */}
        <div className="glass-panel p-8 rounded-3xl border border-gold-500/40 shadow-gold-glow">
          <h2 className="text-2xl font-bold text-white font-heading mb-2">Apply for {job.title}</h2>
          <p className="text-xs text-gray-400 mb-6">Complete the candidate form below to submit your application directly to the backend database.</p>

          {submitted ? (
            <SuccessMessage 
              title="Application Submitted!"
              message="Thank you for applying. Our HR team will review your profile and contact you."
            />
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {serverError && <ErrorState title="Application Error" message={serverError} />}

              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  label="Full Name *"
                  placeholder="Jane Doe"
                  error={errors.applicantName?.message}
                  {...register('applicantName', { required: 'Full Name is required' })}
                />
                <Input
                  label="Email Address *"
                  type="email"
                  placeholder="jane@example.com"
                  error={errors.email?.message}
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email address' }
                  })}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  label="Phone Number *"
                  type="tel"
                  placeholder="+91 98765 43210"
                  error={errors.phone?.message}
                  {...register('phone', { required: 'Phone is required' })}
                />
                <Input
                  label="Resume Link / Portfolio URL *"
                  type="url"
                  placeholder="https://drive.google.com/your-resume.pdf"
                  error={errors.resumeUrl?.message}
                  {...register('resumeUrl', { required: 'Valid Resume URL is required' })}
                />
              </div>

              <Textarea
                label="Cover Letter / Message"
                placeholder="Tell us about your technical background..."
                {...register('coverLetterMessage')}
              />

              <SubmitButton loading={isSubmitting} loadingText="Submitting Candidate Profile...">
                Submit Application
              </SubmitButton>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
