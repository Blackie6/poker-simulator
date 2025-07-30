export type Suit = 'hearts' | 'diamonds' | 'clubs' | 'spades';
export type Rank = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A';

export interface Card {
  suit: Suit;
  rank: Rank;
}

export type Position = 'BU' | 'SB' | 'BB' | 'UTG' | 'HJ' | 'CO';

export type BoardTexture = 'dry' | 'wet' | 'flush_draw';
export type PotType = 'single_raised' | 'three_bet';
export type PostflopAction = 'check_call' | 'check_raise_value' | 'cbet' | 'call_3bet' | 'check_call_specific';

export interface Player {
  id: number;
  name: string;
  position: Position;
  cards: Card[];
  isDealer: boolean;
  isHuman: boolean;
  chips: number;
  bet: number;
  folded: boolean;
  isPFR?: boolean; // Pre-flop raiser
  isInPosition?: boolean; // In position vs opponent
  lastAction?: Action; // Last action taken by this player
  lastActionAmount?: number; // Amount of last action (for raises)
}

export type Action = 'fold' | 'call' | 'raise' | 'mixed' | 'check' | 'bet' | 'check_raise';

export type GameStage = 'preflop' | 'flop' | 'turn' | 'river' | 'showdown';

export interface PostflopScenario {
  stage: GameStage;
  boardTexture: BoardTexture;
  potType: PotType;
  heroAction: PostflopAction;
  handStrength: string; // e.g., "TPGK+", "OESD+", "set+"
}

export type GameMode = 'preflop-training' | 'postflop-training';

export interface SessionHistoryEntry {
  handNumber: number;
  position: Position;
  cards: Card[];
  action: Action;
  isCorrect: boolean;
  expectedAction: Action;
  timestamp: Date;
}

export interface Feedback {
  show: boolean;
  correct: boolean;
  message: string;
}

export interface HistoryEntry {
  player: string;
  action: Action;
  amount: number;
  stage: GameStage;
  timestamp: Date;
}

export interface GameState {
  players: Player[];
  currentPlayerIndex: number;
  dealerIndex: number;
  pot: number;
  currentBet: number;
  stage: GameStage;
  communityCards: Card[];
  handNumber: number;
  feedback: Feedback;
  history: HistoryEntry[];
  botActions: BotAction[];
  bettingRound: 'preflop' | 'flop' | 'turn' | 'river';
  lastRaiser?: number;
  gameMode: GameMode;
  sessionHistory: SessionHistoryEntry[];
  currentPosition: Position;
  isTrainingMode: boolean;
}

export interface BotAction {
  playerId: number;
  playerName: string;
  action: Action;
  amount?: number;
  timestamp: number;
}

export type HandRange = {
  [key: string]: 'fold' | 'call' | 'raise' | 'mixed';
};

export interface PositionRanges {
  UTG: HandRange;
  HJ: HandRange;
  CO: HandRange;
  BU: HandRange;
  SB: HandRange;
  BB: HandRange;
}

// Postflop strategy types
export interface PostflopStrategy {
  [boardTexture: string]: {
    [potType: string]: {
      [action: string]: {
        [handStrength: string]: PostflopAction;
      };
    };
  };
} 