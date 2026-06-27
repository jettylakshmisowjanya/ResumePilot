import React, { useState, useEffect } from "react";
import { dummyResumeData } from "../assets/assets";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeftIcon,
  Briefcase,
  ChevronLeft,
  FileText,
  FolderIcon,
  GraduationCap,
  Sparkles,
  User,
  ChevronRight,
  Share2Icon,
  EyeIcon,
  EyeOffIcon,
  DownloadIcon,
} from "lucide-react";

import PersonalInfoForm from "../components/PersonalInfoForm";
import ResumePreview from "../components/ResumePreview";
import TemplateSelector from "../components/TemplateSelector";
import ColorPalette from "../components/ColorPalette";
import ProfessionalSummary from "../components/ProfessionalSummary";
import Experience from "../components/Experience";
import Education from "../components/Education";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import Languages from "../components/Languages";
import { useSelector } from "react-redux";
import api from "../configs/api";
import { toast } from "react-hot-toast";

const ResumeBuilder = () => {
  const { resumeId } = useParams();
  const { token } = useSelector((state) => state.auth);

  const [resumeData, setResumeData] = useState({
    _id: "",
    title: "",
    personal_info: {},
    professional_summary: "",
    experience: [],
    education: [],
    project: [],
    skills: [],
    languages: [],
    template: "classic",
    accent_color: "#3b82f6",
    public: false,
  });

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [removeBackground, setRemoveBackground] = useState(false);

  // hover states
  const [backHovered, setBackHovered] = useState(false);
  const [saveHovered, setSaveHovered] = useState(false);
  const [shareHovered, setShareHovered] = useState(false);
  const [visibilityHovered, setVisibilityHovered] = useState(false);
  const [prevBtnHovered, setPrevBtnHovered] = useState(false);

  const sections = [
    { id: "personal",    name: "Personal Info",            icon: User },
    { id: "summary",     name: "Professional Summary",     icon: FileText },
    { id: "experience",  name: "Professional Experience",  icon: Briefcase },
    { id: "education",   name: "Education",                icon: GraduationCap },
    { id: "project",     name: "Projects",                 icon: FolderIcon },
    { id: "skills",      name: "Skills",                   icon: Sparkles },
    { id: "languages",   name: "Languages",                icon: Sparkles },
  ];

  const activeSection = sections[activeSectionIndex];

  const loadExistingResume = async () => {
    try {
      const { data } = await api.get(`api/resumes/get/` + resumeId, {
        headers: { Authorization: token },
      });
      if (data.resume) {
        setResumeData(data.resume);
        document.title = data.resume.title;
        localStorage.setItem(`resume_${resumeId}`, JSON.stringify(data.resume));
      }
    } catch (error) {
      console.log(error.message);
      const savedResume = localStorage.getItem(`resume_${resumeId}`);
      if (savedResume) setResumeData(JSON.parse(savedResume));
    }
  };

  useEffect(() => {
    if (resumeId && token) loadExistingResume();
  }, [resumeId, token]);

  useEffect(() => {
    if (resumeData._id && resumeId) {
      localStorage.setItem(`resume_${resumeId}`, JSON.stringify(resumeData));
    }
  }, [resumeData, resumeId]);

  const changeResumeVisibility = async () => {
    try {
      const formData = new FormData();
      formData.append("resumeId", resumeId);
      formData.append("resumeData", JSON.stringify({ public: !resumeData.public }));
      const { data } = await api.put(`api/resumes/update`, formData, {
        headers: { Authorization: token },
      });
      setResumeData({ ...resumeData, public: !resumeData.public });
      toast.success(data.message);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleShare = () => {
    const resumeUrl = `${window.location.origin}/view/${resumeId}`;
    if (navigator.share) {
      navigator.share({ url: resumeUrl, text: "Check out my resume!" });
    } else {
      navigator.clipboard.writeText(resumeUrl)
        .then(() => toast.success("Link copied to clipboard!"))
        .catch(() => alert(`Share this link: ${resumeUrl}`));
    }
  };

  const downloadResume = () => window.print();

  const saveResume = async () => {
    try {
      let updatedResumeData = structuredClone(resumeData);
      if (typeof resumeData.personal_info.image === "object") {
        delete updatedResumeData.personal_info.image;
      }
      const formData = new FormData();
      formData.append("resumeId", resumeId);
      formData.append("resumeData", JSON.stringify(updatedResumeData));
      removeBackground && formData.append("removeBackground", "yes");
      typeof resumeData.personal_info.image === "object" &&
        formData.append("image", resumeData.personal_info.image);
      const { data } = await api.put(`api/resumes/update`, formData, {
        headers: { Authorization: token },
      });
      setResumeData(data.resume);
      localStorage.setItem(`resume_${resumeId}`, JSON.stringify(data.resume));
    } catch (error) {
      console.error(error.message);
    }
  };

  // progress bar width
  const progressWidth = `${(activeSectionIndex * 100) / (sections.length - 1)}%`;

  // shared ghost button style
  const ghostBtn = (hovered) => ({
    padding: "8px 16px",
    borderRadius: "12px",
    background: hovered ? "rgba(255,255,255,0.20)" : "rgba(255,255,255,0.10)",
    border: "1px solid rgba(255,255,255,0.10)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "background 0.2s",
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#070b17",
        color: "#fff",
        padding: "24px 16px",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

        {/* Back link */}
        <Link
          to="/app"
          onMouseEnter={() => setBackHovered(true)}
          onMouseLeave={() => setBackHovered(false)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            color: backHovered ? "#22d3ee" : "#9ca3af",
            textDecoration: "none",
            marginBottom: "24px",
            transition: "color 0.2s",
            fontSize: "14px",
          }}
        >
          <ArrowLeftIcon size={16} />
          Back to Dashboard
        </Link>

        {/* Two-column grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "5fr 7fr",
            gap: "32px",
          }}
        >
          {/* ── LEFT ── */}
          <div>
            <div
              style={{
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                border: "1px solid rgba(255,255,255,0.10)",
                borderRadius: "24px",
                padding: "24px",
                boxShadow: "0 20px 25px rgba(0,0,0,0.4)",
                position: "relative",
              }}
            >
              {/* Progress bar */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  height: "4px",
                  borderRadius: "24px 24px 0 0",
                  background: "linear-gradient(to right, #22d3ee, #2563eb)",
                  width: progressWidth,
                  transition: "width 0.3s",
                }}
              />

              {/* Section header */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottom: "1px solid rgba(255,255,255,0.10)",
                  paddingBottom: "20px",
                  marginBottom: "24px",
                }}
              >
                <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                  <activeSection.icon color="#22d3ee" size={20} />
                  <h2 style={{ fontSize: "20px", fontWeight: 600, margin: 0 }}>
                    {activeSection.name}
                  </h2>
                </div>

                {/* Prev / Next buttons */}
                <div style={{ display: "flex", gap: "8px" }}>
                  {activeSectionIndex !== 0 && (
                    <button
                      onClick={() => setActiveSectionIndex((prev) => Math.max(prev - 1, 0))}
                      onMouseEnter={() => setPrevBtnHovered(true)}
                      onMouseLeave={() => setPrevBtnHovered(false)}
                      style={{
                        padding: "8px 12px",
                        borderRadius: "12px",
                        background: prevBtnHovered
                          ? "rgba(255,255,255,0.20)"
                          : "rgba(255,255,255,0.10)",
                        border: "none",
                        color: "#fff",
                        cursor: "pointer",
                        transition: "background 0.2s",
                      }}
                    >
                      <ChevronLeft size={16} />
                    </button>
                  )}

                  <button
                    onClick={() =>
                      setActiveSectionIndex((prev) => Math.min(prev + 1, sections.length - 1))
                    }
                    disabled={activeSectionIndex === sections.length - 1}
                    style={{
                      padding: "8px 12px",
                      borderRadius: "12px",
                      background: "#22d3ee",
                      color: "#000",
                      border: "none",
                      cursor: activeSectionIndex === sections.length - 1 ? "not-allowed" : "pointer",
                      opacity: activeSectionIndex === sections.length - 1 ? 0.4 : 1,
                    }}
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              {/* Section forms */}
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {activeSection.id === "personal" && (
                  <PersonalInfoForm
                    data={resumeData.personal_info}
                    onChange={(data) => setResumeData((prev) => ({ ...prev, personal_info: data }))}
                    removeBackground={removeBackground}
                    setRemoveBackground={setRemoveBackground}
                  />
                )}
                {activeSection.id === "summary" && (
                  <ProfessionalSummary
                    data={resumeData.professional_summary}
                    onChange={(data) => setResumeData((prev) => ({ ...prev, professional_summary: data }))}
                    setResumeData={setResumeData}
                  />
                )}
                {activeSection.id === "experience" && (
                  <Experience
                    data={resumeData.experience}
                    onChange={(data) => setResumeData((prev) => ({ ...prev, experience: data }))}
                  />
                )}
                {activeSection.id === "education" && (
                  <Education
                    data={resumeData.education}
                    onChange={(data) => setResumeData((prev) => ({ ...prev, education: data }))}
                  />
                )}
                {activeSection.id === "project" && (
                  <Projects
                    data={resumeData.project}
                    onChange={(data) => setResumeData((prev) => ({ ...prev, project: data }))}
                  />
                )}
                {activeSection.id === "skills" && (
                  <Skills
                    data={resumeData.skills}
                    onChange={(data) => setResumeData((prev) => ({ ...prev, skills: data }))}
                  />
                )}
                {activeSection.id === "languages" && (
                  <Languages
                    data={resumeData.languages}
                    onChange={(data) => setResumeData((prev) => ({ ...prev, languages: data }))}
                  />
                )}
              </div>

              {/* Save button */}
              <button
                onClick={() =>
                  toast.promise(saveResume(), {
                    loading: "Saving...",
                    success: "Saved successfully!",
                    error: "Failed",
                  })
                }
                onMouseEnter={() => setSaveHovered(true)}
                onMouseLeave={() => setSaveHovered(false)}
                style={{
                  marginTop: "24px",
                  padding: "12px 24px",
                  borderRadius: "16px",
                  background: "linear-gradient(to right, #22d3ee, #2563eb)",
                  color: "#000",
                  fontWeight: 600,
                  border: "none",
                  cursor: "pointer",
                  transform: saveHovered ? "scale(1.05)" : "scale(1)",
                  transition: "transform 0.2s",
                }}
              >
                Save Changes
              </button>
            </div>
          </div>

          {/* ── RIGHT ── */}
          <div>
            {/* Top action bar */}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "12px",
                marginBottom: "20px",
              }}
            >
              {resumeData.public && (
                <button
                  onClick={handleShare}
                  onMouseEnter={() => setShareHovered(true)}
                  onMouseLeave={() => setShareHovered(false)}
                  style={ghostBtn(shareHovered)}
                >
                  <Share2Icon size={16} />
                  Share
                </button>
              )}

              <button
                onClick={changeResumeVisibility}
                onMouseEnter={() => setVisibilityHovered(true)}
                onMouseLeave={() => setVisibilityHovered(false)}
                style={ghostBtn(visibilityHovered)}
              >
                {resumeData.public ? <EyeIcon size={16} /> : <EyeOffIcon size={16} />}
                {resumeData.public ? "Public" : "Private"}
              </button>

              <button
                onClick={downloadResume}
                style={{
                  padding: "8px 20px",
                  borderRadius: "12px",
                  background: "linear-gradient(to right, #22d3ee, #2563eb)",
                  color: "#000",
                  fontWeight: 600,
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "14px",
                }}
              >
                <DownloadIcon size={16} />
                Download
              </button>
            </div>

            {/* Resume preview */}
            <div
              style={{
                background: "#fff",
                borderRadius: "24px",
                padding: "16px",
                boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
              }}
            >
              <ResumePreview
                data={resumeData}
                template={resumeData.template}
                accentColor={resumeData.accent_color}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;