import * as React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import PreLoader from "../../../molecules/Preloader";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "../../../../keycloak";
import Comp from "./";

describe("Comp without props", () => {
  it("should render without props", async () => {
    const { queryByText } = await render(
      <React.Suspense fallback={<PreLoader />}>
        <ReactKeycloakProvider authClient={keycloak}>
          <Comp />
        </ReactKeycloakProvider>
      </React.Suspense>
    );
    await waitFor(() => expect(queryByText("loading")).not.toBeInTheDocument());
    const l = await screen.findAllByText(/Not logged in/i);
    expect(l.length).toEqual(1);
    const s = await screen.findAllByText(/Account/i);
    expect(s.length).toEqual(1);
    const t = await screen.findAllByText(/Logout/i);
    expect(t.length).toEqual(1);
  });
});
