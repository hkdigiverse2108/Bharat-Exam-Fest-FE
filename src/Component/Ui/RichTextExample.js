// import React, { useCallback, useMemo } from 'react'
// import isHotkey from 'is-hotkey'
// import { Editable, withReact, useSlate, Slate } from 'slate-react'
// import {
//   Editor,
//   Transforms,
//   createEditor,
//   Element as SlateElement,
// } from 'slate'
// import { withHistory } from 'slate-history'
// import { Button, Icon, Toolbar } from './Styles'

// const HOTKEYS = {
//   'mod+b': 'bold',
//   'mod+i': 'italic',
//   'mod+u': 'underline',
//   'mod+`': 'code',
// }
// const LIST_TYPES = ['numbered-list', 'bulleted-list']
// const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify']
// const RichTextExample = () => {
//   const renderElement = useCallback(props => <Element {...props} />, [])
//   const renderLeaf = useCallback(props => <Leaf {...props} />, [])
//   const editor = useMemo(() => withHistory(withReact(createEditor())), [])
//   return (
//     <Slate editor={editor} initialValue={initialValue}>
//       <Toolbar>
//         <MarkButton format="bold" icon="format_bold" />
//         <MarkButton format="italic" icon="format_italic" />
//         <MarkButton format="underline" icon="format_underlined" />
//         <MarkButton format="code" icon="code" />
//         <BlockButton format="heading-one" icon="looks_one" />
//         <BlockButton format="heading-two" icon="looks_two" />
//         <BlockButton format="block-quote" icon="format_quote" />
//         <BlockButton format="numbered-list" icon="format_list_numbered" />
//         <BlockButton format="bulleted-list" icon="format_list_bulleted" />
//         <BlockButton format="left" icon="format_align_left" />
//         <BlockButton format="center" icon="format_align_center" />
//         <BlockButton format="right" icon="format_align_right" />
//         <BlockButton format="justify" icon="format_align_justify" />
//       </Toolbar>
//       <Editable
//         renderElement={renderElement}
//         renderLeaf={renderLeaf}
//         placeholder="Enter some rich text…"
//         spellCheck
//         autoFocus
//         onKeyDown={event => {
//           for (const hotkey in HOTKEYS) {
//             if (isHotkey(hotkey, event)) {
//               event.preventDefault()
//               const mark = HOTKEYS[hotkey]
//               toggleMark(editor, mark)
//             }
//           }
//         }}
//       />
//     </Slate>
//   )
// }
// const toggleBlock = (editor, format) => {
//   const isActive = isBlockActive(
//     editor,
//     format,
//     TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
//   )
//   const isList = LIST_TYPES.includes(format)
//   Transforms.unwrapNodes(editor, {
//     match: n =>
//       !Editor.isEditor(n) &&
//       SlateElement.isElement(n) &&
//       LIST_TYPES.includes(n.type) &&
//       !TEXT_ALIGN_TYPES.includes(format),
//     split: true,
//   })
//   let newProperties
//   if (TEXT_ALIGN_TYPES.includes(format)) {
//     newProperties = {
//       align: isActive ? undefined : format,
//     }
//   } else {
//     newProperties = {
//       type: isActive ? 'paragraph' : isList ? 'list-item' : format,
//     }
//   }
//   Transforms.setNodes(editor, newProperties)
//   if (!isActive && isList) {
//     const block = { type: format, children: [] }
//     Transforms.wrapNodes(editor, block)
//   }
// }
// const toggleMark = (editor, format) => {
//   const isActive = isMarkActive(editor, format)
//   if (isActive) {
//     Editor.removeMark(editor, format)
//   } else {
//     Editor.addMark(editor, format, true)
//   }
// }
// const isBlockActive = (editor, format, blockType = 'type') => {
//   const { selection } = editor
//   if (!selection) return false
//   const [match] = Array.from(
//     Editor.nodes(editor, {
//       at: Editor.unhangRange(editor, selection),
//       match: n =>
//         !Editor.isEditor(n) &&
//         SlateElement.isElement(n) &&
//         n[blockType] === format,
//     })
//   )
//   return !!match
// }
// const isMarkActive = (editor, format) => {
//   const marks = Editor.marks(editor)
//   return marks ? marks[format] === true : false
// }
// const Element = ({ attributes, children, element }) => {
//   const style = { textAlign: element.align }
//   switch (element.type) {
//     case 'block-quote':
//       return (
//         <blockquote style={style} {...attributes}>
//           {children}
//         </blockquote>
//       )
//     case 'bulleted-list':
//       return (
//         <ul style={style} {...attributes}>
//           {children}
//         </ul>
//       )
//     case 'heading-one':
//       return (
//         <h1 style={style} {...attributes}>
//           {children}
//         </h1>
//       )
//     case 'heading-two':
//       return (
//         <h2 style={style} {...attributes}>
//           {children}
//         </h2>
//       )
//     case 'list-item':
//       return (
//         <li style={style} {...attributes}>
//           {children}
//         </li>
//       )
//     case 'numbered-list':
//       return (
//         <ol style={style} {...attributes}>
//           {children}
//         </ol>
//       )
//     default:
//       return (
//         <p style={style} {...attributes}>
//           {children}
//         </p>
//       )
//   }
// }
// const Leaf = ({ attributes, children, leaf }) => {
//   if (leaf.bold) {
//     children = <strong>{children}</strong>
//   }
//   if (leaf.code) {
//     children = <code>{children}</code>
//   }
//   if (leaf.italic) {
//     children = <em>{children}</em>
//   }
//   if (leaf.underline) {
//     children = <u>{children}</u>
//   }
//   return <span {...attributes}>{children}</span>
// }
// const BlockButton = ({ format, icon }) => {
//   const editor = useSlate()
//   return (
//     <Button
//       active={isBlockActive(
//         editor,
//         format,
//         TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
//       )}
//       onMouseDown={event => {
//         event.preventDefault()
//         toggleBlock(editor, format)
//       }}
//     >
//       <Icon>{icon}</Icon>
//     </Button>
//   )
// }
// const MarkButton = ({ format, icon }) => {
//   const editor = useSlate()
//   return (
//     <Button
//       active={isMarkActive(editor, format)}
//       onMouseDown={event => {
//         event.preventDefault()
//         toggleMark(editor, format)
//       }}
//     >
//       <Icon>{icon}</Icon>
//     </Button>
//   )
// }
// const initialValue = [
//   {
//     type: 'paragraph',
//     children: [
//       { text: 'This is editable ' },
//       { text: 'rich', bold: true },
//       { text: ' text, ' },
//       { text: 'much', italic: true },
//       { text: ' better than a ' },
//       { text: '<textarea>', code: true },
//       { text: '!' },
//     ],
//   },
//   {
//     type: 'paragraph',
//     children: [
//       {
//         text: "Since it's rich text, you can do things like turn a selection of text ",
//       },
//       { text: 'bold', bold: true },
//       {
//         text: ', or add a semantically rendered block quote in the middle of the page, like this:',
//       },
//     ],
//   },
//   {
//     type: 'block-quote',
//     children: [{ text: 'A wise quote.' }],
//   },
//   {
//     type: 'paragraph',
//     align: 'center',
//     children: [{ text: 'Try it out for yourself!' }],
//   },
// ]
// import React, { useState } from "react";
// import ReactQuill from "react-quill"; // Make sure to install react-quill
// import "react-quill/dist/quill.snow.css";
// const EMPTY_DELTA = { ops: [] };

