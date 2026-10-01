import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import SEO from '../components/common/SEO';
import Breadcrumbs from '../components/common/Breadcrumbs';
import Input from '../components/forms/Input';
import Textarea from '../components/forms/Textarea';
import Select from '../components/forms/Select';
import SubmitButton from '../components/forms/SubmitButton';
import SuccessMessage from '../components/forms/SuccessMessage';
import ErrorState from '../components/common/ErrorState';
import { submitContactEnquiry } from '../api/contactApi';
import { Mail, Phone, MapPin, MessageSquare, Calendar } from 'lucide-react';

export default function ContactPage() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      requirement: 'Web Development',
      message: ''
    }
  });

  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState('');

  const onSubmit = async (data) => {
    setServerError('');
    try {
      await submitContactEnquiry(data);
      setSubmitted(true);
      reset();
    } catch (err) {
      setServerError(err.response?.data?.message || 'Failed to submit enquiry. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-obsidian-950 text-white pt-28 pb-16">
      <SEO title="Contact Us" description="Get in touch with Riyadvi Software Technologies solutions team for software development, 3D WebGL experiences, and digital transformation." />

      <div className="container mx-auto px-6 max-w-6xl">
        <Breadcrumbs items={[{ label: 'Contact Us' }]} />

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-accent uppercase tracking-widest text-gold-400 font-bold px-3.5 py-1 rounded-full bg-gold-500/10 border border-gold-500/30">
            Let's Build Together
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mt-4 font-heading">
            Contact <span className="gold-gradient-text">Riyadvi</span>
          </h1>
          <p className="text-gray-400 mt-4 text-base leading-relaxed">
            Have a project in mind or need a technical evaluation? Get in touch with our solutions team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Form */}
          <div className="glass-panel p-8 md:p-10 rounded-3xl border border-gold-500/30 shadow-gold-glow">
            <h2 className="text-2xl font-bold text-white font-heading mb-6">Send an Enquiry</h2>

            {submitted ? (
              <SuccessMessage
                title="Thank You for Reaching Out!"
                message="Your enquiry has been sent to our solution architecture team. We will get back to you within 24 hours."
              >
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl border border-gold-500/40 text-gold-400 text-xs font-bold hover:bg-gold-500/10 transition-all mt-4"
                >
                  Send Another Message
                </button>
              </SuccessMessage>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {serverError && <ErrorState title="Submission Failed" message={serverError} />}

                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label="Full Name *"
                    placeholder="John Smith"
                    error={errors.name?.message}
                    {...register('name', { required: 'Full Name is required' })}
                  />
                  <Input
                    label="Email Address *"
                    type="email"
                    placeholder="john@company.com"
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
                    {...register('phone', { required: 'Phone number is required' })}
                  />
                  <Input
                    label="Company Name"
                    placeholder="Acme Inc."
                    {...register('company')}
                  />
                </div>

                <Select
                  label="Service Requirement *"
                  options={[
                    'Web Development',
                    'App Development',
                    'Digital Marketing',
                    'AR / VR',
                    '3D Modeling',
                    'UI/UX Design',
                    'Other'
                  ]}
                  {...register('requirement')}
                />

                <Textarea
                  label="Message / Requirements *"
                  placeholder="Describe your project goals, timeline, and budget..."
                  error={errors.message?.message}
                  {...register('message', { required: 'Message is required' })}
                />

                <SubmitButton loading={isSubmitting} loadingText="Sending Enquiry...">
                  Send Message
                </SubmitButton>
              </form>
            )}
          </div>

          {/* Contact Details & Integrations */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noreferrer"
                className="glass-card p-6 rounded-2xl border border-green-500/30 hover:border-green-400 transition-all group block"
              >
                <MessageSquare className="w-8 h-8 text-green-400 mb-3" />
                <h4 className="text-base font-bold text-white font-heading">WhatsApp Direct</h4>
                <p className="text-xs text-gray-400 mt-1">Instant chat with our tech lead</p>
              </a>

              <a
                href="#calendly"
                className="glass-card p-6 rounded-2xl border border-gold-500/30 hover:border-gold-400 transition-all group block"
              >
                <Calendar className="w-8 h-8 text-gold-400 mb-3" />
                <h4 className="text-base font-bold text-white font-heading">Schedule Meeting</h4>
                <p className="text-xs text-gray-400 mt-1">Pick a time on Calendly</p>
              </a>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
              <h4 className="text-lg font-bold text-gold-400 font-heading">Corporate Office</h4>
              <div className="flex items-start gap-3 text-xs text-gray-300">
                <MapPin className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                <span>Riyadvi Software Technologies, Mylapore, Chennai, Tamil Nadu, India</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-300">
                <Mail className="w-4 h-4 text-gold-500 shrink-0" />
                <span>contact@riyadvisoftwaretechnologies.com</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-300">
                <Phone className="w-4 h-4 text-gold-500 shrink-0" />
                <span>+91 98765 43210</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
