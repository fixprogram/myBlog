import { Form } from "@remix-run/react";
import { useReducer, useRef, useEffect } from "react";
import ContentBlock from "./components/content-block";
import { reducer, initialState, ActionKind } from "./reducer";
import TextareaBlock from "./components/textarea-block/textarea-block";

export const Editor = ({ data }: { data: { title: ""; content: [] } }) => {
  const [{ onText, content, focusIndex, title }, dispatch] = useReducer(
    reducer,
    {
      ...initialState,
    }
  );
  const itemsRef = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    if (data) {
      dispatch({
        type: ActionKind.SetContent,
        payload: { title: data?.title, content: data?.content },
      });
    }
  }, [data]);

  useEffect(() => {
    itemsRef.current = itemsRef.current.slice(0, content?.length);
  }, [content]);

  useEffect(() => {
    setFocusOn(focusIndex);
  }, [focusIndex]);

  function setFocusOn(idx: number) {
    itemsRef.current[idx]?.focus();
  }

  function setFocusOnLastContent() {
    itemsRef.current[content?.length - 1]?.focus();
  }

  function setFocusOnNextContent(idx: number) {
    itemsRef.current[idx + 1]?.focus();
  }

  function setFocusOnPreviousContent(idx: number) {
    if (itemsRef.current[idx - 1]) {
      itemsRef.current[idx - 1]?.focus();
    }
  }

  return (
    <section className="mx-auto mt-5 w-full max-w-3xl px-5">
      {/* <Form method="post"> */}
      {content?.map(({ tag, value }: any, idx: number) => {
        return (
          <ContentBlock
            tag={tag}
            value={value}
            key={idx + value}
            onRemove={() => {
              dispatch({
                type: ActionKind.RemoveContent,
                payload: { idx },
              });
            }}
            onAdd={() => {
              dispatch({ type: ActionKind.AddSpace, payload: { idx } });
              // setFocusOnNextContent(idx);
            }}
            refName={(el: any) => (itemsRef.current[idx] = el)}
            setFocusOnNextContent={() => setFocusOnNextContent(idx)}
            setFocusOnPreviousContent={() => setFocusOnPreviousContent(idx)}
          />
        );
      })}

      {onText ? (
        <TextareaBlock
          addContent={(payload: any) =>
            dispatch({ type: ActionKind.AddContent, payload })
          }
          addSpace={() =>
            dispatch({
              type: ActionKind.AddSpace,
              payload: { idx: focusIndex },
            })
          }
          setFocusOnLastContent={setFocusOnLastContent}
          height={"calc(100vh - 95px"}
        />
      ) : (
        <div
          style={{ height: "100vh" }}
          onClick={() => {
            dispatch({ type: ActionKind.Focus });
          }}
        ></div>
      )}
      {/* </Form> */}
    </section>
  );
};
