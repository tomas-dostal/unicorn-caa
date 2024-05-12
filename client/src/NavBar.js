import {useContext} from "react";
import {UserContext} from "./context/UserContext";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import Icon from "@mdi/react";
import {mdiLogout} from "@mdi/js";

import BrandLogo from "./Logo";

function NavBar() {
  const {userList, loggedInUser, handlerMap} = useContext(UserContext);

  return (
    <Navbar expand="lg" style={componentStyle()}>
      <Container>
        <BrandLogo/>
        <Nav>
          <NavDropdown style={componentStyle()}
                       title={loggedInUser ? loggedInUser.name : "Prihlasit se"}
                       drop={"start"}
          >
            {getUserMenuList({userList, loggedInUser, handlerMap})}
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
}

function componentStyle() {
  return {
    backgroundColor: "#292929",
    color: "#ffa31a" ,
  };
}

function brandStyle() {
  return {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    backgroundColor: "#ffa31a",
    color: "#ffa31a"


  };
}

function getUserMenuList({userList, loggedInUser, handlerMap}) {
  // fixme temporary solution to enable login/logout
  const userMenuItemList = userList.map((user) => (
    <NavDropdown.Item variant="dark" key={user.id} onClick={() => handlerMap.login(user.id)}>
      {user.name}
    </NavDropdown.Item>
  ));

  if (loggedInUser) {
    userMenuItemList.push(<NavDropdown.Divider key={"divider"}/>);
    userMenuItemList.push(
      <NavDropdown.Item
        variant="dark"
        key={"logout"}
        onClick={() => handlerMap.logout()}
        style={{color: "red"}}
      >
        <Icon path={mdiLogout} size={0.8} color={"red"}/> {"Odhlas se"}
      </NavDropdown.Item>
    );
  }

  return userMenuItemList;
}

export default NavBar;
