import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const ResultadoDiv = styled.div`
    color: #fff;
    background-color: #18497D;
    border-radius: 10px;
    font-family: Arial, Helvetica, sans-serif;
    text-align: center;
    padding: 1rem;
    margin-top: 1rem;
`;

const Info = styled.p`
    font-size: 18px;
    span: {
        font-weight: bold;
    }
`;

const Precio = styled.p`
    font-size: 30px;
    span: {
        font-weight: bold;
    }
`;

const Price = ({resultado}) => {
    if(Object.keys(resultado).length === 0) return null;
    return ( 
        <ResultadoDiv>
            <Precio>El precio es: <span>{resultado.PRICE}</span> </Precio>
            <Info>El precio más alto del día: <span>{resultado.HIGHDAY}</span> </Info>
            <Info>El precio más bajo del día: <span>{resultado.LOWDAY}</span> </Info>
            <Info>Variación últimas 24 horas: <span>{resultado.CHANGEPCT24HOUR}</span> </Info>
            <Info>Última actualización: <span>{resultado.LASTUPDATE}</span> </Info>
        </ResultadoDiv>
     );
}

Price.propTypes = {
    resultado: PropTypes.object.isRequired
}
 
export default Price;