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
  addSpace,
  setFocusOnPreviousContent,
  setFocusOnNextContent,
}: {
  tag: string;
  value: string;
  refName: any;
  onRemove: Function;
  addSpace: Function;
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
