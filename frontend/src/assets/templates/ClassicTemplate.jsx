import { Mail, Phone, MapPin, Linkedin, Globe, Github } from "lucide-react";

const ClassicTemplate = ({ data, accentColor }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  const styles = {
    container: {
      maxWidth: "900px",
      margin: "0 auto",
      padding: "32px",
      backgroundColor: "#fff",
      color: "#333",
      lineHeight: "1.6",
    },

    header: {
      textAlign: "center",
      marginBottom: "24px",
      paddingBottom: "16px",
      borderBottom: `2px solid ${accentColor}`,
    },

    name: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "8px",
      color: accentColor,
    },

    contactRow: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: "12px",
      fontSize: "12px",
      color: "#666",
    },

    section: {
      marginBottom: "20px",
    },

    sectionTitle: {
      fontSize: "18px",
      fontWeight: "600",
      marginBottom: "12px",
      color: accentColor,
    },

    paragraph: {
      fontSize: "14px",
      color: "#444",
      lineHeight: "1.6",
    },

    expBox: {
      paddingLeft: "12px",
      borderLeft: `2px solid ${accentColor}`,
      marginBottom: "16px",
    },

    flexRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: "6px",
    },

    smallText: {
      fontSize: "12px",
      color: "#666",
    },

    projectBox: {
      paddingLeft: "12px",
      borderLeft: "2px solid #ddd",
      marginBottom: "12px",
    },

    skillWrap: {
      display: "flex",
      flexWrap: "wrap",
      gap: "8px",
    },
  };

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <header style={styles.header}>
        <h1 style={styles.name}>
          {data.personal_info?.full_name || "Your Name"}
        </h1>

        <div style={styles.contactRow}>
          {data.personal_info?.email && (
            <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
              <Mail size={14} />
              <span>{data.personal_info.email}</span>
            </div>
          )}

          {data.personal_info?.phone && (
            <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
              <Phone size={14} />
              <span>{data.personal_info.phone}</span>
            </div>
          )}

          {data.personal_info?.location && (
            <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
              <MapPin size={14} />
              <span>{data.personal_info.location}</span>
            </div>
          )}

          {data.personal_info?.linkedin && (
            <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
              <Linkedin size={14} />
              <span>{data.personal_info.linkedin}</span>
            </div>
          )}

          {data.personal_info?.website && (
            <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
              <Globe size={14} />
              <span>{data.personal_info.website}</span>
            </div>
          )}

          {data.personal_info?.github && (
            <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
              <Github size={14} />
              <span>{data.personal_info.github}</span>
            </div>
          )}
        </div>
      </header>

      {/* SUMMARY */}
      {data.professional_summary && (
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>PROFESSIONAL SUMMARY</h2>
          <p style={styles.paragraph}>{data.professional_summary}</p>
        </section>
      )}

      {/* EXPERIENCE */}
      {data.experience?.length > 0 && (
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>PROFESSIONAL EXPERIENCE</h2>

          {data.experience.map((exp, i) => (
            <div key={i} style={styles.expBox}>
              <div style={styles.flexRow}>
                <div>
                  <h3 style={{ fontWeight: "600", fontSize: "14px" }}>
                    {exp.position}
                  </h3>
                  <p style={styles.smallText}>{exp.company}</p>
                </div>

                <div style={styles.smallText}>
                  {formatDate(exp.start_date)} -{" "}
                  {exp.is_current ? "Present" : formatDate(exp.end_date)}
                </div>
              </div>

              {exp.description && (
                <p style={styles.smallText}>{exp.description}</p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* PROJECTS */}
      {data.project?.length > 0 && (
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>PROJECTS</h2>

          {data.project.map((proj, i) => (
            <div key={i} style={styles.projectBox}>
              <p style={{ fontWeight: "600", fontSize: "14px" }}>
                {proj.name}
              </p>

              {proj.link && (
                <a
                  href={proj.link}
                  target="_blank"
                  rel="noreferrer"
                  style={{ fontSize: "12px", color: "blue" }}
                >
                  {proj.link}
                </a>
              )}

              <p style={styles.smallText}>{proj.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* EDUCATION */}
      {data.education?.length > 0 && (
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>EDUCATION</h2>

          {data.education.map((edu, i) => (
            <div key={i} style={{ marginBottom: "12px" }}>
              <div style={styles.flexRow}>
                <div>
                  <h3 style={{ fontWeight: "600", fontSize: "14px" }}>
                    {edu.degree}
                    {edu.field && ` in ${edu.field}`}
                  </h3>
                  <p style={styles.smallText}>{edu.institution}</p>
                </div>

                <div style={styles.smallText}>
                  {formatDate(edu.graduation_date)}
                </div>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* SKILLS */}
      {data.skills?.length > 0 && (
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>CORE SKILLS</h2>

          <div style={styles.skillWrap}>
            {data.skills.map((skill, i) => (
              <span key={i} style={styles.smallText}>
                • {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* LANGUAGES */}
      {data.languages?.length > 0 && (
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>LANGUAGES</h2>

          <div style={styles.skillWrap}>
            {data.languages.map((lang, i) => (
              <span key={i} style={styles.smallText}>
                • {lang.name} ({lang.proficiency})
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ClassicTemplate;