import React from "react";
import "./index.scss";
import "./theme.scss";
function Header(props) {
  if (props.withHeader === true) {
    return (
      <div className="page-header container">
        <div className="row">
          <div className="col-print-4 text-left">
            {props.app.config.page.title}
          </div>
          <div className="col-print-4 text-center">{props.date}</div>
          <div className="col-print-4 text-right page-number"></div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
function Footer(props) {
  if (props.withFooter === true) {
    return (
      <div className="page-footer container">
        <div className="row">
          <div className="col-print-4 text-left">
            {props.app.config.page.title}
          </div>
          <div className="col-print-4 text-center">{props.date}</div>
          <div className="col-print-4 text-right page-number"></div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
export default function Layout(props) {
  let style = {};
  let className = "";
  let date = new Date(Date.now()).toLocaleDateString("de-DE", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  if (props.style) {
    style = { style, ...props.style };
  }
  if (props.className) {
    className = className + " " + props.className;
  }
  return (
    <div id={props.id} className={`${className}`} style={style}>
      <Header app={props.app} date={date} />
      {props.children}
      <Footer app={props.app} date={date} />
    </div>
  );
}
