import { Plus, Languages as LanguagesIcon, XIcon } from "lucide-react";
import React from "react";

const Languages = ({ data = [], onChange }) => {
  const [newLanguage, setNewLanguage] = React.useState({
    name: "",
    proficiency: "Fluent",
  });

  const proficiencyOptions = [
    "Native",
    "Fluent",
    "Professional",
    "Conversational",
    "Basic",
  ];

  const addLanguage = () => {
    const name = newLanguage.name.trim();

    if (name) {
      onChange([
        ...data,
        { name, proficiency: newLanguage.proficiency },
      ]);

      setNewLanguage({ name: "", proficiency: "Fluent" });
    }
  };

  const removeLanguage = (index) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addLanguage();
    }
  };

  return (
    <div style={styles.wrapper}>

      {/* info */}
      <p style={styles.info}>
        Add languages you can speak and your proficiency level.
      </p>

      {/* input card */}
      <div style={styles.card}>

        <input
          type="text"
          placeholder="Language (e.g. English, Spanish)"
          value={newLanguage.name}
          onChange={(e) =>
            setNewLanguage({ ...newLanguage, name: e.target.value })
          }
          onKeyDown={handleKeyDown}
          style={styles.input}
        />

        <select
          value={newLanguage.proficiency}
          onChange={(e) =>
            setNewLanguage({ ...newLanguage, proficiency: e.target.value })
          }
          style={styles.input}
        >
          {proficiencyOptions.map((opt) => (
            <option key={opt} value={opt} style={{ background: "#070b17" }}>
              {opt}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={addLanguage}
          disabled={!newLanguage.name.trim()}
          style={{
            ...styles.btn,
            opacity: !newLanguage.name.trim() ? 0.5 : 1,
          }}
        >
          <Plus size={16} />
          Add Language
        </button>

      </div>

      {/* list */}
      {data.length > 0 ? (
        <div style={styles.list}>
          {data.map((lang, index) => (
            <div key={index} style={styles.item}>

              <div style={styles.left}>
                <div style={styles.iconBox}>
                  <LanguagesIcon size={18} color="#000" />
                </div>

                <div>
                  <p style={styles.name}>{lang.name}</p>
                  <p style={styles.sub}>{lang.proficiency}</p>
                </div>
              </div>

              <button
                onClick={() => removeLanguage(index)}
                style={styles.removeBtn}
              >
                <XIcon size={16} />
              </button>

            </div>
          ))}
        </div>
      ) : (
        <div style={styles.empty}>
          <LanguagesIcon size={48} color="rgba(34,211,238,0.6)" />
          <p style={styles.emptyTitle}>No languages added yet</p>
          <p style={styles.emptySub}>
            Add languages to showcase your communication skills
          </p>
        </div>
      )}

    </div>
  );
};

/* ===== INLINE STYLES ===== */
const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    color: "#fff",
  },

  info: {
    fontSize: "13px",
    color: "rgba(255,255,255,0.6)",
  },

  card: {
    padding: "20px",
    borderRadius: "16px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    backdropFilter: "blur(10px)",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  input: {
    width: "100%",
    padding: "12px 14px",
    fontSize: "13px",
    borderRadius: "12px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "#fff",
    outline: "none",
  },

  btn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
    padding: "12px",
    borderRadius: "12px",
    fontSize: "13px",
    fontWeight: 600,
    background: "linear-gradient(to right, #22d3ee, #9333ea)",
    color: "#000",
    border: "none",
    cursor: "pointer",
  },

  list: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  item: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 16px",
    borderRadius: "12px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    backdropFilter: "blur(10px)",
  },

  left: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  iconBox: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    background: "linear-gradient(to bottom right, #22d3ee, #9333ea)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  name: {
    fontSize: "13px",
    fontWeight: 600,
    color: "#fff",
  },

  sub: {
    fontSize: "11px",
    color: "#22d3ee",
  },

  removeBtn: {
    padding: "6px",
    borderRadius: "50%",
    background: "transparent",
    border: "none",
    color: "#f87171",
    cursor: "pointer",
  },

  empty: {
    textAlign: "center",
    padding: "40px",
    borderRadius: "16px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    backdropFilter: "blur(10px)",
  },

  emptyTitle: {
    fontSize: "13px",
    fontWeight: 600,
    marginTop: "10px",
  },

  emptySub: {
    fontSize: "12px",
    color: "rgba(255,255,255,0.6)",
    marginTop: "6px",
  },
};

export default Languages;