// const RichTextExample = ({ content, onTextChange = () => {} }) => {
//   const [theme] = useState("snow");
//   const [enabled, setEnabled] = useState(true);
//   const [readOnly, setReadOnly] = useState(false);
//   const [value, setValue] = useState(EMPTY_DELTA);
//   const [events, setEvents] = useState([]);
//   const [selection, setSelection] = useState(null);

//   const formatRange = (range) => {
//     return range ? [range.index, range.index + range.length].join(",") : "none";
//   };

//   const onEditorChange = (value, delta, source, editor) => {
//     console.log("delta", delta);
//     console.log("output",value);

//     // onTextChange(value);

//     setValue(editor.getContents());
//     setEvents((prevEvents) => [`[${source}] text-change`, ...prevEvents]);
//   };

//   const onEditorChangeSelection = (range, source) => {
//     setSelection(range);
//     setEvents((prevEvents) => [
//       `[${source}] selection-change(${formatRange(selection)} -> ${formatRange(
//         range
//       )})`,
//       ...prevEvents,
//     ]);
//   };

//   const onEditorFocus = (range, source) => {
//     setEvents((prevEvents) => [
//       `[${source}] focus(${formatRange(range)})`,
//       ...prevEvents,
//     ]);
//   };

//   const onEditorBlur = (previousRange, source) => {
//     setEvents((prevEvents) => [
//       `[${source}] blur(${formatRange(previousRange)})`,
//       ...prevEvents,
//     ]);
//   };

