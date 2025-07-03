import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

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
  const projects = sections[1] ? "## Projects" + sections[1] : "";

  // 自定义 Markdown 标题样式
  const markdownComponents = {
    h2: ({ node, ...props }) => (
      <h2 className="text-xl font-bold text-gray-800 mt-6 mb-2" {...props} />
    ),
    h3: ({ node, ...props }) => (
      <h3 className="text-lg font-semibold text-gray-700 mt-4 mb-1" {...props} />
    ),
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-[1800px] mx-auto px-8 pt-20 pb-8">
      {/* 左栏：头像 + 个人信息 */}
      <div className="md:col-span-3 flex justify-center md:block border-r border-gray-300 pr-4">

        <div className="flex flex-col items-center md:items-start gap-4 text-sm text-center md:text-left">
          {/* 头像 */}
          <img
            src={`${import.meta.env.BASE_URL}head_resume.png`}
            alt="Max Zhang"
            className="rounded-full w-full max-w-[300px] object-cover shadow-lg"
          />

          {/* 姓名 + 代词 */}
          <div className="text-xl font-semibold mt-2">Max Zhang</div>
          <div className="text-gray-600">she/her</div>

          {/* 简介 */}
          <div className="text-sm text-gray-700 italic">
            Electrical & Computer Engineering
          </div>

          {/* 联系方式 */}
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

      {/* 中栏：简历正文 */}
      <div className="md:col-span-5 text-base leading-snug space-y-2">
        <ReactMarkdown components={markdownComponents}>{mainInfo}</ReactMarkdown>
      </div>

      {/* 右栏：项目部分 */}
      <div className="md:col-span-4 text-base leading-snug space-y-2 border-l border-gray-300 pl-4 max-h-[90vh] overflow-y-auto">
        <ReactMarkdown components={markdownComponents}>{projects}</ReactMarkdown>
      </div>
    </div>
  );
};

export default ResumePage;
