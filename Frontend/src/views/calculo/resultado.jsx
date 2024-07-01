import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import {
    Link,
  } from "react-router-dom";
import { Table } from "react-bootstrap";

export default function Resultado() {
    return (
        <Container fluid>
            <Row className="justify-content-center">
                <Col md={6}>
                <h2 className="text-center">Resultados simulación</h2>
                        <Form>
                            <Form.Group as={Row} className="mb-3" controlId="formTasaResult">
                                <Form.Label column sm="2">Tasa</Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue="20" />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" controlId="formValorUF">
                                <Form.Label column sm="2">ValorUF</Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue="34.523 CLP" />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" controlId="formPlazoResult">
                                <Form.Label column sm="2">Plazo</Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue="24" />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" controlId="formCuotaUF">
                                <Form.Label column sm="2">Cuota UF</Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue="3 UF" />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" controlId="formTotal">
                                <Form.Label column sm="2">Total</Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue="525.149 CLP" />
                                </Col>
                            </Form.Group>
                            <Row>
                                <Col>
                                    <Link to= "/calculo">
                                        <Button variant="primary" type="submit" className="w-100">
                                            Volver
                                        </Button>
                                    </Link>
                                </Col>
                                <Col>
                                    <Link to= "/">
                                        <Button variant="success" type="submit" className="w-100">
                                            Enviar
                                        </Button>
                                    </Link>
                                </Col>

                            </Row>
                            <td></td>
                            <Row>
                                <Col>
                                    <Link to= "/">
                                        <Button variant="secondary" type="submit" className="w-100">
                                            Enviar a correo
                                        </Button>
                                    </Link>
                                </Col>
                            </Row>
                        </Form>
                </Col>
            </Row>
            
            
        </Container>
    );
}