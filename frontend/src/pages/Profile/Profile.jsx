import { useState } from 'react';
import { User, Phone, GraduationCap, Calendar, LogOut } from 'lucide-react';
import { UserService } from '../../data/UserService';
import { useAuth } from '../../hooks/useAuth';
import Breadcrumb from '../../components/ui/Breadcrumb';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  // Derive display name from Supabase auth (Google login gives full_name or email prefix)
  const authName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || '';
  const nameParts = authName.split(' ');
  const authFirstName = nameParts[0] || '';
  const authLastName = nameParts.slice(1).join(' ') || '';

  const savedProfile = UserService.getProfile();
  const defaultProfile = {
    firstName: authFirstName || savedProfile.firstName,
    lastName: authLastName || savedProfile.lastName,
    phone: savedProfile.phone,
    college: savedProfile.college,
    rollNumber: savedProfile.rollNumber,
    fatherName: savedProfile.fatherName,
    memberSince: savedProfile.memberSince,
    yearBranch: savedProfile.yearBranch,
    email: user?.email || savedProfile.email || ''
  };

  const [profile, setProfile] = useState(defaultProfile);
  const [form, setForm] = useState(defaultProfile);
  const [saving, setSaving] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  const handleSave = () => {
    setSaving(true);
    const updated = UserService.updateProfile(form);
    setProfile(updated);
    setTimeout(() => setSaving(false), 800);
  };

  const handleCancel = () => {
    setForm(profile);
  };

  const handleLogout = async () => {
    setLogoutLoading(true);
    try {
      await signOut();
      navigate('/login');
    } catch (err) {
      console.error('Logout error:', err);
      setLogoutLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-6">
      <Breadcrumb items={[
        { label: 'Dashboard', to: '/dashboard' },
        { label: 'Profile' }
      ]} />

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Left Card: Read-only Profile Summary */}
        <div className="w-full lg:w-[340px] shrink-0 bg-white border border-border rounded-[14px] shadow-sm flex flex-col overflow-hidden">
          <div className="p-6 border-b border-border/60">
            <h2 className="text-xl font-bold text-text-primary mb-6">Profile</h2>
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-green-50 text-accent rounded-full flex items-center justify-center mb-4 ring-4 ring-green-50/50">
                {user?.user_metadata?.avatar_url ? (
                  <img
                    src={user.user_metadata.avatar_url}
                    alt={profile.firstName}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <User className="w-10 h-10" />
                )}
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-1">{profile.firstName} {profile.lastName}</h3>
              <p className="text-sm text-text-secondary font-medium mb-1">{profile.yearBranch}</p>
              <p className="text-sm text-text-secondary">{profile.college}</p>
              {profile.email && (
                <p className="text-xs text-text-secondary mt-1 truncate max-w-full">{profile.email}</p>
              )}
            </div>
          </div>

          <div className="p-6 flex flex-col gap-5 bg-gray-50/30">
            <div className="flex items-center gap-4">
              <div className="w-9 h-9 rounded-lg bg-white border border-border flex items-center justify-center shrink-0">
                <Phone className="w-[18px] h-[18px] text-accent" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-text-secondary uppercase tracking-wider mb-0.5">Phone Number</p>
                <p className="text-sm font-semibold text-text-primary">{profile.phone}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-9 h-9 rounded-lg bg-white border border-border flex items-center justify-center shrink-0">
                <BuildingIcon className="w-[18px] h-[18px] text-accent" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-text-secondary uppercase tracking-wider mb-0.5">College Name</p>
                <p className="text-sm font-semibold text-text-primary">{profile.college}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-9 h-9 rounded-lg bg-white border border-border flex items-center justify-center shrink-0">
                <IdCardIcon className="w-[18px] h-[18px] text-accent" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-text-secondary uppercase tracking-wider mb-0.5">Roll Number</p>
                <p className="text-sm font-semibold text-text-primary">{profile.rollNumber}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-9 h-9 rounded-lg bg-white border border-border flex items-center justify-center shrink-0">
                <User className="w-[18px] h-[18px] text-accent" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-text-secondary uppercase tracking-wider mb-0.5">Father's Name</p>
                <p className="text-sm font-semibold text-text-primary">{profile.fatherName}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-9 h-9 rounded-lg bg-white border border-border flex items-center justify-center shrink-0">
                <Calendar className="w-[18px] h-[18px] text-accent" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-text-secondary uppercase tracking-wider mb-0.5">Member Since</p>
                <p className="text-sm font-semibold text-text-primary">{profile.memberSince}</p>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <div className="p-4 border-t border-border bg-white">
            <button
              onClick={handleLogout}
              disabled={logoutLoading}
              className="w-full py-2.5 rounded-lg border border-red-200 flex items-center justify-center gap-2 text-sm font-bold text-red-500 hover:bg-red-50 transition-colors disabled:opacity-60"
            >
              <LogOut className="w-4 h-4" />
              {logoutLoading ? 'Logging out...' : 'Log Out'}
            </button>
          </div>
        </div>

        {/* Right Card: Edit Form */}
        <div className="flex-1 bg-white border border-border rounded-[14px] shadow-sm flex flex-col">
          <div className="p-8 border-b border-border/60">
            <h2 className="text-xl font-bold text-text-primary mb-1">Edit Profile</h2>
            <p className="text-sm text-text-secondary">Update your personal details</p>
          </div>

          <div className="p-8 flex flex-col gap-6">
            <div>
              <label className="block text-xs font-bold text-text-primary mb-2">Student Name</label>
              <input
                type="text"
                value={`${form.firstName} ${form.lastName}`}
                disabled
                className="w-full px-4 py-3 bg-bg-app border border-border rounded-lg text-sm text-text-primary cursor-not-allowed opacity-70"
              />
            </div>

            <div className="flex gap-6">
              <div className="flex-1">
                <label className="block text-xs font-bold text-text-primary mb-2">First Name</label>
                <input
                  type="text"
                  value={form.firstName}
                  onChange={e => setForm({...form, firstName: e.target.value})}
                  className="w-full px-4 py-3 bg-white border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-shadow"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-bold text-text-primary mb-2">Last Name (Optional)</label>
                <input
                  type="text"
                  value={form.lastName}
                  onChange={e => setForm({...form, lastName: e.target.value})}
                  className="w-full px-4 py-3 bg-white border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-shadow"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-text-primary mb-2">Email</label>
              <input
                type="email"
                value={profile.email}
                disabled
                className="w-full px-4 py-3 bg-bg-app border border-border rounded-lg text-sm text-text-primary cursor-not-allowed opacity-70"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-text-primary mb-2">Phone Number</label>
              <div className="relative">
                <Phone className="w-[18px] h-[18px] text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={form.phone}
                  onChange={e => setForm({...form, phone: e.target.value})}
                  className="w-full pl-11 pr-4 py-3 bg-white border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-shadow"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-text-primary mb-2">College Name</label>
              <div className="relative">
                <GraduationCap className="w-[18px] h-[18px] text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <select
                  value={form.college}
                  onChange={e => setForm({...form, college: e.target.value})}
                  className="w-full pl-11 pr-4 py-3 bg-white border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-shadow appearance-none"
                >
                  <option value="RMK Engineering College">RMK Engineering College</option>
                  <option value="RMK College of Engineering and Technology">RMK College of Engineering and Technology</option>
                  <option value="RMD Engineering College">RMD Engineering College</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1.5L6 6.5L11 1.5" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-text-primary mb-2">Roll Number</label>
              <div className="relative">
                <IdCardIcon className="w-[18px] h-[18px] text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={form.rollNumber}
                  onChange={e => setForm({...form, rollNumber: e.target.value})}
                  className="w-full pl-11 pr-4 py-3 bg-white border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-shadow"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-text-primary mb-2">Father's Name</label>
              <div className="relative">
                <User className="w-[18px] h-[18px] text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={form.fatherName}
                  onChange={e => setForm({...form, fatherName: e.target.value})}
                  className="w-full pl-11 pr-4 py-3 bg-white border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-shadow"
                />
              </div>
            </div>
          </div>

          <div className="p-8 pt-0 flex justify-end gap-3 mt-auto">
            <button onClick={handleCancel} className="px-6 py-2.5 rounded-lg font-medium text-text-secondary border border-transparent hover:border-border transition-colors">
              Cancel
            </button>
            <button onClick={handleSave} disabled={saving} className="px-8 py-2.5 rounded-lg font-bold bg-accent text-white hover:bg-accent-dark transition-colors shadow-sm disabled:opacity-70">
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Inline SVG icons
function BuildingIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
      <path d="M9 22v-4h6v4"></path>
      <path d="M8 6h.01"></path>
      <path d="M16 6h.01"></path>
      <path d="M12 6h.01"></path>
      <path d="M12 10h.01"></path>
      <path d="M12 14h.01"></path>
      <path d="M16 10h.01"></path>
      <path d="M16 14h.01"></path>
      <path d="M8 10h.01"></path>
      <path d="M8 14h.01"></path>
    </svg>
  );
}

function IdCardIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 10h2"></path>
      <path d="M16 14h2"></path>
      <path d="M6.17 15a3 3 0 0 1 5.66 0"></path>
      <circle cx="9" cy="11" r="2"></circle>
      <rect x="2" y="5" width="20" height="14" rx="2"></rect>
    </svg>
  );
}
