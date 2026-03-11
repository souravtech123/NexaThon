import React from "react";

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-50 to-teal-50 py-20">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 items-center gap-10">

        {/* Left Content */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            Smart Healthcare <br />
            <span className="text-teal-600">Connected with MedLink</span>
          </h1>

          <p className="mt-6 text-gray-600 text-lg">
            MedLink connects patients, doctors, and hospitals in one
            intelligent platform. Book appointments, manage health
            records, and access healthcare instantly.
          </p>

          <div className="mt-8 flex gap-4">
            <button className="bg-teal-600 text-white px-6 py-3 rounded-xl hover:bg-teal-700 transition">
              Get Started
            </button>

            <button className="border border-teal-600 text-teal-600 px-6 py-3 rounded-xl hover:bg-teal-50 transition">
              Learn More
            </button>
          </div>

          <div className="mt-8 flex items-center gap-6 text-gray-500 text-sm">
            <p>✔ Trusted Doctors</p>
            <p>✔ Secure Records</p>
            <p>✔ 24/7 Support</p>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex justify-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
            alt="Healthcare"
            className="w-[400px]"
          />
        </div>

      </div>
    </section>
  );
}