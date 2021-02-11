import React, { useState, lazy } from "react";
import { Collapse, NavbarToggler, Nav } from "reactstrap";
const DropDown = lazy(() => import("../DropDown"));

function Navs(props) {
  const [isOpen, setIsOpen] = useState(props.isOpen);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <NavbarToggler data-testid="navbar-toggler" onClick={toggle} />
      <Collapse data-testid="navbar-collapse" isOpen={isOpen} navbar>
        <Nav className="ml-auto text-center" navbar>
          <DropDown />
        </Nav>
      </Collapse>
    </>
  );
}
export default Navs;
