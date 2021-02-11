import { render, screen } from "@testing-library/react";
import Comp from "./";
const data = {
  msg: "testmessage",
};
describe("Comp without props", () => {
  it("should render without props", async () => {
    render(<Comp />);
    const res = await screen.findAllByText(/Loading.../i);
    expect(res.length).toEqual(1);
  });
});
describe("Comp with props", () => {
  it("should render with props", async () => {
    render(<Comp {...data} />);
    const res = await screen.findAllByText(data.msg);
    expect(res.length).toEqual(1);
  });
});
