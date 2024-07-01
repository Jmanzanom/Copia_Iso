import React, { useState } from "react";
import useSWR from "swr";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";
import DeleteForm from "../../components/DeleteForm";
import { deleteUser, getAllUsers, updateUser } from "../../repositories/user";

export default function index() {
  const { data, error, mutate } = useSWR("/users/all", {
    fetcher: getAllUsers,
    initialData: [],
    revalidateOnMount: true,
  });

  const getStatusColor = (estado) => {
    switch (estado) {
      case "pendiente":
        return { colorClass: "bg-secondary", text: "Pendiente" }; // Plomo
      case "aprobado":
        return { colorClass: "bg-success", text: "Aprobado" }; // Verde
      case "rechazado":
        return { colorClass: "bg-danger", text: "Rechazado" }; // Rojo
      default:
        return { colorClass: "", text: "" };
    }
  };

  const handleActionClick = async (id, action) => {
    // Actualizar el estado en la base de datos
    try {
      await updateUser(id, { estado: action });
    } catch (error) {
      console.error("Error al actualizar el estado:", error);
    }

    // Actualizar el estado localmente
    mutate();
  };

  const tbody = [];

  data.forEach(({ id, nombre, apellido, rut, email, monto, tasa, plazo, estado }) => {
    const { colorClass, text } = getStatusColor(estado);

    tbody.push(
      <tr key={id}>
        <td>{nombre}</td>
        <td>{apellido}</td>
        <td>{rut}</td>
        <td>{email}</td>
        <td>{monto}</td>
        <td>{tasa}</td>
        <td>{plazo}</td>
        <td className="text-center" style={{ width: "40px" }}>
          {/* Cuadradito de color con el texto del estado */}
          <span className={`d-block rounded ${colorClass} text-white`} style={{ padding: "5px" }}>
            {text}
          </span>
        </td>
        <td>
          <DropdownButton id={`dropdown-${id}`} title="Acciones">
            <Dropdown.Item>
              <Link to={`users/${id}`}>
                <a href={`users/${id}`} className={`btn ${colorClass} text-white`}>
                  Ver
                </a>
              </Link>
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => handleActionClick(id, "aprobado")}
              style={{ backgroundColor: "#28a745", color: "#fff" }}
            >
              Aprobar
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => handleActionClick(id, "rechazado")}
              style={{ backgroundColor: "#dc3545", color: "#fff" }}
            >
              Rechazar
            </Dropdown.Item>
            <Dropdown.Item>
              <DeleteForm id={id} callback={deleteUser} />
            </Dropdown.Item>
          </DropdownButton>
        </td>
      </tr>
    );
  });

  return (
    <Container className="pt-4">
      <div className="d-flex align-items-center">
        <h1>Listado de Clientes</h1>
        <Link to="/users/create">
          <a href="/users/create" className="ml-4 btn btn-primary">
            Agregar prestamo
          </a>
        </Link>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>RUT</th>
            <th>Email</th>
            <th>Monto del Préstamo</th>
            <th>Tasa</th>
            <th>Plazo</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>{tbody}</tbody>
      </Table>
    </Container>
  );
}
