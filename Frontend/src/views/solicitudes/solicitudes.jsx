import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';

import { Link } from "react-router-dom";

export default function Solicitudes() {
    return (
        <Container fluid>
            <Row className="justify-content-center">
                <Col md={6}>
                    <h2 className="text-center">Solicitudes</h2>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col fluid>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Rut</th>
                                <th>Correo</th>
                                <th>Monto</th>
                                <th>Plazo</th>
                                <th>Estado</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Juan</td>
                                <td>Perez</td>
                                <td>12345678-9</td>
                                <td>juan@gmail.com</td>
                                <td>100000</td>
                                <td>12</td>
                                <td>
                                    <Button variant="warning" text="dark">
                                        Pendiente
                                    </Button>
                                </td>
                                <td>
                                    <Button variant="primary" type="submit" className="w-100">
                                        Ver
                                    </Button>
                                </td>
                            </tr>
                            <tr>
                                <td>Maria</td>
                                <td>Lopez</td>
                                <td>98765432-1</td>
                                <td>maria@gmail.com</td>
                                <td>50000</td>
                                <td>6</td>
                                <td>
                                    <Button variant="success" text="dark">
                                        Aprobada
                                    </Button>
                                </td>
                                <td>
                                    <Button variant="primary" type="submit" className="w-100">
                                        Ver
                                    </Button>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};
