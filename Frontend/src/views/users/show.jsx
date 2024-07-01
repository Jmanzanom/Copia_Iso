import React from "react";
import useSWR from "swr";
import { useParams } from "react-router-dom";
import { getUser } from "../../repositories/user";

export default function show() {
  const { id } = useParams();

  const { data, error } = useSWR(id, {
    fetcher: getUser,
    initialData: [],
    revalidateOnMount: true,
  });

  return (
    <div className="container">
      {error && <p>Error al cargar los datos del usuario.</p>}
      {!data && !error && <p>Cargando...</p>}
      {data && (
        <table className="table">
          <tbody>
            <tr>
              <th>ID:</th>
              <td>{data.id}</td>
            </tr>
            <tr>
              <th>Nombre:</th>
              <td>{data.nombre}</td>
            </tr>
            <tr>
              <th>Apellido:</th>
              <td>{data.apellido}</td>
            </tr>
            <tr>
              <th>RUT:</th>
              <td>{data.rut}</td>
            </tr>
            <tr>
              <th>Email:</th>
              <td>{data.email}</td>
            </tr>
            <tr>
			<th>Monto del Préstamo:</th>
			<td>{data.monto}</td>

            </tr>
            <tr>
              <th>Tasa:</th>
              <td>{data.tasa}</td>
            </tr>
            <tr>
              <th>Plazo:</th>
              <td>{data.plazo}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}

