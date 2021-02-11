import { useState, useEffect, useCallback } from "react";
import React, { lazy } from "react";
import Switch from "react-switch";
import { useKeycloak } from "@react-keycloak/web";
import { Button, ButtonGroup } from "reactstrap";
import "./index.scss";
const Header = lazy(() => import("../../templates/Header"));
const Navbar = lazy(() => import("../../organisms/Navbar"));
let url = "config.json";
let dfltTheme = "dark";

function Page(props) {
  const PreLoader = props.preloader;
  const { keycloak } = useKeycloak();
  let [theme, setTheme] = useState(dfltTheme);
  const [state, setState] = useState({
    config: false,
    loading: true,
  });
  let themeClass = `theme-${theme}`;
  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };
  const login = useCallback(() => {
    keycloak.login();
  }, [keycloak]);
  const register = useCallback(() => {
    keycloak.register();
  }, [keycloak]);
  const fetchUrl = async () => {
    const response = await fetch(url);
    const json = await response.json();
    setState({ loading: false, config: json });
  };
  useEffect(() => {
    if (state.loading === true) {
      fetchUrl();
    }
  });
  if (state.config === false) {
    return <PreLoader msg="Loading config ..." />;
  }
  return (
    <>
      <Header
        id="App"
        layoutClassName={`${themeClass || ""} `}
        className="App-header"
      >
        {keycloak.authenticated ? (
          <Navbar app={{ config: state.config }} />
        ) : null}
        <div style={{ width: "100%", marginTop: "1rem", textAlign: "center" }}>
          <Switch
            onChange={toggleTheme}
            checked={theme === dfltTheme ? true : false}
          />
        </div>
        {keycloak.authenticated ? (
          <ButtonGroup className="mt-5">
            <Button
              className="btn btn-info"
              type="button"
              onClick={() => keycloak.logout()}
            >
              Logout
            </Button>
          </ButtonGroup>
        ) : (
          <ButtonGroup className="mt-5">
            <Button className="mx-3 btn btn-info" type="button" onClick={login}>
              Login
            </Button>
            <span>or</span>
            <Button
              className="mx-3 btn btn-success"
              type="button"
              onClick={register}
            >
              Register
            </Button>
          </ButtonGroup>
        )}
      </Header>
    </>
  );
}
export default Page;
