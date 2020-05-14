import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled';
import useCoin from '../hooks/useCoin';
import useCrypto from '../hooks/useCrypto';
import Error from './Error';
import axios from 'axios';
import PropTypes from 'prop-types';

const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66e2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #fff;
    transition: background-color .3s ease;

    &:hover {
        background-color: #326ac0;
        cursor: pointer;
    }
`;

const Form = ({guardarMoneda, guardarCriptomoneda}) => {

    //state del listado de criptomonedas
    const [listacripto, guardarListaCriptomonedas] = useState([]);
    const [error, guardarError] = useState(false);

    const monedas = [
        {codigo: 'USD', nombre: 'Dólar de Estados Unidos'},
        {codigo: 'MXN', nombre: 'Peso Mexicano'},
        {codigo: 'EUR', nombre: 'Euro'},
        {codigo: 'GBP', nombre: 'Libra Esterlina'}
    ]

    //el valor de coin/crypto es lo que el usuario ha seleccionado
    //usar useCoin
    const [coin, SelectCoin] = useCoin('Elige tu moneda', '', monedas);
    //usar useCrypto
    const [crypto, SelectCrypto] = useCrypto('Elige tu criptomoneda', '', listacripto);

    //ejecutar el llamado a la api
    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

            const resultado = await axios.get(url);
            guardarListaCriptomonedas(resultado.data.Data);
        }
        consultarAPI();
    }, [])

    //cuando usuario hace submit
    const cotizarMoneda = e => {
        e.preventDefault();

        //validar campos
        if(coin === '' || crypto=== ''){
            guardarError(true);
            return;
        }
        

        //pasar datos al componente principal
        guardarError(false);
        guardarMoneda(coin);
        guardarCriptomoneda(crypto);
    }


    return ( 
        <form
            onSubmit={cotizarMoneda}
        >
            {error ? <Error  mensaje="Todos los campos son obligatorios" /> : null}

            <SelectCoin />

            <SelectCrypto />

            <Boton
                type="submit"
                value="Calcular"
            />
        </form>
     );
}

Form.propTypes = {
    guardarMoneda: PropTypes.func.isRequired,
    guardarCriptomoneda: PropTypes.func.isRequired
}
 
export default Form;