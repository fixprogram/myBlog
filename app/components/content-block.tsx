import StudyInput from "./StudyInput";
import StudyText from "./StudyText";

export default function ContentBlock({
  //   tag,
  value,
  refName,
  onRemove,
  onAdd,
}: //   setFocusOnPreviousContent,
{
  //   tag: string;
  value: string;
  refName: any;
  onRemove: Function;
  onAdd: Function;
  //   setFocusOnPreviousContent: Function;
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
      {/* {formatContent(tag, value, refName, setFocusOnPreviousContent)} */}
      <textarea
        // type="text"
        className="w-full text-xl"
        ref={refName}
        defaultValue={value}
      />
    </div>
  );
}
