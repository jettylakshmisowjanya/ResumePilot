import { Plus, Trash2, Folder, Link as LinkIcon, ExternalLink } from "lucide-react";
import React from "react";

const Projects = ({ data, onChange }) => {
  const addProject = () => {
    const newProject = {
      name: "",
      description: "",
      link: "",
    };

    onChange([...data, newProject]);
  };

  const removeProject = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateProject = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

return (
  <div className="space-y-6 text-white">

    {/* HEADER */}
    <div className="flex items-center justify-between">

      <div>
        <h3 className="text-base font-semibold text-white">
          Projects
        </h3>

        <p className="text-sm text-white/60 mt-1">
          Showcase your best work and achievements
        </p>
      </div>

      <button
        type="button"
        onClick={addProject}
        className="
          flex items-center gap-2
          px-4 py-2
          text-sm font-medium

          rounded-xl
          bg-gradient-to-r from-cyan-400 to-purple-600
          text-black

          shadow-md
          hover:shadow-lg
          hover:scale-[1.02]
          transition
        "
      >
        <Plus className="size-4" />
        Add Project
      </button>

    </div>

    {/* EMPTY STATE */}
    {data.length === 0 ? (
      <div className="
        flex flex-col items-center justify-center
        py-12
        rounded-xl

        bg-white/5
        backdrop-blur-xl
        border border-white/10

        text-center
      ">

        <Folder className="w-14 h-14 text-cyan-400/60 mb-3" />

        <p className="font-medium text-white">
          No projects added yet
        </p>

        <p className="text-sm text-white/60 mt-1">
          Add your projects to make your resume stronger
        </p>

      </div>
    ) : (

      <div className="space-y-5">

        {data.map((project, index) => (

          <div
            key={index}
            className="
              p-5
              rounded-2xl

              bg-white/5
              backdrop-blur-xl
              border border-white/10

              shadow-lg
              hover:shadow-xl
              transition
              space-y-5
            "
          >

            {/* TITLE ROW */}
            <div className="flex items-center justify-between">

              <div>
                <h4 className="font-semibold text-white">
                  Project {index + 1}
                </h4>

                <p className="text-xs text-white/50">
                  Add project details
                </p>
              </div>

              <button
                type="button"
                onClick={() => removeProject(index)}
                className="
                  p-2
                  rounded-lg
                  text-red-400
                  hover:bg-red-500/10
                  transition
                "
              >
                <Trash2 className="size-4" />
              </button>

            </div>

            {/* PROJECT NAME */}
            <div className="space-y-2">

              <label className="text-sm font-medium text-white/70">
                Project Name
              </label>

              <input
                type="text"
                value={project.name}
                onChange={(e) =>
                  updateProject(index, "name", e.target.value)
                }
                placeholder="Enter project name"
                className="
                  w-full
                  px-4 py-3
                  text-sm

                  rounded-xl

                  bg-white/5
                  border border-white/10
                  text-white

                  placeholder:text-white/40

                  focus:outline-none
                  focus:ring-2 focus:ring-cyan-400/40

                  transition
                "
              />

            </div>

            {/* DESCRIPTION */}
            <div className="space-y-2">

              <label className="text-sm font-medium text-white/70">
                Description
              </label>

              <textarea
                rows={4}
                value={project.description}
                onChange={(e) =>
                  updateProject(index, "description", e.target.value)
                }
                placeholder="Explain technologies used, features and impact..."
                className="
                  w-full
                  px-4 py-3
                  text-sm

                  rounded-xl

                  bg-white/5
                  border border-white/10
                  text-white

                  placeholder:text-white/40

                  resize-none

                  focus:outline-none
                  focus:ring-2 focus:ring-cyan-400/40

                  transition
                "
              />

            </div>

            {/* LINK */}
            <div className="space-y-2">

              <label className="text-sm font-medium text-white/70">
                Project Link
              </label>

              <div className="
                flex items-center gap-3
                px-4 py-3
                rounded-xl

                bg-white/5
                border border-white/10

                focus-within:ring-2 focus-within:ring-cyan-400/40

                transition
              ">

                <LinkIcon size={17} className="text-cyan-400/70" />

                <input
                  type="url"
                  value={project.link}
                  onChange={(e) =>
                    updateProject(index, "link", e.target.value)
                  }
                  placeholder="GitHub / Live demo link"
                  className="
                    flex-1
                    text-sm

                    bg-transparent
                    text-white
                    placeholder:text-white/40

                    outline-none
                  "
                />

                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 transition"
                  >
                    <ExternalLink size={16} />
                  </a>
                )}

              </div>

            </div>

          </div>

        ))}

      </div>

    )}

  </div>
);
};

export default Projects;