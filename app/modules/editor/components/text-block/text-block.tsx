import { useEffect, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

export default function TextBlock({
  initialValue = "",
  refName,
  name,
  setFocusOnPreviousContent,
}: {
  initialValue?: string;
  refName: any;
  name: string;
  setFocusOnPreviousContent: Function;
}) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    if (refName.target) {
      refName.target.style.height = `${refName.target.scrollHeight}px`;
    }
  }, [refName, value]);

  return (
    <TextareaAutosize
      minRows={1}
      ref={refName}
      value={value}
      onChange={(evt) => {
        setValue(evt.target.value);
      }}
      onKeyDown={(evt) => {
        const target = evt.target as HTMLInputElement;
        if (evt.code === "Backspace" && target.value.length === 0) {
          setFocusOnPreviousContent();
        }
      }}
      className="mb-5 w-full text-xl focus:outline-none"
      name={name}
      onFocus={(e) => {
        e.target.placeholder = `Type '/' for commands`;

        return e.currentTarget.setSelectionRange(
          e.currentTarget.value.length,
          e.currentTarget.value.length
        );
      }}
      onBlur={(e) => (e.target.placeholder = "")}
    />
  );
}
