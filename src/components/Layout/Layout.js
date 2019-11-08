import React, { Fragment } from "react";
import styled from "./Layout.module.css";

const Layout = props => {
  return (
    <Fragment>
      <div>Toolbar, Sidebar, Backdrop</div>
      <main className={styled.content}>{props.children}</main>
    </Fragment>
  );
};
export default Layout;
