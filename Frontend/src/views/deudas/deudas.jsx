import React, { useState } from "react";
import { getDeudaTotal } from "../../repositories/user"; // Asegúrate de importar la función getDeudaTotal desde tu archivo api

function Deudas() {
  const [rut, setRut] = useState("");
  const [deudaTotal, setDeudaTotal] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await getDeudaTotal(rut);
      setDeudaTotal(response.totalAmount);
    } catch (error) {
      console.error("Error al obtener la deuda total:", error);
      // Aquí puedes manejar el error, como mostrar un mensaje al usuario
    }
  };

  return (
    <div>
      <h1>Deudas</h1>
      <form onSubmit={handleSubmit}>
        <label>
          RUT:
          <input
            type="text"
            value={rut}
            onChange={(e) => setRut(e.target.value)}
            required
          />
        </label>
        <button type="submit">Obtener Deuda Total</button>
      </form>
      {deudaTotal !== null && (
        <p>La deuda total para el RUT {rut} es: {deudaTotal}</p>
      )}
    </div>
  );
}

export default Deudas;
