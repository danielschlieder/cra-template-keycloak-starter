import { Nav, NavItem, NavLink } from "reactstrap";
const defaultsProps = {
  app: { config: { title: "Title not set" } },
  label: "Go back home",
};
function NavBrand(props) {
  const myProps = { ...defaultsProps, ...props };
  const goHome = () => {
    window.scrollTo(0, 0);
    document.activeElement.blur();
  };
  return (
    <Nav navbar className="mr-auto" data-testid="navbrand">
      <NavItem key="nb-brand">
        <NavLink
          aria-label={myProps.label}
          onClick={goHome}
          href="#"
          className="navbar-brand nav-item ml-2"
          to="/"
        >
          {myProps.app.config.title}
        </NavLink>
      </NavItem>
    </Nav>
  );
}
export default NavBrand;
