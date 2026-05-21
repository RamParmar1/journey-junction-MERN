import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

const quotes = [
  { text: "The world is a book, and those who do not travel read only one page.", author: "— Saint Augustine" },
  { text: "Travel is the only thing you buy that makes you richer.", author: "— Anonymous" },
  { text: "Not all those who wander are lost.", author: "— J.R.R. Tolkien" },
];

const features = [
  { icon: "fa-solid fa-earth-americas", title: "500+ Destinations", desc: "From serene mountains to golden beaches — we cover it all." },
  { icon: "fa-solid fa-sack-dollar", title: "Best Price Guaranteed", desc: "Transparent pricing with no hidden charges. Ever." },
  { icon: "fa-solid fa-shield-halved", title: "Safe & Secure", desc: "Fully verified trips with 24/7 customer support." },
  { icon: "fa-solid fa-bolt", title: "Instant Booking", desc: "Book your dream trip in under 2 minutes." },
];

const destinations = [
  { name: "Goa", tag: "Beach Getaway", icon: "fa-solid fa-umbrella-beach", color: "#c9a84c" },
  { name: "Manali", tag: "Mountain Escape", icon: "fa-solid fa-mountain", color: "#c9a84c" },
  { name: "Kashmir", tag: "Paradise on Earth", icon: "fa-regular fa-snowflake", color: "#c9a84c" },
  { name: "Kedarnath", tag: "Spiritual Journey", icon: "fa-solid fa-hands-praying", color: "#c9a84c" },
  { name: "Jaipur", tag: "Royal Heritage", icon: "fa-solid fa-chess-rook", color: "#c9a84c" },
  { name: "Mumbai", tag: "City of Dreams", icon: "fa-solid fa-city", color: "#c9a84c" },
];

