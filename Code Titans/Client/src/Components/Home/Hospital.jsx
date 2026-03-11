import React from "react";

export default function NearbyHospitals() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

        {/* Image / Map Side */}
        <div className="flex justify-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2967/2967350.png"
            alt="Nearby Hospitals"
            className="w-[380px]"
          />
        </div>

        {/* Text Content */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Find Nearby Hospitals Instantly
          </h2>

          <p className="mt-5 text-gray-600 text-lg">
            MedLink helps you quickly discover hospitals, clinics,
            and healthcare services near your location. With smart
            location technology, you can access the best healthcare
            options in seconds.
          </p>

          {/* Feature Points */}
          <div className="mt-8 space-y-4">

            <div className="flex items-start gap-3">
              <span className="text-teal-600 text-xl">📍</span>
              <p className="text-gray-600">
                Locate hospitals and clinics near you in real time.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-teal-600 text-xl">🏥</span>
              <p className="text-gray-600">
                View hospital ratings, services, and available doctors.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-teal-600 text-xl">⚡</span>
              <p className="text-gray-600">
                Get emergency healthcare options instantly.
              </p>
            </div>

          </div>

          {/* Button */}
          <button className="mt-8 bg-teal-600 text-white px-6 py-3 rounded-xl hover:bg-teal-700 transition">
            Search Nearby Hospitals
          </button>

        </div>
      </div>
    </section>
  );
}