import React from 'react';
import { BotAction } from '../types/poker';
import './BotActions.css';

interface BotActionsProps {
  botActions: BotAction[];
  isVisible: boolean;
}

const BotActions: React.FC<BotActionsProps> = ({ botActions, isVisible }) => {
  if (!isVisible || botActions.length === 0) {
    return null;
  }

  return (
    <div className="bot-actions-overlay">
      <div className="bot-actions-container">
        <h3>Bot Actions</h3>
        <div className="bot-actions-list">
          {botActions.map((action, index) => (
            <div key={index} className={`bot-action ${action.action}`}>
              <span className="bot-name">{action.playerName}</span>
              <span className="bot-action-text">
                {action.action.toUpperCase()}
                {action.amount && ` $${action.amount}`}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BotActions; 