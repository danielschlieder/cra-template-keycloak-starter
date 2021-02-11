import * as React from "react";
import { render, screen, act, waitFor } from "@testing-library/react";
import PreLoader from "../../../molecules/Preloader";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "../../../../keycloak";
import Comp from "./";

describe("Comp without props", () => {
  it("should render with default 'Title not set'", async () => {
    render(
      <React.Suspense fallback={<PreLoader />}>
        <ReactKeycloakProvider authClient={keycloak}>
          <Comp />
        </ReactKeycloakProvider>
      </React.Suspense>
    );
    const res = await screen.findAllByText(/Not logged in/i);
    expect(res.length).toEqual(1);
  });
  it("should render mocked user info", async () => {
    const kcmock = keycloak;
    kcmock["userInfo"] = {
      name: "testuser",
    };

    kcmock["loadUserInfo"] = jest.fn().mockResolvedValue({
      name: "testuser",
    });
    kcmock["authenticated"] = true;
    await act(async () => {
      const { queryByText } = await render(
        <React.Suspense fallback={<PreLoader />}>
          <ReactKeycloakProvider authClient={kcmock}>
            <Comp />
          </ReactKeycloakProvider>
        </React.Suspense>
      );

      await waitFor(() =>
        expect(queryByText("loading")).not.toBeInTheDocument()
      );
      const l = await screen.findAllByText(/testuser/i);
      expect(l.length).toEqual(1);
      const s = await screen.findAllByText(/Account/i);
      expect(s.length).toEqual(1);
      const t = await screen.findAllByText(/Logout/i);
      expect(t.length).toEqual(1);
    });
  });
});
