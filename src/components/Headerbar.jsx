import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import HeaderbarStyle from '../styles/HeaderbarStyle.css';
/* import { mdiAccountOutline } from '@mdi/react'; */
import cinemaLogo from '../movie-roll (1).png'
import { Link } from "react-router-dom";

function Headerbar() {
  return (
    <Navbar expand="lg" id="Bar" fixed="top" class="navbar navbar-expand-lg navbar-light bg-lignt" >
      <Container>
        <Navbar.Brand>
          <Link id="cinemaLogo" to={"/"}>
            <img id="cinemaLogo" alt="Movie Cover" src={cinemaLogo} /></Link>
        </Navbar.Brand>
        <Navbar.Brand>
          <Link id="cinemaLogo" to={"/"} id="Name-of-cinema" >Cinema Awesome</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link id="Movie Schedule" to={"/"} id="link">Programm</Link>
            {/*             <div class="vl"></div> */}
            <Link id="aboutUs" to={"/about"} id="link">Über uns</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Headerbar;