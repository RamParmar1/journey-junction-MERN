import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Packages() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
        const res = await fetch(`${apiUrl}/trips`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setPackages(Array.isArray(data) ? data : data.trips || []);
      } catch (err) {
        setError("Could not load trips.");
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  const filtered = packages.filter(
    (p) =>
      p.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.location?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ minHeight: "100vh", background: "#f8f9fa", fontFamily: "'Georgia', serif" }}>

      {/* Header Banner */}
      <div style={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%)",
        padding: "3.5rem 2rem", textAlign: "center", color: "#fff"
      }}>
        <p style={{ color: "#d4af37", letterSpacing: "4px", fontSize: "0.8rem", textTransform: "uppercase", fontFamily: "sans-serif", marginBottom: "0.75rem" }}>
          ✦ Handpicked For You
        </p>
        <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: "700", marginBottom: "0.5rem" }}>
          Available Trips
        </h1>
        <p style={{ opacity: 0.7, fontFamily: "sans-serif", fontSize: "1rem" }}>
          Explore our curated travel packages
        </p>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2.5rem 1.5rem" }}>

        {/* Search */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "2.5rem" }}>
          <input
            type="text"
            placeholder="⚲ Search by name or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%", maxWidth: "500px",
              padding: "0.85rem 1.5rem", borderRadius: "50px",
              border: "2px solid #e0e0e0", fontSize: "1rem",
              outline: "none", fontFamily: "sans-serif",
              boxShadow: "0 2px 12px rgba(0,0,0,0.07)"
            }}
          />
        </div>

        {/* States */}
        {loading && (
          <div style={{ textAlign: "center", padding: "5rem", color: "#888", fontFamily: "sans-serif" }}>
            ⏱ Loading trips...
          </div>
        )}
        {error && (
          <div style={{ textAlign: "center", padding: "2rem", color: "#e74c3c", fontFamily: "sans-serif" }}>
            {error}
          </div>
        )}
        {!loading && !error && filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "5rem", color: "#aaa", fontFamily: "sans-serif" }}>
            No trips found.
          </div>
        )}

        {/* Cards Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "2rem"
        }}>
          {filtered.map((p) => (
            <div
              key={p._id}
              style={{
                background: "#fff", borderRadius: "20px", overflow: "hidden",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                cursor: "pointer", display: "flex", flexDirection: "column"
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)";
              }}
              onClick={() => navigate(`/packages/${p._id}`)}
            >
              {/* Image */}
              <div style={{
                height: "210px",
                background: p.image
                  ? `url(${p.image}) center/cover no-repeat`
                  : "linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%)",
                position: "relative"
              }}>
                {!p.image && (
                  <div style={{
                    position: "absolute", inset: 0,
                    display: "flex", alignItems: "center",
                    justifyContent: "center", fontSize: "4rem", color: "#d4af37"
                  }}>◈</div>
                )}
                {/* Duration badge */}
                {p.duration && (
                  <span style={{
                    position: "absolute", top: "14px", right: "14px",
                    background: "rgba(26,26,46,0.8)", color: "#d4af37",
                    padding: "6px 16px", borderRadius: "50px",
                    fontSize: "0.8rem", fontWeight: "700", fontFamily: "sans-serif",
                    border: "1px solid rgba(212,175,55,0.4)"
                  }}>
                    ⏱ {p.duration}
                  </span>
                )}
                {/* Price badge */}
                <div style={{
                  position: "absolute", bottom: "0", left: "0", right: "0",
                  background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
                  padding: "2rem 1.25rem 1rem"
                }}>
                  <span style={{
                    color: "#d4af37", fontSize: "1.5rem", fontWeight: "800"
                  }}>
                    ₹{p.price?.toLocaleString()}
                  </span>
                  <span style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.85rem", fontFamily: "sans-serif", marginLeft: "6px", fontWeight: "500" }}>
                    / person
                  </span>
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                <h3 style={{ fontSize: "1.3rem", fontWeight: "700", color: "#1a1a2e", marginBottom: "0.5rem" }}>
                  {p.name}
                </h3>
                <p style={{ color: "#d4af37", fontSize: "0.9rem", fontFamily: "sans-serif", marginBottom: "1rem", fontWeight: "600" }}>
                  ⚲ {p.location}
                </p>
                {p.description && (
                  <p style={{
                    color: "#555", fontSize: "0.9rem", fontFamily: "sans-serif",
                    lineHeight: "1.6", marginBottom: "1.5rem",
                    display: "-webkit-box", WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical", overflow: "hidden"
                  }}>
                    {p.description}
                  </p>
                )}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
                  {p.maxGroupSize && (
                     <span style={{ color: "#888", fontSize: "0.85rem", fontFamily: "sans-serif", fontWeight: "500" }}>
                       ❖ Max {p.maxGroupSize}
                     </span>
                  )}
                  <button
                    style={{
                      background: "#d4af37",
                      color: "#1a1a2e", border: "none", borderRadius: "10px",
                      padding: "0.7rem 1.4rem", fontSize: "0.9rem",
                      fontWeight: "800", cursor: "pointer", fontFamily: "sans-serif",
                      marginLeft: "auto", transition: "all 0.3s ease",
                      boxShadow: "0 4px 15px rgba(212,175,55,0.3)"
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = "#1a1a2e";
                      e.currentTarget.style.color = "#d4af37";
                      e.currentTarget.style.boxShadow = "0 6px 20px rgba(26,26,46,0.4)";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = "#d4af37";
                      e.currentTarget.style.color = "#1a1a2e";
                      e.currentTarget.style.boxShadow = "0 4px 15px rgba(212,175,55,0.3)";
                    }}
                  >
                    View Details ➔
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}