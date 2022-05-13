import { expect, describe, it, test, afterEach } from "vitest";
import { screen, render, fireEvent, cleanup } from "@testing-library/react";
import React from "react";
import TextareaBlock from "./textarea-block";
import userEvent from "@testing-library/user-event";

const props = {
  addContent: "",
  addSpace: "",
  setFocusOnLastContent: "",
};

describe("Textarea Block Component", () => {
  afterEach(() => {
    cleanup();
  });

  test("Placeholder is showed only by focus", () => {
    render(<TextareaBlock {...props} />);

    const textarea = screen.getByPlaceholderText(
      /type/i
    ) as HTMLTextAreaElement;
    expect(textarea.value).toBe("");
    expect(textarea).toHaveFocus();
    // fireEvent.focusOut(textarea);
    // fireEvent.blur(textarea);
    // userEvent.tab();
    // screen.getByText("").focus();
    // const textareaAgain = screen.queryByPlaceholderText(/type/i);
    // expect(textareaAgain).toBeUndefined();
    // screen.debug();
  });

  test("We can type inside the textarea", () => {
    render(<TextareaBlock {...props} />);
    const textarea = screen.getByPlaceholderText(
      /type/i
    ) as HTMLTextAreaElement;
    // userEvent.type(textarea, "Some text");
    // expect(textarea.value).toBe("Some text");
  });
});
