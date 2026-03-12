import React, { useState } from "react";

const emergencyContacts = [
  {
    id: 1,
    name: "National Emergency",
    number: "911",
    icon: "🚨",
    color: "bg-red-50 border-red-200",
    iconBg: "bg-red-100",
    tag: "Immediate",
    tagColor: "bg-red-100 text-red-600",
    desc: "Police, Fire & Medical",
  },
  {
    id: 2,
    name: "Poison Control",
    number: "1-800-222-1222",
    icon: "☠️",
    color: "bg-yellow-50 border-yellow-200",
    iconBg: "bg-yellow-100",
    tag: "24/7",
    tagColor: "bg-yellow-100 text-yellow-700",
    desc: "Toxic exposure & overdose",
  },
  {
    id: 3,
    name: "Crisis Lifeline",
    number: "988",
    icon: "🧠",
    color: "bg-blue-50 border-blue-200",
    iconBg: "bg-blue-100",
    tag: "24/7",
    tagColor: "bg-blue-100 text-blue-600",
    desc: "Mental health & suicide",
  },
];

const personalContacts = [
  { id: 1, name: "Dr. Sarah Mitchell", role: "Primary Care Physician", initials: "SM", number: "(555) 234-5678" },
  { id: 2, name: "James Carter", role: "Emergency Contact", initials: "JC", number: "(555) 987-6543" },
];

export default function EmergencyContactSection() {
  const [copied, setCopied] = useState(null);

  const handleCopy = (id, number) => {
    navigator.clipboard.writeText(number);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

        {/* Left — Text Content */}
        <div>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-xs font-semibold px-4 py-1.5 rounded-full mb-5">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            Always Accessible
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
            Emergency Contacts{" "}
            <span className="text-red-500">At Your Fingertips</span>
          </h2>

          <p className="mt-4 text-gray-500 text-lg leading-relaxed">
            Instant access to critical emergency numbers and your personal
            healthcare contacts — one tap to call, anytime, anywhere.
          </p>

          {/* Features */}
          <div className="mt-8 space-y-5">
            {[
              { icon: "📞", title: "One-Tap Calling", desc: "Directly dial any emergency number from the app." },
              { icon: "🔒", title: "Personal Contacts", desc: "Store your doctor and emergency contacts securely." },
              { icon: "⚡", title: "Offline Access", desc: "Critical numbers available even without internet." },
            ].map((f) => (
              <div key={f.title} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-xl flex-shrink-0">
                  {f.icon}
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{f.title}</p>
                  <p className="text-gray-500 text-sm mt-0.5">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-8 flex gap-3">
            <button className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-red-200">
              View All Contacts
            </button>
            <button className="border border-red-200 text-red-500 hover:bg-red-50 font-semibold px-6 py-3 rounded-xl transition-all">
              Add My Doctor →
            </button>
          </div>
        </div>

        {/* Right — Contact Cards */}
        <div className="space-y-4">

          {/* Section Label */}
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">
            🚨 National Hotlines
          </p>

          {/* Emergency Cards */}
          {emergencyContacts.map((c) => (
            <div
              key={c.id}
              className={`flex items-center justify-between border rounded-2xl px-4 py-3.5 transition-all hover:shadow-md ${c.color}`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${c.iconBg}`}>
                  {c.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-gray-800 text-sm">{c.name}</p>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${c.tagColor}`}>
                      {c.tag}
                    </span>
                  </div>
                  <p className="text-gray-400 text-xs mt-0.5">{c.desc}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={`tel:${c.number}`}
                  className="bg-white border border-gray-200 hover:bg-red-500 hover:text-white hover:border-red-500 text-gray-700 text-xs font-bold px-3 py-2 rounded-xl transition-all"
                >
                  📞 {c.number}
                </a>
                <button
                  onClick={() => handleCopy(c.id, c.number)}
                  className="w-8 h-8 bg-white border border-gray-200 hover:bg-gray-100 rounded-xl flex items-center justify-center text-sm transition-all"
                >
                  {copied === c.id ? "✅" : "📋"}
                </button>
              </div>
            </div>
          ))}

          {/* Divider */}
          <div className="flex items-center gap-3 py-1">
            <div className="flex-1 h-px bg-gray-200" />
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              👤 My Contacts
            </p>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Personal Contacts */}
          {personalContacts.map((c) => (
            <div
              key={c.id}
              className="flex items-center justify-between bg-white border border-gray-100 rounded-2xl px-4 py-3.5 hover:border-teal-200 hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-white text-xs font-black shadow-md">
                  {c.initials}
                </div>
                <div>
                  <p className="font-bold text-gray-800 text-sm">{c.name}</p>
                  <p className="text-gray-400 text-xs">{c.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
               <a  
                  href={`tel:${c.number}`}
                  className="bg-teal-500 hover:bg-teal-600 text-white text-xs font-bold px-3 py-2 rounded-xl transition-all"
                >
                  📞 Call
                </a>
                <button
                  onClick={() => handleCopy(`p-${c.id}`, c.number)}
                  className="w-8 h-8 bg-gray-50 border border-gray-200 hover:bg-gray-100 rounded-xl flex items-center justify-center text-sm transition-all"
                >
                  {copied === `p-${c.id}` ? "✅" : "📋"}
                </button>
              </div>
            </div>
          ))}

          {/* Add Contact */}
          <button className="w-full border-2 border-dashed border-gray-200 hover:border-teal-300 hover:bg-teal-50 text-gray-400 hover:text-teal-500 text-sm font-semibold py-3.5 rounded-2xl transition-all">
            ＋ Add Emergency Contact
          </button>

        </div>
      </div>
    </section>
  );
}