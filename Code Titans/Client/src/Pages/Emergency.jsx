import { useState } from "react";

const contacts = [
  {
    id: 1,
    name: "National Emergency",
    number: "911",
    type: "emergency",
    available: "24/7",
    icon: "🚨",
    description: "Police, Fire, Medical Emergency",
  },
  {
    id: 2,
    name: "Poison Control Center",
    number: "1-800-222-1222",
    type: "poison",
    available: "24/7",
    icon: "☠️",
    description: "Toxic exposure, overdose, chemical ingestion",
  },
  {
    id: 3,
    name: "Crisis & Suicide Lifeline",
    number: "988",
    type: "mental",
    available: "24/7",
    icon: "🧠",
    description: "Mental health crisis, suicidal thoughts",
  },
  {
    id: 4,
    name: "Nurse Advice Line",
    number: "1-800-874-2273",
    type: "nurse",
    available: "24/7",
    icon: "🩺",
    description: "Non-emergency medical advice from RNs",
  },
  {
    id: 5,
    name: "American Red Cross",
    number: "1-800-733-2767",
    type: "disaster",
    available: "24/7",
    icon: "🔴",
    description: "Disaster relief, blood donation, emergency prep",
  },
  {
    id: 6,
    name: "CDC Health Information",
    number: "1-800-232-4636",
    type: "info",
    available: "Mon–Fri 8am–8pm ET",
    icon: "🏥",
    description: "Disease prevention, vaccinations, health info",
  },
];

const personalContacts = [
  { id: 1, name: "Dr. Sarah Mitchell", role: "Primary Care Physician", number: "(555) 234-5678", initials: "SM" },
  { id: 2, name: "James Carter", role: "Emergency Contact (Spouse)", number: "(555) 987-6543", initials: "JC" },
  { id: 3, name: "City General Hospital", role: "Preferred Hospital", number: "(555) 111-2222", initials: "CG" },
];

const typeColors = {
  emergency: "bg-red-100 text-red-700 border-red-200",
  poison: "bg-yellow-100 text-yellow-700 border-yellow-200",
  mental: "bg-blue-100 text-blue-700 border-blue-200",
  nurse: "bg-green-100 text-green-700 border-green-200",
  disaster: "bg-orange-100 text-orange-700 border-orange-200",
  info: "bg-purple-100 text-purple-700 border-purple-200",
};

const pulseDot = {
  emergency: "bg-red-500",
  poison: "bg-yellow-500",
  mental: "bg-blue-500",
  nurse: "bg-green-500",
  disaster: "bg-orange-500",
  info: "bg-purple-500",
};

