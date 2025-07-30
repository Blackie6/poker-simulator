import React from 'react';
import { Card as CardType } from '../types/poker';
import './Card.css';

interface CardProps {
  card: CardType;
  show: boolean;
}

const Card: React.FC<CardProps> = ({ card, show }) => {
  if (!show) {
    return <div className="card card-back" />;
  }

  const getSuitSymbol = (suit: string) => {
    switch (suit) {
      case 'hearts': return '♥';
      case 'diamonds': return '♦';
      case 'clubs': return '♣';
      case 'spades': return '♠';
      default: return '';
    }
  };

  const getSuitColor = (suit: string) => {
    return suit === 'hearts' || suit === 'diamonds' ? 'red' : 'black';
  };

  return (
    <div className={`card ${getSuitColor(card.suit)}`}>
      <div className="card-rank">{card.rank}</div>
      <div className="card-suit">{getSuitSymbol(card.suit)}</div>
    </div>
  );
};

export default Card; 