import React from 'react';
import './Feedback.css';

interface FeedbackProps {
  feedback: {
    show: boolean;
    correct: boolean;
    message: string;
  };
}

const Feedback: React.FC<FeedbackProps> = ({ feedback }) => {
  if (!feedback.show) {
    return null;
  }

  return (
    <div className={`feedback ${feedback.correct ? 'correct' : 'incorrect'}`}>
      <div className="feedback-icon">
        {feedback.correct ? '✓' : '✗'}
      </div>
      <div className="feedback-message">
        {feedback.message}
      </div>
    </div>
  );
};

export default Feedback; 