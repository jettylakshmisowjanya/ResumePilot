import React from "react";
import ClassicTemplate from "../assets/templates/ClassicTemplate.jsx";

const ResumePreview = ({
  data,
  template,
  accentColor,
  classes = ""
}) => {

  const renderTemplate = () => {
    switch (template) {
      case "classic":
      default:
        return (
          <ClassicTemplate
            data={{
              ...data,
              resumeText: undefined
            }}
            accentColor={accentColor}
          />
        );
    }
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #f1f5f9, #faf5ff, #fce7f3)",
        padding: 16
      }}
    >

      {/* Preview Wrapper */}
      <div
        style={{
          maxWidth: 896, // ~ max-w-4xl
          margin: "0 auto",
          background: "#fff",
          borderRadius: 16,
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
          border: "1px solid #e2e8f0",
          overflow: "hidden",
          transition: "0.3s"
        }}
      >

        <div
          id="resume-preview"
          style={{
            background: "#fff"
          }}
          className={classes}
        >
          {renderTemplate()}
        </div>

      </div>

      {/* PRINT STYLES (cannot be fully inline, must stay CSS) */}
      <style>{`
        @page {
          size: A4;
          margin: 0;
        }

        @media print {

          html, body {
            width: 210mm;
            height: 297mm;
            overflow: hidden;
          }

          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          body * {
            visibility: hidden;
          }

          #resume-preview,
          #resume-preview * {
            visibility: visible;
          }

          #resume-preview {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: auto;
            margin: 0;
            padding: 0;
            background: white;
            box-shadow: none !important;
            border: none !important;
          }
        }
      `}</style>

    </div>
  );
};

export default ResumePreview;