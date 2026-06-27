import React from "react";
import {
  BriefcaseBusiness,
  Linkedin,
  MailIcon,
  MapPin,
  Phone,
  User,
  Globe,
  Github,
} from "lucide-react";

const PersonalInfoForm = ({
  data,
  onChange,
  removeBackground,
  setRemoveBackground,
}) => {
  const handleChange = (field, value) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  const fields = [
    { key: "full_name", label: "Full Name", icon: User, type: "text", required: true },
    { key: "email", label: "Email Address", icon: MailIcon, type: "email", required: true },
    { key: "phone", label: "Phone Number", icon: Phone, type: "tel" },
    { key: "location", label: "Location", icon: MapPin, type: "text" },
    { key: "profession", label: "Profession", icon: BriefcaseBusiness, type: "text" },
    { key: "linkedin", label: "LinkedIn Profile", icon: Linkedin, type: "url" },
    { key: "website", label: "Personal Website", icon: Globe, type: "url" },
    { key: "github", label: "GitHub Profile", icon: Github, type: "url" },
  ];

  const styles = {
    wrapper: {
      color: "white",
      display: "flex",
      flexDirection: "column",
      gap: "24px",
    },

    headerTitle: {
      fontSize: "20px",
      fontWeight: 600,
      background: "linear-gradient(to right, #22d3ee, #a855f7)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },

    subText: {
      fontSize: "14px",
      color: "rgba(255,255,255,0.6)",
      marginTop: "4px",
    },

    imageBox: {
      display: "flex",
      alignItems: "center",
      gap: "20px",
      padding: "16px",
      borderRadius: "12px",
      background: "rgba(255,255,255,0.05)",
      border: "1px solid rgba(255,255,255,0.1)",
      backdropFilter: "blur(12px)",
    },

    avatar: {
      width: "80px",
      height: "80px",
      borderRadius: "50%",
      objectFit: "cover",
      border: "2px solid rgba(34,211,238,0.4)",
      cursor: "pointer",
      transition: "transform 0.2s",
    },

    placeholderAvatar: {
      width: "80px",
      height: "80px",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "rgba(255,255,255,0.1)",
      border: "1px solid rgba(255,255,255,0.1)",
      cursor: "pointer",
    },

    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "20px",
    },

    label: {
      fontSize: "14px",
      fontWeight: 500,
      color: "rgba(255,255,255,0.8)",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },

    input: {
      width: "100%",
      padding: "12px 16px",
      borderRadius: "12px",
      background: "rgba(255,255,255,0.05)",
      border: "1px solid rgba(255,255,255,0.1)",
      color: "white",
      fontSize: "14px",
      outline: "none",
    },

    inputFocus: {
      outline: "none",
    },

    toggleWrap: {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
    },

    toggleText: {
      fontSize: "14px",
      fontWeight: 500,
      color: "rgba(255,255,255,0.8)",
    },

    toggle: {
      width: "44px",
      height: "24px",
      borderRadius: "999px",
      background: "rgba(255,255,255,0.1)",
      position: "relative",
      cursor: "pointer",
    },

    toggleDot: (checked) => ({
      position: "absolute",
      top: "4px",
      left: checked ? "20px" : "4px",
      width: "16px",
      height: "16px",
      borderRadius: "50%",
      background: "white",
      transition: "0.2s",
    }),
  };

  return (
    <div style={styles.wrapper}>
      {/* HEADER */}
      <div>
        <h3 style={styles.headerTitle}>Personal Information</h3>
        <p style={styles.subText}>
          Add your details to create your professional resume
        </p>
      </div>

      {/* IMAGE */}
      <div style={styles.imageBox}>
        <label style={{ cursor: "pointer" }}>
          {data.image ? (
            <img
              src={
                typeof data.image === "string"
                  ? data.image
                  : URL.createObjectURL(data.image)
              }
              alt="user"
              style={styles.avatar}
            />
          ) : (
            <div style={styles.placeholderAvatar}>
              <User size={40} color="#22d3ee" />
            </div>
          )}

          <input
            type="file"
            accept="image/jpeg,image/png,image/jpg"
            style={{ display: "none" }}
            onChange={(e) => handleChange("image", e.target.files[0])}
          />
        </label>

        {typeof data.image === "object" && data.image && (
          <div style={styles.toggleWrap}>
            <p style={styles.toggleText}>Remove Background</p>

            <label style={styles.toggle}>
              <input
                type="checkbox"
                checked={removeBackground}
                onChange={() => setRemoveBackground((p) => !p)}
                style={{ display: "none" }}
              />
              <span style={styles.toggleDot(removeBackground)} />
            </label>
          </div>
        )}
      </div>

      {/* INPUTS */}
      <div style={styles.grid}>
        {fields.map((field) => {
          const Icon = field.icon;

          return (
            <div key={field.key}>
              <label style={styles.label}>
                <Icon size={16} color="#22d3ee" />
                {field.label}
                {field.required && (
                  <span style={{ color: "#f472b6" }}>*</span>
                )}
              </label>

              <input
                type={field.type}
                value={data[field.key] || ""}
                onChange={(e) =>
                  handleChange(field.key, e.target.value)
                }
                placeholder={`Enter your ${field.label.toLowerCase()}`}
                style={styles.input}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PersonalInfoForm;