import React, { useEffect, useRef, useState } from "react";
import { useQuill } from "react-quilljs";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import "quill/dist/quill.snow.css";

export default function TextEditor({ content, setContent }) {
  const modules = {
    syntax: {
      highlight: (text) => hljs.highlightAuto(text).value,
    },
    toolbar: [
      [{ font: [] }, { size: [] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      [
        { header: "1" },
        { header: "2" },
        { header: "3" },
        { header: "4" },
        "blockquote",
        "code-block",
      ],
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
    theme: "snow",
  };

  const { quill, quillRef } = useQuill({
    modules,
    placeholder: "Compose your text here...",
  });
  const [editorHtml, setEditorHtml] = useState("");
  const targetRef = useRef(null);

  const handleChange = (html) => {
    setEditorHtml(html);
  };
  const handleUndo = () => {
    if (quill) {
      quill.history.undo();
    }
  };

  const handleRedo = () => {
    if (quill) {
      quill.history.redo();
    }
  };
  
  useEffect(() => {
    if (quill) {
      quill.setText(content);
    }
  }, [quill, content]);

  useEffect(() => {
    if (quill) {
      const toolbar = quill.getModule("toolbar");
      toolbar.addHandler("undo", handleUndo);
      toolbar.addHandler("redo", handleRedo);

      quill.on("text-change", () => {
        const html = quill.root.innerHTML; // Get the HTML content
        handleChange(html); // Update the editorHtml state
      });
    }
  }, [quill]);

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

  // console.log(quill); // undefined > Quill Object
  // console.log(quillRef); // { current: undefined } > { current: Quill Editor Reference }

  return (
    <div className="w-full min-h-[300px] h-full border border-gray-300 rounded-lg shadow-md overflow-hidden mx-auto bg-white">
      <div ref={quillRef} value={editorHtml} onChange={handleChange} />
    </div>
  );
}

// import React, { useEffect, useRef, useState } from "react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import "highlight.js/styles/atom-one-dark.css";
// import "katex/dist/katex.min.css";

// const TextEditor = () => {
//   const [editorHtml, setEditorHtml] = useState("");
//   const quillRef = useRef(null);
//   const targetRef = useRef(null);

//   const modules = {
//     syntax: {
//       highlight: (text) => hljs.highlightAuto(text).value,
//     },
//     toolbar: [
//       [{ font: [] }, { size: [] }],
//       ["bold", "italic", "underline", "strike"],
//       [{ color: [] }, { background: [] }],
//       [{ script: "sub" }, { script: "super" }],
//       [{ header: "1" }, { header: "2" }, "blockquote", "code-block"],
//       [
//         { list: "ordered" },
//         { list: "bullet" },
//         { indent: "-1" },
//         { indent: "+1" },
//       ],
//       [{ direction: "rtl" }, { align: [] }],
//       ["link", "image", "video", "formula"],
//       ["clean"],
//     ],
//   };

//   const handleChange = (html) => {
//     setEditorHtml(html);
//   };

//   useEffect(() => {
//     const observerCallback = (mutationsList) => {
//       for (let mutation of mutationsList) {
//         if (mutation.type === "childList") {
//           console.log("A child node has been added or removed.");
//         }
//       }
//     };

//     const observer = new MutationObserver(observerCallback);
//     if (targetRef.current) {
//       observer.observe(targetRef.current, { childList: true, subtree: true });
//     }

//     return () => {
//       observer.disconnect();
//     };
//   }, []);

//   return (
//     <div ref={targetRef}>
//       <ReactQuill
//         ref={quillRef}
//         value={editorHtml}
//         onChange={handleChange}
//         modules={modules}
//         placeholder="Compose an epic..."
//         theme="snow"
//       />
//     </div>
//   );
// };
