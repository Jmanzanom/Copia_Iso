// CalculoPage.js

import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./calculopage.css"; // Importa el archivo CSS

function CalculoPage() {
  const handleSimulate = (e) => {
    e.preventDefault();
    alert("Simulación completada. Resultados: ...");
  };

  return (
    <div>
      <header>
        <h1>Financiera La Clave</h1>
      </header>

      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <h2 className="text-center">Simulador</h2>
            <Form>
              <Form.Group controlId="formTasa">
                <Form.Label>Tasa</Form.Label>
                <Form.Control type="number" placeholder="Tasa" />
              </Form.Group>

              <Form.Group controlId="formPlazo">
                <Form.Label>Plazo</Form.Label>
                <Form.Control type="number" placeholder="Plazo" />
              </Form.Group>

              <Form.Group controlId="formCuotaUF">
                <Form.Label>CuotaUF</Form.Label>
                <Form.Control type="number" placeholder="CuotaUF" />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100" onClick={handleSimulate}>
                Simular
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>

      <section className="mt-4">
        <h3>¿Cómo utilizar el simulador?</h3>
        <p>Complete los campos con la información necesaria y haga clic en "Simular" para obtener los resultados.</p>
      </section>

      <footer className="mt-5">
        <p>&copy; 2023 Financiera La Clave | Contáctanos: contacto@financieralaclave.com</p>
      </footer>
    </div>
  );
}

export default CalculoPage;





