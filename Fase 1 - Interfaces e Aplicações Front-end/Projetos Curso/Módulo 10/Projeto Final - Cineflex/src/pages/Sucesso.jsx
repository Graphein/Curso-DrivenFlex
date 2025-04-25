import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function Sucesso() {
    const navigate = useNavigate();
    const location = useLocation();
    const { filme, sessao, horario, assentos, comprador } = location.state || {};

    return (
        <Container>
            <Titulo>Pedido finalizado!</Titulo>

            <InfoContainer>
                <Secao>Filme e sessão</Secao>
                <Texto>{filme?.title}</Texto>
                <Texto>{sessao?.weekday} - {sessao?.date} às {horario}</Texto>
            </InfoContainer>

            <InfoContainer>
                <Secao>Ingressos</Secao>
                {assentos?.map((assento, index) => (
                    <Texto key={index}>Assento {assento}</Texto>
                ))}
            </InfoContainer>

            <InfoContainer>
                <Secao>Comprador(a)</Secao>
                <Texto>Nome: {comprador?.nome}</Texto>
                <Texto>CPF: {comprador?.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')}</Texto>
            </InfoContainer>

            <Botao onClick={() => navigate('/')}>Voltar para a tela inicial</Botao>
        </Container>
    );
}

export default Sucesso;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    text-align: center;
`;

const Titulo = styled.h2`
    margin-bottom: 20px;
    font-size: 24px;
    color: #32CD32;
`;

const InfoContainer = styled.div`
    margin: 10px 0;
    background-color: #333;
    padding: 15px;
    border-radius: 8px;
    color: white;
    width: 80%;
`;

const Secao = styled.h3`
    margin-bottom: 5px;
    color: #E8833A;
    border-bottom: 2px solid #4E5A65;
`;

const Texto = styled.p`
    margin: 3px 0;
    color: #FFF;
`;

const Botao = styled.button`
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #E8833A;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #D6742E;
    }
`;
