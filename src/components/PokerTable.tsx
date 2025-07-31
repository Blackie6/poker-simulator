import React from 'react';
import { GameState } from '../types/poker';
import PlayerSeat from './PlayerSeat';
import Card from './Card';
import './PokerTable.css';

interface PokerTableProps {
  gameState: GameState;
}

const PokerTable: React.FC<PokerTableProps> = ({ gameState }) => {
  console.log('PokerTable render - community cards:', gameState.communityCards.map(c => `${c.rank}${c.suit}`));
  console.log('PokerTable render - stage:', gameState.stage);
  
  return (
    <div className="poker-table">
      {/* Community cards */}
      <div className="community-cards">
        {gameState.communityCards.length > 0 && (
          <div className="community-cards-label">
            {gameState.stage === 'flop' ? 'FLOP' : 
             gameState.stage === 'turn' ? 'TURN' : 
             gameState.stage === 'river' ? 'RIVER' : 'COMMUNITY CARDS'}
          </div>
        )}
        <div className="community-cards-container">
          {gameState.communityCards.map((card, index) => (
            <Card key={index} card={card} show={true} />
          ))}
        </div>
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