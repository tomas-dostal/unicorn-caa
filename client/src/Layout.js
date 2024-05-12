import { Outlet } from "react-router-dom";

import NavBar from "./NavBar";

const Layout = () => {
  return (
    <>
      <div className="card-header">
        <NavBar />
      </div>
      <div style={bodyStyle()}>
        <Outlet />
      </div>
      <div className={"card-footer text-black-50"} style={footerStyle()}>
        © Ivo Milota, Tomas Dostal
      </div>
    </>
  );
};

function bodyStyle() {
  return {
    overflow: "auto",
    padding: "16px",
    flex: "1",
    color: "#ffffff"
  };
}

function footerStyle() {
  return { padding: "8px", textAlign: "center", backgroundColor: "#292929" };
}

export default Layout;
