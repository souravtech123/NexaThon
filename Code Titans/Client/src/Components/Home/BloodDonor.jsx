import React, { useState } from "react";

const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

const donors = [
  { id: 1, name: "Rahul Sharma", blood: "O+", location: "Patna, Bihar", lastDonated: "2 months ago", available: true },
  { id: 2, name: "Priya Singh", blood: "A+", location: "Patna, Bihar", lastDonated: "4 months ago", available: true },
  { id: 3, name: "Amit Kumar", blood: "B+", location: "Patna, Bihar", lastDonated: "6 months ago", available: true },
  { id: 4, name: "Sneha Rao", blood: "AB-", location: "Patna, Bihar", lastDonated: "1 month ago", available: false },
];

export default function BloodDonorSection() {
  const [selected, setSelected] = useState(null);
  const [searched, setSearched] = useState(false);

  const filtered = selected
    ? donors.filter((d) => d.blood === selected)
    : donors;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

        {/* Left — Text Content */}
        <div>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 text-red-500 text-xs font-semibold px-4 py-1.5 rounded-full mb-5">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            Live Donor Network
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
            Find a Blood Donor{" "}
            <span className="text-red-500">Near You</span>
          </h2>

          <p className="mt-4 text-gray-500 text-lg leading-relaxed">
            Every drop counts. MedLink connects patients with verified
            blood donors instantly — search by blood group and location
            to find the right match in minutes.
          </p>

          {/* Features */}
          <div className="mt-8 space-y-5">
            {[
              { icon: "🩸", title: "All Blood Groups Covered", desc: "Find donors for A+, B+, O+, AB- and every blood type." },
              { icon: "📍", title: "Location-Based Matching", desc: "Connect with nearby donors to reduce critical response time." },
              { icon: "✅", title: "Verified & Willing Donors", desc: "Every donor is registered, verified, and ready to help." },
            ].map((f) => (
              <div key={f.title} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-xl flex-shrink-0">
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
          <div className="mt-8 flex gap-3 flex-wrap">
            <button className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-red-100">
              🩸 Become a Donor
            </button>
            <button className="border border-red-200 text-red-500 hover:bg-red-50 font-semibold px-6 py-3 rounded-xl transition-all">
              Request Blood →
            </button>
          </div>
        </div>

        {/* Right — Blood Group Finder */}
        <div>
          {/* Card */}
          <div className="bg-gray-50 border border-gray-100 rounded-3xl p-6 shadow-sm">

            {/* Top */}
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="font-bold text-gray-800">Search Donors</p>
                <p className="text-gray-400 text-xs mt-0.5">Select a blood group to find available donors</p>
              </div>
              <span className="text-3xl">🩸</span>
            </div>

            {/* Blood Group Grid */}
            <div className="grid grid-cols-4 gap-2 mb-5">
              {bloodGroups.map((bg) => (
                <button
                  key={bg}
                  onClick={() => { setSelected(bg); setSearched(true); }}
                  className={`py-3 rounded-xl text-sm font-black border transition-all ${
                    selected === bg
                      ? "bg-red-500 text-white border-red-500 shadow-lg shadow-red-100 scale-105"
                      : "bg-white text-gray-700 border-gray-200 hover:border-red-300 hover:text-red-500"
                  }`}
                >
                  {bg}
                </button>
              ))}
            </div>

            {/* Donor Results */}
            {searched && (
              <div className="space-y-3">
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
                  {filtered.length} Donor{filtered.length !== 1 ? "s" : ""} Found
                  {selected ? ` for ${selected}` : ""}
                </p>

                {filtered.length === 0 ? (
                  <div className="text-center py-8 text-gray-400 text-sm">
                    😔 No donors found for {selected}. Try another group.
                  </div>
                ) : (
                  filtered.map((donor) => (
                    <div
                      key={donor.id}
                      className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center justify-between hover:border-red-200 hover:shadow-sm transition-all"
                    >
                      <div className="flex items-center gap-3">
                        {/* Avatar */}
                        <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-500 font-black text-sm flex-shrink-0">
                          {donor.name.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 text-sm">{donor.name}</p>
                          <p className="text-gray-400 text-xs">{donor.location} · {donor.lastDonated}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-red-500 bg-red-50 px-2.5 py-1 rounded-lg">
                          {donor.blood}
                        </span>
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${
                          donor.available
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-gray-100 text-gray-400"
                        }`}>
                          {donor.available ? "Available" : "Unavailable"}
                        </span>
                      </div>
                    </div>
                  ))
                )}

                {filtered.length > 0 && (
                  <button className="w-full mt-1 border border-red-200 text-red-500 hover:bg-red-50 text-xs font-bold py-2.5 rounded-xl transition-all">
                    View All Donors →
                  </button>
                )}
              </div>
            )}

            {!searched && (
              <div className="text-center py-6 text-gray-300 text-sm">
                👆 Select a blood group above to search
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}