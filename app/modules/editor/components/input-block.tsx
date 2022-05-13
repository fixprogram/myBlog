import { useState } from "react";

export default function StudyInput({
  initialValue,
  placeholder,
  refName,
  name,
}: {
  initialValue: string;
  placeholder?: string;
  refName: any;
  name: string;
}) {
  const [value, setValue] = useState(initialValue);
  return (
    <input
      type="text"
      value={value}
      onChange={(event) => {
        setValue(event.target.value);
      }}
      placeholder={placeholder}
      className="mb-5 w-full text-xl focus:outline-none"
      ref={refName}
      name={name}
    />
  );
}
