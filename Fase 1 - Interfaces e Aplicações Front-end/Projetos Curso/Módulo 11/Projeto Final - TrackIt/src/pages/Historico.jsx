import styled from "styled-components";
import Topo from "../components/Topo";
import Menu from "../components/Menu";

export default function Historico() {
  return (
    <>
      <Topo />
      <Container>
        <h2>Histórico</h2>
        <p>Em breve você poderá ver histórico dos seus hábitos aqui!</p>
      </Container>
      <Menu />
    </>
  );
}

const Container = styled.div`
  padding: 90px 20px 100px 20px;
  background-color: #F2F2F2;
  min-height: 100vh;

  h2 {
    font-size: 23px;
    color: #126BA5;
    margin-bottom: 20px;
  }

  p {
    font-size: 18px;
    color: #666666;
  }
`;
