import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Sparkles } from "lucide-react";
import { logout } from "../app/features/authSlice";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutUser = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/");
  };

  const styles = {
    wrapper: {
      position: "sticky",
      top: 0,
      zIndex: 50,
      backgroundColor: "rgba(7, 11, 23, 0.7)",
      backdropFilter: "blur(12px)",
      borderBottom: "1px solid rgba(255,255,255,0.1)",
    },

    nav: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      maxWidth: "1280px",
      margin: "0 auto",
      padding: "16px 16px",
      color: "white",
    },

    logo: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      textDecoration: "none",
      color: "inherit",
    },

    brandText: {
      fontSize: "18px",
      fontWeight: 600,
      letterSpacing: "0.5px",
      background: "linear-gradient(to right, #22d3ee, #a855f7)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },

    right: {
      display: "flex",
      alignItems: "center",
      gap: "16px",
      fontSize: "14px",
    },

    greeting: {
      color: "#9ca3af",
    },

    username: {
      color: "#ffffff",
      fontWeight: 500,
    },

    button: {
      padding: "6px 16px",
      borderRadius: "9999px",
      fontSize: "14px",
      fontWeight: 500,
      color: "#67e8f9",
      backgroundColor: "rgba(255,255,255,0.05)",
      border: "1px solid rgba(255,255,255,0.1)",
      backdropFilter: "blur(10px)",
      cursor: "pointer",
      transition: "all 0.2s ease",
    },
  };

  return (
    <div style={styles.wrapper}>
      <nav style={styles.nav}>
        {/* LOGO */}
        <Link to="/" style={styles.logo}>
          <Sparkles size={20} />
          <span style={styles.brandText}>ResumePilot</span>
        </Link>

        {/* RIGHT SIDE */}
        <div style={styles.right}>
          <p style={styles.greeting}>
            Hi{" "}
            <span style={styles.username}>
              {user?.name}
            </span>
          </p>

          <button
            onClick={logoutUser}
            style={styles.button}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "rgba(255,255,255,0.1)";
              e.target.style.border = "1px solid #22d3ee";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "rgba(255,255,255,0.05)";
              e.target.style.border = "1px solid rgba(255,255,255,0.1)";
            }}
          >
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;