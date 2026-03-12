import React, { useState } from "react";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Nearby Hospitals", href: "#" },
  { label: "Emergency Contacts", href: "#" },
  { label: "Resources", href: "#" },
  { label: "About", href: "#" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-teal-600 rounded-xl flex items-center justify-center text-white text-lg shadow-md shadow-teal-200">
            ➕
          </div>
          <span className="text-xl font-black text-gray-800 tracking-tight">
            Med<span className="text-teal-600">Link</span>
          </span>
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a 
                href={link.href}
                className="text-sm font-medium text-gray-500 hover:text-teal-600 hover:bg-teal-50 px-4 py-2 rounded-xl transition-all"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          {/* Live Badge */}
          <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-600 text-xs font-semibold px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            Live Updates
          </div>
          <button className="text-sm font-semibold text-gray-600 hover:text-teal-600 px-4 py-2 rounded-xl hover:bg-teal-50 transition-all">
            Sign In
          </button>
          <button className="bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-teal-100">
            Get Started
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-xl hover:bg-gray-100 transition"
        >
          <span className={`block h-0.5 w-5 bg-gray-600 rounded-full transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block h-0.5 w-5 bg-gray-600 rounded-full transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-5 bg-gray-600 rounded-full transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-6 pb-5 pt-3 space-y-1">
          {navLinks.map((link) => (
          <a 
              key={link.label}
              href={link.href}
              className="block text-sm font-medium text-gray-600 hover:text-teal-600 hover:bg-teal-50 px-4 py-2.5 rounded-xl transition-all"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}

          <div className="pt-3 border-t border-gray-100 space-y-2">
            <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-600 text-xs font-semibold px-3 py-1.5 rounded-full w-fit">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              Live Updates Active
            </div>
            <div className="flex gap-2 pt-1">
              <button className="flex-1 text-sm font-semibold text-gray-600 border border-gray-200 hover:border-teal-300 hover:text-teal-600 py-2.5 rounded-xl transition-all">
                Sign In
              </button>
              <button className="flex-1 bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold py-2.5 rounded-xl transition-all shadow-lg shadow-teal-100">
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}