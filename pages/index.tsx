import { useState } from 'react';
import { GetStaticProps } from 'next';
import { Fact } from '../src/app/utils/types';
import LandingPage from '../src/app/components/LandingPage';
import TriviaQuestion from '../src/app/components/TriviaQuestion';
import ScorePage from '../src/app/components/ScorePage';
import HeaderImage from '../src/app/components/HeaderImage';
import Footer from '../src/app/components/Footer';
import '../src/style/water.css';


// Home Component Start
interface HomeProps {
    facts: Fact[];
  }
  
  const Home: React.FC<HomeProps> = ({ facts }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number | null>(null);
    const [score, setScore] = useState<number>(0);
    const [showScorePage, setShowScorePage] = useState<boolean>(false);
    const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  const toggleSound = () => {
      setSoundEnabled((prev) => !prev);
    };
  
    // Function to get a random question index
    const getRandomQuestionIndex = () => {
      return Math.floor(Math.random() * facts.length);
    };
  
    // Handle answer click event
    const handleAnswer = (isCorrect: boolean) => {
      try {
        if (isCorrect) {
          setScore((prevScore) => prevScore + 1000); // Increment score by 1000 if the answer is correct
        } else {
          setScore((prevScore) => prevScore - 500); // Decrement score by 500 if the answer is incorrect
        }
  
        if (currentQuestionIndex !== null && currentQuestionIndex + 1 < facts.length) {
          setCurrentQuestionIndex(getRandomQuestionIndex());
        } else {
          setShowScorePage(true); // Show score page when quiz is complete
        }
      } catch (error) {
        console.error('Error handling answer:', error);
      }
    };
  
    const startQuiz = () => {
      try {
        setCurrentQuestionIndex(getRandomQuestionIndex());
        setShowScorePage(false);
      } catch (error) {
        console.error('Error starting quiz:', error);
      }
    };
  



    return (
      <div className="app">
        <HeaderImage />
        <h1>Canadian History Trivia Q&A</h1>
        <ScorePage score={score} totalQuestions={facts.length} />
        {currentQuestionIndex === null ? (
          <LandingPage onStart={startQuiz} />
        ) : !showScorePage ? (
          <TriviaQuestion question={facts[currentQuestionIndex]} onAnswer={handleAnswer} />
        ) : (
          <ScorePage score={score} totalQuestions={facts.length} />
        )}
        <button onClick={toggleSound} style={{ marginBottom: "800px", marginTop: "20px" }}>
          {soundEnabled ? 'Disable Sound' : 'Enable Sound'}
        </button>
        <Footer />
      </div>
    );
  };

  
  const getStaticProps: GetStaticProps = async () => {
    const triviaRes = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/data/triviaData.json`);
    if (!triviaRes.ok) {
      throw new Error('Failed to fetch trivia data');
    }
    const triviaData = await triviaRes.json();
  
    const facts = triviaData.facts.map((fact: Fact) => ({
      ...fact
    }));
  
    return {
      props: {
        facts,
      },
    };
  };
  

  export { getStaticProps };
    



  export default Home
  // Home Component End
