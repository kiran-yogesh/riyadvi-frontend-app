import React, { useState, useEffect } from 'react';
import apiClient from '../../api/apiClient';
import { createBlogPostApi, updateBlogPostApi, deleteBlogPostApi } from '../../api/adminApi';
import DataTable from '../../components/admin/DataTable';
import StatusBadge from '../../components/admin/StatusBadge';
import ConfirmationModal from '../../components/admin/ConfirmationModal';
import { Plus, Edit2, Trash2 } from 'lucide-react';

export default function AdminBlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const [form, setForm] = useState({
    title: '',
    slug: '',
    category: 'Engineering',
    excerpt: '',
    content: '',
    author: 'Riyadvi Team',
    published: true
  });

  const fetchBlog = () => {
    setLoading(true);
    apiClient.get('/blog')
      .then(res => {
        setPosts(res.data.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchBlog();
  }, []);

  const openCreateModal = () => {
    setEditingPost(null);
    setForm({
      title: '',
      slug: '',
      category: 'Engineering',
      excerpt: '',
      content: '',
      author: 'Riyadvi Team',
      published: true
    });
    setModalOpen(true);
  };

  const openEditModal = (post) => {
    setEditingPost(post);
    setForm({
      title: post.title || '',
      slug: post.slug || '',
      category: post.category || 'Engineering',
      excerpt: post.excerpt || '',
      content: post.content || '',
      author: post.author || 'Riyadvi Team',
      published: !!post.published
    });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editingPost) {
        await updateBlogPostApi(editingPost._id || editingPost.slug, form);
      } else {
        await createBlogPostApi(form);
      }
      setModalOpen(false);
      fetchBlog();
    } catch (err) {
      alert('Failed to save blog post.');
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteBlogPostApi(deleteId);
      setDeleteId(null);
      fetchBlog();
    } catch (err) {
      alert('Failed to delete blog post.');
    }
  };

  const columns = [
    { header: 'Article Title', accessor: 'title', render: row => <span className="font-bold text-white">{row.title}</span> },
    { header: 'Category', accessor: 'category', render: row => <span className="text-gold-400 font-medium">{row.category}</span> },
    { header: 'Author', accessor: 'author' },
    { header: 'Status', render: row => <StatusBadge status={row.published ? 'published' : 'draft'} /> },
    {
      header: 'Actions',
      render: row => (
        <div className="flex gap-2">
          <button onClick={() => openEditModal(row)} className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-gold-500">
            <Edit2 className="w-3.5 h-3.5" />
          </button>
          <button onClick={() => setDeleteId(row._id || row.slug)} className="p-1.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold font-heading text-white">Blog CMS Management</h2>
          <p className="text-xs text-gray-400">Publish articles, technical insights, and company updates.</p>
        </div>
        <button onClick={openCreateModal} className="px-4 py-2 rounded-xl gold-gradient-bg text-black font-bold text-xs shadow-gold-glow hover:scale-105 transition-all flex items-center gap-1.5">
          <Plus className="w-4 h-4" /> Create Article
        </button>
      </div>

      <DataTable columns={columns} data={posts} loading={loading} emptyMessage="No blog articles found." />

      {/* Editor Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4">
          <div className="bg-obsidian-900 border border-gold-500/40 rounded-2xl w-full max-w-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto shadow-gold-glow">
            <h3 className="text-lg font-bold font-heading text-gold-400">
              {editingPost ? 'Edit Blog Article' : 'Write New Article'}
            </h3>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="block text-gray-300 font-semibold mb-1">Article Title *</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white focus:border-gold-500"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Category</label>
                <input
                  type="text"
                  value={form.category}
                  onChange={e => setForm({ ...form, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white focus:border-gold-500"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Excerpt Summary</label>
                <textarea
                  rows={2}
                  value={form.excerpt}
                  onChange={e => setForm({ ...form, excerpt: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white focus:border-gold-500"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Article Body Content (Markdown / Text)</label>
                <textarea
                  rows={8}
                  required
                  value={form.content}
                  onChange={e => setForm({ ...form, content: e.target.value })}
                  placeholder="## Introduction&#10;&#10;Write article content here..."
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white font-mono focus:border-gold-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-xl border border-white/10 text-gray-300 hover:text-white">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 rounded-xl gold-gradient-bg text-black font-bold hover:scale-105 transition-all">
                  Publish Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmationModal isOpen={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Delete Blog Post" message="Are you sure you want to delete this blog post?" />
    </div>
  );
}
