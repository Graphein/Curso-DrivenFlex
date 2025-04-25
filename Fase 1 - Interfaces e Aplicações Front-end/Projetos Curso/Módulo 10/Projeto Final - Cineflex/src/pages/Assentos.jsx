import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

function Assentos() {
    const { idSessao } = useParams();
    const navigate = useNavigate();
    const [assentos, setAssentos] = useState([]);
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [selecionados, setSelecionados] = useState([]);

    useEffect(() => {
        axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`)
            .then(response => setAssentos(response.data))
            .catch(error => console.error(error));
    }, [idSessao]);

    function toggleAssento(assento) {
        if (!assento.isAvailable) {
            alert("Esse assento não está disponível");
            return;
        }

        if (selecionados.includes(assento.id)) {
            setSelecionados(selecionados.filter(id => id !== assento.id));
        } else {
            setSelecionados([...selecionados, assento.id]);
        }
    }

    function reservarAssentos() {
        if (selecionados.length === 0) {
            alert("Selecione pelo menos um assento!");
            return;
        }
    
        const reserva = {
            ids: selecionados,
            name: nome,
            cpf: cpf
        };
    
        axios.post('https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many', reserva)
            .then(() => {
                navigate('/sucesso', {
                    state: {
                        filme: assentos.movie,
                        sessao: assentos.day,
                        horario: assentos.name,
                        assentos: assentos.seats
                            .filter(assento => selecionados.includes(assento.id))
                            .map(assento => assento.name),
                        comprador: {
                            nome,
                            cpf
                        }
                    }
                });
            })
            .catch(error => console.error(error));
    }

    return (
        <Container>
            <Titulo>Selecione o(s) assento(s)</Titulo>
            <AssentosContainer>
                {assentos.seats?.map(assento => (
                    <Assento
                        key={assento.id}
                        disponivel={assento.isAvailable}
                        selecionado={selecionados.includes(assento.id)}
                        onClick={() => toggleAssento(assento)}
                    >
                        {assento.name}
                    </Assento>
                ))}
            </AssentosContainer>
            <Formulario>
                <Label>Nome do comprador(a)</Label>
                <Input
                    type="text"
                    placeholder="Digite seu nome..."
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                />
                <Label>CPF do comprador(a)</Label>
                <Input
                    type="text"
                    placeholder="Digite seu CPF..."
                    value={cpf}
                    onChange={e => setCpf(e.target.value)}
                />
                <Botao onClick={reservarAssentos}>Reservar assento(s)</Botao>
            </Formulario>
        </Container>
    );
}

export default Assentos;

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Titulo = styled.h2`
    margin-bottom: 20px;
    font-size: 24px;
    color: #fff;
`;

const AssentosContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    gap: 8px;
    margin-bottom: 20px;
    margin-top:25px
`;

const Assento = styled.div`
    width: 26px;
    height: 26px;
    background-color: ${({ disponivel, selecionado }) =>
        !disponivel ? '#3E3E3E' : selecionado ? '#FF6D6D' : '#9DB899'};
    color: #000;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    cursor: ${({ disponivel }) => (disponivel ? 'pointer' : 'not-allowed')};
`;

const Formulario = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    width: 100%;
`;

const Label = styled.label`
    margin-bottom: 5px;
    color: #fff;
`;

const Input = styled.input`
    margin-bottom: 15px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const Botao = styled.button`
    background-color: #EE897F;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 18px;

    &:hover {
        background-color: #D6742E;
    }
`;
