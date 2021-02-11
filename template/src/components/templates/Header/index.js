import "./index.scss";
import Layout from "../../../helpers/Layout";
import App from "../../organisms/App";

function Header(props) {
  let layout = {
    padding: "0rem",
    margin: "auto",
    height: "100vh",
  };
  return (
    <Layout
      id={props.id}
      style={layout}
      className={`${props.layoutClassName || ""} `}
    >
      <header className={` ${props.className || ""}`}>
        <App />
        {props.children}
      </header>
    </Layout>
  );
}
export default Header;
