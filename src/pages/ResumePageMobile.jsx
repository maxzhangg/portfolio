import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const ResumePage = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}resume.md`)
      .then((res) => res.text())
      .then((text) => setContent(text));
  }, []);

  const sections = content.split("## Projects");
  const mainInfo = sections[0] || "";
  const projects = sections[1] || "";

  const markdownComponents = {
    h2: ({ node, ...props }) => (
      <h2 className="text-xl font-bold text-gray-900 mt-6 mb-1 pb-0 border-b border-gray-300 tracking-wide" {...props} />
    ),
    h3: ({ node, ...props }) => (
      <h3 className="text-base font-semibold text-gray-800 mt-0 mb-1" {...props} />
    ),
    h4: ({ node, ...props }) => (
      <h4 className="text-sm font-medium text-gray-700 mt-2 mb-1" {...props} />
    ),
    p: ({ node, ...props }) => (
      <p className="mb-0" {...props} />
    ),
    a: ({ node, ...props }) => (
      <a className="text underline hover:text-blue-800 transition-colors duration-150" {...props} />
    ),
    ul: ({ node, ...props }) => (
      <ul className="list-disc pl-5 space-y-1" {...props} />
    ),
    li: ({ node, ...props }) => (
      <li className="mb-0" {...props} />
    ),
  };


  const [projectList, setProjectList] = useState([]);
  const [expandedAll, setExpandedAll] = useState(false);

  useEffect(() => {
    if (projects) {
      const rawItems = projects.split(/^### /gm).filter((block) => block.trim());
      const parsedProjects = rawItems.map((block, index) => {
        const lines = block.trim().split("\n");
        const titleLine = lines[0];
        const titleMatch = titleLine.match(/\[([^\]]+)\]\(([^)]+)\)/);
        const title = titleMatch ? titleMatch[1] : titleLine.trim();
        const link = titleMatch ? titleMatch[2] : "#";
        const dateLine = lines.find((l) => l.toLowerCase().startsWith("**date:**"));
        const descriptionLine = lines.find((l) => l.toLowerCase().startsWith("**description:**"));
        const date = dateLine ? dateLine.replace(/\*\*Date:\*\*\s*/, "").trim() : "";
        const description = descriptionLine ? descriptionLine.replace(/\*\*Description:\*\*\s*/, "").trim() : "";
        const imagesLine = lines.find((l) =>
          l.toLowerCase().startsWith("**images:**")
          );

        const images = imagesLine
          ? imagesLine
          .replace(/\*\*Images:\*\*\s*/i, "")
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
          : [];

        const contribIndex = lines.findIndex((l) => l.toLowerCase().startsWith("**key contributions:**"));
        let contributions = "";
        if (contribIndex !== -1) {
          contributions = lines.slice(contribIndex + 1).join("\n").trim();
        }
        return {
          id: index,
          title,
          link,
          date,
          description,
          contributions,
          images,
          expanded: false,
        };
      });
      setProjectList(parsedProjects);
    }
  }, [projects]);

  const toggleExpand = (id) => {
    setProjectList((prev) => prev.map((p) => (p.id === id ? { ...p, expanded: !p.expanded } : p)));
  };

  const toggleAll = () => {
    const shouldExpand = !expandedAll;
    setProjectList((prev) => prev.map((p) => ({ ...p, expanded: shouldExpand })));
    setExpandedAll(shouldExpand);
  };

  return (
    <div className="max-w-3xl mx-auto px-2 pt-6 pb-6 space-y-8">
      {/* 头像与基本信息 */}
      <div className="flex flex-col items-center text-center space-y-2">
        <img
          src={`${import.meta.env.BASE_URL}head_resume.png`}
          alt="Max Zhang"
          className="rounded-full w-32 h-32 object-cover shadow"
        />
        <div className="text-xl font-medium">Max Zhang</div>
        <div className="text-gray-600 text-sm">she/her</div>
        <div className="text-xs italic text-gray-700">Electrical & Computer Engineering</div>
        <div className="space-y-0.5 text-xs text-gray-800">
          <div className="flex items-center justify-center gap-1">
            <span role="img" aria-label="email">📧</span>
            <span>maxzhangggg@gmail.com</span>
          </div>
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <span role="img" aria-label="web">🌐</span>
            <a href="https://github.com/maxzhangg" target="_blank" className="text-blue-600 hover:underline">GitHub</a>
            <span>|</span>
            <a href="https://www.linkedin.com/in/maxzhang0/" target="_blank" className="text-blue-600 hover:underline">LinkedIn</a>
          </div>
        </div>
      </div>

      {/* 简历正文 */}
      <div className="text-sm leading-snug space-y-2">
        <ReactMarkdown components={markdownComponents}>{mainInfo}</ReactMarkdown>
      </div>

      {/* 项目区域 */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold">Projects</h2>
          <button onClick={toggleAll} className="text-xs text-blue-600 hover:underline">
            {expandedAll ? "hide all" : "show all"}
          </button>
        </div>

        {projectList.map((proj) => (
          <div
            key={proj.id}
            className="border border-gray-200 rounded p-2 shadow-sm hover:shadow transition cursor-pointer"
            onClick={() => toggleExpand(proj.id)}
          >
            {proj.link !== "#" ? (
              <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-gray-800 underline hover:text-blue-700">
                <h3 className="text-base font-semibold">{proj.title}</h3>
              </a>
            ) : (
              <h3 className="text-base font-semibold text-gray-800">{proj.title}</h3>
            )}

            <p className="text-xs text-gray-500 mb-1">{proj.date}</p>
            <p className="text-sm mb-1">{proj.description}</p>

            {proj.expanded && (
  <div className="mt-1 pt-2 border-t text-xs text-gray-700 space-y-3">
    {/* Contributions 先 */}
    <ReactMarkdown remarkPlugins={[remarkGfm]}>
      {proj.contributions}
    </ReactMarkdown>

    {/* Gallery 最后：竖向满宽展示，不裁切 */}
    {Array.isArray(proj.images) && proj.images.length > 0 && (
      <div className="pt-2 border-t space-y-3">
        {proj.images.map((img, idx) => {
          const src = `${import.meta.env.BASE_URL}${img}`;
          return (
            <a
              key={`${proj.id}-${idx}`}
              href={src}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="block w-full"
            >
              <img
                src={src}
                alt={`${proj.title} ${idx + 1}`}
                className="w-full h-auto object-contain rounded-md border bg-white"
                loading="lazy"
              />
            </a>
          );
        })}
      </div>
    )}
  </div>
)}

          </div>
        ))}
      </div>
    </div>
  );
};

export default ResumePage;
