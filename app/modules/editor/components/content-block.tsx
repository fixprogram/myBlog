import { Fragment } from "react";
import StudyInput from "./input-block";
import InputImage from "./input-image";
import TextBlock from "./text-block/text-block";

function formatContent(
  tag: string,
  value: any,
  refName: any,
  setFocusOnPreviousContent: Function,
  setFocusOnNextContent: Function,
  addContent: Function
) {
  switch (tag) {
    case "h1":
      return (
        <h1 className="font-title text-3xl">
          <StudyInput
            initialValue={value}
            placeholder="Heading 1"
            name={tag}
            refName={refName}
          />
        </h1>
      );
    case 'h2':
      return (
        <h2 className="font-title text-2xl">
          <StudyInput
            initialValue={value}
            placeholder="Heading 2"
            name={tag}
            refName={refName}
          />
        </h2>
      )
    case 'h3':
      return (
        <h3 className="font-title text-xl">
          <StudyInput
            initialValue={value}
            placeholder="Heading 3"
            name={tag}
            refName={refName}
          />
        </h3>
      )
    case 'img': 
        return (
          <InputImage />
        )
    case "p":
      return (
        <p style={{ margin: 0 }}>
          <TextBlock
            initialValue={value}
            refName={refName}
            name={tag}
            setFocusOnPreviousContent={setFocusOnPreviousContent}
            addContent={addContent}
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
          addContent={addContent}
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
  addSpace,
  addContent,
  setFocusOnPreviousContent,
  setFocusOnNextContent,
}: {
  tag: string;
  value: string;
  refName: any;
  onRemove: Function;
  addSpace: Function;
  addContent: Function,
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
          if(evt.target.selectionStart !== evt.target.value.length) {
            return
          }
          evt?.preventDefault();
          
          return addSpace();
        }
      }}
      tabIndex={0}
      className="mb-3 relative"
    >
      {formatContent(
        tag,
        value,
        refName,
        setFocusOnPreviousContent,
        setFocusOnNextContent,
        addContent
      )}
    </div>
  );
}
