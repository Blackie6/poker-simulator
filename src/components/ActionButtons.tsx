import React from 'react';
import { Action, GameStage } from '../types/poker';
import './ActionButtons.css';

interface ActionButtonsProps {
  onAction: (action: Action) => void;
  stage: GameStage;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onAction, stage }) => {
  if (stage === 'preflop') {
    return (
      <div className="action-buttons">
        <button
          className="action-btn fold"
          onClick={() => onAction('fold')}
        >
          Fold
        </button>
        <button
          className="action-btn call"
          onClick={() => onAction('call')}
        >
          Call
        </button>
        <button
          className="action-btn raise"
          onClick={() => onAction('raise')}
        >
          Raise
        </button>
        <button
          className="action-btn mixed"
          onClick={() => onAction('mixed')}
        >
          Mixed
        </button>
      </div>
    );
  }

  // Postflop actions
  return (
    <div className="action-buttons">
      <button
        className="action-btn fold"
        onClick={() => onAction('fold')}
      >
        Fold
      </button>
      <button
        className="action-btn check"
        onClick={() => onAction('check')}
      >
        Check
      </button>
      <button
        className="action-btn call"
        onClick={() => onAction('call')}
      >
        Call
      </button>
      <button
        className="action-btn raise"
        onClick={() => onAction('raise')}
      >
        Raise
      </button>
    </div>
  );
};

export default ActionButtons; 