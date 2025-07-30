import React from 'react';
import { HistoryEntry } from '../types/poker';
import './Statistics.css';

interface StatisticsProps {
  history: HistoryEntry[];
}

const Statistics: React.FC<StatisticsProps> = ({ history }) => {
  const totalHands = history.length;
  const correctActions = history.filter(entry => entry.correct).length;
  const accuracy = totalHands > 0 ? ((correctActions / totalHands) * 100).toFixed(1) : '0';

  // Bot action statistics
  const botActions = history.filter(entry => !entry.position.includes('You'));
  const botActionCounts = botActions.reduce((acc, entry) => {
    acc[entry.action] = (acc[entry.action] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const totalBotActions = botActions.length;

  return (
    <div className="statistics">
      <h3>Statistics</h3>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h4>Your Performance</h4>
          <div className="stat-item">
            <span>Total Actions:</span>
            <span>{totalHands}</span>
          </div>
          <div className="stat-item">
            <span>Correct Actions:</span>
            <span>{correctActions}</span>
          </div>
          <div className="stat-item">
            <span>Accuracy:</span>
            <span>{accuracy}%</span>
          </div>
        </div>

        <div className="stat-card">
          <h4>Bot Actions</h4>
          <div className="stat-item">
            <span>Total Bot Actions:</span>
            <span>{totalBotActions}</span>
          </div>
          {Object.entries(botActionCounts).map(([action, count]) => (
            <div key={action} className="stat-item">
              <span>{action.toUpperCase()}:</span>
              <span>{count} ({(count / totalBotActions * 100).toFixed(1)}%)</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Statistics; 