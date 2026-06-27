import { Plus, Briefcase, Trash2, Sparkles, Loader2 } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import api from "../configs/api";

const Experience = ({ data, onChange }) => {
  const { token } = useSelector((state) => state.auth);
  const [generatingIndex, setGeneratingIndex] = useState(-1);

  const addExperience = () => {
    const newExperience = {
      company: "",
      position: "",
      start_date: "",
      end_date: "",
      description: "",
      is_current: false,
    };
    onChange([...data, newExperience]);
  };

  const removeExperience = (index) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const updateExperience = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const generateJobDescription = async (index) => {
    setGeneratingIndex(index);

    const exp = data[index];
    const prompt = `enhance this job description for a resume: ${exp.description} for the position of ${exp.position} at ${exp.company}`;

    try {
      const response = await api.post(
        `/api/openai/enhance-job-description`,
        { userContent: prompt },
        { headers: { Authorization: token } }
      );

      updateExperience(index, "description", response.data.enhancedContent);
      toast.success("Job description enhanced successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setGeneratingIndex(-1);
    }
  };

  return (
    <div style={styles.wrapper}>

      {/* header */}
      <div style={styles.header}>
        <p style={styles.subText}>Add your job experience here</p>

        <button style={styles.addBtn} onClick={addExperience}>
          <Plus size={16} />
          Add Experience
        </button>
      </div>

      {/* empty */}
      {data.length === 0 ? (
        <div style={styles.emptyBox}>
          <Briefcase size={48} style={styles.iconGray} />
          <p style={styles.emptyText}>No experience added yet</p>
          <p style={styles.emptySub}>Click “Add Experience” to get started</p>
        </div>
      ) : (
        <div style={styles.list}>
          {data.map((exp, index) => (
            <div key={index} style={styles.card}>

              {/* top */}
              <div style={styles.rowBetween}>
                <h4 style={styles.title}>Experience #{index + 1}</h4>

                <button
                  onClick={() => removeExperience(index)}
                  style={styles.trashBtn}
                >
                  <Trash2 size={17} />
                </button>
              </div>

              {/* inputs */}
              <div style={styles.grid2}>
                {[
                  ["company", "Company Name"],
                  ["position", "Job Title"],
                ].map(([field, placeholder]) => (
                  <input
                    key={field}
                    value={exp[field]}
                    onChange={(e) =>
                      updateExperience(index, field, e.target.value)
                    }
                    placeholder={placeholder}
                    style={styles.input}
                  />
                ))}

                <input
                  type="month"
                  value={exp.start_date}
                  onChange={(e) =>
                    updateExperience(index, "start_date", e.target.value)
                  }
                  style={styles.input}
                />

                <input
                  type="month"
                  disabled={exp.is_current}
                  value={exp.end_date}
                  onChange={(e) =>
                    updateExperience(index, "end_date", e.target.value)
                  }
                  style={{
                    ...styles.input,
                    opacity: exp.is_current ? 0.5 : 1,
                  }}
                />
              </div>

              {/* checkbox */}
              <label style={styles.checkboxRow}>
                <input
                  type="checkbox"
                  checked={exp.is_current}
                  onChange={(e) =>
                    updateExperience(index, "is_current", e.target.checked)
                  }
                />
                I currently work here
              </label>

              {/* description */}
              <div>
                <div style={styles.rowBetween}>
                  <label style={styles.label}>Job Description</label>

                  <button
                    onClick={() => generateJobDescription(index)}
                    disabled={
                      generatingIndex === index ||
                      !exp.position ||
                      !exp.company
                    }
                    style={styles.aiBtn}
                  >
                    {generatingIndex === index ? (
                      <Loader2 size={12} />
                    ) : (
                      <Sparkles size={12} />
                    )}

                    {generatingIndex === index
                      ? "Enhancing..."
                      : "Enhance with AI"}
                  </button>
                </div>

                <textarea
                  rows={4}
                  value={exp.description}
                  onChange={(e) =>
                    updateExperience(index, "description", e.target.value)
                  }
                  placeholder="Describe your responsibilities, achievements, and impact..."
                  style={styles.textarea}
                />
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* ===== INLINE STYLES ===== */
const styles = {
  wrapper: { display: "flex", flexDirection: "column", gap: 24 },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  subText: { fontSize: 13, color: "#9ca3af" },

  addBtn: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "8px 14px",
    fontSize: 13,
    borderRadius: 8,
    background: "linear-gradient(to right, #22d3ee, #2563eb)",
    color: "#000",
    fontWeight: 600,
    border: "none",
    cursor: "pointer",
  },

  emptyBox: {
    textAlign: "center",
    padding: 40,
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 16,
  },

  iconGray: { margin: "0 auto 10px", color: "#6b7280" },

  emptyText: { color: "#d1d5db" },
  emptySub: { fontSize: 12, color: "#6b7280" },

  list: { display: "flex", flexDirection: "column", gap: 20 },

  card: {
    padding: 20,
    borderRadius: 16,
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },

  rowBetween: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: { fontSize: 13, fontWeight: 600, color: "#fff" },

  trashBtn: {
    background: "transparent",
    border: "none",
    color: "#f87171",
    cursor: "pointer",
  },

  grid2: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 12,
  },

  input: {
    padding: "8px 10px",
    fontSize: 13,
    borderRadius: 8,
    background: "rgba(0,0,0,0.2)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "#fff",
    outline: "none",
  },

  checkboxRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: 13,
    color: "#d1d5db",
  },

  label: { fontSize: 13, fontWeight: 500, color: "#e5e7eb" },

  aiBtn: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontSize: 11,
    padding: "4px 10px",
    borderRadius: 999,
    background: "rgba(34,211,238,0.1)",
    border: "1px solid rgba(34,211,238,0.2)",
    color: "#22d3ee",
    cursor: "pointer",
  },

  textarea: {
    width: "100%",
    padding: 10,
    fontSize: 13,
    borderRadius: 8,
    background: "rgba(0,0,0,0.2)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "#fff",
    resize: "none",
    outline: "none",
  },
};

export default Experience;