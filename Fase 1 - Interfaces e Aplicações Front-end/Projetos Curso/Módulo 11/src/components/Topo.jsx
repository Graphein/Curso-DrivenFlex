import styled from "styled-components";
import { useAuth } from "../context/AuthContext";
import MenuIcon from "../assets/Menu.png";

export default function Topo() {
  const { user } = useAuth();

  return (
    <Header>
      <Icon src={MenuIcon} alt="Menu" />
      <Avatar src={user?.image} alt="Avatar do usuário" />
    </Header>
  );
}

const Header = styled.header`
  width: 100%;
  height: 70px;
  background-color: #126BA5;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 18px;
`;

const Icon = styled.img`
  height: 40px;
`;

const Avatar = styled.img`
  width: 51px;
  height: 51px;
  border-radius: 50%;
  object-fit: cover;
`;
