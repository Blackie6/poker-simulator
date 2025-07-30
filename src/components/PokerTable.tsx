import React from 'react';
import { GameState } from '../types/poker';
import PlayerSeat from './PlayerSeat';
import Card from './Card';
import './PokerTable.css';

interface PokerTableProps {
  gameState: GameState;
}

const PokerTable: React.FC<PokerTableProps> = ({ gameState }) => {
  return (
    <div className="poker-table">
      {/* Community cards */}
      <div className="community-cards">
        {gameState.communityCards.map((card, index) => (
          <Card key={index} card={card} show={true} />
        ))}
      </div>
      
      {/* Player seats */}
      {gameState.players.map((player) => (
        <PlayerSeat
          key={player.id}
          player={player}
          isCurrentPlayer={player.id === gameState.currentPlayerIndex}
          isDealer={player.id === gameState.dealerIndex}
        />
      ))}
    </div>
  );
};

export default PokerTable; 