export default function EmergencyContacts() {
  const [search, setSearch] = useState("");
  const [copiedId, setCopiedId] = useState(null);
  const [activeTab, setActiveTab] = useState("national");

  const filtered = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase())
  );

  const handleCopy = (id, number) => {
    navigator.clipboard.writeText(number);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div
      style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}
      className="min-h-screen bg-slate-950 text-white p-4 md:p-8"
    >
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-red-500 flex items-center justify-center text-xl shadow-lg shadow-red-500/30">
            ➕
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Emergency Health Contacts
            </h1>
            <p className="text-slate-400 text-sm">
              Always accessible. Always ready.
            </p>
          </div>
        </div>

        {/* SOS Banner — FIX 1: <a> tag restored */}
        <div className="mt-6 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 p-4 flex items-center justify-between shadow-xl shadow-red-900/40">
          <div>
            <p className="text-xs uppercase tracking-widest text-red-100 font-semibold mb-1">
              Life-Threatening Emergency?
            </p>
            <p className="text-3xl font-black tracking-tight">Call 911 Now</p>
          </div>
          <a href="tel:911" className="bg-white text-red-600 font-black text-lg px-6 py-3 rounded-xl hover:bg-red-50 transition-all hover:scale-105 active:scale-95 shadow-lg">
            📞 911
          </a>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mt-8 mb-5">
          {["national", "personal"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                activeTab === tab
                  ? "bg-white text-slate-900"
                  : "bg-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              {tab === "national" ? "🌐 National Hotlines" : "👤 My Contacts"}
            </button>
          ))}
        </div>

        {/* National Tab */}
        {activeTab === "national" && (
          <>
            {/* Search */}
            <div className="relative mb-5">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm">
                🔍
              </span>
              <input
                type="text"
                placeholder="Search contacts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition"
              />
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filtered.map((contact) => (
                <div
                  key={contact.id}
                  className="bg-slate-800/80 border border-slate-700/50 rounded-2xl p-5 hover:border-slate-600 hover:bg-slate-800 transition-all group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-slate-700 flex items-center justify-center text-2xl flex-shrink-0">
                        {contact.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-sm leading-snug">
                          {contact.name}
                        </h3>
                        <span
                          className={`text-xs font-medium border px-2 py-0.5 rounded-full mt-1 inline-flex items-center gap-1.5 ${
                            typeColors[contact.type]
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${pulseDot[contact.type]}`}
                          />
                          {contact.available}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-slate-400 text-xs mt-3 mb-4 leading-relaxed">
                    {contact.description}
                  </p>

                  {/* FIX 2: <a> tag restored on call button */}
                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${contact.number}`}
                      className="flex-1 bg-slate-700 hover:bg-slate-600 text-white text-sm font-bold py-2.5 rounded-xl text-center transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
                    >
                      📞 {contact.number}
                    </a>
                    <button
                      onClick={() => handleCopy(contact.id, contact.number)}
                      className="bg-slate-700 hover:bg-slate-600 p-2.5 rounded-xl transition-all hover:scale-110 active:scale-95 text-sm"
                      title="Copy number"
                    >
                      {copiedId === contact.id ? "✅" : "📋"}
                    </button>
                  </div>
                </div>
              ))}
              {filtered.length === 0 && (
                <p className="col-span-2 text-center text-slate-500 py-10 text-sm">
                  No contacts found for "{search}"
                </p>
              )}
            </div>
          </>
        )}

        {/* Personal Tab */}
        {activeTab === "personal" && (
          <div className="space-y-4">
            {personalContacts.map((c) => (
              <div
                key={c.id}
                className="bg-slate-800/80 border border-slate-700/50 rounded-2xl p-5 flex items-center gap-4 hover:border-slate-600 transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-sm font-black flex-shrink-0 shadow-lg shadow-blue-900/40">
                  {c.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-white text-sm">{c.name}</p>
                  <p className="text-slate-400 text-xs mt-0.5">{c.role}</p>
                </div>

                {/* FIX 3: <a> tag restored on personal call button */}
                <div className="flex gap-2">
                  <a
                    href={`tel:${c.number}`}
                    className="bg-green-600 hover:bg-green-500 text-white text-xs font-semibold px-3 py-2 rounded-xl transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
                  >
                    📞 Call
                  </a>
                  <button
                    onClick={() => handleCopy(`p-${c.id}`, c.number)}
                    className="bg-slate-700 hover:bg-slate-600 p-2 rounded-xl transition-all text-sm"
                  >
                    {copiedId === `p-${c.id}` ? "✅" : "📋"}
                  </button>
                </div>
              </div>
            ))}

            {/* Add Contact CTA */}
            <button className="w-full border-2 border-dashed border-slate-700 hover:border-slate-500 rounded-2xl py-5 text-slate-500 hover:text-slate-300 text-sm font-semibold transition-all flex items-center justify-center gap-2">
              ＋ Add Personal Contact
            </button>
          </div>
        )}

        {/* Footer */}
        <p className="text-center text-slate-600 text-xs mt-8 pb-4">
          Keep this accessible offline. Save screenshots for emergencies.
        </p>

      </div>
    </div>
  );
}