//   // const onToggle = () => {
//   //   setEnabled((prevEnabled) => !prevEnabled);
//   // };

//   // const onToggleReadOnly = () => {
//   //   setReadOnly((prevReadOnly) => !prevReadOnly);
//   // };

//   // const onSetContents = () => {
//   //   setValue("This is some <b>fine</b> example content");
//   // };

//   //   function renderToolbar() {
//   //   return (
//   //     <div>
//   //       <button onClick={onToggle}>{enabled ? "Disable" : "Enable"}</button>
//   //       <button onClick={onToggleReadOnly}>
//   //         Set {readOnly ? "read/Write" : "read-only"}
//   //       </button>
//   //       <button onClick={onSetContents}>Fill contents programmatically</button>
//   //       <button disabled={true}>Selection: ({formatRange(selection)})</button>
//   //     </div>
//   //   );
//   // }
//   // function renderSidebar() {
//   //   return (
//   //     <div style={{ overflow: 'hidden', float: 'right' }}>
//   //       <textarea
//   //         style={{ display: 'block', width: 300, height: 300 }}
//   //         value={JSON.stringify(value, null, 2)}
//   //         readOnly={true}
//   //       />
//   //       <textarea
//   //         style={{ display: 'block', width: 300, height: 300 }}
//   //         value={events.join('\n')}
//   //         readOnly={true}
//   //       />
//   //     </div>
//   //   );
//   // }

//   return (
//     <div>
//       {/* {renderToolbar()} */}
//       <hr />
//       {/* {renderSidebar()} */}
//       {enabled && (
//         <ReactQuill
//           theme={theme}
//           value={value}
//           onChange={onEditorChange}
//           onChangeSelection={onEditorChangeSelection}
//           onFocus={onEditorFocus}
//           onBlur={onEditorBlur}
//         />
//       )}
//     </div>
//   );
// };

// export default RichTextExample;

import React, { useRef, useState } from "react";
import ReactQuill from "react-quill"; 
import "react-quill/dist/quill.snow.css";
const EMPTY_DELTA = { ops: [] };

const RichTextExample = ({ content, onTextChange = () => {} }) => {
  const [theme] = useState("snow");
  const [enabled, setEnabled] = useState(true);
  const [value, setValue] = useState(content || EMPTY_DELTA);
  const quillRef = useRef(null);

  const onEditorChange = (value, delta, source, editor) => {
    console.log("delta", delta);
    console.log("output", value);
    setValue(editor.getContents());
    onTextChange(value);
  };

  return (
    <div>
      <hr />
      {enabled && (
        <ReactQuill
          ref={quillRef} // Pass the ref to ReactQuill
          theme={theme}
          value={value}
          onChange={onEditorChange}
        />
      )}
    </div>
  );
};

export default RichTextExample;
