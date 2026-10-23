import {
  Calendar,
  Briefcase,
  MapPin,
  CheckCircle2,
} from 'lucide-react';
import Breadcrumb from '../../components/ui/Breadcrumb';
import { mockDriveAlerts } from '../../services/mockApiService';

export default function DriveAlerts() {

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      <Breadcrumb
        items={[
          { label: 'Dashboard', to: '/dashboard' },
          { label: 'Campus Drives' },
        ]}
      />

      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Campus Recruitment Drives
        </h1>
        <p className="text-sm text-slate-500 mt-0.5">
          Upcoming drives, eligibility cut-offs, CTC packages, and interview round details for RMK Engineering College.
        </p>
      </div>

      {/* Drives Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockDriveAlerts.map((drive) => (
          <div
            key={drive.id}
            className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 p-2 flex items-center justify-center shrink-0">
                    <img
                      src={drive.logo}
                      alt={drive.company}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">{drive.company}</h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <Briefcase className="w-3.5 h-3.5" />
                      <span>{drive.role}</span>
                    </p>
                  </div>
                </div>

                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shrink-0 ${
                    drive.status === 'Upcoming'
                      ? 'bg-amber-50 text-amber-700 border border-amber-200'
                      : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  }`}
                >
                  {drive.status}
                </span>
              </div>

              {/* Highlights */}
              <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 space-y-0.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                    Package (CTC)
                  </span>
                  <div className="font-bold text-[#16793A] text-sm">{drive.ctc}</div>
                </div>

                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 space-y-0.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                    Drive Date
                  </span>
                  <div className="font-semibold text-slate-900 text-xs flex items-center gap-1 pt-0.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{drive.date}</span>
                  </div>
                </div>
              </div>

              {/* Criteria */}
              <div className="space-y-1 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-700">Eligible:</span>
                  <span>{drive.branches.join(', ')} (Min CGPA: {drive.minCgpa})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-700">Venue:</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{drive.location}</span>
                  </span>
                </div>
              </div>

              {/* Rounds Preview */}
              <div className="pt-2 border-t border-slate-100 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Selection Process
                </span>
                <ul className="text-xs text-slate-600 space-y-1 list-disc pl-4">
                  {drive.rounds.map((round, rIdx) => (
                    <li key={rIdx}>{round}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Eligible via RMK TPO
              </span>
              <button
                type="button"
                onClick={() => alert(`Registered interest for ${drive.company} ${drive.role}`)}
                className="px-3.5 py-1.5 bg-[#16793A] hover:bg-[#12632F] text-white rounded-lg text-xs font-semibold transition-colors shadow-xs cursor-pointer"
              >
                Apply / Register
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
