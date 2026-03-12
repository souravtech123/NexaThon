import { useState } from "react";

const initialHospitals = [
  {
    id: 1,
    name: "City General Hospital",
    location: "Downtown, New York",
    phone: "(555) 100-2000",
    type: "General",
    beds: { icu: 12, emergency: 8, general: 45, pediatric: 6 },
    doctors: { available: 24, total: 40 },
    waitTime: 15,
    status: "open",
    lastUpdated: "2 mins ago",
    avatar: "CG",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 2,
    name: "St. Mary's Medical Center",
    location: "Midtown, New York",
    phone: "(555) 200-3000",
    type: "Trauma Center",
    beds: { icu: 4, emergency: 2, general: 20, pediatric: 8 },
    doctors: { available: 12, total: 30 },
    waitTime: 45,
    status: "busy",
    lastUpdated: "5 mins ago",
    avatar: "SM",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: 3,
    name: "Riverside Children's Hospital",
    location: "Riverside, New York",
    phone: "(555) 300-4000",
    type: "Pediatric",
    beds: { icu: 8, emergency: 5, general: 30, pediatric: 20 },
    doctors: { available: 18, total: 25 },
    waitTime: 10,
    status: "open",
    lastUpdated: "1 min ago",
    avatar: "RC",
    color: "from-green-500 to-emerald-500",
  },
  {
    id: 4,
    name: "Metro Heart Institute",
    location: "Uptown, New York",
    phone: "(555) 400-5000",
    type: "Cardiac",
    beds: { icu: 2, emergency: 1, general: 10, pediatric: 0 },
    doctors: { available: 5, total: 20 },
    waitTime: 90,
    status: "critical",
    lastUpdated: "10 mins ago",
    avatar: "MH",
    color: "from-red-500 to-orange-500",
  },
];

const statusConfig = {
  open: { label: "Open", bg: "bg-emerald-500/20", text: "text-emerald-400", dot: "bg-emerald-400", border: "border-emerald-500/30" },
  busy: { label: "Busy", bg: "bg-yellow-500/20", text: "text-yellow-400", dot: "bg-yellow-400", border: "border-yellow-500/30" },
  critical: { label: "Critical", bg: "bg-red-500/20", text: "text-red-400", dot: "bg-red-400", border: "border-red-500/30" },
  closed: { label: "Closed", bg: "bg-slate-500/20", text: "text-slate-400", dot: "bg-slate-400", border: "border-slate-500/30" },
};

const BedBar = ({ label, value, max, color }) => (
  <div className="mb-2">
    <div className="flex justify-between text-xs mb-1">
      <span className="text-slate-400">{label}</span>
      <span className="text-white font-semibold">{value} beds</span>
    </div>
    <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
      <div
        className={`h-full rounded-full ${color}`}
        style={{ width: `${Math.min((value / max) * 100, 100)}%` }}
      />
    </div>
  </div>
);

