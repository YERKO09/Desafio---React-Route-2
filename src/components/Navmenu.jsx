import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import logoPokemon from "../assets/img/International_Pokémon_logo.svg.png"

const Navmenu = () => {

  // "active es el nombre de la clase, isActive es un atributo del componente Link
  // o en este caso NavLink y devuelve como resultado true o false"  
  const setActiveClass = ({ isActive }) => isActive ? "active" : "inactive";
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="">
            <NavLink className={setActiveClass} to="/">
              <img src={logoPokemon} alt="logoPokemon" className="logoPokemon"/>
            </NavLink>
          </Navbar.Brand>
          <Nav className="ms-auto gap-3">
            <NavLink className={setActiveClass} to="/">
                Home
            </NavLink>
            <NavLink className={setActiveClass} to="/pokemones">
                Pokemones
            </NavLink>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Navmenu;
