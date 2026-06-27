import {
  FilePenIcon,
  PlusIcon,
  UploadIcon,
  TrashIcon,
  PencilIcon,
  XIcon,
  UploadCloud,
  LoaderCircleIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import pdfToText from "react-pdftotext";

import api from "../configs/api";
import toast from "react-hot-toast";

const pastelThemes = [
  { from: "#FFE5E5", to: "#FFD1D1" },
  { from: "#E5F3FF", to: "#D1E7FF" },
  { from: "#F0E5FF", to: "#E1D1FF" },
  { from: "#FFF5E5", to: "#FFE8D1" },
  { from: "#E5FFF0", to: "#D1FFE1" },
  { from: "#FFE5F5", to: "#FFD1E8" },
  { from: "#E5F9FF", to: "#D1F0FF" },
  { from: "#FFF0E5", to: "#FFE5D1" },
];

const Dashboard = () => {
  const { user, token } = useSelector((state) => state.auth);

  const [allResumes, setAllResumes] = useState([]);
  const [showCreateResume, setShowCreateResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [title, setTitle] = useState("");
  const [resume, setResume] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [editResumeId, setEditResumeId] = useState(null);


  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredCreateBtn, setHoveredCreateBtn] = useState(false);
  const [hoveredUploadBtn, setHoveredUploadBtn] = useState(false);
  const [hoveredDropzone, setHoveredDropzone] = useState(false);

  const navigate = useNavigate();

  const loadAllResumes = async () => {
    try {
      const { data } = await api.get("/api/users/resumes", {
        headers: { Authorization: token },
      });
      setAllResumes(data.resumes);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    loadAllResumes();
  }, []);

  const createResume = async (e) => {
    try {
      e.preventDefault();
      const { data } = await api.post(
        "/api/resumes/create",
        { title },
        { headers: { Authorization: token } }
      );
      setAllResumes([...allResumes, data.resume]);
      setTitle("");
      setShowCreateResume(false);
      navigate(`/app/builder/${data.resume._id}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const uploadResume = async (e) => {
    e.preventDefault();
    if (!resume) { toast.error("Please select a PDF file"); return; }
    if (resume.type !== "application/pdf") { toast.error("Only PDF files are allowed"); return; }
    setIsLoading(true);
    try {
      const resumeText = await pdfToText(resume);
      if (!resumeText.trim()) { toast.error("Could not read PDF text"); return; }
      const { data } = await api.post(
        "/api/resumes/upload",
        { title, resumeText },
        { headers: { Authorization: token } }
      );
      toast.success("Resume uploaded successfully");
      setTitle(""); setResume(null); setShowUploadResume(false);
      await loadAllResumes();
      navigate(`/app/builder/${data.resume._id}`);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Upload failed");
    } finally {
      setIsLoading(false);
    }
  };

  const editTitle = async (e) => {
    try {
      e.preventDefault();
      const { data } = await api.put(
        "/api/resumes/update",
        { resumeId: editResumeId, resumeData: { title } },
        { headers: { Authorization: token } }
      );
      setAllResumes(
        allResumes.map((r) =>
          r._id === editResumeId ? { ...r, title } : r
        )
      );
      setEditResumeId(null);
      setTitle("");
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const deleteResume = async (resumeId) => {
    if (window.confirm("Are you sure you want to delete this resume?")) {
      try {
        const { data } = await api.delete(`/api/resumes/delete/${resumeId}`, {
          headers: { Authorization: token },
        });
        setAllResumes(allResumes.filter((r) => r._id !== resumeId));
        toast.success(data.message);
      } catch (error) {
        toast.error(error?.response?.data?.message || error.message);
      }
    }
  };


  const modalBox = {
    position: "relative",
    width: "100%",
    maxWidth: "384px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.10)",
    backdropFilter: "blur(40px)",
    WebkitBackdropFilter: "blur(40px)",
    borderRadius: "16px",
    padding: "24px",
  };

  const modalInput = {
    width: "100%",
    padding: "10px 16px",
    borderRadius: "8px",
    background: "rgba(255,255,255,0.10)",
    border: "1px solid rgba(255,255,255,0.10)",
    color: "#fff",
    outline: "none",
    marginBottom: "20px",
    fontSize: "14px",
    boxSizing: "border-box",
  };

  const submitBtnActive = {
    width: "100%",
    height: "44px",
    borderRadius: "9999px",
    fontWeight: 500,
    border: "none",
    cursor: "pointer",
    background: "linear-gradient(to right, #22d3ee, #2563eb)",
    color: "#000",
    fontSize: "14px",
    transition: "transform 0.15s",
  };

  const submitBtnDisabled = {
    width: "100%",
    height: "44px",
    borderRadius: "9999px",
    fontWeight: 500,
    border: "none",
    cursor: "not-allowed",
    background: "rgba(255,255,255,0.10)",
    color: "#6b7280",
    fontSize: "14px",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#070b17",
        position: "relative",
        overflow: "hidden",
        color: "#fff",
        display: "flex",
      }}
    >


      <div
        style={{
          position: "absolute",
          top: "-160px",
          right: "-160px",
          width: "500px",
          height: "500px",
          background: "rgba(6,182,212,0.10)",
          filter: "blur(140px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-160px",
          left: "-160px",
          width: "500px",
          height: "500px",
          background: "rgba(168,85,247,0.10)",
          filter: "blur(140px)",
          pointerEvents: "none",
        }}
      />


      <aside
        style={{
          position: "relative",
          zIndex: 10,
          width: "288px",
          minHeight: "100vh",
          flexShrink: 0,
          borderRight: "1px solid rgba(255,255,255,0.10)",
          background: "rgba(255,255,255,0.03)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          display: "flex",
          flexDirection: "column",
          padding: "32px",
          gap: "40px",
        }}
      >


        <div>
          <p
            style={{
              fontSize: "10px",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              color: "#22d3ee",
              marginBottom: "4px",
              fontWeight: 500,
            }}
          >
            Dashboard
          </p>
          <h1
            style={{
              fontSize: "24px",
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1.3,
              margin: 0,
            }}
          >
            Welcome back!
          </h1>
          <p style={{ color: "#9ca3af", fontSize: "14px", marginTop: "8px" }}>
            Build and manage your professional resumes.
          </p>
        </div>


        <div
          style={{
            height: "1px",
            background:
              "linear-gradient(to right, rgba(255,255,255,0.10), transparent)",
          }}
        />


        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <p
            style={{
              fontSize: "10px",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              color: "#6b7280",
              fontWeight: 500,
            }}
          >
            Quick Actions
          </p>


          <button
            onClick={() => setShowCreateResume(true)}
            onMouseEnter={() => setHoveredCreateBtn(true)}
            onMouseLeave={() => setHoveredCreateBtn(false)}
            style={{
              width: "100%",
              background: "rgba(255,255,255,0.05)",
              border: hoveredCreateBtn
                ? "1px solid #22d3ee"
                : "1px solid rgba(255,255,255,0.10)",
              borderRadius: "12px",
              padding: "20px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
              display: "flex",
              alignItems: "center",
              gap: "16px",
              textAlign: "left",
              cursor: "pointer",
              transition: "border-color 0.2s",
            }}
          >
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "9999px",
                background: "linear-gradient(to right, #ec4899, #9333ea)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transform: hoveredCreateBtn ? "scale(1.05)" : "scale(1)",
                transition: "transform 0.2s",
              }}
            >
              <PlusIcon color="#fff" size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "#fff", margin: 0 }}>
                Create Resume
              </h3>
              <p style={{ fontSize: "12px", color: "#9ca3af", marginTop: "2px" }}>
                Start from scratch
              </p>
            </div>
          </button>


          <button
            onClick={() => setShowUploadResume(true)}
            onMouseEnter={() => setHoveredUploadBtn(true)}
            onMouseLeave={() => setHoveredUploadBtn(false)}
            style={{
              width: "100%",
              background: "rgba(255,255,255,0.05)",
              border: hoveredUploadBtn
                ? "1px solid #22d3ee"
                : "1px solid rgba(255,255,255,0.10)",
              borderRadius: "12px",
              padding: "20px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
              display: "flex",
              alignItems: "center",
              gap: "16px",
              textAlign: "left",
              cursor: "pointer",
              transition: "border-color 0.2s",
            }}
          >
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "9999px",
                background: "linear-gradient(to right, #3b82f6, #0891b2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transform: hoveredUploadBtn ? "scale(1.05)" : "scale(1)",
                transition: "transform 0.2s",
              }}
            >
              <UploadIcon color="#fff" size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "#fff", margin: 0 }}>
                Upload Existing
              </h3>
              <p style={{ fontSize: "12px", color: "#9ca3af", marginTop: "2px" }}>
                Import &amp; customize
              </p>
            </div>
          </button>
        </div>


        <div style={{ flex: 1 }} />


        <div
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.10)",
            borderRadius: "12px",
            padding: "12px 16px",
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: "30px", fontWeight: 700, color: "#22d3ee", margin: 0 }}>
            {allResumes.length}
          </p>
          <p style={{ fontSize: "12px", color: "#9ca3af", marginTop: "4px" }}>
            Resume{allResumes.length !== 1 ? "s" : ""} saved
          </p>
        </div>
      </aside>


      <main
        style={{
          position: "relative",
          zIndex: 10,
          flex: 1,
          padding: "32px",
          overflowY: "auto",
        }}
      >


        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "32px",
          }}
        >
          <div>
            <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#fff", margin: 0 }}>
              My Resumes
            </h2>
            <p style={{ color: "#9ca3af", fontSize: "14px", marginTop: "4px" }}>
              Click any resume to open the builder
            </p>
          </div>
        </div>

        

        <div
          style={{
            height: "1px",
            background:
              "linear-gradient(to right, transparent, rgba(255,255,255,0.10), transparent)",
            marginBottom: "32px",
          }}
        />



        {allResumes.length === 0 ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "256px",
              textAlign: "center",
            }}
          >
            <FilePenIcon size={48} style={{ color: "rgba(255,255,255,0.20)", marginBottom: "16px" }} />
            <p style={{ color: "#9ca3af", fontSize: "16px" }}>No resumes yet.</p>
            <p style={{ color: "#6b7280", fontSize: "14px", marginTop: "4px" }}>
              Use the sidebar to create or upload one.
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: "20px",
            }}
          >
            {allResumes.map((resumeItem, index) => {
              const theme = pastelThemes[index % pastelThemes.length];
              const isHovered = hoveredCard === index;
              return (
                <div
                  key={index}
                  onClick={() => navigate(`/app/builder/${resumeItem._id}`)}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    backdropFilter: "blur(24px)",
                    WebkitBackdropFilter: "blur(24px)",
                    border: isHovered
                      ? "1px solid #22d3ee"
                      : "1px solid rgba(255,255,255,0.10)",
                    borderRadius: "16px",
                    overflow: "hidden",
                    cursor: "pointer",
                    boxShadow: "0 10px 15px rgba(0,0,0,0.3)",
                    transition: "border-color 0.2s",
                  }}
                >


                  <div
                    style={{
                      height: "112px",
                      background: `linear-gradient(to bottom right, ${theme.from}, ${theme.to})`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FilePenIcon size={40} style={{ color: "rgba(255,255,255,0.30)" }} />
                  </div>


                  <div style={{ padding: "16px" }}>
                    <h3
                      style={{
                        fontSize: "16px",
                        fontWeight: 600,
                        color: "#fff",
                        marginBottom: "6px",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {resumeItem.title}
                    </h3>
                    <p style={{ fontSize: "12px", color: "#9ca3af", marginBottom: "14px" }}>
                      Updated {new Date(resumeItem.updatedAt).toLocaleDateString()}
                    </p>

                    <div
                      onClick={(e) => e.stopPropagation()}
                      style={{ display: "flex", gap: "8px" }}
                    >
                      <button
                        onClick={() => {
                          setEditResumeId(resumeItem._id);
                          setTitle(resumeItem.title);
                        }}
                        style={{
                          flex: 1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "6px",
                          background: "linear-gradient(to right, #22d3ee, #2563eb)",
                          color: "#000",
                          padding: "8px 0",
                          borderRadius: "8px",
                          border: "none",
                          cursor: "pointer",
                          fontSize: "14px",
                          fontWeight: 600,
                          transition: "transform 0.15s",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                      >
                        <PencilIcon size={15} />
                        Edit
                      </button>
                      <button
                        onClick={() => deleteResume(resumeItem._id)}
                        style={{
                          padding: "8px 12px",
                          background: "rgba(239,68,68,0.10)",
                          color: "#f87171",
                          borderRadius: "8px",
                          border: "none",
                          cursor: "pointer",
                          transition: "background 0.2s",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background = "rgba(239,68,68,0.20)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background = "rgba(239,68,68,0.10)")
                        }
                      >
                        <TrashIcon size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* ===== MODALS ===== */}

      {/* CREATE MODAL */}
      {showCreateResume && (
        <form
          onSubmit={createResume}
          onClick={() => setShowCreateResume(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.70)",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
          }}
        >
          <div onClick={(e) => e.stopPropagation()} style={modalBox}>
            <XIcon
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                color: "#9ca3af",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#9ca3af")}
              onClick={() => setShowCreateResume(false)}
            />
            <h2 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "24px", color: "#fff" }}>
              Create a new resume
            </h2>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Resume title"
              style={modalInput}
              required
            />
            <button
              type="submit"
              disabled={!title.trim()}
              style={title.trim() ? submitBtnActive : submitBtnDisabled}
            >
              Create Resume
            </button>
          </div>
        </form>
      )}

      {/* UPLOAD MODAL */}
      {showUploadResume && (
        <form
          onSubmit={uploadResume}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.70)",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
          }}
        >
          <div onClick={(e) => e.stopPropagation()} style={modalBox}>
            <XIcon
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                color: "#9ca3af",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#9ca3af")}
              onClick={() => {
                setShowUploadResume(false);
                setResume(null);
                setTitle("");
              }}
            />
            <h2 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "16px", color: "#fff" }}>
              Upload Resume
            </h2>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Resume title"
              style={modalInput}
              required
            />

            <label htmlFor="resume-upload" style={{ cursor: "pointer", display: "block" }}>
              <div
                onMouseEnter={() => setHoveredDropzone(true)}
                onMouseLeave={() => setHoveredDropzone(false)}
                style={{
                  border: hoveredDropzone
                    ? "2px dashed #22d3ee"
                    : "2px dashed rgba(255,255,255,0.20)",
                  borderRadius: "8px",
                  padding: "24px",
                  textAlign: "center",
                  transition: "border-color 0.2s",
                }}
              >
                {resume ? (
                  <p style={{ color: "#22d3ee", fontWeight: 500 }}>{resume.name}</p>
                ) : (
                  <>
                    <UploadCloud
                      size={42}
                      style={{ display: "block", margin: "0 auto 8px", color: "#9ca3af" }}
                    />
                    <p style={{ color: "#d1d5db", fontWeight: 500 }}>Upload Resume</p>
                    <p style={{ color: "#6b7280", fontSize: "14px" }}>PDF Only</p>
                  </>
                )}
              </div>
            </label>

            <input
              id="resume-upload"
              type="file"
              accept="application/pdf"
              style={{ display: "none" }}
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) setResume(file);
              }}
            />

            <button
              type="submit"
              disabled={!title.trim() || !resume || isLoading}
              style={{
                ...(title.trim() && resume && !isLoading ? submitBtnActive : submitBtnDisabled),
                marginTop: "20px",
              }}
            >
              {isLoading ? "Uploading..." : "Upload Resume"}
            </button>
          </div>
        </form>
      )}


      {editResumeId && (
        <form
          onSubmit={editTitle}
          onClick={() => {
            setEditResumeId(null);
            setTitle("");
          }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 30,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.70)",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
          }}
        >
          <div onClick={(e) => e.stopPropagation()} style={modalBox}>
            <XIcon
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                color: "#9ca3af",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#9ca3af")}
              onClick={() => {
                setEditResumeId(null);
                setTitle("");
              }}
            />
            <h2 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "8px", color: "#fff" }}>
              Edit Resume Title
            </h2>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={modalInput}
              required
            />
            <button
              type="submit"
              disabled={!title.trim()}
              style={title.trim() ? submitBtnActive : submitBtnDisabled}
            >
              Update Title
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Dashboard;