import React, { useState } from 'react';
import Flashcard from './components/Flashcard';
import logo from './assets/logo.png';
import { GlobalStyle } from './styles/GlobalStyles';
import {
  AppContainer,
  FlashcardApp,
  Logo,
  Progress
} from './styles/FlashcardStyles'; // Importando os styled-components

export default function App() {
  const allQuestions = [
    { question: 'O que é JSX?', answer: 'JSX é uma sintaxe para escrever HTML dentro de JS' },
    { question: 'O que é React?', answer: 'React é uma biblioteca JavaScript para UI' },
    { question: 'O que é um estado?', answer: 'Estado é uma forma de gerenciar dados em React' },
    { question: 'O que é um hook?', answer: 'Hooks são funções que permitem usar estado em React' },
    { question: 'O que é o Virtual DOM?', answer: 'Uma representação virtual do DOM real' },
    { question: 'Como atualizar o estado?', answer: 'Usando a função setState ou useState' },
    { question: 'O que são props?', answer: 'São propriedades passadas para os componentes' },
    { question: 'O que é um componente?', answer: 'Uma função ou classe que retorna JSX' },
  ];

  const shuffledQuestions = [...allQuestions]
    .sort(() => Math.random() - 0.5)
    .slice(0, 4)
    .map((q, index) => ({ ...q, id: index + 1 }));

  const [cards, setCards] = useState(
    shuffledQuestions.map((q) => ({ ...q, status: 'unanswered' }))
  );

  const handleAnswer = (cardId, status) => {
    setCards(cards.map((card) =>
      card.id === cardId ? { ...card, status } : card
    ));
  };

  const completedCount = cards.filter(card => card.status !== 'unanswered').length;

  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <FlashcardApp>
          <Logo>
            <img src={logo} alt="Logo" />
            <h1>ZapRecall</h1>
          </Logo>

          {cards.map((card) => (
            <Flashcard 
              key={card.id} 
              card={card} 
              onAnswer={handleAnswer} 
            />
          ))}

          <Progress>
            {completedCount}/{cards.length} CONCLUÍDOS
          </Progress>
        </FlashcardApp>
      </AppContainer>
    </>
  );
}
