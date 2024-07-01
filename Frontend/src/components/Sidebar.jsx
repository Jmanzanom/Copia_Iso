import React from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import {
  Link,
} from "react-router-dom";

export default function Sidebar() {
    return (
        <Navbar className="bg-light" >
            <Nav defaultActiveKey="/" className="flex-column sidebar-sticky">
                <Link to="/"><Nav.Link href="/">Inicio</Nav.Link></Link>
                <Link to="/users"><Nav.Link href="/users">Clientes</Nav.Link></Link>
                <Link to="/solicitudes"><Nav.Link href="/solicitudes">Solicitudes</Nav.Link></Link>
                <Link to="/uf"><Nav.Link href="/uf">Simulador</Nav.Link></Link>
                <Link to="/deudas"><Nav.Link href="/deudas">Deudas</Nav.Link></Link>
            </Nav>
        </Navbar>
        )
}
