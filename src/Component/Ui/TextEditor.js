import React, { useEffect, useRef, useState } from "react";
import { useQuill } from "react-quilljs";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import "quill/dist/quill.snow.css";
import "tailwindcss/tailwind.css";
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaStrikethrough,
  FaPalette,
  FaFillDrip,
  FaSubscript,
  FaSuperscript,
  FaQuoteRight,
  FaListOl,
  FaListUl,
  FaLink,
  FaImage,
  FaVideo,
  FaEraser,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaAlignJustify,
  FaIndent,
  FaOutdent,
  FaMinus,
  FaTable,
} from "react-icons/fa";

const toolbarItems = [
  {
    type: "select",
    command: "fontName",
    options: ["Arial", "Courier New", "Georgia", "Times New Roman", "Verdana"],
    tooltip: "Font Family",
  },
  {
    type: "select",
    command: "fontSize",
    options: ["1", "3", "5", "7"],
    labels: ["Small", "Normal", "Large", "Huge"],
    tooltip: "Font Size",
  },
  { type: "button", command: "bold", icon: <FaBold />, tooltip: "Bold" },
  {
    type: "button",
    command: "italic",
    icon: <FaItalic />,
    tooltip: "Italic",
  },
  {
    type: "button",
    command: "underline",
    icon: <FaUnderline />,
    tooltip: "Underline",
  },
  {
    type: "button",
    command: "strikeThrough",
    icon: <FaStrikethrough />,
    tooltip: "Strikethrough",
  },
  { type: "color", command: "foreColor", tooltip: "Text Color" },
  { type: "color", command: "hiliteColor", tooltip: "Highlight Color" },
  {
    type: "button",
    command: "subscript",
    icon: <FaSubscript />,
    tooltip: "Subscript",
  },
  {
    type: "button",
    command: "superscript",
    icon: <FaSuperscript />,
    tooltip: "Superscript",
  },
  {
    type: "select",
    command: "formatBlock",
    options: ["H1", "H2", "H3", "H4", "P"],
    labels: ["Header 1", "Header 2", "Header 3", "Header 4", "Paragraph"],
    tooltip: "Block Format",
  },
  {
    type: "button",
    command: "blockquote",
    icon: <FaQuoteRight />,
    tooltip: "Blockquote",
  },
  {
    type: "button",
    command: "insertOrderedList",
    icon: <FaListOl />,
    tooltip: "Ordered List",
  },
  {
    type: "button",
    command: "insertUnorderedList",
    icon: <FaListUl />,
    tooltip: "Unordered List",
  },
  {
    type: "button",
    command: "createLink",
    icon: <FaLink />,
    prompt: "Enter the URL",
    tooltip: "Insert Link",
  },
  {
    type: "button",
    command: "insertImage",
    icon: <FaImage />,
    prompt: "Enter the image URL",
    tooltip: "Insert Image",
  },
  {
    type: "button",
    command: "insertHTML",
    icon: <FaVideo />,
    prompt: "Enter the video embed code",
    tooltip: "Insert Video",
  },
  {
    type: "button",
    command: "removeFormat",
    icon: <FaEraser />,
    tooltip: "Remove Formatting",
  },
  {
    type: "button",
    command: "justifyLeft",
    icon: <FaAlignLeft />,
    tooltip: "Align Left",
  },
  {
    type: "button",
    command: "justifyCenter",
    icon: <FaAlignCenter />,
    tooltip: "Align Center",
  },
  {
    type: "button",
    command: "justifyRight",
    icon: <FaAlignRight />,
    tooltip: "Align Right",
  },
  {
    type: "button",
    command: "justifyFull",
    icon: <FaAlignJustify />,
    tooltip: "Justify",
  },
  {
    type: "button",
    command: "indent",
    icon: <FaIndent />,
    tooltip: "Indent",
  },
  {
    type: "button",
    command: "outdent",
    icon: <FaOutdent />,
    tooltip: "Outdent",
  },
  {
    type: "button",
    command: "insertHorizontalRule",
    icon: <FaMinus />,
    tooltip: "Horizontal Line",
  },
  {
    type: "button",
    command: "insertTable",
    icon: <FaTable />,
    prompt: "Enter table HTML",
    tooltip: "Insert Table",
  },
];

