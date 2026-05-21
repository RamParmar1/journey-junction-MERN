import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  const contacts = [
    { emoji: "✉", label: "Email", value: "support@elitetravel.com" },
    { emoji: "✆", label: "Phone", value: "+91 98765 43210" },
    { emoji: "⚲", label: "Address", value: "Mumbai, Maharashtra, India" },
    { emoji: "⏱", label: "Hours", value: "Mon–Sat, 9AM – 7PM" },
  ];

  return (
    <div style={{ fontFamily: "'Georgia', serif", color: "#1a1a2e", background: "#f8f9fa", minHeight: "100vh" }}>
      {/* Hero */}
      <div style={{
        background: "linear-gradient(135deg, #1a1a2e, #0f3460)",
        color: "#fff", padding: "5rem 2rem", textAlign: "center", position: "relative"
      }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 20% 50%, rgba(212,175,55,0.1) 0%, transparent 50%)" }} />
        <div style={{ position: "relative" }}>
          <p style={{ color: "#d4af37", letterSpacing: "4px", fontSize: "0.85rem", textTransform: "uppercase", marginBottom: "1rem" }}>Get In Touch</p>
          <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: "700", marginBottom: "1rem" }}>We'd Love to Hear From You</h1>
          <p style={{ opacity: 0.8, fontSize: "1.05rem", fontFamily: "sans-serif", maxWidth: "600px", margin: "0 auto" }}>Have a question about a trip? We're here to help make your travel dreams a reality.</p>
        </div>
      </div>

      <div style={{ maxWidth: "1200px", margin: "-3rem auto 3rem", padding: "0 2rem", display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "3rem", alignItems: "start", position: "relative", zIndex: 10 }}>

        {/* Contact Info */}
        <div style={{ background: "#fff", padding: "3rem 2.5rem", borderRadius: "20px", boxShadow: "0 10px 40px rgba(0,0,0,0.06)", borderTop: "4px solid #d4af37" }}>
          <h2 style={{ fontSize: "1.8rem", marginBottom: "2.5rem", color: "#1a1a2e" }}>Contact Info</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {contacts.map((c) => (
              <div key={c.label} style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                <span style={{
                  width: "56px", height: "56px", background: "linear-gradient(135deg, #d4af37, #f0e0a0)", borderRadius: "16px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.6rem", flexShrink: 0, color: "#1a1a2e", boxShadow: "0 6px 15px rgba(212,175,55,0.3)"
                }}>{c.emoji}</span>
                <div>
                  <div style={{ fontSize: "0.85rem", color: "#888", fontFamily: "sans-serif", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>{c.label}</div>
                  <div style={{ fontFamily: "sans-serif", color: "#1a1a2e", fontWeight: "600", fontSize: "1.05rem" }}>{c.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div style={{ background: "#fff", borderRadius: "20px", padding: "3rem", boxShadow: "0 10px 40px rgba(0,0,0,0.06)" }}>
          <h2 style={{ fontSize: "1.8rem", marginBottom: "2rem", color: "#1a1a2e" }}>Send a Message</h2>
          {sent && (
            <div style={{
              background: "rgba(40, 167, 69, 0.1)", color: "#28a745", padding: "1.2rem 1.5rem",
              borderRadius: "12px", marginBottom: "2rem", fontFamily: "sans-serif",
              fontSize: "1rem", border: "1px solid rgba(40, 167, 69, 0.2)", display: "flex", alignItems: "center", gap: "10px"
            }}>
              <span>✓</span> Message sent successfully! We'll get back to you soon.
            </div>
          )}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
              <div>
                <label style={{ fontSize: "0.8rem", color: "#666", fontFamily: "sans-serif", textTransform: "uppercase", letterSpacing: "1px", fontWeight: "600", marginBottom: "8px", display: "block" }}>First Name</label>
                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required
                  style={{ width: "100%", padding: "1rem 1.2rem", borderRadius: "12px", background: "#f8f9fa", border: "1px solid transparent", fontSize: "1rem", fontFamily: "sans-serif", outline: "none", boxSizing: "border-box", transition: "all 0.3s" }}
                  placeholder="Your Name"
                  onFocus={e => { e.target.style.background = "#fff"; e.target.style.border = "1px solid #d4af37"; e.target.style.boxShadow = "0 0 0 3px rgba(212,175,55,0.1)" }}
                  onBlur={e => { e.target.style.background = "#f8f9fa"; e.target.style.border = "1px solid transparent"; e.target.style.boxShadow = "none" }}
                />
              </div>
              <div>
                <label style={{ fontSize: "0.8rem", color: "#666", fontFamily: "sans-serif", textTransform: "uppercase", letterSpacing: "1px", fontWeight: "600", marginBottom: "8px", display: "block" }}>Email Address</label>
                <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required type="email"
                  style={{ width: "100%", padding: "1rem 1.2rem", borderRadius: "12px", background: "#f8f9fa", border: "1px solid transparent", fontSize: "1rem", fontFamily: "sans-serif", outline: "none", boxSizing: "border-box", transition: "all 0.3s" }}
                  placeholder="your@email.com"
                  onFocus={e => { e.target.style.background = "#fff"; e.target.style.border = "1px solid #d4af37"; e.target.style.boxShadow = "0 0 0 3px rgba(212,175,55,0.1)" }}
                  onBlur={e => { e.target.style.background = "#f8f9fa"; e.target.style.border = "1px solid transparent"; e.target.style.boxShadow = "none" }}
                />
              </div>
            </div>
            <div>
              <label style={{ fontSize: "0.8rem", color: "#666", fontFamily: "sans-serif", textTransform: "uppercase", letterSpacing: "1px", fontWeight: "600", marginBottom: "8px", display: "block" }}>Subject</label>
              <input value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} required
                style={{ width: "100%", padding: "1rem 1.2rem", borderRadius: "12px", background: "#f8f9fa", border: "1px solid transparent", fontSize: "1rem", fontFamily: "sans-serif", outline: "none", boxSizing: "border-box", transition: "all 0.3s" }}
                placeholder="How can we help?"
                onFocus={e => { e.target.style.background = "#fff"; e.target.style.border = "1px solid #d4af37"; e.target.style.boxShadow = "0 0 0 3px rgba(212,175,55,0.1)" }}
                onBlur={e => { e.target.style.background = "#f8f9fa"; e.target.style.border = "1px solid transparent"; e.target.style.boxShadow = "none" }}
              />
            </div>
            <div>
              <label style={{ fontSize: "0.8rem", color: "#666", fontFamily: "sans-serif", textTransform: "uppercase", letterSpacing: "1px", fontWeight: "600", marginBottom: "8px", display: "block" }}>Your Message</label>
              <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required rows={5}
                style={{ width: "100%", padding: "1.2rem", borderRadius: "12px", background: "#f8f9fa", border: "1px solid transparent", fontSize: "1rem", fontFamily: "sans-serif", outline: "none", resize: "vertical", boxSizing: "border-box", transition: "all 0.3s" }}
                placeholder="Tell us about your dream trip..."
                onFocus={e => { e.target.style.background = "#fff"; e.target.style.border = "1px solid #d4af37"; e.target.style.boxShadow = "0 0 0 3px rgba(212,175,55,0.1)" }}
                onBlur={e => { e.target.style.background = "#f8f9fa"; e.target.style.border = "1px solid transparent"; e.target.style.boxShadow = "none" }}
              />
            </div>
            <button type="submit" style={{
              background: "linear-gradient(135deg, #1a1a2e, #0f3460)",
              color: "#d4af37", border: "none", borderRadius: "12px",
              padding: "1.2rem", fontSize: "1.05rem", fontWeight: "700",
              cursor: "pointer", letterSpacing: "1.5px", fontFamily: "sans-serif",
              marginTop: "1rem", transition: "transform 0.3s, box-shadow 0.3s",
              boxShadow: "0 6px 20px rgba(0,0,0,0.15)"
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.2)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.15)";
              }}
            >
              SEND MESSAGE ➔
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}