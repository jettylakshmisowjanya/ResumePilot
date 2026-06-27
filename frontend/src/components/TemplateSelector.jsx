import { Check, Layout } from "lucide-react";
import React, { useState } from "react";

const TemplateSelector = ({ selectedTemplate, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const template = {
    id: "classic",
    name: "Classic",
    preview:
      "A traditional, recruiter-friendly resume layout with clear sections and professional formatting.",
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>

      {/* Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "8px 16px",
          fontSize: 13,
          fontWeight: 500,
          borderRadius: 12,
          color: "#6b21a8",
          background: "#fff",
          border: "1px solid #e9d5ff",
          boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
          cursor: "pointer",
          transition: "0.2s",
        }}
      >
        <Layout size={16} />

        <span style={{ display: "inline-block" }}>
          Template
        </span>

      </button>

      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            marginTop: 12,
            width: 320,
            maxWidth: "90vw",
            padding: 12,
            zIndex: 50,
            background: "#fff",
            borderRadius: 16,
            border: "1px solid #f3e8ff",
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
          }}
        >

          <div
            onClick={() => {
              onChange(template.id);
              setIsOpen(false);
            }}
            style={{
              cursor: "pointer",
              borderRadius: 12,
              padding: 16,
              border: "1px solid",
              transition: "0.2s",
              background:
                selectedTemplate === template.id ? "#faf5ff" : "#fff",
              borderColor:
                selectedTemplate === template.id ? "#a855f7" : "#e5e7eb",
            }}
          >

            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start"
            }}>

              <div>

                <h3 style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#111827"
                }}>
                  {template.name}
                </h3>

                <p style={{
                  marginTop: 4,
                  fontSize: 11,
                  color: "#6b7280"
                }}>
                  {template.preview}
                </p>

              </div>

              {selectedTemplate === template.id && (
                <div style={{
                  width: 24,
                  height: 24,
                  borderRadius: 999,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#7c3aed"
                }}>
                  <Check size={16} color="white" />
                </div>
              )}

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default TemplateSelector;