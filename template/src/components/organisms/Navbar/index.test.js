import { render, screen } from "@testing-library/react";
import * as React from "react";
import PreLoader from "../../molecules/Preloader";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "../../../keycloak";
import Comp from "./";

describe("Comp without props", () => {
  it("should render without props", async () => {
    render(
      <React.Suspense fallback={<PreLoader />}>
        <ReactKeycloakProvider authClient={keycloak}>
          <Comp preloader={PreLoader} />
        </ReactKeycloakProvider>
      </React.Suspense>
    );
    const res = await screen.findAllByText(/Loading.../i);
    expect(res.length).toEqual(1);
  });
});
