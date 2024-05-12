import {Button, Navbar} from "react-bootstrap";
import {IoCheckbox} from "react-icons/io5";
import {useNavigate} from "react-router-dom";

function brandStyle() {
  return {
    backgroundColor: "#ffa31a",
    color: "#000",
    border: "none",
    fontWeight: "bold",
    fontSize: "24px",
    fontFamily: "Helvetica, Arial, sans-serif",
    borderRadius: "5px",
    padding: "5px 10px",
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
  };
}

function BrandLogo() {
  const navigate = useNavigate();

  return (
    <Navbar.Brand style={{
      color: "#292929", fontWeight: "bold", fontSize: "24px", display: "flex"
    }}>
      <span style={{color: "#ffa31a", marginRight: "5px", marginTop: "auto", marginBottom: "auto", fontSize: "1.2em"}}>Life</span>
      <Button style={brandStyle()} onClick={() => navigate("/")}>
        <IoCheckbox size={24} color={"#292929"}/>
        Planner
      </Button>
    </Navbar.Brand>
  );
}

export default BrandLogo;