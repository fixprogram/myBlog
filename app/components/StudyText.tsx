// import { useState } from "react";
// // import { StudyTextareaTemplate } from "./lib";

// export default function StudyText({
//   initialValue = "",
//   refName,
//   name,
//   setFocusOnPreviousContent,
//   height = "25px",
// }: {
//   initialValue?: string;
//   refName: any;
//   name: string;
//   setFocusOnPreviousContent: Function;
//   height?: string;
// }) {
//   const [value, setValue] = useState(initialValue);

//   return (
//     <textarea
//       ref={refName}
//       value={value}
//       onChange={(evt) => {
//         setValue(evt.target.value);
//         evt.target.style.height = `${evt.target.scrollHeight}px`;
//       }}
//       onKeyDown={(evt) => {
//         const target = evt.target as HTMLInputElement;
//         if (evt.code === "Backspace" && target.value.length === 0) {
//           setFocusOnPreviousContent();
//         }
//       }}
//       style={{ height }}
//       className="mb-5 w-full text-xl focus:outline-none"
//       name={name}
//       onFocus={(e) => {
//         e.target.placeholder = `Type '/' for commands`;

//         return e.currentTarget.setSelectionRange(
//           e.currentTarget.value.length,
//           e.currentTarget.value.length
//         );
//       }}
//       onBlur={(e) => (e.target.placeholder = "")}
//     />
//   );
// }
