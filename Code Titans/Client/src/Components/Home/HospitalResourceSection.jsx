import React, { useState } from "react";

const resources = [
  {
    id: 1,
    name: "City General Hospital",
    initials: "CG",
    color: "from-blue-400 to-cyan-500",
    location: "Downtown, New York",
    status: "open",
    beds: { icu: 12, emergency: 8, general: 45 },
    doctors: 24,
    wait: 15,
    updated: "2 mins ago",
  },
  {
    id: 2,
    name: "St. Mary's Medical",
    initials: "SM",
    color: "from-purple-400 to-pink-500",
    location: "Midtown, New York",
    status: "busy",
    beds: { icu: 4, emergency: 2, general: 18 },
    doctors: 10,
    wait: 42,
    updated: "5 mins ago",
  },
  {
    id: 3,
    name: "Riverside Children's",
    initials: "RC",
    color: "from-teal-400 to-emerald-500",
    location: "Riverside, New York",
    status: "open",
    beds: { icu: 9, emergency: 6, general: 32 },
    doctors: 18,
    wait: 9,
    updated: "Just now",
  },
  {
    id: 4,
    name: "Metro Heart Institute",
    initials: "MH",
    color: "from-red-400 to-orange-500",
    location: "Uptown, New York",
    status: "critical",
    beds: { icu: 2, emergency: 1, general: 8 },
    doctors: 5,
    wait: 85,
    updated: "10 mins ago",
  },
];

const statusCfg = {
  open:     { label: "Open",     bg: "bg-emerald-100", text: "text-emerald-700", dot: "bg-emerald-500" },
  busy:     { label: "Busy",     bg: "bg-yellow-100",  text: "text-yellow-700",  dot: "bg-yellow-500"  },
  critical: { label: "Critical", bg: "bg-red-100",     text: "text-red-600",     dot: "bg-red-500"     },
  closed:   { label: "Closed",   bg: "bg-gray-100",    text: "text-gray-500",    dot: "bg-gray-400"    },
};

function MiniBar({ value, max, color }) {
  return (
    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
      <div
        className={`h-full rounded-full ${color}`}
        style={{ width: `${Math.min((value / max) * 100, 100)}%` }}
      />
    </div>
  );
}

