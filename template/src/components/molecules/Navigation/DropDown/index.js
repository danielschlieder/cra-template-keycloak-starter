import React, { useState } from "react";

import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { FaUser } from "react-icons/fa";
import { useKeycloak } from "@react-keycloak/web";

const DropDown = (props) => {
  const { keycloak } = useKeycloak();
  const [user, setUser] = useState({ name: "Not logged in" });
  if (keycloak.authenticated) {
    if (!keycloak.userInfo || user.name === "Not logged in") {
      keycloak.loadUserInfo().then((u) => {
        setUser(u);
      });
    }
  }

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret>
        <FaUser />
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem header>{user.name}</DropdownItem>
        <DropdownItem href={keycloak.createAccountUrl()}>Account</DropdownItem>
        <DropdownItem divider />
        <DropdownItem onClick={() => keycloak.logout()}>Logout</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropDown;