const TextEditor = ({ content, onTextChange = () => {} }) => {
  const [text, setText] = useState(content);
  const editorRef = useRef(null);
  const [isPlaceholderVisible, setIsPlaceholderVisible] = useState(true);

  const handleCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      onTextChange(editorRef.current.innerHTML);
      setIsPlaceholderVisible(editorRef.current.innerHTML === "");
    }
  };

  const handleChange = (e) => {
    if (editorRef.current) {
      onTextChange(editorRef.current.innerHTML);
      setIsPlaceholderVisible(editorRef.current.innerHTML === "");
    }
  };


  useEffect(() => {
    if (text === "") {
      setIsPlaceholderVisible(true);
    }
  }, [text]);

  return (
    <div className=" w-full overflow-none">
      <div className="flex flex-wrap items-center gap-3 border border-orange-400 p-2 rounded">
        {toolbarItems.map((item, index) => {
          if (item.type === "select") {
            return (
              <div className="relative" key={index}>
                <select
                  onChange={(e) => handleCommand(item.command, e.target.value)}
                  className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  title={item.tooltip}
                >
                  {item.options.map((option, idx) => (
                    <option key={idx} value={option}>
                      {item.labels ? item.labels[idx] : option}
                    </option>
                  ))}
                </select>
              </div>
            );
          } else if (item.type === "button") {
            return (
              <div className="relative" key={index}>
                <button
                  onClick={() => {
                    if (item.prompt) {
                      const value = prompt(item.prompt, "http://");
                      handleCommand(item.command, value);
                    } else {
                      handleCommand(item.command);
                    }
                  }}
                  className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  title={item.tooltip}
                >
                  {item.icon}
                </button>
              </div>
            );
          } else if (item.type === "color") {
            return (
              <div className="relative" key={index}>
                <input
                  type="color"
                  onChange={(e) => handleCommand(item.command, e.target.value)}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                  title={item.tooltip}
                />
              </div>
            );
          }
          return null;
        })}
      </div>
      <div
        ref={editorRef}
        contentEditable="true"
        onInput={(e) => handleChange(e)}
        className=" p-4 rounded-b-2xl editable-area border-0 border-slate-400 focus:border-black h-64 overflow-auto"
        style={{ whiteSpace: "pre-wrap" }}
        // defaultValue={content}
      />
      {isPlaceholderVisible && (
        <div className="absolute text-gray-400 pointer-events-none">
          Start typing...
        </div>
      )}
    </div>
  );
};

export default TextEditor;
// export default function TextEditor({ content, setContent }) {
//   const modules = {
//     syntax: {
//       highlight: (text) => hljs.highlightAuto(text).value,
//     },
//     toolbar: [
//       [{ font: [] }, { size: [] }],
//       ["bold", "italic", "underline", "strike"],
//       [{ color: [] }, { background: [] }],
//       [{ script: "sub" }, { script: "super" }],
//       [{ header: [1, 2, 3, 4, false] }],
//       ["blockquote", "code-block"],
//       [{ list: "ordered" }, { list: "bullet" }],
//       ["link", "image", "video", "clean"],
//     ],
//   };

//   const { quill, quillRef } = useQuill({
//     modules,
//     placeholder: "Compose your text here...",
//   });

//   const previousContentRef = useRef(content);

//   const handlers = {
//     link: function () {
//       const href = prompt("Enter the URL");
//       if (href) {
//         this.quill.format("link", href);
//       } else {
//         this.quill.format("link", false);
//       }
//     },
//     image: function () {
//       const input = document.createElement("input");
//       input.setAttribute("type", "file");
//       input.setAttribute("accept", "image/*");
//       input.click();

