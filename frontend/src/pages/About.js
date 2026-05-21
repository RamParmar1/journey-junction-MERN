export default function About() {
  const team = [
    { name: "Arjun Sharma", role: "Founder & CEO", symbol: "♚" },
    { name: "Priya Patel", role: "Head of Travel", symbol: "✦" },
    { name: "Ravi Kumar", role: "Tech Lead", symbol: "❖" },
  ];

  const stats = [
    { value: "500+", label: "Destinations" },
    { value: "10K+", label: "Happy Travelers" },
    { value: "8+", label: "Years Experience" },
    { value: "4.9★", label: "Average Rating" },
  ];

  return (
    <div style={{ fontFamily: "'Georgia', serif", color: "#1a1a2e", background: "#f8f9fa" }}>
      {/* Hero */}
      <div style={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%)",
        color: "#fff", padding: "6rem 2rem", textAlign: "center", position: "relative", overflow: "hidden"
      }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 20% 50%, rgba(212,175,55,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(212,175,55,0.1) 0%, transparent 40%)" }} />
        <div style={{ position: "relative", maxWidth: "700px", margin: "0 auto" }}>
          <p style={{ color: "#d4af37", letterSpacing: "4px", fontSize: "0.85rem", textTransform: "uppercase", marginBottom: "1rem" }}>Our Story</p>
          <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: "700", lineHeight: "1.2", marginBottom: "1.5rem" }}>
            We Make Travel<br />Unforgettable
          </h1>
          <p style={{ fontSize: "1.15rem", opacity: "0.85", lineHeight: "1.8", fontFamily: "sans-serif" }}>
            Elite Travel was born from a simple belief — every journey should be a story worth telling. Since 2016, we've been crafting extraordinary travel experiences across India and beyond.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div style={{ background: "linear-gradient(135deg, #d4af37, #f0e0a0)", padding: "3rem 2rem" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "2rem", textAlign: "center" }}>
          {stats.map((s) => (
            <div key={s.label}>
              <div style={{ fontSize: "2.8rem", fontWeight: "800", color: "#1a1a2e", marginBottom: "0.2rem" }}>{s.value}</div>
              <div style={{ fontSize: "0.95rem", color: "#1a1a2e", opacity: "0.85", fontFamily: "sans-serif", textTransform: "uppercase", letterSpacing: "1px", fontWeight: "600" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Mission */}
      <div style={{ maxWidth: "850px", margin: "5rem auto", padding: "0 2rem", textAlign: "center" }}>
        <h2 style={{ fontSize: "2.5rem", marginBottom: "1.5rem", color: "#1a1a2e" }}>Our Mission</h2>
        <p style={{ fontSize: "1.1rem", lineHeight: "2", color: "#555", fontFamily: "sans-serif" }}>
          We believe travel is not just about visiting places — it's about connecting with cultures, creating memories, and discovering yourself. Our team of passionate travel experts curates every trip with meticulous attention to detail, ensuring each journey is seamless, safe, and spectacular.
        </p>
      </div>

      {/* Team */}
      <div style={{ background: "#fff", padding: "5rem 2rem", borderTop: "1px solid #eaeaea" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: "2.5rem", marginBottom: "4rem", color: "#1a1a2e" }}>Meet Our Team</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2.5rem" }}>
            {team.map((member) => (
              <div key={member.name} style={{
                background: "#f8f9fa", borderRadius: "20px", padding: "3rem 2rem",
                textAlign: "center", boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
                borderTop: "5px solid #d4af37", transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                cursor: "pointer"
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-15px)";
                  e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.12)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.06)";
                }}>
                <div style={{
                  fontSize: "3rem", color: "#d4af37", width: "90px", height: "90px",
                  margin: "0 auto 1.5rem", display: "flex", alignItems: "center", justifyContent: "center",
                  background: "linear-gradient(135deg, #1a1a2e, #0f3460)", borderRadius: "50%",
                  boxShadow: "0 8px 20px rgba(26,26,46,0.25)"
                }}>
                  {member.symbol}
                </div>
                <h3 style={{ fontSize: "1.3rem", fontWeight: "700", marginBottom: "0.5rem", color: "#1a1a2e" }}>{member.name}</h3>
                <p style={{ color: "#888", fontSize: "0.95rem", fontFamily: "sans-serif", textTransform: "uppercase", letterSpacing: "1px", fontWeight: "600" }}>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}