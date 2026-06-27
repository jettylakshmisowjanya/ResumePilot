import { FileText } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import api from "../configs/api";

const ProfessionalSummary = ({ data, onChange, setResumeData }) => {
  const { token } = useSelector((state) => state.auth);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateSummary = async () => {
    try {
      setIsGenerating(true);

      const prompt = `enhance this professional summary for a resume: ${data}`;

      const response = await api.post(
        `/api/openai/enhance-professional-summary`,
        { userContent: prompt },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setResumeData((prev) => ({
        ...prev,
        professional_summary: response.data.enhancedContent,
      }));

      toast.success("Summary enhanced successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const styles = {
    wrapper: {
      display: "flex",
      flexDirection: "column",
      gap: "24px",
      color: "white",
    },

    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "16px",
      borderRadius: "12px",
      background: "rgba(255,255,255,0.05)",
      border: "1px solid rgba(255,255,255,0.1)",
      backdropFilter: "blur(12px)",
    },

    title: {
      fontSize: "18px",
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

    textareaWrapper: {
      position: "relative",
      background: "rgba(255,255,255,0.05)",
      borderRadius: "12px",
      border: "1px solid rgba(255,255,255,0.1)",
      padding: "4px",
      backdropFilter: "blur(12px)",
    },

    textarea: {
      width: "100%",
      minHeight: "180px",
      padding: "16px",
      paddingRight: "40px",
      fontSize: "14px",
      borderRadius: "12px",
      resize: "none",
      outline: "none",
      border: "none",
      background: "transparent",
      color: "rgba(255,255,255,0.8)",
    },

    icon: {
      position: "absolute",
      top: "16px",
      right: "16px",
      color: "rgba(34,211,238,0.6)",
    },

    tip: {
      display: "flex",
      alignItems: "flex-start",
      gap: "12px",
      padding: "16px 20px",
      borderRadius: "12px",
      background: "rgba(255,255,255,0.05)",
      border: "1px solid rgba(255,255,255,0.1)",
      fontSize: "14px",
      color: "rgba(255,255,255,0.7)",
    },

    strong: {
      color: "white",
    },
  };

  return (
    <div style={styles.wrapper}>
      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <h3 style={styles.title}>Professional Summary</h3>
          <p style={styles.subText}>
            Highlight your skills, achievements and career goals
          </p>
        </div>
      </div>

      {/* TEXTAREA */}
      <div style={styles.textareaWrapper}>
        <FileText size={18} style={styles.icon} />

        <textarea
          value={data || ""}
          onChange={(e) => onChange(e.target.value)}
          rows={8}
          placeholder="Write a brief summary about your professional background, key strengths and career goals..."
          style={styles.textarea}
        />
      </div>

      {/* TIP */}
      <div style={styles.tip}>
        <span style={{ fontSize: "18px" }}>💡</span>
        <p>
          <strong style={styles.strong}>Tip:</strong>{" "}
          Keep it concise and focus on your achievements, skills and impact.
        </p>
      </div>
    </div>
  );
};

export default ProfessionalSummary;