//       input.onchange = () => {
//         const file = input.files[0];
//         const reader = new FileReader();
//         reader.onloadend = () => {
//           const url = reader.result;
//           this.quill.insertEmbed(this.quill.getSelection().index, "image", url);
//         };
//         if (file) {
//           reader.readAsDataURL(file);
//         }
//       };
//     },
//     video: function () {
//       const input = document.createElement("input");
//       input.setAttribute("type", "file");
//       input.setAttribute("accept", "video/*");
//       input.click();

//       input.onchange = () => {
//         const file = input.files[0];
//         const reader = new FileReader();
//         reader.onloadend = () => {
//           const url = reader.result;
//           const videoEmbed = `<video width="560" height="315" controls>
//                                 <source src="${url}" type="video/mp4">
//                                 Your browser does not support the video tag.
//                               </video>`;
//           this.quill.clipboard.dangerouslyPasteHTML(
//             this.quill.getSelection().index,
//             videoEmbed
//           );
//         };
//         if (file) {
//           reader.readAsDataURL(file);
//         }
//       };
//     },
//     clean: function () {
//       this.quill.setContents([]);
//     },
//   };

//   useEffect(() => {
//     if (quill) {
//       quill.root.innerHTML = content; // Set initial content
//       quill.getModule("toolbar").addHandler("link", handlers.link);
//       quill.getModule("toolbar").addHandler("image", handlers.image);
//       quill.getModule("toolbar").addHandler("video", handlers.video);
//       quill.getModule("toolbar").addHandler("clean", handlers.clean);
//     }
//   }, [quill, content]);

//   useEffect(() => {
//     if (quill) {
//       const handleTextChange = () => {
//         const html = quill.root.innerHTML; // Get HTML content
//         const plainText = quill.getText(); // Get plain text content

//         // Extract URLs from the HTML content
//         const imageUrls = Array.from(quill.root.querySelectorAll("img")).map(
//           (img) => img.src
//         );
//         const videoUrls = Array.from(
//           quill.root.querySelectorAll("video source")
//         ).map((source) => source.src);
//         const linkElements = Array.from(quill.root.querySelectorAll("a"));
//         const linkUrls = linkElements.map((a) => a.href);
//         const linkTexts = linkElements.map((a) => a.innerText); // Get link text

//         // Combine all URLs into a single string
//         const allUrls = [...imageUrls, ...videoUrls, ...linkUrls].join("\n");

//         // Call the parent component's setContent if needed
//         if (typeof setContent === "function") {
//           setContent(html); // Update the parent with HTML content
//         }

//         // Log the plain text content and URLs
//         console.log("Current Plain Text:", plainText);
//         console.log("Image URLs:", imageUrls);
//         console.log("Video URLs:", videoUrls);
//         console.log("Link URLs:", linkUrls);
//         console.log("All URLs:", allUrls); // Log all URLs as plain text
//       };

//       quill.on("text-change", handleTextChange);
//       return () => {
//         quill.off("text-change", handleTextChange);
//       };
//     }
//   }, [quill, setContent]);

//   // Effect to update content when prop changes
//   useEffect(() => {
//     if (quill && content !== quill.root.innerHTML) {
//       const delta = quill.clipboard.convert(content || ""); // Convert HTML to Delta
//       quill.setContents(delta); // Set content using setContents
//     }
//   }, [quill, content]);

//   return (
//     <>
//       <div className="w-full min-h-[300px] h-full border border-gray-300 rounded-lg overflow-hidden mx-auto bg-white">
//         <div ref={quillRef} />
//       </div>
//     </>
//   );
// }
// export default function TextEditor({ content, setContent }) {
//   const modules = {
//     syntax: {
//       highlight: (text) => hljs.highlightAuto(text).value,
//     },
//     toolbar: [
//       [{ font: [] }, { size: [] }],
//       ["bold", "italic", "underline", "strike"],
//       [{ color: [] }, { background: [] }],
//       [{ script: "sub" }, { script: "super" }],
//       [
//         { header: "1" },
//         { header: "2" },
//         { header: "3" },
//         { header: "4" },
//         "blockquote",
//         "code-block",
//       ],
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

