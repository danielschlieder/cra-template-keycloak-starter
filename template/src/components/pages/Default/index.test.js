import * as React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Page from "./index";
import PreLoader from "../../molecules/Preloader";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "../../../keycloak";
import config from "../../../../public/config.json";
async function mockFetch(url) {
  switch (url) {
    case "config.json": {
      return {
        ok: true,
        status: 200,
        json: async () => config,
      };
    }
    default: {
      throw new Error(`Unhandled request: ${url}`);
    }
  }
}
beforeAll(() => jest.spyOn(window, "fetch"));
beforeEach(() => window.fetch.mockImplementation(mockFetch));
describe("Comp without props", () => {
  it("should render without props", async () => {
    const { queryByText } = render(
      <React.Suspense fallback={<PreLoader />}>
        <ReactKeycloakProvider authClient={keycloak}>
          <Page preloader={PreLoader} />
        </ReactKeycloakProvider>
      </React.Suspense>
    );
    await waitFor(() => expect(queryByText("Loading")).not.toBeInTheDocument());
    await waitFor(() => expect(queryByText("Learn React")).toBeInTheDocument());
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
  });
});