function UpdateModal({ hospital, onClose, onSave }) {
  const [form, setForm] = useState({
    icu: hospital.beds.icu,
    emergency: hospital.beds.emergency,
    general: hospital.beds.general,
    pediatric: hospital.beds.pediatric,
    doctorsAvailable: hospital.doctors.available,
    waitTime: hospital.waitTime,
    status: hospital.status,
  });

  const handle = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${hospital.color} flex items-center justify-center text-sm font-black`}>
              {hospital.avatar}
            </div>
            <div>
              <h2 className="font-bold text-white text-sm">{hospital.name}</h2>
              <p className="text-slate-400 text-xs">Update Availability</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition text-xl leading-none">✕</button>
        </div>

        <div className="p-5 space-y-4">
          {/* Status */}
          <div>
            <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider block mb-2">Hospital Status</label>
            <div className="grid grid-cols-4 gap-2">
              {Object.entries(statusConfig).map(([key, cfg]) => (
                <button
                  key={key}
                  onClick={() => handle("status", key)}
                  className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                    form.status === key
                      ? `${cfg.bg} ${cfg.text} ${cfg.border}`
                      : "bg-slate-800 text-slate-500 border-slate-700 hover:border-slate-500"
                  }`}
                >
                  {cfg.label}
                </button>
              ))}
            </div>
          </div>

          {/* Beds */}
          <div>
            <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider block mb-2">Available Beds</label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { key: "icu", label: "ICU Beds" },
                { key: "emergency", label: "Emergency Beds" },
                { key: "general", label: "General Beds" },
                { key: "pediatric", label: "Pediatric Beds" },
              ].map(({ key, label }) => (
                <div key={key} className="bg-slate-800 rounded-xl p-3">
                  <label className="text-xs text-slate-400 block mb-1">{label}</label>
                  <input
                    type="number"
                    min="0"
                    value={form[key]}
                    onChange={(e) => handle(key, parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-700 text-white text-sm font-bold rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Doctors & Wait Time */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-800 rounded-xl p-3">
              <label className="text-xs text-slate-400 block mb-1">Doctors Available</label>
              <input
                type="number"
                min="0"
                value={form.doctorsAvailable}
                onChange={(e) => handle("doctorsAvailable", parseInt(e.target.value) || 0)}
                className="w-full bg-slate-700 text-white text-sm font-bold rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            </div>
            <div className="bg-slate-800 rounded-xl p-3">
              <label className="text-xs text-slate-400 block mb-1">Wait Time (mins)</label>
              <input
                type="number"
                min="0"
                value={form.waitTime}
                onChange={(e) => handle("waitTime", parseInt(e.target.value) || 0)}
                className="w-full bg-slate-700 text-white text-sm font-bold rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-5 border-t border-slate-700">
          <button onClick={onClose} className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold py-2.5 rounded-xl transition-all">
            Cancel
          </button>
          <button
            onClick={() => onSave(form)}
            className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-sm font-bold py-2.5 rounded-xl transition-all shadow-lg shadow-blue-900/40"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default function HospitalDashboard() {
  const [hospitals, setHospitals] = useState(initialHospitals);
  const [editingHospital, setEditingHospital] = useState(null);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleSave = (form) => {
    setHospitals((prev) =>
      prev.map((h) =>
        h.id === editingHospital.id
          ? {
              ...h,
              status: form.status,
              beds: {
                icu: form.icu,
                emergency: form.emergency,
                general: form.general,
                pediatric: form.pediatric,
              },
              doctors: { ...h.doctors, available: form.doctorsAvailable },
              waitTime: form.waitTime,
              lastUpdated: "Just now",
            }
          : h
      )
    );
    setEditingHospital(null);
    showToast(`✅ ${editingHospital.name} updated successfully`);
  };

  const filtered = hospitals.filter((h) => {
    const matchSearch =
      h.name.toLowerCase().includes(search.toLowerCase()) ||
      h.location.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || h.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const totalBeds = hospitals.reduce(
    (acc, h) => acc + h.beds.icu + h.beds.emergency + h.beds.general + h.beds.pediatric, 0
  );
  const totalDoctors = hospitals.reduce((acc, h) => acc + h.doctors.available, 0);
  const avgWait = Math.round(hospitals.reduce((acc, h) => acc + h.waitTime, 0) / hospitals.length);
  const openCount = hospitals.filter((h) => h.status === "open").length;

  return (
    <div style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }} className="min-h-screen bg-slate-950 text-white">
      {/* Toast */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 bg-slate-800 border border-slate-600 text-white text-sm font-semibold px-5 py-3 rounded-2xl shadow-2xl">
          {toast}
        </div>
      )}

      {/* Update Modal */}
      {editingHospital && (
        <UpdateModal
          hospital={editingHospital}
          onClose={() => setEditingHospital(null)}
          onSave={handleSave}
        />
      )}

      <div className="max-w-6xl mx-auto p-4 md:p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-9 h-9 bg-red-500 rounded-xl flex items-center justify-center text-lg shadow-lg shadow-red-500/30">🏥</div>
              <h1 className="text-2xl font-black tracking-tight">Hospital Availability Dashboard</h1>
            </div>
            <p className="text-slate-400 text-sm ml-12">Real-time bed & resource tracking across all hospitals</p>
          </div>
          <div className="flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-xs text-slate-400">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            Live Updates Active
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Available Beds", value: totalBeds, icon: "🛏️", color: "text-blue-400" },
            { label: "Doctors On Duty", value: totalDoctors, icon: "👨‍⚕️", color: "text-green-400" },
            { label: "Avg Wait Time", value: `${avgWait}m`, icon: "⏱️", color: "text-yellow-400" },
            { label: "Hospitals Open", value: `${openCount}/${hospitals.length}`, icon: "✅", color: "text-emerald-400" },
          ].map((stat) => (
            <div key={stat.label} className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-4">
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className={`text-2xl font-black ${stat.color}`}>{stat.value}</div>
              <div className="text-slate-400 text-xs mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm">🔍</span>
            <input
              type="text"
              placeholder="Search hospital or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition"
            />
          </div>
          <div className="flex gap-2">
            {["all", "open", "busy", "critical", "closed"].map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
                  filterStatus === s
                    ? "bg-blue-600 text-white"
                    : "bg-slate-800 text-slate-400 hover:text-white border border-slate-700"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Hospital Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map((hospital) => {
            const cfg = statusConfig[hospital.status];
            const totalAvail = hospital.beds.icu + hospital.beds.emergency + hospital.beds.general + hospital.beds.pediatric;
            return (
              <div
                key={hospital.id}
                className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-5 hover:border-slate-600 transition-all"
              >
                {/* Card Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${hospital.color} flex items-center justify-center text-sm font-black shadow-lg flex-shrink-0`}>
                      {hospital.avatar}
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-sm leading-snug">{hospital.name}</h3>
                      <p className="text-slate-400 text-xs">{hospital.location}</p>
                      <span className="text-xs text-slate-500">{hospital.type}</span>
                    </div>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border flex items-center gap-1.5 ${cfg.bg} ${cfg.text} ${cfg.border}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                    {cfg.label}
                  </span>
                </div>

                {/* Metrics Row */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="bg-slate-700/50 rounded-xl p-3 text-center">
                    <div className="text-lg font-black text-white">{totalAvail}</div>
                    <div className="text-xs text-slate-400">Total Beds</div>
                  </div>
                  <div className="bg-slate-700/50 rounded-xl p-3 text-center">
                    <div className="text-lg font-black text-white">{hospital.doctors.available}</div>
                    <div className="text-xs text-slate-400">Doctors</div>
                  </div>
                  <div className={`rounded-xl p-3 text-center ${hospital.waitTime > 60 ? "bg-red-500/20" : hospital.waitTime > 30 ? "bg-yellow-500/20" : "bg-green-500/20"}`}>
                    <div className={`text-lg font-black ${hospital.waitTime > 60 ? "text-red-400" : hospital.waitTime > 30 ? "text-yellow-400" : "text-green-400"}`}>
                      {hospital.waitTime}m
                    </div>
                    <div className="text-xs text-slate-400">Wait Time</div>
                  </div>
                </div>

                {/* Bed Breakdown */}
                <div className="mb-4">
                  <BedBar label="ICU" value={hospital.beds.icu} max={20} color="bg-red-400" />
                  <BedBar label="Emergency" value={hospital.beds.emergency} max={20} color="bg-orange-400" />
                  <BedBar label="General" value={hospital.beds.general} max={60} color="bg-blue-400" />
                  <BedBar label="Pediatric" value={hospital.beds.pediatric} max={30} color="bg-purple-400" />
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">🕒 Updated {hospital.lastUpdated}</span>
                  <button
                    onClick={() => setEditingHospital(hospital)}
                    className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all hover:scale-105 active:scale-95"
                  >
                    ✏️ Update
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center text-slate-500 py-16 text-sm">
            No hospitals found matching your search.
          </div>
        )}

        <p className="text-center text-slate-600 text-xs mt-8 pb-4">
          Hospital Availability System · Updates reflect in real-time
        </p>
      </div>
    </div>
  );
}