export default function HospitalResourceSection() {
  const [active, setActive] = useState(null);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

        {/* Left — Text Content */}
        <div>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200 text-teal-600 text-xs font-semibold px-4 py-1.5 rounded-full mb-5">
            <span className="w-2 h-2 bg-teal-500 rounded-full animate-pulse" />
            Real-Time Resource Tracking
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
            Hospital Resources,{" "}
            <span className="text-teal-600">Updated Live</span>
          </h2>

          <p className="mt-4 text-gray-500 text-lg leading-relaxed">
            Track bed availability, doctor count, and wait times across
            every hospital in your network — all updated in real time so
            you always know where to go.
          </p>

          {/* Feature Points */}
          <div className="mt-8 space-y-5">
            {[
              {
                icon: "🛏️",
                title: "Live Bed Availability",
                desc: "ICU, emergency, and general beds tracked across all hospitals.",
              },
              {
                icon: "👨‍⚕️",
                title: "Doctor On-Duty Count",
                desc: "Know how many doctors are available before you arrive.",
              },
              {
                icon: "⏱️",
                title: "Estimated Wait Times",
                desc: "Color-coded wait times help you choose the fastest option.",
              },
            ].map((f) => (
              <div key={f.title} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-xl flex-shrink-0">
                  {f.icon}
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{f.title}</p>
                  <p className="text-gray-500 text-sm mt-0.5">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="mt-8 flex gap-3">
            <button className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-3 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-teal-100">
              View Full Dashboard
            </button>
            <button className="border border-teal-200 text-teal-600 hover:bg-teal-50 font-semibold px-6 py-3 rounded-xl transition-all">
              Add Your Hospital →
            </button>
          </div>
        </div>

        {/* Right — Resource Cards */}
        <div className="space-y-3">

          {/* Live Label */}
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              🏥 Nearby Hospitals
            </p>
            <div className="flex items-center gap-1.5 text-xs text-teal-600 font-semibold">
              <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-pulse" />
              Live
            </div>
          </div>

          {resources.map((h) => {
            const cfg = statusCfg[h.status];
            const isOpen = active === h.id;
            const totalBeds = h.beds.icu + h.beds.emergency + h.beds.general;

            return (
              <div
                key={h.id}
                onClick={() => setActive(isOpen ? null : h.id)}
                className={`cursor-pointer border rounded-2xl px-4 py-3.5 transition-all duration-300 ${
                  isOpen
                    ? "border-teal-300 bg-teal-50 shadow-md shadow-teal-100"
                    : "border-gray-100 bg-gray-50 hover:border-teal-200 hover:bg-white hover:shadow-sm"
                }`}
              >
                {/* Top Row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${h.color} flex items-center justify-center text-white text-xs font-black shadow-sm flex-shrink-0`}>
                      {h.initials}
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 text-sm">{h.name}</p>
                      <p className="text-gray-400 text-xs">{h.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Quick Stats */}
                    <div className="hidden sm:flex items-center gap-3 text-xs text-gray-500 mr-2">
                      <span>🛏️ <strong className="text-gray-700">{totalBeds}</strong></span>
                      <span>⏱️ <strong className={h.wait > 60 ? "text-red-500" : h.wait > 30 ? "text-yellow-500" : "text-green-600"}>{h.wait}m</strong></span>
                    </div>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5 ${cfg.bg} ${cfg.text}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                      {cfg.label}
                    </span>
                  </div>
                </div>

                {/* Expanded Detail */}
                {isOpen && (
                  <div className="mt-4 border-t border-teal-100 pt-4 space-y-3">

                    {/* Bed Bars */}
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-500">ICU Beds</span>
                          <span className="font-bold text-gray-700">{h.beds.icu} available</span>
                        </div>
                        <MiniBar value={h.beds.icu} max={20} color="bg-red-400" />
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-500">Emergency Beds</span>
                          <span className="font-bold text-gray-700">{h.beds.emergency} available</span>
                        </div>
                        <MiniBar value={h.beds.emergency} max={15} color="bg-orange-400" />
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-500">General Beds</span>
                          <span className="font-bold text-gray-700">{h.beds.general} available</span>
                        </div>
                        <MiniBar value={h.beds.general} max={60} color="bg-teal-400" />
                      </div>
                    </div>

                    {/* Stats Row */}
                    <div className="grid grid-cols-3 gap-2 pt-1">
                      <div className="bg-white border border-gray-100 rounded-xl p-2.5 text-center">
                        <p className="text-teal-600 font-black text-base">{totalBeds}</p>
                        <p className="text-gray-400 text-xs">Total Beds</p>
                      </div>
                      <div className="bg-white border border-gray-100 rounded-xl p-2.5 text-center">
                        <p className="text-teal-600 font-black text-base">{h.doctors}</p>
                        <p className="text-gray-400 text-xs">Doctors</p>
                      </div>
                      <div className={`rounded-xl p-2.5 text-center border ${h.wait > 60 ? "bg-red-50 border-red-100" : h.wait > 30 ? "bg-yellow-50 border-yellow-100" : "bg-green-50 border-green-100"}`}>
                        <p className={`font-black text-base ${h.wait > 60 ? "text-red-500" : h.wait > 30 ? "text-yellow-600" : "text-green-600"}`}>
                          {h.wait}m
                        </p>
                        <p className="text-gray-400 text-xs">Wait Time</p>
                      </div>
                    </div>

                    {/* Footer Row */}
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-xs text-gray-400">🕒 Updated {h.updated}</span>
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all"
                      >
                        Get Directions →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}