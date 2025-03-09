import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: Arial, sans-serif;
    font-size: 16px;
    background-color: #f5f5f5;
  }

  /* Responsividade */
  @media (max-width: 1024px) {
    body {
      font-size: 14px;
    }
  }

  @media (max-width: 768px) {
    body {
      font-size: 12px;
    }
  }
`;

export const FlashcardApp = styled.div`
  padding: 20px;
  background-color: #fb6b6b;
  color: white;
  font-family: Arial, sans-serif;
  width: 700px;
  height: 50%;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

export const Flashcard = styled.div`
  background-color: white;
  color: #333;
  margin: 10px 0;
  padding: 15px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  &.unanswered:hover {
    background-color: #fff3f4;
  }

  &.correct {
    background-color: #2ecc71;
    color: white;
  }

  &.incorrect {
    background-color: #e74c3c;
    color: white;
  }

  &.almost {
    background-color: #f1c40f;
    color: white;
  }
`;

export const AnswerView = styled.div`
  width: 100%;

  p {
    background-color: #ffffd4;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
  }
`;

export const AnswerOptions = styled.div`
  display: flex;
  gap: 10px;

  button {
    flex: 1;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
  }

  button:first-child {
    background-color: #e74c3c;
    color: white;
  }

  button:nth-child(2) {
    background-color: #f1c40f;
    color: white;
  }

  button:last-child {
    background-color: #2ecc71;
    color: white;
  }
`;

export const Progress = styled.div`
  margin-top: 20px;
  padding: 10px;
  background-color: white;
  color: #333;
  border-radius: 5px;
  text-align: center;
`;

export const QuestionView = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const Logo = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
`;

export const LogoImg = styled.img`
  width: 50px;
`;

export const QuestionImg = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  margin-top: 20px;
`;

export const IncorrectFlashcard = styled(Flashcard)`
  background-color: white;
  color: #ff4c4c;
  text-decoration: line-through;
`;

export const AlmostFlashcard = styled(Flashcard)`
  background-color: white;
  color: #ffcc00;
  text-decoration: line-through;
`;

export const CorrectFlashcard = styled(Flashcard)`
  background-color: white;
  color: #4caf50;
  text-decoration: line-through;
`;

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
