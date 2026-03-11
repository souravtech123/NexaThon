import { useState, useEffect } from "react";

const BLOOD_COMPATIBILITY = {
  "O-":  { canDonateTo: ["O-","O+","A-","A+","B-","B+","AB-","AB+"], canReceiveFrom: ["O-"] },
  "O+":  { canDonateTo: ["O+","A+","B+","AB+"], canReceiveFrom: ["O-","O+"] },
  "A-":  { canDonateTo: ["A-","A+","AB-","AB+"], canReceiveFrom: ["O-","A-"] },
  "A+":  { canDonateTo: ["A+","AB+"], canReceiveFrom: ["O-","O+","A-","A+"] },
  "B-":  { canDonateTo: ["B-","B+","AB-","AB+"], canReceiveFrom: ["O-","B-"] },
  "B+":  { canDonateTo: ["B+","AB+"], canReceiveFrom: ["O-","O+","B-","B+"] },
  "AB-": { canDonateTo: ["AB-","AB+"], canReceiveFrom: ["O-","A-","B-","AB-"] },
  "AB+": { canDonateTo: ["AB+"], canReceiveFrom: ["O-","O+","A-","A+","B-","B+","AB-","AB+"] },
};

const BLOOD_GROUPS = ["A+","A-","B+","B-","O+","O-","AB+","AB-"];

const BLOOD_COLORS = {
  "A+":"#e53e3e","A-":"#c53030","B+":"#dd6b20","B-":"#c05621",
  "O+":"#38a169","O-":"#276749","AB+":"#805ad5","AB-":"#6b46c1"
};

