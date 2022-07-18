import React from "react"
import { Navbar, Container, Nav } from "react-bootstrap"
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
                            <Nav.Link className="text-white" style={styles.navbarElement}>Test</Nav.Link>
                        </Link>

                        <Nav.Link 
                            className="text-white" 
                            href="https://translate.google.com/?sl=es&tl=en&op=translate"
                            target="_blank"
                            style={styles.navbarElement}
                        >Google Translate</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

const styles: {
    [index: string]: React.CSSProperties
}  = {
    navbarElement: {
        marginLeft: "20px"
    }
}

export default NavbarComponent