import { useEffect, useState, useRef } from "react";
import TextareaAutosize from "react-textarea-autosize";

export default function TextareaBlock({
  addContent,
  addSpace,
  setFocusOnLastContent,
}) {
  const [value, setValue] = useState("");
  const ref = useRef<HTMLTextAreaElement | null>(null);
  useEffect(() => {
    ref.current?.focus();
  }, []);

  useEffect(() => {
    const match = /\r|\n/.exec(value);

    if (match) {
      if (value.length === 1) {
        addSpace();
      } else {
        addContent({ tag: "p", value: value, idx: null });
      }
      setValue("");
    }

    if (value.startsWith("# ")) {
      setValue("");
      addContent({ tag: "h1", value: "" });
    }
  }, [value, addContent, setFocusOnLastContent]);

  return (
    <TextareaAutosize
      ref={ref}
      value={value}
      onChange={(evt) => {
        setValue(evt.target.value);
      }}
      onKeyDown={(evt) => {
        const target = evt.target as HTMLInputElement;
        if (evt.code === "Backspace" && target.value.length === 0) {
          setFocusOnLastContent();
        }
      }}
      className="mb-5 w-full resize-none text-xl focus:outline-none"
      onFocus={(e) => (e.target.placeholder = `Type '/' for commands`)}
      onBlur={(e) => (e.target.placeholder = "")}
    />
  );
}
