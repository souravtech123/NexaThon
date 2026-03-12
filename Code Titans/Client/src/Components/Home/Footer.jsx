import React, { useState } from "react";

const footerLinks = {
  Product: [
    { label: "Nearby Hospitals", href: "#" },
    { label: "Emergency Contacts", href: "#" },
    { label: "Resource Dashboard", href: "#" },
    { label: "Live Updates", href: "#" },
  ],
  Company: [
    { label: "About Us", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Press Kit", href: "#" },
  ],
  Support: [
    { label: "Help Center", href: "#" },
    { label: "Contact Us", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
};

const socials = [
  { icon: "𝕏", href: "#", label: "Twitter" },
  { icon: "in", href: "#", label: "LinkedIn" },
  { icon: "f", href: "#", label: "Facebook" },
  { icon: "▶", href: "#", label: "YouTube" },
];

const stats = [
  { value: "500+", label: "Hospitals Listed" },
  { value: "1M+", label: "Users Helped" },
  { value: "24/7", label: "Live Support" },
  { value: "99.9%", label: "Uptime" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-gray-900 text-white">

      {/* Stats Bar */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-2xl font-black text-teal-400">{s.value}</p>
              <p className="text-gray-400 text-sm mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-5 gap-12">

        {/* Brand Col */}
        <div className="md:col-span-2 space-y-5">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 w-fit">
            <div className="w-9 h-9 bg-teal-600 rounded-xl flex items-center justify-center text-white text-lg shadow-lg shadow-teal-900/40">
              ➕
            </div>
            <span className="text-xl font-black tracking-tight">
              Med<span className="text-teal-400">Link</span>
            </span>
          </a>

          <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
            MedLink connects you to hospitals, emergency contacts, and
            real-time healthcare resources — when every second counts.
          </p>

          {/* Live Badge */}
          <div className="flex items-center gap-2 bg-gray-800 border border-gray-700 text-emerald-400 text-xs font-semibold px-3 py-2 rounded-xl w-fit">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
            Live Health Data Active
          </div>

          {/* Socials */}
          <div className="flex items-center gap-2 pt-1">
            {socials.map((s) => (
              <a 
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="w-9 h-9 bg-gray-800 hover:bg-teal-600 border border-gray-700 hover:border-teal-500 rounded-xl flex items-center justify-center text-gray-400 hover:text-white text-sm font-bold transition-all hover:scale-110"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Links Cols */}
        {Object.entries(footerLinks).map(([category, links]) => (
          <div key={category}>
            <p className="text-sm font-bold text-white uppercase tracking-widest mb-4">
              {category}
            </p>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-gray-400 hover:text-teal-400 text-sm transition-all"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Newsletter */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-bold text-white text-sm">
              🏥 Stay Updated with MedLink
            </p>
            <p className="text-gray-400 text-xs mt-1">
              Get alerts on hospital availability and health advisories.
            </p>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <input
              type="email"
              placeholder="Enter your email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 md:w-64 bg-gray-800 border border-gray-700 text-white text-sm placeholder-gray-500 px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500/50 transition"
            />
            <button
              onClick={handleSubscribe}
              className="bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all hover:scale-105 active:scale-95 whitespace-nowrap shadow-lg shadow-teal-900/30"
            >
              {subscribed ? "✅ Subscribed!" : "Subscribe"}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>© 2025 MedLink. All rights reserved.</p>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
            <span>All systems operational</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-teal-400 transition">Privacy</a>
            <a href="#" className="hover:text-teal-400 transition">Terms</a>
            <a href="#" className="hover:text-teal-400 transition">Cookies</a>
          </div>
        </div>
      </div>

    </footer>
  );
}