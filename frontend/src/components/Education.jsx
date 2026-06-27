import { Plus, GraduationCap, Trash2 } from "lucide-react";
import React from "react";

const Education = ({ data, onChange }) => {

  const addEducation = () => {
    const newEducation = {
      institution: "",
      degree: "",
      field: "",
      graduation_date: "",
      score: "",
      score_type: "percentage",
    };

    onChange([...data, newEducation]);
  };

  const removeEducation = (index) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const updateEducation = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <p style={{ fontSize: "13px", color: "#9ca3af" }}>
          Add your educational background
        </p>

        <button
          type="button"
          onClick={addEducation}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 16px",
            fontSize: "13px",
            borderRadius: "8px",
            background: "linear-gradient(to right, #22d3ee, #2563eb)",
            color: "#000",
            fontWeight: "600",
            border: "none",
            cursor: "pointer",
            transition: "transform 0.2s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <Plus size={16} />
          Add Education
        </button>
      </div>

      {/* Empty State */}
      {data.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "40px 0",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "12px",
            backdropFilter: "blur(10px)",
          }}
        >
          <GraduationCap
            size={48}
            style={{ margin: "0 auto 12px", color: "#6b7280" }}
          />
          <p style={{ color: "#d1d5db" }}>No education added yet</p>
          <p style={{ fontSize: "12px", color: "#6b7280", marginTop: "4px" }}>
            Add your educational qualifications
          </p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

          {data.map((edu, index) => (
            <div
              key={index}
              style={{
                padding: "20px",
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "16px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >

              {/* Top row */}
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h4 style={{ fontSize: "13px", fontWeight: "500", color: "#fff" }}>
                  Education #{index + 1}
                </h4>

                <button
                  type="button"
                  onClick={() => removeEducation(index)}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "#f87171",
                    cursor: "pointer",
                  }}
                >
                  <Trash2 size={16} />
                </button>
              </div>

              {/* Inputs row 1 */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>

                <input
                  value={edu.institution}
                  onChange={(e) =>
                    updateEducation(index, "institution", e.target.value)
                  }
                  placeholder="Institution / School Name"
                  style={inputStyle}
                />

                <input
                  value={edu.degree}
                  onChange={(e) =>
                    updateEducation(index, "degree", e.target.value)
                  }
                  placeholder="Degree / Board"
                  style={inputStyle}
                />
              </div>

              {/* Inputs row 2 */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>

                <input
                  value={edu.field}
                  onChange={(e) =>
                    updateEducation(index, "field", e.target.value)
                  }
                  placeholder="Field of Study"
                  style={inputStyle}
                />

                <input
                  type="month"
                  value={edu.graduation_date}
                  onChange={(e) =>
                    updateEducation(index, "graduation_date", e.target.value)
                  }
                  style={inputStyle}
                />
              </div>

              {/* Score row */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>

                <select
                  value={edu.score_type}
                  onChange={(e) =>
                    updateEducation(index, "score_type", e.target.value)
                  }
                  style={inputStyle}
                >
                  <option value="percentage">Percentage (%)</option>
                  <option value="cgpa">CGPA</option>
                </select>

                <input
                  value={edu.score}
                  onChange={(e) =>
                    updateEducation(index, "score", e.target.value)
                  }
                  placeholder={
                    edu.score_type === "cgpa"
                      ? "CGPA (optional)"
                      : "Percentage (optional)"
                  }
                  style={inputStyle}
                />

              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* reusable input style */
const inputStyle = {
  padding: "8px 12px",
  fontSize: "13px",
  borderRadius: "8px",
  background: "rgba(0,0,0,0.2)",
  border: "1px solid rgba(255,255,255,0.1)",
  color: "#fff",
  outline: "none",
};

export default Education;