//   const { quill, quillRef } = useQuill({
//     modules,
//     placeholder: "Compose your text here...",
//   });
//   const [editorContent, setEditorContent] = useState(content);

//   useEffect(() => {
//     if (quill) {
//       // Set the initial content of the Quill editor
//       quill.root.innerHTML = editorContent;
//     }
//   }, [quill, editorContent]);

//   // Function to update the editor content
//   const updateContent = (newContent) => {
//     setEditorContent(newContent);
//     if (quill) {
//       quill.root.innerHTML = newContent;
//     }
//   };

//   useEffect(() => {
//     if (quill) {
//       if (typeof content === "string") {
//         const delta = quill.clipboard.convert(content);
//         quill.setContents(delta);
//       }
//     }
//   }, [quill, content]);
//   useEffect(() => {
//     if (quill) {
//       const handleTextChange = () => {
//         const html = quill.root.innerHTML;
//         const text = quill.getText();
//         updateContent(html);
//       };

//       quill.on("text-change", handleTextChange);
//       return () => {
//         quill.off("text-change", handleTextChange);
//       };
//     }
//   }, [quill]);

//   return (
//     <>
//       <div className="w-full min-h-[300px] h-full border border-gray-300 rounded-lg shadow-md overflow-hidden mx-auto bg-white">
//         <div ref={quillRef} />
//       </div>
//     </>
//   );
// }
// export default function TextEditor({ content, setContent }) {
//   const modules = {
//     syntax: {
//       highlight: (text) => hljs.highlightAuto(text).value,
//     },
//     toolbar: [
//       [{ font: [] }, { size: [] }],
//       ["bold", "italic", "underline", "strike"],
//       [{ color: [] }, { background: [] }],
//       [{ script: "sub" }, { script: "super" }],
//       [
//         { header: "1" },
//         { header: "2" },
//         { header: "3" },
//         { header: "4" },
//         "blockquote",
//         "code-block",
//       ],
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

//   const { quill, quillRef } = useQuill({
//     modules,
//     placeholder: "Compose your text here...",
//   });
//   const [editorHtml, setEditorHtml] = useState("");
//   const targetRef = useRef(null);

//   const handleChange = (html) => {
//     setContent(html); // Update the parent component's state
//   };

//   const handleUndo = () => {
//     if (quill) {
//       quill.history.undo();
//     }
//   };

//   const handleRedo = () => {
//     if (quill) {
//       quill.history.redo();
//     }
//   };

//   useEffect(() => {
//     if (quill) {
//       // Set the initial content when Quill is ready
//       quill.setContents(quill.clipboard.convert(content));
//     }
//   }, [quill, content]);

//   useEffect(() => {
//     if (quill) {
//       const toolbar = quill.getModule("toolbar");
//       toolbar.addHandler("undo", handleUndo);
//       toolbar.addHandler("redo", handleRedo);
//       quill.on("text-change", () => {
//         const html = quill.root.innerHTML; // Get the HTML content
//         handleChange(html); // Update the parent component's state
//         const text = quill.getText(); // Get the plain text content
//         const convertedContent = convert( html, text ); // Call the convert function
//         setContent(convertedContent); // Update the parent component's state
//       });

//       quill.on("text-change", () => {});
//     }
//   }, [quill]);

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

//   useEffect(() => {
//     console.log("Quill instance:", quill);
//     console.log("Quill reference:", quillRef);
//   }, [quill, quillRef]);

//   return (
//     <>
//       <div className="w-full min-h-[300px] h-full border border-gray-300 rounded-lg shadow-md overflow-hidden mx-auto bg-white">
//         <div ref={quillRef} />
//       </div>
//     </>
//   );
// }

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
