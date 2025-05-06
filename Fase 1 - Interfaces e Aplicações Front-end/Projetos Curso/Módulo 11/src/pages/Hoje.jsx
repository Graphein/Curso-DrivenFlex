import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { useAuth } from "../context/AuthContext";
import Topo from "../components/Topo";
import Menu from "../components/Menu";
import { ClipLoader } from "react-spinners"; 

dayjs.locale("pt-br");

export default function Hoje() {
  const { user } = useAuth();
  const [habitos, setHabitos] = useState([]);
  const [carregando, setCarregando] = useState(true); 

  useEffect(() => {
    buscarHabitos();
  }, []);

  function buscarHabitos() {
    setCarregando(true);
    axios
      .get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => setHabitos(res.data))
      .catch(() => alert("Erro ao buscar hábitos de hoje"))
      .finally(() => setCarregando(false));
  }

  function alternarStatus(habito) {
    const url = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habito.id}/${habito.done ? "uncheck" : "check"}`;

    axios
      .post(url, {}, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then(() => buscarHabitos())
      .catch(() => alert("Erro ao atualizar hábito"));
  }

  const hoje = dayjs().format("dddd, DD/MM");

  return (
    <>
      <Topo />
      <Container>
        <Header>
          <h2>{hoje}</h2>
          <p>
            {habitos.length === 0
              ? "Nenhum hábito concluído ainda"
              : `${Math.round((habitos.filter(h => h.done).length / habitos.length) * 100)}% dos hábitos concluídos`}
          </p>
        </Header>

        {carregando ? (
          <LoaderWrapper>
            <ClipLoader color="#52B6FF" size={50} />
          </LoaderWrapper>
        ) : (
          habitos.map((h) => (
            <Card key={h.id}>
              <div>
                <h3>{h.name}</h3>
                <p>
                  Sequência atual: <span className={h.done ? "verde" : ""}>{h.currentSequence} dias</span>
                </p>
                <p>
                  Seu recorde:{" "}
                  <span className={h.currentSequence === h.highestSequence && h.done ? "verde" : ""}>
                    {h.highestSequence} dias
                  </span>
                </p>
              </div>
              <BotaoFeito
                $feito={h.done}
                onClick={() => alternarStatus(h)}
              >
                ✓
              </BotaoFeito>
            </Card>
          ))
        )}
      </Container>
      <Menu />
    </>
  );
}

const Container = styled.div`
  padding: 90px 20px 100px 20px;
  background: #F2F2F2;
  min-height: 100vh;
`;

const Header = styled.div`
  margin-bottom: 20px;
  h2 {
    font-size: 24px;
    color: #126BA5;
    text-transform: capitalize;
  }
  p {
    font-size: 16px;
    color: #BABABA;
    &.verde {
      color: #8FC549;
    }
  }
`;

const Card = styled.div`
  background: white;
  padding: 15px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  h3 {
    color: #666;
    font-size: 20px;
  }
  p {
    color: #666;
    font-size: 14px;
    margin: 3px 0;
  }
  .verde {
    color: #8FC549;
  }
`;

const BotaoFeito = styled.button`
  width: 35px;
  height: 35px;
  font-size: 26px;
  border: none;
  border-radius: 5px;
  background-color: ${({ $feito }) => ($feito ? "#8FC549" : "#EBEBEB")};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
`;
