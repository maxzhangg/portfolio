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

  // 拆分简历内容：正文 + 项目
  const sections = content.split("## Projects");
  const mainInfo = sections[0] || "";
  const projects = sections[1] || "";

  // 自定义 Markdown 渲染样式
  const markdownComponents = {
    h2: ({ node, ...props }) => (
      <h2
        className="text-2xl font-extrabold text-gray-900 mt-8 mb-4 border-b-2 border-gray-200 pb-1 tracking-wide"
        {...props}
      />
    ),
    h3: ({ node, ...props }) => (
      <h3
        className="text-xl font-semibold text-gray-800 mt-6 mb-2 tracking-tight"
        {...props}
      />
    ),
    h4: ({ node, ...props }) => (
      <h4
        className="text-lg font-medium text-gray-700 mt-4 mb-1"
        {...props}
      />
    ),
    a: ({ node, ...props }) => (
      <a
        className="text underline hover:text-blue-800 transition-colors duration-150"
        {...props}
      />
    ),
  };

  const [projectList, setProjectList] = useState([]);
  const [expandedAll, setExpandedAll] = useState(false);

  useEffect(() => {
    if (projects) {
      const rawItems = projects
        .split(/^### /gm)
        .filter((block) => block.trim());

      const parsedProjects = rawItems.map((block, index) => {
        const lines = block.trim().split("\n");
        const titleLine = lines[0];
        const titleMatch = titleLine.match(/\[([^\]]+)\]\(([^)]+)\)/);
        const title = titleMatch ? titleMatch[1] : titleLine.trim();
        const link = titleMatch ? titleMatch[2] : "#";

        const dateLine = lines.find((l) =>
          l.toLowerCase().startsWith("**date:**")
        );
        const descriptionLine = lines.find((l) =>
          l.toLowerCase().startsWith("**description:**")
        );

        const date = dateLine
          ? dateLine.replace(/\*\*Date:\*\*\s*/, "").trim()
          : "";
        const description = descriptionLine
          ? descriptionLine.replace(/\*\*Description:\*\*\s*/, "").trim()
          : "";

        const contribIndex = lines.findIndex((l) =>
          l.toLowerCase().startsWith("**key contributions:**")
        );

        const imagesLine = lines.find((l) =>
          l.toLowerCase().startsWith("**images:**")
          );

        const images = imagesLine
  ?       imagesLine
            .replace(/\*\*Images:\*\*\s*/i, "")
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
         : [];

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
    setProjectList((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, expanded: !p.expanded } : p
      )
    );
  };

  const toggleAll = () => {
    const shouldExpand = !expandedAll;
    setProjectList((prev) =>
      prev.map((p) => ({ ...p, expanded: shouldExpand }))
    );
    setExpandedAll(shouldExpand);
  };

  return (
    <div className="transform scale-90 origin-top grid grid-cols-1 md:grid-cols-12 gap-6 max-w-[1800px] mx-auto px-8 pt-20 pb-8">
      {/* 左栏 */}
      <div className="md:col-span-3 flex justify-center md:block border-r border-gray-300 pr-4 mt-20">
        <div className="flex flex-col items-center md:items-start gap-4 text-sm text-center md:text-left">
          <img
            src={`${import.meta.env.BASE_URL}head_resume.png`}
            alt="Max Zhang"
            className="rounded-full w-full max-w-[300px] object-cover shadow-lg"
          />
          <div className="text-xl font-semibold mt-2">Max Zhang</div>
          <div className="text-gray-600">she/her</div>
          <div className="text-sm text-gray-700 italic">
            Electrical & Computer Engineering
          </div>
          <div className="space-y-1 mt-4 text-left w-full">
            <div className="flex items-center gap-2">
              <span role="img" aria-label="email">📧</span>
              <span>maxzhangggg@gmail.com</span>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span role="img" aria-label="web">🌐</span>
              <a href="https://github.com/maxzhangg" target="_blank" className="text-blue-600 hover:underline">GitHub</a>
              <span>|</span>
              <a href="https://www.linkedin.com/in/maxzhang0/" target="_blank" className="text-blue-600 hover:underline">LinkedIn</a>
            </div>
          </div>
        </div>
      </div>

      {/* 中栏 */}
      <div className="md:col-span-5 text-base leading-snug space-y-2">
        <ReactMarkdown components={markdownComponents}>{mainInfo}</ReactMarkdown>
      </div>

      {/* 右栏：项目列表 */}
      <div className="md:col-span-4 text-base leading-snug space-y-4 border-l border-gray-300 pl-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Projects</h2>
          <button
            onClick={toggleAll}
            className="text-sm text-blue-600 hover:underline"
          >
            {expandedAll ? "hide all" : "show all"}
          </button>
        </div>

        {projectList.map((proj) => (
          <div
            key={proj.id}
            className="border border-gray-200 rounded-md p-3 shadow-sm hover:shadow-md transition cursor-pointer"
            onClick={() => toggleExpand(proj.id)}
          >
            {proj.link !== "#" ? (
              <a
                href={proj.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-800 underline hover:text-blue-700"
              >
                <h3 className="text-lg font-semibold">{proj.title}</h3>
              </a>
            ) : (
              <h3 className="text-lg font-semibold text-gray-800">{proj.title}</h3>
            )}

            <p className="text-sm text-gray-500 mb-1">{proj.date}</p>
            <p className="mb-2">{proj.description}</p>
            
            {proj.expanded && (
  <div className="mt-2 border-t pt-3 text-sm text-gray-700 space-y-4">
    {/* Contributions（先） */}
    <ReactMarkdown remarkPlugins={[remarkGfm]}>
      {proj.contributions}
    </ReactMarkdown>

    {/* Gallery（末尾） */}
    {Array.isArray(proj.images) && proj.images.length > 0 && (
  <div className="pt-3 border-t space-y-4">
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
            className="
              w-full
              h-auto
              object-contain
              rounded-md
              border
              bg-white
            "
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
