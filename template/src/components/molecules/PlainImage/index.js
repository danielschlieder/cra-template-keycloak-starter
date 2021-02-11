import "./index.scss";
const defaultsProps = {
  src: "https://via.placeholder.com/300.png",
};
function Img(props) {
  return (
    <>
      {props.src.match("^http") === null ? (
        <img
          style={props.imgStyle}
          width={props.width}
          height={props.height}
          src={props.src}
          className={`${props.imgClassName || ""}`}
          alt={props.alt || "alternative text not set"}
        />
      ) : (
        <img
          style={props.imgStyle}
          width={props.width}
          height={props.height}
          src={props.src}
          className={`${props.imgClassName || ""}`}
          alt={props.alt || "alternative text not set"}
        />
      )}
    </>
  );
}
function Image(props) {
  const myProps = { ...defaultsProps, ...props };

  if (myProps.div === true) {
    return (
      <div className={myProps.className} style={myProps.style}>
        <Img
          src={myProps.src}
          style={myProps.imgStyle}
          width={myProps.width}
          height={myProps.height}
          imgStyle={myProps.imgStyle}
          imgClassName={myProps.imgClassName}
          alt={myProps.alt}
        />
        ;
      </div>
    );
  } else {
    return (
      <Img
        src={myProps.src}
        style={myProps.imgStyle}
        width={myProps.width}
        height={myProps.height}
        imgStyle={myProps.imgStyle}
        imgClassName={myProps.imgClassName}
        alt={myProps.alt}
      />
    );
  }
}
export default Image;
