import React, { lazy } from "react";
import { Navbar } from "reactstrap";
import "./index.scss";
const NavBrand = lazy(() => import("../../molecules/Navigation/NavBrand"));
const Navs = lazy(() => import("../../molecules/Navigation/Navs"));
function Navgation(props) {
  return (
    <Navbar className="fixed-top navbar-expand-sm stroke">
      <NavBrand {...props} />
      <Navs />
    </Navbar>
  );
}
export default Navgation;
