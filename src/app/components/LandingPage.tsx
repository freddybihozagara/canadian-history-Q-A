import React from 'react';
import '../../style/water.css';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="landing-page">
      
<button onClick={() => {
  console.log("Start button clicked");
  onStart();
}}>
  Start Quiz
</button>

          </div>
  );
};

export default LandingPage;
