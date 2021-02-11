import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";
import Page from "../components/pages/Default";

export function PrivateRoute({ component: Component, ...rest }) {
  const { keycloak } = useKeycloak();
  return (
    <Route
      {...rest}
      render={(props) =>
        keycloak?.authenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}

export const PageRouter = (props) => {
  const PreLoader = props.preloader;
  const { initialized, keycloak } = useKeycloak();

  console.log(keycloak);
  if (!initialized) {
    return <PreLoader msg={`Contacting keycloak host ...`} />;
  }
  return (
    <Router>
      <Redirect from="/" to="/home" />
      <Route path="/home" render={(props) => <Page preloader={PreLoader} />} />
      {/* <PrivateRoute path="/somewhereelse" component={ProtectedContent} /> */}
    </Router>
  );
};