export default function Home() {
  const navigate = useNavigate();
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-container">

      {/* ===== HERO VIDEO SECTION ===== */}
      <div style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
        <img
          src="/images/hero.png"
          alt="Travel Hero"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />

        {/* Gradient Overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(4,6,11,0.4) 0%, rgba(4,6,11,0.6) 50%, rgba(4,6,11,0.9) 100%)"
        }} />

        {/* Hero Content */}
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          textAlign: "center", padding: "2rem", color: "#fff"
        }}>
          <p style={{
            letterSpacing: "0.4em", fontSize: "0.85rem", textTransform: "uppercase",
            color: "#c9a84c", marginBottom: "1.25rem", fontWeight: "600"
          }}>
            <i className="fa-solid fa-plane-departure" style={{ marginRight: "8px" }}></i> Your Journey Begins Here
          </p>

          <h1 style={{
            fontSize: "clamp(3rem, 7vw, 6rem)", fontWeight: "700",
            lineHeight: "1.1", marginBottom: "1.5rem",
            textShadow: "0 4px 30px rgba(0,0,0,0.6)",
            fontFamily: "'Cormorant Garamond', Georgia, serif"
          }}>
            Discover the World<br />
            <span style={{ color: "#c9a84c", fontStyle: "italic" }}>One Trip at a Time</span>
          </h1>

          {/* Rotating Quote */}
          <div style={{
            maxWidth: "600px", marginBottom: "3rem",
            padding: "1.5rem 2.5rem",
            background: "rgba(255,255,255,0.03)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            borderRadius: "16px",
            border: "1px solid rgba(255,255,255,0.05)",
            boxShadow: "0 10px 40px rgba(0,0,0,0.2)"
          }}>
            <p style={{ fontSize: "1.2rem", fontStyle: "normal", marginBottom: "0.8rem", lineHeight: "1.8", color: "#f0f4ff", fontFamily: "'Outfit', sans-serif", fontWeight: "300", letterSpacing: "0.02em" }}>
              "{quotes[quoteIndex].text}"
            </p>
            <p style={{ fontSize: "0.9rem", color: "#c9a84c", letterSpacing: "0.05em", fontWeight: "500", fontFamily: "'Outfit', sans-serif", textTransform: "uppercase" }}>
              {quotes[quoteIndex].author}
            </p>
          </div>

          <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", justifyContent: "center" }}>
            <button
              onClick={() => navigate("/packages")}
              style={{
                background: "linear-gradient(135deg, #c9a84c, #b8922a)",
                color: "#06080f", border: "none", borderRadius: "99px",
                padding: "1rem 2.5rem", fontSize: "1rem", fontWeight: "700",
                cursor: "pointer", letterSpacing: "0.1em", textTransform: "uppercase",
                boxShadow: "0 4px 20px rgba(201,168,76,0.3)", transition: "all 0.3s ease"
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 6px 25px rgba(201,168,76,0.4)" }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(201,168,76,0.3)" }}
            >
              Explore Trips <i className="fa-solid fa-arrow-right" style={{ marginLeft: "8px" }}></i>
            </button>
            <button
              onClick={() => navigate("/about")}
              style={{
                background: "rgba(255,255,255,0.05)", color: "#fff",
                border: "1px solid rgba(255,255,255,0.2)", borderRadius: "99px",
                padding: "1rem 2.5rem", fontSize: "1rem", fontWeight: "600",
                cursor: "pointer", letterSpacing: "0.05em", backdropFilter: "blur(8px)",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)" }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)" }}
            >
              Learn More
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div style={{
          position: "absolute", bottom: "3rem", left: "50%", transform: "translateX(-50%)",
          color: "#8fa3c8", textAlign: "center", fontSize: "0.85rem", letterSpacing: "0.2em", textTransform: "uppercase"
        }}>
          <div style={{ animation: "bounce 2s infinite", fontSize: "1.2rem", color: "#c9a84c", marginBottom: "8px" }}>
            <i className="fa-solid fa-chevron-down"></i>
          </div>
          <div>Scroll</div>
        </div>
      </div>

      {/* ===== FEATURES STRIP ===== */}
      <div style={{ background: "#06080f", padding: "5rem 2rem", position: "relative", zIndex: 2 }}>
        <div style={{
          maxWidth: "1200px", margin: "0 auto",
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "3rem"
        }}>
          {features.map((f) => (
            <div key={f.title} style={{ textAlign: "center", color: "#fff" }}>
              <div style={{
                fontSize: "2.2rem", marginBottom: "1.5rem", color: "#c9a84c",
                background: "rgba(201,168,76,0.05)", width: "80px", height: "80px",
                lineHeight: "80px", borderRadius: "50%", margin: "0 auto 1.5rem",
                boxShadow: "inset 0 0 0 1px rgba(201,168,76,0.2)"
              }}>
                <i className={f.icon}></i>
              </div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: "600", color: "#f0f4ff", marginBottom: "0.8rem", letterSpacing: "0.02em" }}>
                {f.title}
              </h3>
              <p style={{ fontSize: "0.95rem", color: "#8fa3c8", lineHeight: "1.7" }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ===== POPULAR DESTINATIONS ===== */}
      <div style={{ background: "#f0f3f9", padding: "7rem 2rem", position: "relative" }}>
        {/* Subtle pattern overlay */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.4,
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c9a84c' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
        }}></div>

        <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <p style={{ color: "#c9a84c", letterSpacing: "0.2em", fontSize: "0.85rem", textTransform: "uppercase", marginBottom: "1rem", fontWeight: "600" }}>
              Handpicked For You
            </p>
            <h2 style={{ fontSize: "clamp(2.5rem, 4vw, 3.5rem)", fontWeight: "600", color: "#06080f", fontFamily: "'Cormorant Garamond', serif" }}>
              Popular Destinations
            </h2>
            <div style={{ width: "60px", height: "2px", background: "linear-gradient(90deg, #c9a84c, #e2c47a)", margin: "1.5rem auto 0" }}></div>
          </div>

          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "2rem"
          }}>
            {destinations.map((d) => (
              <div
                key={d.name}
                onClick={() => navigate("/packages")}
                style={{
                  background: "#fff", borderRadius: "16px", padding: "2.5rem 1.5rem",
                  textAlign: "center", cursor: "pointer",
                  boxShadow: "0 4px 20px rgba(6,8,15,0.04)",
                  border: "1px solid rgba(201,168,76,0.1)",
                  transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                  position: "relative", overflow: "hidden"
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow = "0 15px 35px rgba(6,8,15,0.08)";
                  e.currentTarget.style.borderColor = "rgba(201,168,76,0.4)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 20px rgba(6,8,15,0.04)";
                  e.currentTarget.style.borderColor = "rgba(201,168,76,0.1)";
                }}
              >
                <div style={{
                  fontSize: "2.8rem", marginBottom: "1.25rem", color: d.color,
                  transition: "transform 0.4s ease"
                }}
                  className="dest-icon"
                >
                  <i className={d.icon}></i>
                </div>
                <h3 style={{ fontSize: "1.4rem", fontWeight: "600", color: "#0a0f1e", marginBottom: "0.5rem", fontFamily: "'Cormorant Garamond', serif" }}>{d.name}</h3>
                <p style={{ fontSize: "0.9rem", color: "#8fa3c8", letterSpacing: "0.02em" }}>{d.tag}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "4rem" }}>
            <button
              onClick={() => navigate("/packages")}
              style={{
                background: "transparent",
                color: "#06080f", border: "1px solid #c9a84c", borderRadius: "99px",
                padding: "1rem 3rem", fontSize: "0.95rem", fontWeight: "600",
                cursor: "pointer", letterSpacing: "0.05em", textTransform: "uppercase",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(201,168,76,0.05)" }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent" }}
            >
              View All Escapes
            </button>
          </div>
        </div>
      </div>

      {/* ===== CTA BANNER ===== */}
      <div style={{
        background: "linear-gradient(135deg, #06080f 0%, #0a0f1e 100%)",
        padding: "6rem 2rem", textAlign: "center", position: "relative"
      }}>
        {/* Glow behind CTA */}
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(circle at center, rgba(201, 168, 76, 0.15) 0%, transparent 60%)",
          pointerEvents: "none"
        }}></div>

        <div style={{ position: "relative", zIndex: 1 }}>
          <i className="fa-solid fa-compass" style={{ fontSize: "2.5rem", color: "#c9a84c", marginBottom: "1.5rem" }}></i>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: "600", color: "#fcfdff", marginBottom: "1rem", fontFamily: "'Cormorant Garamond', serif" }}>
            Ready for Your Next Adventure?
          </h2>
          <p style={{ color: "#8fa3c8", marginBottom: "2.5rem", fontSize: "1.1rem" }}>
            Join thousands of happy travelers who trust Elite Travel
          </p>
          <button
            onClick={() => navigate("/register")}
            style={{
              background: "linear-gradient(135deg, #c9a84c, #b8922a)", color: "#06080f", border: "none",
              borderRadius: "99px", padding: "1.1rem 3rem",
              fontSize: "1rem", fontWeight: "700", cursor: "pointer",
              textTransform: "uppercase", letterSpacing: "0.1em",
              boxShadow: "0 4px 15px rgba(201,168,76,0.3)", transition: "all 0.3s ease"
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 25px rgba(201,168,76,0.5)" }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 15px rgba(201,168,76,0.3)" }}
          >
            Start Your Journey
          </button>
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
        .dest-icon:hover {
           transform: scale(1.1);
        }
      `}</style>
    </div>
  );
}