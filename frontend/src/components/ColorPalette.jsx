import { Check } from "lucide-react";
import React from "react";

const ColorPalette = ({ selectedColor, onChange }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const colors = [
    { name: "Blue", code: "#3b82f6" },
    { name: "Indigo", code: "#6366f1" },
    { name: "Purple", code: "#a855f7" },
    { name: "Pink", code: "#ec4899" },
    { name: "Rose", code: "#f43f5e" },
    { name: "Orange", code: "#f97316" },
    { name: "Amber", code: "#f59e0b" },
    { name: "Green", code: "#10b981" },
    { name: "Emerald", code: "#059669" },
    { name: "Teal", code: "#14b8a6" },
    { name: "Cyan", code: "#06b6d4" },
    { name: "Slate", code: "#64748b" },
  ];

  const styles = {
    wrapper: {
      position: "relative",
    },

    dropdown: {
      position: "absolute",
      top: "100%",
      left: 0,
      marginTop: "8px",
      minWidth: "16rem",
      maxWidth: "90vw",
      padding: "12px",
      zIndex: 50,
      backgroundColor: "white",
      borderRadius: "8px",
      border: "1px solid #e9d5ff",
      boxShadow: "0 4px 12px rgba(168,85,247,0.15)",
      transformOrigin: "top left",
    },

    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: "12px",
    },

    item: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      cursor: "pointer",
    },

    colorCircle: (isSelected) => ({
      position: "relative",
      width: "48px",
      height: "48px",
      borderRadius: "9999px",
      backgroundColor: "gray",
      border: isSelected
        ? "2px solid #a855f7"
        : "1px solid #e5e7eb",
      boxShadow: isSelected ? "0 0 0 2px rgba(168,85,247,0.3)" : "none",
    }),

    label: {
      fontSize: "12px",
      color: "#4b5563",
      marginTop: "4px",
    },

    checkWrap: {
      position: "absolute",
      inset: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  };

  return (
    <div style={styles.wrapper}>
      {isOpen && (
        <div style={styles.dropdown}>
          <div style={styles.grid}>
            {colors.map((color) => {
              const isSelected = selectedColor === color.code;

              return (
                <div
                  key={color.code}
                  style={styles.item}
                  onClick={() => {
                    onChange(color.code);
                    setIsOpen(false);
                  }}
                >
                  <div
                    style={{
                      ...styles.colorCircle(isSelected),
                      backgroundColor: color.code,
                    }}
                  >
                    {isSelected && (
                      <div style={styles.checkWrap}>
                        <Check size={16} color="white" />
                      </div>
                    )}
                  </div>

                  <span style={styles.label}>{color.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorPalette;