import { Plus, Sparkles, XIcon } from "lucide-react";
import React from "react";

const Skills = ({ data = [], onChange }) => {
  const [newSkill, setNewSkill] = React.useState("");

  const addSkill = () => {
    const skill = newSkill.trim();

    if (skill && !data.includes(skill)) {
      onChange([...data, skill]);
      setNewSkill("");
    }
  };


  const removeSkill = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };


  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };


return (
  <div className="space-y-6 text-white">

    {/* HEADER */}
    <div>

      <h3 className="text-base font-semibold text-white">
        Skills
      </h3>

      <p className="text-sm text-white/60 mt-1">
        Add technical and soft skills that highlight your strengths.
      </p>

    </div>

    {/* ADD SKILL */}
    <div className="
      flex gap-3
      p-2
      rounded-xl

      bg-white/5
      backdrop-blur-xl
      border border-white/10
    ">

      <input
        type="text"
        placeholder="Example: React, Java, Leadership"
        className="
          flex-1
          px-3 py-2
          text-sm

          bg-transparent
          text-white

          outline-none

          placeholder:text-white/40
        "
        value={newSkill}
        onChange={(e) => setNewSkill(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <button
        type="button"
        onClick={addSkill}
        disabled={!newSkill.trim()}
        className="
          flex items-center gap-2
          px-5 py-2
          text-sm font-medium

          rounded-lg

          bg-gradient-to-r from-cyan-400 to-purple-600
          text-black

          hover:scale-[1.02]
          transition

          disabled:opacity-50
          disabled:cursor-not-allowed
        "
      >
        <Plus className="size-4" />
        Add
      </button>

    </div>

    {/* SKILLS LIST */}
    {data.length > 0 ? (

      <div className="flex flex-wrap gap-3">

        {data.map((skill, index) => (

          <div
            key={index}
            className="
              group
              flex items-center gap-2
              px-4 py-2
              rounded-full

              bg-white/5
              backdrop-blur-xl
              border border-white/10

              text-white/80
              text-sm

              hover:bg-white/10
              transition
            "
          >

            <span>{skill}</span>

            <button
              type="button"
              onClick={() => removeSkill(index)}
              className="
                p-0.5
                rounded-full

                text-white/50
                hover:text-red-400
                hover:bg-red-500/10

                transition
              "
            >
              <XIcon className="w-3.5 h-3.5" />
            </button>

          </div>

        ))}

      </div>

    ) : (

      <div className="
        flex flex-col items-center justify-center
        py-10
        rounded-xl

        bg-white/5
        backdrop-blur-xl
        border border-white/10

        text-center
      ">

        <Sparkles className="w-12 h-12 text-cyan-400/60 mb-3" />

        <p className="font-medium text-white">
          No skills added yet
        </p>

        <p className="text-sm text-white/60 mt-1">
          Add skills to make your resume stand out
        </p>

      </div>

    )}

    {/* TIP */}
    <div className="
      px-4 py-3
      rounded-xl

      bg-white/5
      backdrop-blur-xl
      border border-white/10

      text-white/70
    ">

      <p className="text-xs leading-relaxed">

        <strong className="text-white">Tip:</strong>{" "}
        Add 8–12 relevant skills including programming languages, tools,
        communication, and leadership skills.

      </p>

    </div>

  </div>
);

};


export default Skills;