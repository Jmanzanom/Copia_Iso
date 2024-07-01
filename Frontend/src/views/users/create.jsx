import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createUser } from "../../repositories/user";

export default function create() {
  const history = useHistory();

  const [state, setState] = useState({
    nombre: "",
    apellido: "",
    rut: "",
    email: "",
    montoPrestamo: "",
    tasa: "",
    plazo: "",
  });

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await createUser(state);
      history.push(`/users/${response.data.id}`);
    } catch (error) {
      console.log(error);
      alert("Ha ocurrido un error al actualizar");
    }
  };

  return (
    <div className="container mt-4">
      <form onSubmit={submitForm}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <input
            className="form-control"
            id="nombre"
            type="text"
            value={state.nombre}
            onChange={(e) => setState({ ...state, nombre: e.target.value })}
            placeholder="Ingrese Nombre"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="apellido">Apellido</label>
          <input
            className="form-control"
            id="apellido"
            type="text"
            value={state.apellido}
            onChange={(e) => setState({ ...state, apellido: e.target.value })}
            placeholder="Ingrese Apellido"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="rut">RUT</label>
          <input
            className="form-control"
            id="rut"
            type="text"
            value={state.rut}
            onChange={(e) => setState({ ...state, rut: e.target.value })}
            placeholder="Ingrese RUT"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            className="form-control"
            id="email"
            type="email"
            value={state.email}
            onChange={(e) => setState({ ...state, email: e.target.value })}
            placeholder="Ingrese Email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="montoPrestamo">Monto del Préstamo</label>
          <input
            className="form-control"
            id="montoPrestamo"
            type="text"
            value={state.montoPrestamo}
            onChange={(e) => setState({ ...state, montoPrestamo: e.target.value })}
            placeholder="Ingrese Monto del Préstamo"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="tasa">Tasa</label>
          <input
            className="form-control"
            id="tasa"
            type="text"
            value={state.tasa}
            onChange={(e) => setState({ ...state, tasa: e.target.value })}
            placeholder="Ingrese Tasa"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="plazo">Plazo</label>
          <input
            className="form-control"
            id="plazo"
            type="text"
            value={state.plazo}
            onChange={(e) => setState({ ...state, plazo: e.target.value })}
            placeholder="Ingrese Plazo"
            required
          />
        </div>
        <div className="float-right">
          <button type="submit" className="btn btn-primary">
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
}
