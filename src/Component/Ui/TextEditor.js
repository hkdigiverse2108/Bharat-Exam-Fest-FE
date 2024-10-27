import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "highlight.js/styles/atom-one-dark.css";
import "katex/dist/katex.min.css";
import hljs from "highlight.js";

const TextEditor = () => {
  const [value, setValue] = useState("");

  const modules = {
    syntax: {
      highlight: (text) => hljs.highlightAuto(text).value,
    },
    toolbar: [
      [{ font: [] }, { size: [] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      [{ header: "1" }, { header: "2" }, "blockquote", "code-block"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      [{ direction: "rtl" }, { align: [] }],
      ["link", "image", "video", "formula"],
      ["clean"],
    ],
  };

  const targetRef = useRef(null);

  useEffect(() => {
    const observerCallback = (mutationsList) => {
      for (let mutation of mutationsList) {
        if (mutation.type === "childList") {
          console.log("A child node has been added or removed.");
        }
      }
    };

    const observer = new MutationObserver(observerCallback);
    if (targetRef.current) {
      observer.observe(targetRef.current, { childList: true, subtree: true });
    }
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={targetRef}>
        <ReactQuill
          value={value}
          onEditorChange={setValue}
          modules={modules}
          placeholder="Compose an epic..."
          theme="snow"
        />
      </div>
    </>
  );
};

export default TextEditor;
