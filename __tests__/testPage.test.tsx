import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

import React from "react";
import TestPage from "../src/pages/test/TestPage";
import userEvent from "@testing-library/user-event";

test("TestPage 있다.", async () => {
  render(<TestPage />);

  const user = userEvent.setup();

  // te?st 라는 텍스트가 문서에 있다.
  expect(screen.getByText("te?st")).toBeInTheDocument();
  // text 라는 클래스를 가진 엘리먼트는 없다.
  expect(document.getElementsByClassName("text").length).toBe(0);

  //   // hello 라는 텍스트를 클릭하면
  //   await user.click(screen.getByText("hello"));
  //   // text 라는 클래스를 가진 엘리먼트가 하나 있다.
  //   expect(document.getElementsByClassName("text").length).toBe(1);

  //   // hello 라는 텍스트를 다시 클릭하면
  //   await user.click(screen.getByText("hello"));
  //   // text 라는 클래스를 가진 엘리먼트는 없다.
  //   expect(document.getElementsByClassName("text").length).toBe(0);
});
