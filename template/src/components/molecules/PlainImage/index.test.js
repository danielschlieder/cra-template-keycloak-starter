import * as React from "react";
import { render, screen } from "@testing-library/react";
import Comp from "./";
describe("Comp without props", () => {
  it("should render with placeholer", async () => {
    render(
      <React.Suspense fallback={<div>loading</div>}>
        <Comp />
      </React.Suspense>
    );
    const res = await screen.findAllByRole("img");
    expect(res.length).toEqual(1);
    expect(res[0].hasAttribute("height")).toEqual(false);
    expect(res[0].hasAttribute("width")).toEqual(false);
    expect(res[0].hasAttribute("alt")).toEqual(true);
    expect(res[0].getAttribute("alt")).toEqual("alternative text not set");
    expect(res[0].hasAttribute("class")).toEqual(true);
    expect(res[0].getAttribute("class")).toEqual("");
    expect(res[0].hasAttribute("src")).toEqual(true);
    expect(res[0].getAttribute("src")).toEqual(
      "https://via.placeholder.com/300.png"
    );
  });
});
