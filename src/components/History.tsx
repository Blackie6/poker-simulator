import React from 'react';
import { SessionHistoryEntry } from '../types/poker';
import './History.css';

interface HistoryProps {
  history: SessionHistoryEntry[];
}

const History: React.FC<HistoryProps> = ({ history }) => {
  return (
    <div className="history-panel">
      <h3>Session History</h3>
      <div className="history-content">
        {history.length === 0 ? (
          <p className="no-history">No hands played yet</p>
        ) : (
          [...history].reverse().map((entry, index) => (
            <div 
              key={index} 
              className={`history-line ${entry.isCorrect ? 'correct' : 'incorrect'}`}
            >
              Hand #{entry.handNumber} {entry.position} {entry.cards.map(card => `${card.rank}${card.suit.charAt(0)}`).join('')} {entry.action.toUpperCase()} {entry.isCorrect ? 'Right' : 'Wrong'}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default History; 