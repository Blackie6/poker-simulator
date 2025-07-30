import React from 'react';
import { Player } from '../types/poker';
import Card from './Card';
import { getHandNotation } from '../utils/pokerUtils';
import './PlayerSeat.css';

interface PlayerSeatProps {
  player: Player;
  isCurrentPlayer: boolean;
  isDealer: boolean;
}

const PlayerSeat: React.FC<PlayerSeatProps> = ({ player, isCurrentPlayer, isDealer }) => {
  const positionToAngle = {
    0: 90,    // Human (Button) - bottom center
    1: 150,   // Bot 1 - bottom right
    2: 210,   // Bot 2 - top right
    3: 270,   // Bot 3 - top center
    4: 330,   // Bot 4 - top left
    5: 30     // Bot 5 - bottom left
  };
  
  const angle = positionToAngle[player.id as keyof typeof positionToAngle] || 90;
  const radius = 250; // Увеличиваем радиус для большего стола
  let x = Math.cos((angle * Math.PI) / 180) * radius;
  let y = Math.sin((angle * Math.PI) / 180) * radius;
  
  // Add additional offsets to prevent overlapping
  if (player.id === 1) {
    x -= 20;
    y += 20;
    y -= 100; // Смещаем Бот 1 выше (50 + 50)
  } else if (player.id === 2) {
    x -= 20;
    y -= 20;
    y -= 40; // Смещаем Бот 2 выше
  } else if (player.id === 3) {
    // no changes
    y -= 40; // Смещаем Бот 3 выше
  } else if (player.id === 4) {
    x += 20;
    y -= 20;
    y -= 40; // Смещаем Бот 4 выше
  } else if (player.id === 5) {
    x += 20;
    y += 20;
    y -= 100; // Смещаем Бот 5 выше (50 + 50)
  } else if (player.id === 0) {
    // Человек (player.id === 0) - смещаем выше
    y -= 100; // Смещаем человека выше (50 + 50)
  }

  const handNotation = player.cards.length === 2 ? getHandNotation(player.cards) : '';

  return (
    <div 
      className={`player-seat ${isCurrentPlayer ? 'current-player' : ''} ${isDealer ? 'dealer' : ''}`}
      style={{ 
        position: 'absolute', 
        left: `${x + 500}px`, 
        top: `${y + 400}px`
      }}
    >
      <div className="player-info">
        <div className="player-name">{player.name}</div>
        <div className="player-position">
          {isDealer ? 'BU' : player.position}
        </div>
        {isDealer && <div className="dealer-button">D</div>}
      </div>
      
      <div className="player-cards">
        {player.cards && player.cards.length > 0 ? (
          player.cards.map((card: any, index: number) => (
            <Card key={index} card={card} show={true} />
          ))
        ) : (
          <div style={{ color: 'red', fontSize: '12px' }}>No cards</div>
        )}
      </div>
      
      {player.lastAction && (
        <div className="last-action">
          {player.lastAction} {player.lastActionAmount ? `$${player.lastActionAmount}` : ''}
        </div>
      )}
    </div>
  );
};

export default PlayerSeat;