import React from "react"
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap"
import Link from "next/link"

const NavbarComponent = () => {
    return (
        <Navbar bg="primary" expand="lg" sticky="top">
            <Container>
                <Link href="/" passHref>
                    <Navbar.Brand href="/" className="text-white">
                        <img
                            alt=""
                            src="/translation.png"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                        Translate
                    </Navbar.Brand>
                </Link>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link href="/test" passHref>
                            <Nav.Link className="text-white">Test</Nav.Link>
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavbarComponent