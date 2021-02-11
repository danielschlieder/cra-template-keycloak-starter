const defaultsProps = {
  style: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    overflow: "hidden",
  },
};
function PreLoader(props) {
  const myProps = { ...defaultsProps, ...props };
  return (
    <div style={myProps.style}>
      <div className={`preloader ${props.classname || ""}`}>
        <div className="wrapper">
          <div className="preloader loader"></div>
        </div>
        <div style={{ minHeight: "24px" }}>
          {props.msg || "Loading app ..."}
        </div>
      </div>
    </div>
  );
}
export default PreLoader;
