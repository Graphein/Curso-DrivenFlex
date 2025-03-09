import React, { useState } from 'react';
import setaPlay from '../assets/seta_play.png';
import setaVirar from '../assets/seta_virar.png';
import iconeCerto from '../assets/icone_certo.png';
import iconeErro from '../assets/icone_erro.png';
import iconeQuase from '../assets/icone_quase.png';
import { FlashcardContainer, QuestionView, AnswerView, ButtonsContainer, Button, AnsweredViewP, AnsweredViewImg } from '../styles/FlashcardStyles';

const Flashcard = ({ card, onAnswer }) => {
  const [stage, setStage] = useState('hidden');
  const [answeredStatus, setAnsweredStatus] = useState(null);

  const handleCardClick = () => {
    if (stage === 'hidden') {
      setStage('question');
    }
  };

  const handleFlip = (e) => {
    e.stopPropagation();
    if (stage === 'question') {
      setStage('answer');
    }
  };

  const handleAnswer = (status) => {
    setAnsweredStatus(status);
    onAnswer(card.id, status);
    setStage('answered');
  };

  return (
    <FlashcardContainer className={answeredStatus || 'unanswered'} onClick={handleCardClick}>
      {stage === 'hidden' && (
        <QuestionView>
          <span>Pergunta {card.id}</span>
          <img src={setaPlay} alt="Iniciar pergunta" />
        </QuestionView>
      )}

      {stage === 'question' && (
        <QuestionView>
          <p>{card.question}</p>
          <img src={setaVirar} alt="Virar para resposta" onClick={handleFlip} />
        </QuestionView>
      )}

      {stage === 'answer' && (
        <AnswerView>
          <p>{card.answer}</p>
          <ButtonsContainer>
            <Button color="#FF3030" onClick={() => handleAnswer('incorrect')}>Não lembrei</Button>
            <Button color="#FF922E" onClick={() => handleAnswer('almost')}>Quase não lembrei</Button>
            <Button color="#2FBE34" onClick={() => handleAnswer('correct')}>Zap!</Button>
          </ButtonsContainer>
        </AnswerView>
      )}

      {stage === 'answered' && (
        <QuestionView style={{ textDecoration: 'line-through', color: answeredStatus === 'incorrect' ? '#FF3030' : answeredStatus === 'almost' ? '#FF922E' : '#2FBE34' }}>
          <AnsweredViewP>Pergunta {card.id}</AnsweredViewP>
          {answeredStatus === 'correct' && <AnsweredViewImg src={iconeCerto} alt="Resposta correta" />}
          {answeredStatus === 'incorrect' && <AnsweredViewImg src={iconeErro} alt="Resposta errada" />}
          {answeredStatus === 'almost' && <AnsweredViewImg src={iconeQuase} alt="Resposta quase certa" />}
        </QuestionView>
      )}
    </FlashcardContainer>
  );
};

export default Flashcard;
