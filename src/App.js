import React, {useState, useEffect} from 'react';
import styled from '@emotion/styled';
import imagen from './cryptomonedas.png';
import Form from './components/Form';
import Price from './components/Price';
import Spinner from './components/Spinner';
import axios from 'axios';

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;
const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;
const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #fff;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top:80px;

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
  }
`;

function App() {

  const [moneda, guardarMoneda] = useState('');
  const [criptomoneda, guardarCriptomoneda] = useState('');
  const [resultado, guardarResultado] = useState({});
  const [cargando, guardarCargando] = useState(false);

  useEffect(() => {
    const cotizarCriptomoneda = async () => {
      //evitamos la ejecución la primera vez
      if(moneda === '') return;
      
      //consultar la api para obtener cotizacion
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
      const respuesta = await axios.get(url);

      //mostrar el spinner
      guardarCargando(true);

      //ocultar el spinner y mostrar cotizacion
      setTimeout(() => {
        //cambiar state de cargando
        guardarCargando(false);

        //guardar cotizacion
        guardarResultado(respuesta.data.DISPLAY[criptomoneda][moneda]);
      }, 3000);
    }
    cotizarCriptomoneda();

  }, [moneda, criptomoneda]);

  //mostrar el spinner o resultado
  const componente = (cargando) ? <Spinner /> : <Price resultado={resultado} />



  return (
    <Contenedor>
      <div>
        <Imagen 
          src={imagen}
          alt="imagen cripto"
        />
      </div>
      <div>
        <Heading>Cotiza Criptomonedas al instante</Heading>

        <Form 
          guardarMoneda={guardarMoneda}
          guardarCriptomoneda={guardarCriptomoneda}
        />

        {componente}
      </div>
    </Contenedor>
  );
}

export default App;