const MOCK_DONORS = [
  { id:1, name:"Arjun Sharma", blood:"O+", city:"Mumbai", age:28, phone:"98765-43210", lastDonated:"2024-09-15", available:true },
  { id:2, name:"Priya Mehta", blood:"A+", city:"Delhi", age:24, phone:"87654-32109", lastDonated:"2024-11-01", available:true },
  { id:3, name:"Rohan Das", blood:"B-", city:"Kolkata", age:32, phone:"76543-21098", lastDonated:"2024-08-20", available:false },
  { id:4, name:"Sneha Iyer", blood:"O-", city:"Bangalore", age:27, phone:"65432-10987", lastDonated:"2024-10-10", available:true },
  { id:5, name:"Vikram Singh", blood:"AB+", city:"Chennai", age:35, phone:"54321-09876", lastDonated:"2024-07-05", available:true },
  { id:6, name:"Ananya Roy", blood:"A-", city:"Hyderabad", age:22, phone:"43210-98765", lastDonated:"2025-01-12", available:true },
  { id:7, name:"Karan Patel", blood:"B+", city:"Ahmedabad", age:30, phone:"32109-87654", lastDonated:"2024-12-01", available:false },
  { id:8, name:"Meera Nair", blood:"O+", city:"Pune", age:26, phone:"21098-76543", lastDonated:"2025-02-20", available:true },
  { id:9, name:"Amit Verma", blood:"AB-", city:"Jaipur", age:29, phone:"10987-65432", lastDonated:"2024-06-30", available:true },
  { id:10, name:"Divya Krishnan", blood:"O-", city:"Lucknow", age:31, phone:"09876-54321", lastDonated:"2025-01-25", available:true },
  { id:11, name:"Raj Malhotra", blood:"A+", city:"Mumbai", age:25, phone:"98760-11111", lastDonated:"2025-03-01", available:true },
  { id:12, name:"Sunita Rao", blood:"B+", city:"Bangalore", age:33, phone:"87651-22222", lastDonated:"2024-10-15", available:true },
];

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #0d0d0d; }
  .app { min-height: 100vh; background: #0d0d0d; color: #f0ece4; font-family: 'DM Sans', sans-serif; }
  .hero { position: relative; padding: 48px 32px 36px; overflow: hidden; }
  .hero::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(220,38,38,0.18) 0%, transparent 70%); pointer-events: none; }
  .hero-title { font-family: 'Syne', sans-serif; font-size: clamp(2rem, 5vw, 3.2rem); font-weight: 800; line-height: 1.05; letter-spacing: -1px; }
  .hero-title span { color: #ef4444; }
  .hero-sub { margin-top: 10px; font-size: 15px; color: #9a8f85; font-weight: 300; max-width: 480px; }
  .stats-bar { display: flex; gap: 2px; padding: 0 32px 32px; flex-wrap: wrap; }
  .stat-pill { background: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 100px; padding: 8px 18px; font-size: 13px; color: #b0a89e; display: flex; align-items: center; gap: 8px; }
  .stat-pill strong { color: #f0ece4; font-family: 'Syne', sans-serif; font-size: 15px; }
  .main { display: grid; grid-template-columns: 320px 1fr; gap: 0; min-height: calc(100vh - 200px); }
  .panel { background: #111; border-top: 1px solid #1e1e1e; }
  .panel-left { border-right: 1px solid #1e1e1e; padding: 28px 24px; }
  .panel-right { padding: 28px 28px; }
  .section-label { font-family: 'Syne', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 2px; color: #5a5248; text-transform: uppercase; margin-bottom: 16px; }
  .blood-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin-bottom: 28px; }
  .blood-btn { border: 1.5px solid #2a2a2a; background: #161616; border-radius: 10px; padding: 10px 4px; cursor: pointer; transition: all 0.18s; text-align: center; }
  .blood-btn:hover { border-color: #444; transform: translateY(-1px); }
  .blood-btn.active { border-color: var(--bc); background: color-mix(in srgb, var(--bc) 12%, #161616); box-shadow: 0 0 16px color-mix(in srgb, var(--bc) 25%, transparent); }
  .blood-btn .label { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 16px; }
  .blood-btn .sub { font-size: 10px; color: #5a5248; margin-top: 2px; }
  .mode-toggle { display: flex; background: #161616; border: 1px solid #2a2a2a; border-radius: 10px; overflow: hidden; margin-bottom: 28px; }
  .mode-btn { flex: 1; padding: 10px; border: none; background: transparent; color: #7a7068; font-family: 'DM Sans', sans-serif; font-size: 13px; cursor: pointer; transition: all 0.15s; }
  .mode-btn.active { background: #ef4444; color: #fff; font-weight: 500; }
  .filter-box { margin-bottom: 20px; }
  .filter-label { font-size: 12px; color: #5a5248; margin-bottom: 8px; }
  .filter-input { width: 100%; background: #161616; border: 1px solid #2a2a2a; border-radius: 8px; padding: 10px 14px; color: #f0ece4; font-family: 'DM Sans', sans-serif; font-size: 14px; outline: none; transition: border 0.15s; }
  .filter-input:focus { border-color: #ef4444; }
  .search-btn { width: 100%; background: #ef4444; border: none; border-radius: 10px; padding: 13px; color: #fff; font-family: 'Syne', sans-serif; font-weight: 700; font-size: 14px; letter-spacing: 1px; cursor: pointer; transition: all 0.18s; margin-top: 8px; }
  .search-btn:hover { background: #dc2626; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(239,68,68,0.3); }
  .results-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
  .results-title { font-family: 'Syne', sans-serif; font-size: 18px; font-weight: 700; }
  .results-count { background: #ef4444; color: #fff; border-radius: 100px; padding: 3px 12px; font-size: 13px; font-weight: 600; }
  .compat-info { background: #161616; border: 1px solid #2a2a2a; border-radius: 12px; padding: 16px 20px; margin-bottom: 24px; display: flex; gap: 24px; flex-wrap: wrap; }
  .compat-group { }
  .compat-group-label { font-size: 11px; color: #5a5248; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 8px; }
  .compat-tags { display: flex; gap: 6px; flex-wrap: wrap; }
  .compat-tag { padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: 600; font-family: 'Syne', sans-serif; }
  .donor-grid { display: flex; flex-direction: column; gap: 12px; }
  .donor-card { background: #161616; border: 1px solid #222; border-radius: 14px; padding: 18px 20px; display: flex; align-items: center; gap: 16px; transition: all 0.18s; cursor: pointer; position: relative; overflow: hidden; }
  .donor-card::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px; background: var(--bc); border-radius: 3px 0 0 3px; }
  .donor-card:hover { border-color: #333; transform: translateX(3px); background: #1a1a1a; }
  .donor-card.unavailable { opacity: 0.45; }
  .blood-badge { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-family: 'Syne', sans-serif; font-weight: 800; font-size: 14px; color: #fff; flex-shrink: 0; }
  .donor-info { flex: 1; }
  .donor-name { font-family: 'Syne', sans-serif; font-weight: 600; font-size: 15px; margin-bottom: 4px; }
  .donor-meta { font-size: 12px; color: #7a7068; display: flex; gap: 12px; flex-wrap: wrap; }
  .donor-meta span { display: flex; align-items: center; gap: 4px; }
  .avail-badge { padding: 4px 10px; border-radius: 100px; font-size: 11px; font-weight: 600; flex-shrink: 0; }
  .avail-yes { background: rgba(52,211,153,0.15); color: #34d399; border: 1px solid rgba(52,211,153,0.25); }
  .avail-no { background: rgba(156,163,175,0.1); color: #6b7280; border: 1px solid rgba(156,163,175,0.15); }
  .contact-btn { background: #1e1e1e; border: 1px solid #2a2a2a; border-radius: 8px; padding: 7px 14px; color: #f0ece4; font-size: 12px; cursor: pointer; transition: all 0.15s; flex-shrink: 0; }
  .contact-btn:hover { background: #ef4444; border-color: #ef4444; }
  .empty-state { text-align: center; padding: 60px 20px; color: #5a5248; }
  .empty-icon { font-size: 48px; margin-bottom: 16px; }
  .donate-form { display: flex; flex-direction: column; gap: 14px; }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .form-group { display: flex; flex-direction: column; gap: 6px; }
  .form-group label { font-size: 12px; color: #7a7068; }
  .form-group input, .form-group select { background: #161616; border: 1px solid #2a2a2a; border-radius: 8px; padding: 10px 14px; color: #f0ece4; font-family: 'DM Sans', sans-serif; font-size: 14px; outline: none; transition: border 0.15s; }
  .form-group input:focus, .form-group select:focus { border-color: #ef4444; }
  .form-group select option { background: #1a1a1a; }
  .submit-btn { background: linear-gradient(135deg, #ef4444, #dc2626); border: none; border-radius: 10px; padding: 14px; color: #fff; font-family: 'Syne', sans-serif; font-weight: 700; font-size: 14px; letter-spacing: 1px; cursor: pointer; transition: all 0.18s; margin-top: 4px; }
  .submit-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(239,68,68,0.35); }
  .toast { position: fixed; bottom: 32px; right: 32px; background: #1a1a1a; border: 1px solid #34d399; border-radius: 12px; padding: 14px 20px; color: #34d399; font-size: 14px; font-weight: 500; z-index: 999; animation: slideUp 0.3s ease; box-shadow: 0 8px 32px rgba(0,0,0,0.5); }
  @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
  .tab-bar { display: flex; gap: 0; border-bottom: 1px solid #1e1e1e; margin-bottom: 28px; }
  .tab { padding: 12px 20px; background: transparent; border: none; color: #5a5248; font-family: 'Syne', sans-serif; font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.15s; border-bottom: 2px solid transparent; letter-spacing: 0.5px; }
  .tab.active { color: #ef4444; border-bottom-color: #ef4444; }
  @media (max-width: 768px) {
    .main { grid-template-columns: 1fr; }
    .panel-left { border-right: none; border-bottom: 1px solid #1e1e1e; }
    .form-row { grid-template-columns: 1fr; }
  }
`;

export default function BloodDonorApp() {
  const [donors, setDonors] = useState(MOCK_DONORS);
  const [selectedBlood, setSelectedBlood] = useState("");
  const [mode, setMode] = useState("find"); // find | donate
  const [cityFilter, setCityFilter] = useState("");
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const [activeTab, setActiveTab] = useState("donors"); // donors | compatibility
  const [toast, setToast] = useState("");
  const [form, setForm] = useState({ name:"", age:"", blood:"", city:"", phone:"", lastDonated:"" });

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(""), 3500); };

  const handleSearch = () => {
    if (!selectedBlood) { showToast("⚠️ Please select a blood group"); return; }
    const compatible = BLOOD_COMPATIBILITY[selectedBlood]?.canReceiveFrom || [];
    const filtered = donors.filter(d =>
      compatible.includes(d.blood) &&
      (cityFilter === "" || d.city.toLowerCase().includes(cityFilter.toLowerCase()))
    );
    setResults(filtered);
    setSearched(true);
    setActiveTab("donors");
  };

  const handleRegister = () => {
    if (!form.name || !form.blood || !form.city || !form.phone) {
      showToast("⚠️ Please fill all required fields"); return;
    }
    const newDonor = { id: donors.length + 1, ...form, age: parseInt(form.age) || 25, available: true };
    setDonors(prev => [...prev, newDonor]);
    setForm({ name:"", age:"", blood:"", city:"", phone:"", lastDonated:"" });
    showToast("✅ Registered successfully as a donor!");
    setMode("find");
  };

  const compatInfo = selectedBlood ? BLOOD_COMPATIBILITY[selectedBlood] : null;

  return (
    <>
      <style>{style}</style>
      <div className="app">
        {/* Hero */}
        <div className="hero">
          <div className="hero-title">Blood Donor<br /><span>Matching System</span></div>
          <div className="hero-sub">Connect recipients with compatible donors instantly. Every second counts.</div>
        </div>

        {/* Stats */}
        <div className="stats-bar">
          {[
            { label: "Total Donors", val: donors.length },
            { label: "Available Now", val: donors.filter(d=>d.available).length },
            { label: "Blood Groups", val: 8 },
            { label: "Cities", val: [...new Set(donors.map(d=>d.city))].length },
          ].map(s => (
            <div className="stat-pill" key={s.label}>
              <strong>{s.val}</strong> {s.label}
            </div>
          ))}
        </div>

        <div className="main">
          {/* Left Panel */}
          <div className="panel panel-left">
            <div className="mode-toggle">
              <button className={`mode-btn ${mode==="find"?"active":""}`} onClick={()=>setMode("find")}>🔍 Find Donor</button>
              <button className={`mode-btn ${mode==="donate"?"active":""}`} onClick={()=>setMode("donate")}>❤️ Register Donor</button>
            </div>

            {mode === "find" ? (
              <>
                <div className="section-label">Select Recipient Blood Group</div>
                <div className="blood-grid">
                  {BLOOD_GROUPS.map(bg => (
                    <button
                      key={bg}
                      className={`blood-btn ${selectedBlood===bg?"active":""}`}
                      style={{"--bc": BLOOD_COLORS[bg]}}
                      onClick={() => setSelectedBlood(bg)}
                    >
                      <div className="label" style={{color: BLOOD_COLORS[bg]}}>{bg}</div>
                      <div className="sub">Select</div>
                    </button>
                  ))}
                </div>

                <div className="filter-box">
                  <div className="filter-label">Filter by City (optional)</div>
                  <input
                    className="filter-input"
                    placeholder="e.g. Mumbai, Delhi..."
                    value={cityFilter}
                    onChange={e => setCityFilter(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && handleSearch()}
                  />
                </div>

                <button className="search-btn" onClick={handleSearch}>
                  FIND MATCHING DONORS →
                </button>
              </>
            ) : (
              <>
                <div className="section-label">Donor Registration</div>
                <div className="donate-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Full Name *</label>
                      <input placeholder="Your name" value={form.name} onChange={e=>setForm(p=>({...p,name:e.target.value}))} />
                    </div>
                    <div className="form-group">
                      <label>Age</label>
                      <input type="number" placeholder="25" value={form.age} onChange={e=>setForm(p=>({...p,age:e.target.value}))} />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Blood Group *</label>
                      <select value={form.blood} onChange={e=>setForm(p=>({...p,blood:e.target.value}))}>
                        <option value="">Select</option>
                        {BLOOD_GROUPS.map(bg=><option key={bg} value={bg}>{bg}</option>)}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>City *</label>
                      <input placeholder="Your city" value={form.city} onChange={e=>setForm(p=>({...p,city:e.target.value}))} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input placeholder="98765-XXXXX" value={form.phone} onChange={e=>setForm(p=>({...p,phone:e.target.value}))} />
                  </div>
                  <div className="form-group">
                    <label>Last Donation Date</label>
                    <input type="date" value={form.lastDonated} onChange={e=>setForm(p=>({...p,lastDonated:e.target.value}))} />
                  </div>
                  <button className="submit-btn" onClick={handleRegister}>REGISTER AS DONOR ❤️</button>
                </div>
              </>
            )}
          </div>

          {/* Right Panel */}
          <div className="panel panel-right">
            {!searched && mode === "find" ? (
              <div className="empty-state">
                <div className="empty-icon">🩸</div>
                <div style={{fontFamily:"'Syne',sans-serif", fontSize:18, fontWeight:700, marginBottom:8, color:"#f0ece4"}}>Select a blood group to begin</div>
                <div style={{fontSize:14, color:"#5a5248", maxWidth:300, margin:"0 auto"}}>We'll find all compatible donors from our network instantly</div>

                <div style={{marginTop:40, display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, maxWidth:480, margin:"40px auto 0"}}>
                  {BLOOD_GROUPS.map(bg => (
                    <div key={bg} style={{background:"#161616", border:"1px solid #222", borderRadius:10, padding:"12px 8px", textAlign:"center"}}>
                      <div style={{fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:18, color:BLOOD_COLORS[bg]}}>{bg}</div>
                      <div style={{fontSize:11, color:"#5a5248", marginTop:4}}>
                        {BLOOD_COMPATIBILITY[bg].canReceiveFrom.length} compatible
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : mode === "donate" ? (
              <div className="empty-state">
                <div className="empty-icon">❤️</div>
                <div style={{fontFamily:"'Syne',sans-serif", fontSize:18, fontWeight:700, marginBottom:8, color:"#f0ece4"}}>Become a Life Saver</div>
                <div style={{fontSize:14, color:"#5a5248", maxWidth:320, margin:"0 auto"}}>Fill in your details on the left to register as a blood donor. Your contribution can save lives.</div>
                <div style={{marginTop:32, display:"flex", flexDirection:"column", gap:12, maxWidth:320, margin:"32px auto 0"}}>
                  {["One donation can save up to 3 lives","Donate every 3 months (whole blood)","Free health checkup with every donation","Join 12+ donors already registered"].map(tip => (
                    <div key={tip} style={{background:"#161616", border:"1px solid #222", borderRadius:10, padding:"12px 16px", fontSize:13, color:"#9a8f85", textAlign:"left", display:"flex", gap:10, alignItems:"center"}}>
                      <span style={{color:"#ef4444"}}>●</span> {tip}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <div className="tab-bar">
                  <button className={`tab ${activeTab==="donors"?"active":""}`} onClick={()=>setActiveTab("donors")}>
                    DONORS ({results.length})
                  </button>
                  <button className={`tab ${activeTab==="compat"?"active":""}`} onClick={()=>setActiveTab("compat")}>
                    COMPATIBILITY
                  </button>
                </div>

                {activeTab === "compat" && compatInfo && (
                  <div>
                    <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:24}}>
                      {[
                        {label:"Can Donate To", items: compatInfo.canDonateTo, color:"#3b82f6"},
                        {label:"Can Receive From", items: compatInfo.canReceiveFrom, color:"#ef4444"},
                      ].map(g => (
                        <div key={g.label} style={{background:"#161616", border:"1px solid #222", borderRadius:14, padding:"18px 20px"}}>
                          <div style={{fontSize:11, color:"#5a5248", letterSpacing:"1.5px", textTransform:"uppercase", marginBottom:12}}>{g.label}</div>
                          <div style={{display:"flex", gap:8, flexWrap:"wrap"}}>
                            {g.items.map(bg => (
                              <span key={bg} style={{background:`color-mix(in srgb, ${BLOOD_COLORS[bg]} 18%, #161616)`, color:BLOOD_COLORS[bg], border:`1px solid color-mix(in srgb, ${BLOOD_COLORS[bg]} 35%, transparent)`, borderRadius:8, padding:"5px 12px", fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:13}}>
                                {bg}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div style={{background:"#161616", border:"1px solid #222", borderRadius:14, padding:"18px 20px"}}>
                      <div style={{fontFamily:"'Syne',sans-serif", fontSize:13, fontWeight:700, color:"#ef4444", marginBottom:12}}>ABOUT {selectedBlood}</div>
                      <div style={{fontSize:13, color:"#9a8f85", lineHeight:1.7}}>
                        {selectedBlood === "O-" && "Universal donor — O- red blood cells can be given to anyone in an emergency regardless of blood type. Extremely valuable in trauma situations."}
                        {selectedBlood === "O+" && "Most common blood type. Can donate to all Rh-positive types. In high demand due to frequency of Rh+ recipients."}
                        {selectedBlood === "AB+" && "Universal recipient — AB+ individuals can receive blood from any donor. Also called the universal plasma donor."}
                        {selectedBlood === "AB-" && "Rare blood type. Universal plasma donor. AB- plasma can be given to patients of any blood type."}
                        {selectedBlood === "A+" && "Second most common type. Can donate to A+ and AB+ patients. Compatible with A and O donors."}
                        {selectedBlood === "A-" && "Rare type. Can donate to all A and AB types. Important for patients who need multiple transfusions."}
                        {selectedBlood === "B+" && "Can donate to B+ and AB+ recipients. Relatively common in South Asian populations."}
                        {selectedBlood === "B-" && "Rare type. Can donate to all B and AB types regardless of Rh factor."}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "donors" && (
                  results.length === 0 ? (
                    <div className="empty-state">
                      <div className="empty-icon">😕</div>
                      <div style={{fontFamily:"'Syne',sans-serif", fontSize:16, fontWeight:700, color:"#f0ece4", marginBottom:8}}>No donors found</div>
                      <div style={{fontSize:13, color:"#5a5248"}}>Try a different city or blood group</div>
                    </div>
                  ) : (
                    <div className="donor-grid">
                      {results.map((d, i) => (
                        <div
                          key={d.id}
                          className={`donor-card ${!d.available?"unavailable":""}`}
                          style={{"--bc": BLOOD_COLORS[d.blood]}}
                        >
                          <div className="blood-badge" style={{background: BLOOD_COLORS[d.blood]}}>
                            {d.blood}
                          </div>
                          <div className="donor-info">
                            <div className="donor-name">{d.name}</div>
                            <div className="donor-meta">
                              <span>📍 {d.city}</span>
                              <span>🎂 {d.age} yrs</span>
                              {d.lastDonated && <span>🩸 Last: {d.lastDonated}</span>}
                            </div>
                          </div>
                          <div style={{display:"flex", flexDirection:"column", gap:8, alignItems:"flex-end"}}>
                            <span className={`avail-badge ${d.available?"avail-yes":"avail-no"}`}>
                              {d.available ? "● Available" : "● Unavailable"}
                            </span>
                            {d.available && (
                              <button className="contact-btn" onClick={() => showToast(`📞 Contacting ${d.name}: ${d.phone}`)}>
                                Contact
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )
                )}
              </>
            )}
          </div>
        </div>
      </div>
      {toast && <div className="toast">{toast}</div>}
    </>
  );
}