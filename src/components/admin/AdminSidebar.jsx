import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  MessageSquare,
  Calendar,
  Activity,
  FileText,
  Briefcase,
  Layers,
  Box,
  BookOpen,
  Settings,
  LogOut,
  X
} from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';

const NAV_ITEMS = [
  { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Enquiries', path: '/admin/enquiries', icon: MessageSquare },
  { label: 'Consultations', path: '/admin/consultations', icon: Calendar },
  { label: 'Health Checkups', path: '/admin/health-checkups', icon: Activity },
  { label: 'Lead Magnets', path: '/admin/leads', icon: FileText },
  { label: 'Applications', path: '/admin/applications', icon: Briefcase },
  { label: 'Services CMS', path: '/admin/services', icon: Layers },
  { label: 'Portfolio CMS', path: '/admin/portfolio', icon: Box },
  { label: 'Blog CMS', path: '/admin/blog', icon: BookOpen },
  { label: 'Jobs CMS', path: '/admin/jobs', icon: Briefcase },
  { label: 'Settings', path: '/admin/settings', icon: Settings },
];

export default function AdminSidebar({ mobileOpen, onCloseMobile }) {
  const { logout } = useAdminAuth();

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-64 bg-obsidian-950 border-r border-white/10 flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Header */}
          <div className="h-16 px-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gold-gradient-bg flex items-center justify-center font-extrabold text-black font-heading text-sm">
                R
              </div>
              <span className="font-bold text-sm tracking-wide text-white font-heading">
                RIYADVI <span className="text-gold-400">ADMIN</span>
              </span>
            </div>

            <button onClick={onCloseMobile} className="lg:hidden text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-140px)]">
            {NAV_ITEMS.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <NavLink
                  key={idx}
                  to={item.path}
                  onClick={onCloseMobile}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-gold-500/10 text-gold-400 border border-gold-500/30 font-bold'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`
                  }
                >
                  <IconComp className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Footer Logout Action */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={() => {
              logout();
              if (onCloseMobile) onCloseMobile();
            }}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-500/10 hover:border-red-500/30 border border-transparent transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
