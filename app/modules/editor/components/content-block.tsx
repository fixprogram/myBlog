// import { useEffect, useRef, useState } from "react";

// export default function ContentBlock({
//   //   tag,
//   value,
//   // refName,
//   onRemove,
//   onAdd,
//   active,
// }: //   setFocusOnPreviousContent,
// {
//   //   tag: string;
//   value: string;
//   // refName: any;
//   onRemove: Function;
//   onAdd: Function;
//   active: boolean;
//   //   setFocusOnPreviousContent: Function;
// }) {
//   const [blockValue, setBlockValue] = useState(value);
//   const contentBlockRef = useRef<HTMLTextAreaElement>(null);

//   useEffect(() => {
//     if (active) {
//       console.log("Focus");
//       contentBlockRef.current?.focus();
//     }
//   }, [active]);

//   return (
//     <div
//       onKeyDown={(evt) => {
//         const target = evt.target as HTMLInputElement;
//         target.style.height = "inherit";
//         target.style.height = `${evt.target.scrollHeight + 2}px`;
//         if (evt.code === "Backspace" && target.value.length === 0) {
//           onRemove();
//         }
//         // if (evt.code === "1") {
//         //   evt?.preventDefault();
//         //   onAdd();
//         // }
//       }}
//       tabIndex={0}
//       style={{ position: "relative" }}
//     >
//       {/* {formatContent(tag, value, refName, setFocusOnPreviousContent)} */}
//       <textarea
//         // type="text"
//         name="body"
//         className="w-full resize-none text-xl focus:outline-none"
//         // className="sr-only	"
//         ref={contentBlockRef}
//         // defaultValue={value}
//         value={blockValue}
//         onChange={(evt) => setBlockValue(evt.target.value)}
//         placeholder="Start your story..."
//       />
//       {/* <p>{blockValue}</p> */}
//     </div>
//   );
// }

import StudyInput from "./input-block";
import TextBlock from "./text-block/text-block";

function formatContent(
  tag: string,
  value: any,
  refName: any,
  setFocusOnPreviousContent: Function,
  setFocusOnNextContent: Function
) {
  switch (tag) {
    case "h1":
      return (
        <h1>
          <StudyInput
            initialValue={value}
            placeholder="Enter main title"
            name={tag}
            refName={refName}
          />
        </h1>
      );
    case "p":
      return (
        <p style={{ margin: 0 }}>
          <TextBlock
            initialValue={value}
            refName={refName}
            name={tag}
            setFocusOnPreviousContent={setFocusOnPreviousContent}
            // setFocusOnNextContent={setFocusOnNextContent}
          />
        </p>
      );
    case "div":
      return (
        <TextBlock
          refName={refName}
          name={"space"}
          setFocusOnPreviousContent={setFocusOnPreviousContent}
          // setFocusOnNextContent={setFocusOnNextContent}
        />
      );
    default:
      throw new Error(`Unkown tag name: ${tag}`);
  }
}

export default function ContentBlock({
  tag,
  value,
  refName,
  onRemove,
  onAdd,
  setFocusOnPreviousContent,
  setFocusOnNextContent,
}: {
  tag: string;
  value: string;
  refName: any;
  onRemove: Function;
  onAdd: Function;
  setFocusOnPreviousContent: Function;
  setFocusOnNextContent: Function;
}) {
  return (
    <div
      onKeyDown={(evt) => {
        const target = evt.target as HTMLInputElement;
        if (evt.code === "Backspace" && target.value.length === 0) {
          onRemove();
        }
        if (evt.code === "Enter") {
          evt?.preventDefault();
          onAdd();
        }
      }}
      tabIndex={0}
      style={{ position: "relative" }}
    >
      {formatContent(
        tag,
        value,
        refName,
        setFocusOnPreviousContent,
        setFocusOnNextContent
      )}
    </div>
  );
}
