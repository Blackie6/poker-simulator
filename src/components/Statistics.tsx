import React from 'react';
import { SessionHistoryEntry } from '../types/poker';
import './Statistics.css';

interface StatisticsProps {
  history: SessionHistoryEntry[];
}

const Statistics: React.FC<StatisticsProps> = ({ history }) => {
  // Calculate player action statistics
  const totalActions = history.length;
  const correctActions = history.filter(entry => entry.isCorrect).length;
  const accuracy = totalActions > 0 ? ((correctActions / totalActions) * 100).toFixed(1) : '0';

  // Calculate action type percentages
  const actionCounts = history.reduce((acc, entry) => {
    acc[entry.action] = (acc[entry.action] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const foldPercentage = totalActions > 0 ? ((actionCounts['fold'] || 0) / totalActions * 100).toFixed(1) : '0';
  const raisePercentage = totalActions > 0 ? ((actionCounts['raise'] || 0) / totalActions * 100).toFixed(1) : '0';
  const callPercentage = totalActions > 0 ? ((actionCounts['call'] || 0) / totalActions * 100).toFixed(1) : '0';
  const mixedPercentage = totalActions > 0 ? ((actionCounts['mixed'] || 0) / totalActions * 100).toFixed(1) : '0';

  return (
    <div className="statistics-panel">
      <h3>Player Statistics</h3>
      <div className="statistics-content">
        {totalActions === 0 ? (
          <p className="no-stats">No actions recorded yet</p>
        ) : (
          <div className="stats-grid">
            <div className="stat-item">
              <span>Total Actions:</span>
              <span>{totalActions}</span>
            </div>
            <div className="stat-item">
              <span>Correct Actions:</span>
              <span>{correctActions}</span>
            </div>
            <div className="stat-item">
              <span>Accuracy:</span>
              <span className="accuracy">{accuracy}%</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span>Fold:</span>
              <span>{foldPercentage}%</span>
            </div>
            <div className="stat-item">
              <span>Raise:</span>
              <span>{raisePercentage}%</span>
            </div>
            <div className="stat-item">
              <span>Call:</span>
              <span>{callPercentage}%</span>
            </div>
            <div className="stat-item">
              <span>Mixed:</span>
              <span>{mixedPercentage}%</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Statistics; 