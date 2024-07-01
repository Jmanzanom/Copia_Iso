import React, {useState, useEffect} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



function Simulador() {
    return (
        <div className="row">
            <h1>Simulador</h1>
            <Container>
                <Row>
                    <Col>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Tasa</Form.Label>
                                <Form.Control type="number" placeholder="Tasa" />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>ValorUF</Form.Label>
                                <Form.Control type="number" placeholder="ValorUF" />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Plazo</Form.Label>
                                <Form.Control type="number" placeholder="Plazo" />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>CuotaUF</Form.Label>
                                <Form.Control type="number" placeholder="CuotaUF" />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Simular
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
            
        </div>
    )
}

export default Simulador;

