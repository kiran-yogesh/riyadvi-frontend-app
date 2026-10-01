import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import CTASection from '../components/common/CTASection';
import apiClient from '../api/apiClient';
import { ArrowLeft, Clock, Share2, User } from 'lucide-react';

export default function BlogArticleDetailPage() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    apiClient.get(`/blog/${slug}`)
      .then(res => {
        setArticle(res.data.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return <div className="min-h-screen bg-obsidian-950 flex items-center justify-center text-gold-400 font-bold">Loading Article...</div>;
  }

  if (!article) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="min-h-screen bg-obsidian-950 text-white pt-28 pb-16">
      <div className="container mx-auto px-6 max-w-4xl">
        
        <Link to="/blog" className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-gold-400 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to All Articles
        </Link>

        {/* Article Meta Header */}
        <div className="mb-8">
          <span className="text-xs font-accent uppercase tracking-widest text-gold-400 font-bold px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30">
            {article.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mt-4 font-heading leading-tight">
            {article.title}
          </h1>

          <div className="flex items-center gap-6 mt-6 pt-4 border-t border-white/10 text-xs text-gray-400">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-gold-400" />
              <span>{article.author?.name} ({article.author?.role})</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-gold-400" />
              <span>{article.readTimeMinutes} min read</span>
            </div>
          </div>
        </div>

        {/* Cover Image */}
        <div className="rounded-3xl overflow-hidden mb-12 glass-panel border border-white/10">
          <img src={article.coverImage} alt={article.title} className="w-full h-80 md:h-[400px] object-cover" />
        </div>

        {/* Article Content */}
        <div className="glass-panel p-8 md:p-12 rounded-3xl border border-white/10 mb-16 prose prose-invert max-w-none">
          <div className="text-gray-300 text-base leading-relaxed space-y-6">
            <p className="text-lg font-medium text-gold-300 border-l-4 border-gold-500 pl-4 py-1 italic">
              {article.excerpt}
            </p>
            <div className="whitespace-pre-line text-sm leading-relaxed text-gray-300">
              {article.contentMarkdown}
            </div>
          </div>
        </div>

        {/* CTA */}
        <CTASection title="Building something complex?" subtitle="Let Riyadvi's engineering team build your custom solution." />

      </div>
    </div>
  );
}
