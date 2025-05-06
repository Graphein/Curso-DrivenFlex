import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { useAuth } from "../context/AuthContext";
import Topo from "../components/Topo";
import Menu from "../components/Menu";

export default function Habitos() {
  const { user } = useAuth();
  const [habitos, setHabitos] = useState([]);
  const [formVisivel, setFormVisivel] = useState(false);
  const [form, setForm] = useState({ name: "", days: [] });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    buscarHabitos();
  }, []);

  function buscarHabitos() {
    axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", {
      headers: { Authorization: `Bearer ${user.token}` }
    })
    .then((res) => setHabitos(res.data))
    .catch(() => alert("Erro ao buscar hábitos"));
  }

  function toggleDia(dia) {
    if (form.days.includes(dia)) {
      setForm({ ...form, days: form.days.filter(d => d !== dia) });
    } else {
      setForm({ ...form, days: [...form.days, dia] });
    }
  }

  function salvar(e) {
    e.preventDefault();
    setLoading(true);
    axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", form, {
      headers: { Authorization: `Bearer ${user.token}` }
    })
    .then(() => {
      setForm({ name: "", days: [] });
      setFormVisivel(false);
      buscarHabitos();
    })
    .catch(() => alert("Erro ao salvar hábito"))
    .finally(() => setLoading(false));
  }

  function deletarHabito(id) {
    if (window.confirm("Deseja realmente deletar este hábito?")) {
      axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      })
      .then(() => buscarHabitos())
      .catch(() => alert("Erro ao deletar hábito"));
    }
  }

  return (
    <>
      <Topo />
      <Container>
        <TopoHabitos>
          <h2>Meus hábitos</h2>
          <button onClick={() => setFormVisivel(!formVisivel)}>+</button>
        </TopoHabitos>

        {formVisivel && (
          <Form onSubmit={salvar}>
            <input
              placeholder="nome do hábito"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              disabled={loading}
            />
            <Dias>
              {["D", "S", "T", "Q", "Q", "S", "S"].map((l, i) => (
                <Dia
                  key={i}
                  $selecionado={form.days.includes(i)}
                  onClick={() => toggleDia(i)}
                  disabled={loading}
                  type="button"
                >
                  {l}
                </Dia>
              ))}
            </Dias>
            <Botoes>
              <span onClick={() => setFormVisivel(false)}>Cancelar</span>
              <button type="submit" disabled={loading}>
              {loading ? <ClipLoader color="#fff" size={15} /> : "Salvar"}
              </button>
            </Botoes>
          </Form>
        )}

        {habitos.length === 0 ? (
          <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>
        ) : (
          habitos.map((h) => (
            <Habito key={h.id}>
              <HabitoTopo>
                <h3>{h.name}</h3>
                <button onClick={() => deletarHabito(h.id)}>🗑️</button>
              </HabitoTopo>
              <Dias>
                {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                  <Dia key={i} $selecionado={h.days.includes(i)} disabled>
                    {["D", "S", "T", "Q", "Q", "S", "S"][i]}
                  </Dia>
                ))}
              </Dias>
            </Habito>
          ))
        )}
      </Container>
      <Menu />
    </>
  );
}

const Container = styled.div`
  padding: 90px 20px 100px 20px;
  background: #f2f2f2;
  min-height: 100vh;
  p {
    color: #666;
    font-size: 18px;
  }
`;

const TopoHabitos = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  h2 {
    font-size: 24px;
    color: #126BA5;
  }
  button {
    font-size: 30px;
    color: white;
    background-color: #52B6FF;
    border: none;
    border-radius: 5px;
    width: 40px;
    height: 35px;
  }
`;

const Form = styled.form`
  background: white;
  padding: 15px;
  border-radius: 5px;
  margin: 20px 0;
  input {
    width: 100%;
    padding: 10px;
    font-size: 18px;
    margin-bottom: 10px;
  }
`;

const Dias = styled.div`
  display: flex;
  gap: 4px;
  margin-bottom: 10px;
`;

const Dia = styled.button`
  width: 30px;
  height: 30px;
  background: ${({ $selecionado }) => ($selecionado ? "#CFCFCF" : "#fff")};
  color: ${({ $selecionado }) => ($selecionado ? "#fff" : "#DBDBDB")};
  border: 1px solid #D5D5D5;
  border-radius: 5px;
  font-size: 20px;
`;

const Botoes = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 15px;
  span {
    color: #52B6FF;
    cursor: pointer;
  }
  button {
    background: #52B6FF;
    color: white;
    border: none;
    padding: 8px 14px;
    border-radius: 5px;
  }
`;

const Habito = styled.div`
  background: white;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 10px;
`;

const HabitoTopo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  h3 {
    font-size: 20px;
    color: #666666;
    margin-bottom: 8px;
  }
  button {
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    color: #666666;
  }
`;
