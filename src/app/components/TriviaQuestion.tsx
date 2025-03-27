import { useState, useEffect, useRef } from 'react';
import { Fact } from '../utils/types';
import dynamic from 'next/dynamic';
import '../../style/water.css';

// Dynamically import LeafletMap to disable SSR
const MapWithNoSSR = dynamic(() => import('./LeafletMap').catch((error) => {
  console.error('Error loading LeafletMap:', error);
  return () => <div>Error loading map</div>;
}), {
  ssr: false,
});

interface TriviaQuestionProps {
  question: Fact;
  onAnswer: (isCorrect: boolean) => void;
}

const TriviaQuestion: React.FC<TriviaQuestionProps> = ({ question, onAnswer }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [showCheckmark, setShowCheckmark] = useState<boolean>(false); // State to show the green checkmark
  const [showRedX, setShowRedX] = useState<boolean>(false); // State to show the red X

  // Audio references for correct and incorrect sounds
  const correctSoundRef = useRef<HTMLAudioElement | null>(null);
  const incorrectSoundRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    try {
      // Fetch audio files from the new API route
      correctSoundRef.current = new Audio('http://localhost:3000/api/sounds/240470.mp3'); // Correct answer sound
      incorrectSoundRef.current = new Audio('http://localhost:3000/api/sounds/240899.mp3'); // Incorrect answer sound
    } catch (error) {
      console.error('Error loading audio files:', error);
    }
  }, []);

  useEffect(() => {
    // Set a timeout to hide the checkmark after 10 seconds
    if (showCheckmark) {
      const timer = setTimeout(() => {
        setShowCheckmark(false);
      }, 10000);
      return () => clearTimeout(timer); // Cleanup timeout when component unmounts or if showCheckmark changes
    }
  }, [showCheckmark]);

  useEffect(() => {
    // Set a timeout to hide the red X after 10 seconds
    if (showRedX) {
      const timer = setTimeout(() => {
        setShowRedX(false);
      }, 10000);
      return () => clearTimeout(timer); // Cleanup timeout when component unmounts or if showRedX changes
    }
  }, [showRedX]);

  const options = [
    question.fact,
    question.randomAnswer1,
    question.randomAnswer2,
    question.randomAnswer3,
  ].sort(() => Math.random() - 0.5);

  const handleAnswerClick = (option: string) => {
    setSelectedOption(option);
    const isCorrect = option === question.fact;
    onAnswer(isCorrect);

    // Play the appropriate sound and show the checkmark or red X
    try {
      if (isCorrect) {
        correctSoundRef.current?.play();
        setShowCheckmark(true);
      } else {
        incorrectSoundRef.current?.play();
        setShowRedX(true);
      }
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };

  const toggleShowAnswer = () => {
    setShowAnswer((prev) => !prev); // Toggle the showAnswer state
  };

  return (
    <div className="trivia-question">
      <h2>{question.question}</h2>
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => handleAnswerClick(option)}
          style={{
            backgroundColor: selectedOption === option && option === question.fact ? 'green' : '',
          }}
        >
          {option}
        </button>
      ))}

      {/* Show green checkmark when the answer is correct */}
      {showCheckmark && (
        <div className="checkmark">
          ✅ Correct!
        </div>
      )}

      {/* Show red X when the answer is incorrect */}
      {showRedX && (
        <div className="red-x">
          ❌ Incorrect!
        </div>
      )}

      {/* Toggle Show/Hide Answer Button */}
      <button onClick={toggleShowAnswer} className="show-answer-button">
        {showAnswer ? 'Hide Answer' : 'Show Answer'}
      </button>

      {/* Display Answer */}
      {showAnswer && (
        <p className="answer-display">Correct Answer: {question.fact}</p>
      )}

      {/* Interactive Map (loaded without SSR) */}
      <div className="map-container">
        <MapWithNoSSR />
      </div>
    </div>
  );
};

export default TriviaQuestion;
