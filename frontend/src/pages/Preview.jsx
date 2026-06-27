import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import ResumePreview from '../components/ResumePreview';
import { ArrowLeft } from 'lucide-react';
import notFound from '../assets/not_found.jpg';
import api from '../configs/api';

const Loader = () => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
    }}
  >
    <div
      style={{
        width: "48px",
        height: "48px",
        borderRadius: "9999px",
        border: "2px solid transparent",
        borderBottomColor: "#9333ea",
        animation: "spin 0.75s linear infinite",
      }}
    />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

const Preview = () => {
  const { resumeId } = useParams();

  const [isLoading, setIsLoading] = React.useState(true);
  const [resumeData, setResumeData] = React.useState(null);
  const [backHovered, setBackHovered] = React.useState(false);
  const [homeHovered, setHomeHovered] = React.useState(false);

  const loadResume = async () => {
    try {
      const { data } = await api.get('/api/resumes/public/' + resumeId);
      setResumeData(data.resume);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadResume();
  }, [resumeId]);

  if (isLoading) return <Loader />;

  return resumeData ? (
    <div
      style={{
        minHeight: "100vh",
        background: "#070b17",
        padding: "40px 20px",
      }}
    >
      <div style={{ maxWidth: "896px", margin: "0 auto" }}>

        {/* TOP BAR */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "32px",
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.10)",
            borderRadius: "24px",
            padding: "16px 24px",
          }}
        >
          <Link
            to="/"
            onMouseEnter={() => setBackHovered(true)}
            onMouseLeave={() => setBackHovered(false)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: backHovered ? "#22d3ee" : "#d1d5db",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
          >
            <ArrowLeft size={18} />
            Back
          </Link>

          <h2
            style={{
              fontSize: "20px",
              fontWeight: 600,
              color: "#fff",
              margin: 0,
            }}
          >
            Resume Preview
          </h2>

          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "9999px",
              background: "rgba(34,211,238,0.20)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#22d3ee",
              fontWeight: 700,
            }}
          >
            R
          </div>
        </div>

        {/* RESUME */}
        <div
          style={{
            borderRadius: "24px",
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.10)",
            boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
            background: "#fff",
            padding: "12px",
          }}
        >
          <ResumePreview
            data={resumeData}
            template={resumeData.template}
            accentColor={resumeData.accent_color}
            classes="py-6 bg-white rounded-2xl"
          />
        </div>

      </div>
    </div>
  ) : (
    <div
      style={{
        minHeight: "100vh",
        background: "#070b17",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 20px",
        textAlign: "center",
      }}
    >
      <p
        style={{
          fontSize: "36px",
          fontWeight: 700,
          color: "#f87171",
          marginBottom: "16px",
        }}
      >
        404 - Not Found
      </p>

      <p
        style={{
          color: "#9ca3af",
          maxWidth: "448px",
          marginBottom: "32px",
        }}
      >
        The resume you are looking for does not exist or has been deleted.
      </p>

      <img
        src={notFound}
        alt="not found"
        style={{
          width: "320px",
          height: "320px",
          objectFit: "contain",
          marginBottom: "32px",
          opacity: 0.8,
        }}
      />

      <Link
        to="/"
        onMouseEnter={() => setHomeHovered(true)}
        onMouseLeave={() => setHomeHovered(false)}
        style={{
          padding: "12px 28px",
          borderRadius: "16px",
          background: "linear-gradient(to right, #22d3ee, #2563eb)",
          color: "#000",
          fontWeight: 600,
          textDecoration: "none",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          transition: "transform 0.2s",
          transform: homeHovered ? "scale(1.05)" : "scale(1)",
        }}
      >
        <ArrowLeft size={18} />
        Go Home
      </Link>
    </div>
  );
};

export default Preview;