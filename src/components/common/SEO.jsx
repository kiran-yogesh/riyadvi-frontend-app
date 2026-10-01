import React, { useEffect } from 'react';

export default function SEO({ title, description }) {
  useEffect(() => {
    const defaultTitle = 'Riyadvi Software Technologies | Technology & Digital Solutions Partner';
    const pageTitle = title ? `${title} | Riyadvi Software Technologies` : defaultTitle;
    document.title = pageTitle;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description || 'Custom Software & Digital Solutions to Grow Your Business. Custom Web & App Development, UI/UX Design, AR/VR, 3D Modeling, and Business Strategy.');
    }
  }, [title, description]);

  return null;
}
