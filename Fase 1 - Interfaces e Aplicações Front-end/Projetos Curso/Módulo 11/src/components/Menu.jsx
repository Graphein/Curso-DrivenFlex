import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function Menu() {
  const location = useLocation();
  const inToday = location.pathname === "/hoje";

  return (
    <Footer>
      <Link to="/habitos">Hábitos</Link>

      <Link to="/hoje">
        <HojeButton>
          <CircularProgressbar
            value={inToday ? 100 : 0}
            text="Hoje"
            background
            backgroundPadding={6}
            styles={buildStyles({
              backgroundColor: "#52B6FF",
              textColor: "#fff",
              pathColor: "#fff",
              trailColor: "transparent"
            })}
          />
        </HojeButton>
      </Link>

      <Link to="/historico">Histórico</Link>
    </Footer>
  );
}

const Footer = styled.footer`
  width: 100%;
  height: 70px;
  background-color: white;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 2;

  display: flex;
  justify-content: space-around;
  align-items: center;

  a {
    color: #52B6FF;
    font-size: 18px;
    text-decoration: none;
    position: relative;
  }
`;

const HojeButton = styled.div`
  width: 91px;
  height: 91px;
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
`;
