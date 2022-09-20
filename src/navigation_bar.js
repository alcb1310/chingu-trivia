import React from "react";

import { Navbar, NavbarBrand, Container } from "react-bootstrap";

function NavigationBar() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <NavbarBrand className="ms-auto me-auto navbar-title" href="#home">Chingu Trivia</NavbarBrand>
      </Container>
    </Navbar>
  );
}
export default NavigationBar;
