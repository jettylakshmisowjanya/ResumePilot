import { MailIcon, LockIcon, User2Icon, Sparkles } from "lucide-react";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../configs/api";
import { login } from "../app/features/authSlice";
import toast from "react-hot-toast";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const query = new URLSearchParams(window.location.search);
  const urlState = query.get("state");

  const [state, setState] = React.useState(urlState || "login");
  const [formData, setFormData] = React.useState({ name: "", email: "", password: "" });
  const [btnHovered, setBtnHovered] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post(`/api/users/${state}`, formData);
      dispatch(login(data));
      localStorage.setItem("token", data.token);
      toast.success(data.message);
      navigate("/app");
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const inputWrap = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    height: "48px",
    padding: "0 20px",
    borderRadius: "16px",
    background: "rgba(0,0,0,0.20)",
    border: "1px solid rgba(255,255,255,0.10)",
    marginBottom: "16px",
  };

  const inputField = {
    background: "transparent",
    outline: "none",
    border: "none",
    width: "100%",
    color: "#fff",
    padding: "4px 8px",
    fontSize: "14px",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#020617",
        position: "relative",
        overflow: "hidden",
        padding: "0 20px",
      }}
    >
      {/* Background glows */}
      <div
        style={{
          position: "absolute",
          top: "-200px",
          left: "-150px",
          width: "500px",
          height: "500px",
          background: "rgba(6,182,212,0.20)",
          borderRadius: "9999px",
          filter: "blur(160px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-200px",
          right: "-150px",
          width: "500px",
          height: "500px",
          background: "rgba(147,51,234,0.20)",
          borderRadius: "9999px",
          filter: "blur(160px)",
        }}
      />

      {/* Form card */}
      <form
        onSubmit={handleSubmit}
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          maxWidth: "448px",
          borderRadius: "32px",
          background: "rgba(255,255,255,0.10)",
          backdropFilter: "blur(40px)",
          WebkitBackdropFilter: "blur(40px)",
          border: "1px solid rgba(255,255,255,0.10)",
          boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
          padding: "32px",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "24px" }}>
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "16px",
              background: "linear-gradient(to bottom right, #22d3ee, #2563eb)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 10px 15px rgba(6,182,212,0.30)",
            }}
          >
            <Sparkles color="#000" size={30} />
          </div>
        </div>

        {/* Heading */}
        <h1
          style={{
            textAlign: "center",
            fontSize: "36px",
            fontWeight: 700,
            color: "#fff",
            margin: 0,
          }}
        >
          {state === "login" ? "Welcome Back" : "Create Account"}
        </h1>

        {/* Subheading */}
        <p
          style={{
            textAlign: "center",
            color: "#9ca3af",
            marginTop: "12px",
            fontSize: "14px",
          }}
        >
          {state === "login"
            ? "Continue building your professional resume"
            : "Create your resume profile"}
        </p>

        {/* Badge */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "8px",
            marginTop: "20px",
            marginBottom: "28px",
          }}
        >
          <span
            style={{
              fontSize: "12px",
              padding: "4px 12px",
              borderRadius: "9999px",
              background: "rgba(192,132,252,0.10)",
              color: "#d8b4fe",
              border: "1px solid rgba(192,132,252,0.20)",
            }}
          >
            Career Ready
          </span>
        </div>

        {/* Name field (register only) */}
        {state !== "login" && (
          <div style={inputWrap}>
            <User2Icon size={18} color="#22d3ee" />
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full name"
              style={{ ...inputField, "::placeholder": { color: "#9ca3af" } }}
            />
          </div>
        )}

        {/* Email field */}
        <div style={inputWrap}>
          <MailIcon size={18} color="#22d3ee" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email address"
            style={inputField}
          />
        </div>

        {/* Password field */}
        <div style={{ ...inputWrap, marginBottom: 0 }}>
          <LockIcon size={18} color="#22d3ee" />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            style={inputField}
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          onMouseEnter={() => setBtnHovered(true)}
          onMouseLeave={() => setBtnHovered(false)}
          style={{
            marginTop: "28px",
            width: "100%",
            height: "48px",
            borderRadius: "16px",
            background: "linear-gradient(to right, #22d3ee, #2563eb)",
            color: "#000",
            fontWeight: 700,
            fontSize: "18px",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 10px 15px rgba(6,182,212,0.20)",
            transition: "transform 0.2s",
            transform: btnHovered ? "scale(1.03)" : "scale(1)",
          }}
        >
          {state === "login" ? "Sign In" : "Create Account"}
        </button>

        {/* Toggle login / register */}
        <p
          onClick={() => setState((prev) => (prev === "login" ? "register" : "login"))}
          style={{
            textAlign: "center",
            color: "#9ca3af",
            marginTop: "24px",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          {state === "login" ? "Don't have an account?" : "Already registered?"}
          <span style={{ color: "#22d3ee", marginLeft: "8px", fontWeight: 600 }}>
            Click here
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;