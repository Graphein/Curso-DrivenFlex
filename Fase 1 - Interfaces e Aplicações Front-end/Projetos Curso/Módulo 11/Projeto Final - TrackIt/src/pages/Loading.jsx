import styled from "styled-components";
import { ClipLoader } from "react-spinners";

export default function Loading() {
  return (
    <Container>
      <ClipLoader color="#52B6FF" size={80} />
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
`;
