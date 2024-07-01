import React, { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const container = document.getElementById('container');

    const heading = document.createElement('h1');
    heading.className = 'display-4';
    heading.innerText = 'Bienvenido a Financiera la Clave';

    const paragraph = document.createElement('p');
    paragraph.className = 'lead';
    paragraph.innerText = 'Tu socio financiero confiable.';

    container.appendChild(heading);
    container.appendChild(paragraph);

    const row = document.createElement('div');
    row.className = 'row';

    const col6 = document.createElement('div');
    col6.className = 'col-md-6';

    const image = document.createElement('img');
    image.src = 'https://blog.getxerpa.com/hubfs/6143.jpg'; 
    image.alt = 'Imagen representativa';
    image.className = 'img-fluid';

    col6.appendChild(image);

    const col6Text = document.createElement('div');
    col6Text.className = 'col-md-6';

    const additionalParagraph = document.createElement('p');
    additionalParagraph.innerText =
      '¡Bienvenido a Financiera la Clave! \n En Financiera la Clave, entendemos que cada situación financiera es única, y nos enorgullece ofrecer soluciones personalizadas para satisfacer tus necesidades. Nuestro compromiso es proporcionar servicios financieros accesibles y transparentes para ayudarte a alcanzar tus metas.';

    col6Text.appendChild(additionalParagraph);


    row.appendChild(col6);
    row.appendChild(col6Text);


    container.appendChild(row);
  }, []);

  return <div id="container" className="container mt-5"></div>;
}
