import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import { createUser } from '../../repositories/user';

const CMFAPIComponent = () => {
  const [ufValue, setUfValue] = useState(null);
  const [ufValueSemanal, setUfValueSemanal] = useState(null);
  const [userInput, setUserInput] = useState('');
  const [tasaInput, setTasaInput] = useState('');
  const [plazoInput, setPlazoInput] = useState('');
  const [result, setResult] = useState(null);
  const [ecuacionResult, setEcuacionResult] = useState(null);
  const [userName, setUserName] = useState('');
  const [userLastName, setUserLastName] = useState('');
  const [userRut, setUserRut] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [userFecha, setUserFecha] = useState('');
  const [fecha,setFecha] = useState('');
  const [semanaDespues, setSemanaDespues] = useState('');
  const [resultSemana, setResultSemana] = useState('');
  const [ecuacionResultSemana,setEcuacionResultSemana] = useState('');

  useEffect(() => {
    const fetchUFValue = async () => {
      try {
        const response = await fetch('https://api.cmfchile.cl/api-sbifv3/recursos_api/uf?apikey=620577de89171e9bf39412bc3e39ff72977c11e6&formato=xml');

        if (response.ok) {
          const data = await response.text();
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(data, 'text/xml');
          const valorElement = xmlDoc.querySelector('Valor');

          if (valorElement) {
            const valor = valorElement.textContent;
            setUfValue(valor);
          } else {
            console.error('No se pudo encontrar el elemento Valor en la respuesta XML.');
          }
        } else {
          console.error(`Error al obtener el valor de la UF. Código de estado: ${response.status}`);
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    };

    fetchUFValue();
  }, []);

  useEffect(() =>{
    const fetchUFValueSemanal = async () => {
      try {

        const fecha1 = new Date();
        const año = fecha1.getFullYear();
        const mes = fecha1.getMonth()+1;
        const dia = fecha1.getDate()+7;
        setFecha(`${fecha1.getDate()}/${mes}/${año}`);
        setSemanaDespues(`${dia}/${mes}/${año}`);
        const response = await fetch(`https://api.cmfchile.cl/api-sbifv3/recursos_api/uf/${año}/${mes}/dias/${dia}?apikey=620577de89171e9bf39412bc3e39ff72977c11e6&formato=xml`);
  
        if (response.ok) {
          const data = await response.text();
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(data, 'text/xml');
          const valorElement = xmlDoc.querySelector('Valor');
  
          if (valorElement) {
            const valor = valorElement.textContent;
            setUfValueSemanal(valor);
          } else {
            console.error('No se pudo encontrar el elemento Valor en la respuesta XML.');
          }
        } else {
          console.error(`Error al obtener el valor de la UF. Código de estado: ${response.status}`);
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    };
    
    fetchUFValueSemanal();
  }, []);


  const handleInputChange = (e, setInput) => {
    setInput(e.target.value);
  };

  const sendEmail = async () => {
    const templateParams = {
      to_name: userName,
      loan_value: result,
      installment_value: ecuacionResult,
      installment_value:ecuacionResultSemana,
    };

    try {
      await emailjs.send('service_rmizv6r', 'template_n5e3dfx', templateParams, 'SMHuZxNxW2TfSeZQK');
      setEmailSent(true);
    } catch (error) {
      console.error('Error al enviar el correo:', error);
    }
  };

  const handleSimulateClick = async () => {
    // Verifica si todos los valores son válidos antes de realizar los cálculos
    if (ufValue !== null && userInput !== '' && userLastName !== '' && userRut !== '' && userEmail !== '' && tasaInput !== '' && plazoInput !== '') {
      const userInputNumber = parseFloat(userInput);
      const ufValueNumber = parseFloat(ufValue.replace(',', ''));
      const ufValueNumberSemana = parseFloat(ufValueSemanal.replace(',', ''));
      const tasaNumber = parseFloat(tasaInput);
      const plazoNumber = parseFloat(plazoInput);

      // Asegúrate de manejar la posible división por cero
      if (ufValueNumber !== 0 && tasaNumber !== 0 && plazoNumber !== 0) {
        const calculatedResult = (userInputNumber / ufValueNumber) / 1000;
        const calculatedResultSemana = (userInputNumber / ufValueNumberSemana) / 1000;
        setResult(calculatedResult.toFixed(3));
        setResultSemana(calculatedResultSemana.toFixed(3));

        // Calcula el resultado de la ecuación
        const ecuacionResultado = (calculatedResult / ((1 - Math.pow((1 + tasaNumber), -plazoNumber)) / tasaNumber)).toFixed(3);
        const ecuacionResultSemana = (calculatedResultSemana / ((1 - Math.pow((1 + tasaNumber), -plazoNumber)) / tasaNumber)).toFixed(3);
        setEcuacionResult(ecuacionResultado);
        setEcuacionResultSemana(ecuacionResultSemana);

        // Envía los datos del usuario a través de createUser
        try {
          await createUser({
            nombre: userName,
            apellido: userLastName,
            rut: userRut,
            email: userEmail,
            montoPrestamo: userInput,
            tasa: tasaInput,
            plazo: plazoInput,
          });

          // Abre una nueva ventana para mostrar los resultados con estilos CSS
          const resultWindow = window.open('', '_blank');
          resultWindow.document.write(`
            <html>
              <head>
                <title>Resultados de Simulación</title>
                <style>
                  body {
                    font-family: 'Arial', sans-serif;
                    padding: 20px;
                    background-color: #f8f9fa;
                  }
                  h1 {
                    color: #007bff;
                  }
                  table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                    margin-bottom: 20px;
                  }
                  th, td {
                    border: 1px solid #dee2e6;
                    padding: 8px;
                    text-align: left;
                  }
                  th {
                    background-color: #007bff;
                    color: #fff;
                  }
                </style>
              </head>
              <body>
                <div>
                  <h1>Resultados de Simulación</h1>
                  <table>
                    <tr>
                      <th>Descripción</th>
                      <th>Valor</th>
                    </tr>
                    <tr>
                      <td>Valor del préstamo en UF</td>
                      <td>${result}</td>
                    </tr>
                    <tr>
                      <td>Cuota en UF</td>
                      <td>${ecuacionResult}</td>
                    </tr>
                    <tr>
                      <td>Cuota en UF el ${semanaDespues}</td>
                      <td>${ecuacionResultSemana}</td>
                    </tr>
                  </table>
                </div>
              </body>
            </html>
          `);

          // Envía el correo después de mostrar los resultados
          await sendEmail();
        } catch (error) {
          console.error('Error al enviar los datos del usuario:', error);
        }
      } else {
        setResult(null);
        setEcuacionResult(null);
      }
    } else {
      setResult(null);
      setEcuacionResult(null);
    }
  };

  return (
    <div className="container mt-5">
      {ufValue !== null ? (
        <div>
          <p className="lead">El valor actual de la UF hoy "{fecha}" es: {ufValue}</p>
          <p className="lead">El valor de la Uf el dia "{semanaDespues}" sera: {ufValueSemanal}</p>
          <div className="mb-3">
            <label htmlFor="userName" className="form-label">Tu nombre:</label>
            <input type="text" className="form-control" id="userName" value={userName} onChange={(e) => setUserName(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="userLastName" className="form-label">Tu apellido:</label>
            <input type="text" className="form-control" id="userLastName" value={userLastName} onChange={(e) => setUserLastName(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="userRut" className="form-label">Tu RUT:</label>
            <input type="text" className="form-control" id="userRut" value={userRut} onChange={(e) => setUserRut(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="userEmail" className="form-label">Tu correo electrónico:</label>
            <input type="email" className="form-control" id="userEmail" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="userInput" className="form-label">Ingrese el monto del préstamo:</label>
            <input type="number" className="form-control" id="userInput" value={userInput} onChange={(e) => handleInputChange(e, setUserInput)} />
          </div>
          <div className="mb-3">
            <label htmlFor="tasaInput" className="form-label">Ingrese la tasa:</label>
            <input type="number" className="form-control" id="tasaInput" value={tasaInput} onChange={(e) => handleInputChange(e, setTasaInput)} />
          </div>
          <div className="mb-3">
            <label htmlFor="plazoInput" className="form-label">Ingrese el plazo:</label>
            <input type="number" className="form-control" id="plazoInput" value={plazoInput} onChange={(e) => handleInputChange(e, setPlazoInput)} />
          </div>
          <div className="mb-3">
            <label htmlFor="userFecha" className="form-label">Ingrese un día no mayor a los 7 proximos:</label>
            <input type="text" className="form-control" id="userFecha" value={userFecha} onChange={(e) => setUserFecha(e.target.value)} />
          </div>
          <button className="btn btn-primary" onClick={handleSimulateClick}>Simular</button>
          <button className="btn btn-primary" onClick={handleSimulateClick} disabled={emailSent}>
            {emailSent ? 'Correo Enviado' : 'Simular y Enviar Correo'}
          </button>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default CMFAPIComponent;







