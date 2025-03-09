import styled, { createGlobalStyle } from "styled-components";

// Estilos Globais
export const GlobalStyle = createGlobalStyle`
  body {
    background-color: #d9d9d9;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
`;

// Container principal
export const AppContainer = styled.div`
  background-color: #d9d9d9;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

// Layout do Aplicativo
export const FlashcardApp = styled.div`
  padding: 30px;
  background-color: #fb6b6b;
  color: white;
  font-family: Arial, sans-serif;
  width: 700px;
  border-radius: 2px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

// Container dos Flashcards
export const FlashcardContainer = styled.div`
  background-color: white;
  color: #333;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 4px 5px rgba(0, 0, 0, 0.2);
  transition: background-color 0.2s ease-in-out;
  min-height: 80px;
  width: 100%;
  margin-top: 15px;
`;

// Estilo do Flashcard individual
export const Flashcard = styled.div`
  background-color: white;
  color: #333;
  padding: 15px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 4px 5px rgba(0, 0, 0, 0.2);
  transition: background-color 0.2s ease-in-out;
  min-height: 50px;

  &.unanswered:hover {
    background-color: #fff3f4;
  }

  &.correct {
    color: #4caf50;
    text-decoration: line-through;
  }

  &.incorrect {
    color: #ff4c4c;
    text-decoration: line-through;
  }

  &.almost {
    color: #ffcc00;
    text-decoration: line-through;
  }
`;

// Visualização da resposta
export const AnswerView = styled.div`
  background-color: #ffffd4;
  color: #333;
  padding: 15px;
  border-radius: 8px;
  width: 100%;
  box-shadow: 0 4px 5px rgba(0, 0, 0, 0.2);
  min-height: 80px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;

  p {
    margin-bottom: 10px;
  }
`;
// Botões
export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 10px;
`;

export const Button = styled.button`
  background-color: ${(props) => props.color};
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  flex: 1;
  margin: 5px;
  font-size: 14px;
`;

// Barra de progresso
export const Progress = styled.div`
  margin-top: 20px;
  width: 100%;
  background-color: white;
  color: #333;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  box-shadow: 0 4px 5px rgba(0, 0, 0, 0.2);
  min-height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const QuestionView = styled.div`
  background-color: ${(props) => props.$bgColor || "white"};
  color: #333;
  padding: 15px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  box-shadow: 0 4px 5px rgba(0, 0, 0, 0.2);
  min-height: 80px;
  font-size: 16px;
  font-weight: bold;
  text-align: left;
  word-wrap: break-word;

  img {
    width: 24px;
    height: 24px;
    cursor: pointer;
    transition: transform 0.2s ease-in-out;
  }

  img:hover {
    transform: scale(1.1);
  }
`;

export const QuestionImage = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  margin-top: 20px;
`;

// Logo
export const Logo = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;

  img {
    width: 50px;
  }
`;

// Estilos para respostas já respondidas
export const AnsweredView = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const AnsweredViewP = styled.p`
  margin: 0;
`;

export const AnsweredViewImg = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;
