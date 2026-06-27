import React from "react";

const Loader = () => {
  const styles = {
    wrapper: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(to bottom right, #faf5ff, #fdf2f8, #ffffff)",
    },

    container: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },

    glow: {
      position: "absolute",
      width: "96px",
      height: "96px",
      borderRadius: "50%",
      backgroundColor: "rgba(168, 85, 247, 0.3)",
      filter: "blur(20px)",
      animation: "pulse 1.5s infinite",
    },

    spinner: {
      width: "56px",
      height: "56px",
      borderRadius: "50%",
      border: "4px solid #e9d5ff",
      borderTop: "4px solid #db2777",
      animation: "spin 1s linear infinite",
      boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
    },

    dot: {
      position: "absolute",
      width: "12px",
      height: "12px",
      borderRadius: "50%",
      background: "linear-gradient(to right, #ec4899, #a855f7)",
    },
  };

  return (
    <>
      {/* animations */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          @keyframes pulse {
            0%, 100% { opacity: 0.6; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.1); }
          }
        `}
      </style>

      <div style={styles.wrapper}>
        <div style={styles.container}>
          <div style={styles.glow}></div>
          <div style={styles.spinner}></div>
          <div style={styles.dot}></div>
        </div>
      </div>
    </>
  );
};

export default Loader;