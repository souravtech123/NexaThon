import { useEffect, useRef, useState } from "react";

export default function HospitalMap() 
{
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [selected, setSelected] = useState(null);
  const markersRef = useRef([]);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.onload = () => initMap();
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(link);
      document.head.removeChild(script);
    };
  }, []);

  function initMap() {
    const L = window.L;
    const defaultPos = [20.5937, 78.9629];
    const map = L.map(mapRef.current).setView(defaultPos, 5);
    mapInstanceRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude: lat, longitude: lng } = pos.coords;
          setUserLocation({ lat, lng });
          map.setView([lat, lng], 13);

          L.circleMarker([lat, lng], {
            radius: 10,
            fillColor: "#3b82f6",
            color: "#fff",
            weight: 2,
            fillOpacity: 1,
          })
            .addTo(map)
            .bindPopup("📍 You are here")
            .openPopup();

          fetchHospitals(lat, lng, map);
        },
        () => fetchHospitals(defaultPos[0], defaultPos[1], map)
      );
    }
  }

  async function fetchHospitals(lat, lng, map) {
    setLoading(true);
    const L = window.L;

    const query = `
      [out:json];
      node["amenity"="hospital"](around:5000,${lat},${lng});
      out body;
    `;

    try {
      const res = await fetch(
        `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      const results = data.elements.filter((h) => h.lat && h.lon);
      setHospitals(results);

      markersRef.current.forEach((m) => map.removeLayer(m));
      markersRef.current = [];

      const hospitalIcon = L.divIcon({
        html: `<div style="background:#ef4444;color:#fff;border-radius:50%;width:32px;height:32px;display:flex;align-items:center;justify-content:center;font-size:16px;border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,0.3)">🏥</div>`,
        className: "",
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      results.forEach((h, i) => {
        const marker = L.marker([h.lat, h.lon], { icon: hospitalIcon })
          .addTo(map)
          .bindPopup(
            `<strong>${h.tags?.name || "Hospital"}</strong><br/>${h.tags?.["addr:street"] || ""}`
          );
        marker.on("click", () => setSelected(i));
        markersRef.current.push(marker);
      });
    } catch (e) {
      console.error("Failed to fetch hospitals", e);
    } finally {
      setLoading(false);
    }
  }

  function flyToHospital(h, index) {
    setSelected(index);
    const map = mapInstanceRef.current;
    if (map) {
      map.flyTo([h.lat, h.lon], 16, { duration: 1.2 });
      markersRef.current[index]?.openPopup();
    }
  }

  function getDistance(h) {
    if (!userLocation) return null;
    const R = 6371;
    const dLat = ((h.lat - userLocation.lat) * Math.PI) / 180;
    const dLon = ((h.lon - userLocation.lng) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((userLocation.lat * Math.PI) / 180) *
        Math.cos((h.lat * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;
    return (R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))).toFixed(1);
  }

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", display: "flex", flexDirection: "column", height: "100vh", background: "#f0f4f8" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #1e3a5f, #2563eb)", color: "#fff", padding: "16px 24px", display: "flex", alignItems: "center", gap: 12, boxShadow: "0 2px 12px rgba(0,0,0,0.2)" }}>
        <span style={{ fontSize: 28 }}>🏥</span>
        <div>
          <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, letterSpacing: 0.5 }}>Nearby Hospitals</h1>
          <p style={{ margin: 0, fontSize: 12, opacity: 0.8 }}>
            {loading ? "Searching nearby hospitals..." : `${hospitals.length} hospitals found within 5km`}
          </p>
        </div>
      </div>

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Hospital List */}
        <div style={{ width: 340, background: "#fff", overflowY: "auto", borderRight: "1px solid #e2e8f0", display: "flex", flexDirection: "column" }}>
          {loading ? (
            <div style={{ padding: 32, textAlign: "center", color: "#64748b" }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>🔍</div>
              <p style={{ fontWeight: 600 }}>Finding hospitals...</p>
              <p style={{ fontSize: 13, opacity: 0.7 }}>Searching within 5km radius</p>
            </div>
          ) : hospitals.length === 0 ? (
            <div style={{ padding: 32, textAlign: "center", color: "#94a3b8" }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>😕</div>
              <p style={{ fontWeight: 600 }}>No hospitals found</p>
              <p style={{ fontSize: 13 }}>Allow location access to search nearby</p>
            </div>
          ) : (
            <>
              <div style={{ padding: "12px 16px", background: "#f8fafc", borderBottom: "1px solid #e2e8f0", fontSize: 13, color: "#475569", fontWeight: 600 }}>
                🏥 HOSPITALS LIST ({hospitals.length})
              </div>
              {hospitals.map((h, i) => {
                const name = h.tags?.name || `Hospital ${i + 1}`;
                const street = h.tags?.["addr:street"] || h.tags?.["addr:full"] || "";
                const phone = h.tags?.phone || h.tags?.["contact:phone"] || "";
                const dist = getDistance(h);
                const isSelected = selected === i;

                return (
                  <div
                    key={h.id}
                    onClick={() => flyToHospital(h, i)}
                    style={{
                      padding: "14px 16px",
                      borderBottom: "1px solid #f1f5f9",
                      cursor: "pointer",
                      background: isSelected ? "#eff6ff" : "#fff",
                      borderLeft: isSelected ? "4px solid #2563eb" : "4px solid transparent",
                      transition: "all 0.15s ease",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                          <span style={{ background: "#fee2e2", color: "#dc2626", borderRadius: "50%", width: 24, height: 24, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 12, flexShrink: 0 }}>
                            {i + 1}
                          </span>
                          <strong style={{ fontSize: 14, color: "#1e293b", lineHeight: 1.3 }}>{name}</strong>
                        </div>
                        {street && (
                          <p style={{ margin: "0 0 4px 30px", fontSize: 12, color: "#64748b" }}>📍 {street}</p>
                        )}
                        {phone && (
                          <p style={{ margin: "0 0 4px 30px", fontSize: 12, color: "#64748b" }}>📞 {phone}</p>
                        )}
                        {h.tags?.emergency === "yes" && (
                          <span style={{ marginLeft: 30, background: "#fef2f2", color: "#dc2626", fontSize: 11, padding: "2px 8px", borderRadius: 99, fontWeight: 600 }}>
                            🚨 Emergency
                          </span>
                        )}
                      </div>
                      {dist && (
                        <div style={{ textAlign: "center", background: "#eff6ff", color: "#2563eb", borderRadius: 8, padding: "4px 8px", fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
                          {dist} km
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>

        {/* Map */}
        <div ref={mapRef} style={{ flex: 1 }} />
      </div>
    </div>
  );
}