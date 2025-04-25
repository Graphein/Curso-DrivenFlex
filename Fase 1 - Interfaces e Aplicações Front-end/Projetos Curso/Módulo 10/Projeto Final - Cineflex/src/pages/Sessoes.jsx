import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
function Sessoes() {
    const { idFilme } = useParams();
    const [sessoes, setSessoes] = useState([]);

    useEffect(() => {
        const fetchSessoes = async () => {
            try {
                const response = await axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/movies/${idFilme}/showtimes`);
                setSessoes(response.data.days);
            } catch (error) {
                console.error("Erro ao buscar sessões:", error);
            }
        };
        fetchSessoes();
    }, [idFilme]);

    return (
        <Container>
            <Title>Selecione o horário</Title>
            {sessoes.map((sessao) => (
                <DayContainer key={sessao.id}>
                    <DayTitle>{sessao.weekday}, {sessao.date}</DayTitle>
                    {sessao.showtimes.map((horario) => (
                        <HourButton 
                            key={horario.id} 
                            to={`/assentos/${horario.id}`}
                        >
                            {horario.name}
                        </HourButton>
                    ))}
                </DayContainer>
            ))}
        </Container>
    );
}

export default Sessoes;

const Container = styled.div`
    padding: 100px 20px 20px;
    background-color: #212226;
    min-height: 100vh;
`;

const Title = styled.h2`
    color: #FFFFFF;
    font-size: 24px;
    text-align: center;
    margin-bottom: 20px;
`;

const DayContainer = styled.div`
    margin-bottom: 20px;
    background-color: #2B2D36;
    padding: 15px;
    border-radius: 5px;
    text-align: center;
`;

const DayTitle = styled.h3`
    color: #FFFFFF;
    font-size: 20px;
    margin-bottom: 10px;
    text-align: center;
`;

const HourButton = styled(Link)`
    display: inline-block;
    margin: 5px;
    padding: 8px 16px;
    background-color: #2B2D36;
    color: #FFFFFF;
    font-size: 16px;
    border: 2px solid #EE897F;
    border-radius: 5px;
    text-align: center;
    text-decoration: none;
    transition: background-color 0.2s;

    &:hover {
        background-color: #EE897F;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
`;