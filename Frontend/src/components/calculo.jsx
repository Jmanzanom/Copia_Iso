import React from 'react';
import { useState } from 'react';

const calculo = () => {
  const [numero, setNumero] = useState(0);

  const handleInputChange = (event) => {
    setNumero(parseInt(event.target.value, 10));
  };

  return (
    <div>
      <h1>Calculadora de Dobles</h1>
      <label>
        Ingresa un número:
        <input type="number" value={numero} onChange={handleInputChange} />
      </label>
      <p>El doble de {numero} es: {numero * 2}</p>
    </div>
  );
};

export default calculo;