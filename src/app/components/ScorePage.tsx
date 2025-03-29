import React from 'react';

import '../../style/water.css';

interface ScorePageProps {
  score: number;
  totalQuestions: number;
}

const ScorePage: React.FC<ScorePageProps> = ({ score, totalQuestions }) => {
  return (
    <div className="score-page">
      <h2>Quiz Progress</h2>
      <p>
        Your current score is: {score} out of {(totalQuestions * 1000) + 10000} points
      </p>
    </div>
  );
};

export default ScorePage;
