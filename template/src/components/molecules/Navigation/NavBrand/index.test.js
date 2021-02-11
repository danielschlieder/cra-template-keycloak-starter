import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import Comp from "./";
const spyScrollTo = jest.fn();

describe("Comp without props", () => {
  it("should render with default 'Title not set'", async () => {
    render(
      <React.Suspense fallback={<div>loading</div>}>
        <Comp />
      </React.Suspense>
    );
    const res = await screen.findAllByText(/Title not set/i);
    expect(res.length).toEqual(1);
  });
});
describe("Comp with props", () => {
  beforeEach(() => {
    Object.defineProperty(global.window, "scrollTo", { value: spyScrollTo });
    Object.defineProperty(global.window, "scrollY", { value: 1 });
    spyScrollTo.mockClear();
  });
  it("should render with prop 'app' to set the title", async () => {
    render(
      <React.Suspense fallback={<div>loading</div>}>
        <Comp app={{ config: { title: "nice title" } }} />
      </React.Suspense>
    );
    const res = await screen.findAllByText(/nice title/i);
    expect(res.length).toEqual(1);
  });
  it("should render link to home", async () => {
    render(
      <React.Suspense fallback={<div>loading</div>}>
        <Comp />
      </React.Suspense>
    );
    const res = await screen.findAllByRole("link");
    expect(res.length).toEqual(1);
    expect(res[0].href).toEqual("http://localhost/#");
  });
  it("should have correct aria-label", async () => {
    render(
      <React.Suspense fallback={<div>loading</div>}>
        <Comp />
      </React.Suspense>
    );
    const res = await screen.findAllByRole("link");
    expect(res[0].hasAttribute("aria-label")).toEqual(true);
    expect(res[0].getAttribute("aria-label")).toEqual("Go back home");
  });
  it("should use passed in aria-label", async () => {
    render(
      <React.Suspense fallback={<div>loading</div>}>
        <Comp label="test" />
      </React.Suspense>
    );
    const res = await screen.findAllByRole("link");
    expect(res[0].hasAttribute("aria-label")).toEqual(true);
    expect(res[0].getAttribute("aria-label")).toEqual("test");
  });
  it("should render with custom title", async () => {
    render(
      <React.Suspense fallback={<div>loading</div>}>
        <Comp label="test" app={{ config: { title: "mytitle" } }} />
      </React.Suspense>
    );
    const res = await screen.findAllByRole("link");
    fireEvent.click(res[0]);
  });
  it("should scroll home on click", async () => {
    render(
      <React.Suspense fallback={<div>loading</div>}>
        <Comp label="test" app={{ config: { title: "mytitle" } }} />
      </React.Suspense>
    );

    const res = await screen.findAllByRole("link");
    fireEvent.click(res[0]);
    expect(spyScrollTo).toHaveBeenCalledWith(0, 0);
  });
});
