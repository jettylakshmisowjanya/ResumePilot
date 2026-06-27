import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Sparkles } from "lucide-react";

const gradientText = {
  background: "linear-gradient(to right, #67e8f9, #60a5fa, #a855f7)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

const pillBtn = {
  fontSize: "14px",
  padding: "8px 20px",
  borderRadius: "9999px",
  background: "linear-gradient(to right, #22d3ee, #3b82f6, #a855f7)",
  color: "#000",
  fontWeight: 600,
  boxShadow: "0 10px 15px rgba(6,182,212,0.20)",
  textDecoration: "none",
  display: "inline-block",
  transition: "transform 0.2s",
};

const Hero = () => {
  const { user } = useSelector((state) => state.auth);
  const [navBtnHovered, setNavBtnHovered] = useState(false);
  const [startBtnHovered, setStartBtnHovered] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState(null);

  const features = [
    { title: "Create from scratch", desc: "Start with a structured form and build your resume step-by-step." },
    { title: "Upload & continue",   desc: "Import your existing resume and edit it instantly." },
    { title: "Edit anytime",        desc: "Update sections like experience, education, skills easily." },
    { title: "Live preview",        desc: "See changes instantly as you edit your resume." },
    { title: "PDF export",          desc: "Download a clean, ATS-friendly PDF version." },
    { title: "Simple & fast",       desc: "No unnecessary features — just what you need." },
  ];

  const stats = [
    ["3 Steps", "Create → Edit → Export"],
    ["PDF",     "Download Ready Resume"],
    ["Fast",    "No complexity"],
    ["Clean UI","Simple workflow"],
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        paddingBottom: "80px",
        background: "#070b17",
        position: "relative",
        overflow: "hidden",
        color: "#fff",
      }}
    >
      {/* GRID BACKGROUND */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.04 }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
              linear-gradient(to right, rgba(34,211,238,0.35) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(168,85,247,0.25) 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* GLOWS */}
      <div
        style={{
          position: "absolute",
          top: "33.333%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "650px",
          height: "650px",
          background: "rgba(34,211,238,0.15)",
          filter: "blur(140px)",
          borderRadius: "9999px",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-120px",
          right: "-120px",
          width: "550px",
          height: "550px",
          background: "rgba(168,85,247,0.15)",
          filter: "blur(140px)",
          borderRadius: "9999px",
          pointerEvents: "none",
        }}
      />

      {/* NAV */}
      <nav
        style={{
          position: "fixed",
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 50,
          width: "80%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 24px",
          background: "rgba(255,255,255,0.10)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: "9999px",
          boxShadow: "0 10px 15px rgba(0,0,0,0.20)",
        }}
      >
        {/* BRAND */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Sparkles size={20} />
          <span
            style={{
              fontSize: "18px",
              fontWeight: 700,
              whiteSpace: "nowrap",
              ...gradientText,
            }}
          >
            ResumePilot
          </span>
        </div>

        {/* AUTH BUTTON */}
        {!user ? (
          <Link
            to="/app?state=login"
            onMouseEnter={() => setNavBtnHovered(true)}
            onMouseLeave={() => setNavBtnHovered(false)}
            style={{
              ...pillBtn,
              transform: navBtnHovered ? "scale(1.05)" : "scale(1)",
            }}
          >
            Sign in
          </Link>
        ) : (
          <Link
            to="/app"
            onMouseEnter={() => setNavBtnHovered(true)}
            onMouseLeave={() => setNavBtnHovered(false)}
            style={{
              ...pillBtn,
              boxShadow: "0 10px 15px rgba(168,85,247,0.20)",
              transform: navBtnHovered ? "scale(1.05)" : "scale(1)",
            }}
          >
            Dashboard
          </Link>
        )}
      </nav>

      {/* HERO */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 24px",
        }}
      >
        {/* TITLE */}
        <h1
          style={{
            fontSize: "clamp(40px, 6vw, 60px)",
            fontWeight: 800,
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
            margin: 0,
          }}
        >
          Build a resume that actually gets you hired
          <br />
          <span style={gradientText}>in minutes, not hours</span>
        </h1>

        {/* SUBTITLE */}
        <p
          style={{
            color: "#d1d5db",
            marginTop: "24px",
            maxWidth: "672px",
            fontSize: "18px",
            lineHeight: 1.7,
          }}
        >
          Create a resume from scratch, upload your existing one, edit it easily,
          and export a clean PDF — all in one simple tool.
        </p>

        {/* BUTTONS */}
        <div style={{ display: "flex", gap: "16px", marginTop: "40px" }}>
          <Link
            onMouseEnter={() => setStartBtnHovered(true)}
            onMouseLeave={() => setStartBtnHovered(false)}
            style={{
              padding: "12px 24px",
              borderRadius: "9999px",
              background: "linear-gradient(to right, #22d3ee, #3b82f6, #a855f7)",
              color: "#000",
              fontWeight: 600,
              boxShadow: "0 10px 15px rgba(0,0,0,0.2)",
              textDecoration: "none",
              display: "inline-block",
              transition: "transform 0.2s",
              transform: startBtnHovered ? "scale(1.05)" : "scale(1)",
            }}
          >
            Start Building
          </Link>
        </div>
      </section>

      {/* STATS */}
      <div
        style={{
          display: "flex",
          borderTop: "1px solid rgba(255,255,255,0.10)",
          borderBottom: "1px solid rgba(255,255,255,0.10)",
          textAlign: "center",
          background: "rgba(255,255,255,0.05)",
        }}
      >
        {stats.map(([num, label], i) => (
          <div
            key={i}
            style={{
              flex: 1,
              padding: "32px 0",
              borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.10)" : "none",
            }}
          >
            <div style={{ fontSize: "24px", fontWeight: 700, ...gradientText }}>{num}</div>
            <div style={{ fontSize: "12px", color: "#d1d5db", marginTop: "4px" }}>{label}</div>
          </div>
        ))}
      </div>

      {/* FEATURES */}
      <section
        id="features"
        style={{
          padding: "96px 24px",
          maxWidth: "1152px",
          margin: "0 auto",
        }}
      >
        <h2
          style={{
            fontSize: "30px",
            fontWeight: 700,
            textAlign: "center",
            marginBottom: "8px",
          }}
        >
          Everything you need to build a resume
        </h2>
        <p
          style={{
            color: "#9ca3af",
            textAlign: "center",
            marginBottom: "56px",
          }}
        >
          No AI, no confusion — just a clean resume builder workflow.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "24px",
          }}
        >
          {features.map((item, i) => (
            <div
              key={i}
              onMouseEnter={() => setHoveredFeature(i)}
              onMouseLeave={() => setHoveredFeature(null)}
              style={{
                padding: "24px",
                borderRadius: "12px",
                background: "rgba(255,255,255,0.10)",
                border: hoveredFeature === i
                  ? "1px solid rgba(103,232,249,0.40)"
                  : "1px solid rgba(255,255,255,0.15)",
                transition: "border-color 0.2s",
              }}
            >
              <div style={{ fontSize: "14px", fontWeight: 600, marginBottom: "8px", color: "#fff" }}>
                {item.title}
              </div>
              <div style={{ fontSize: "12px", color: "#d1d5db", lineHeight: 1.6 }}>
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          padding: "24px 0",
          textAlign: "center",
          fontSize: "12px",
          color: "#9ca3af",
          borderTop: "1px solid rgba(255,255,255,0.10)",
        }}
      >
        © 2026 Craft My Resume
      </footer>
    </div>
  );
};

export default Hero;