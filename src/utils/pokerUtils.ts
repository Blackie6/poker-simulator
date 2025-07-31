import { Card, Rank, Suit, Position, Action, Player, GameStage, BoardTexture, PotType, PostflopAction, BotAction } from '../types/poker';
import { handRanges } from '../data/handRanges';
import { postflopStrategies } from '../data/postflopStrategies';

// Create a deck of cards
export function createDeck(): Card[] {
  const suits: Suit[] = ['hearts', 'diamonds', 'clubs', 'spades'];
  const ranks: Rank[] = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  const deck: Card[] = [];
  
  for (const suit of suits) {
    for (const rank of ranks) {
      deck.push({ suit, rank });
    }
  }
  
  return deck;
}

// Shuffle the deck
export function shuffleDeck(deck: Card[]): Card[] {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Deal cards to players
export function dealCards(players: Player[], deck: Card[]): { players: Player[], remainingDeck: Card[] } {
  const newPlayers = players.map(player => ({ ...player, cards: [] as Card[] }));
  const remainingDeck = [...deck];
  
  // Deal 2 cards to each player
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < newPlayers.length; j++) {
      if (remainingDeck.length > 0) {
        const card = remainingDeck.pop()!;
        newPlayers[j].cards.push(card);
      }
    }
  }
  
  return { players: newPlayers, remainingDeck };
}

// Get hand notation (e.g., "AKs", "QQ", "KJo")
export function getHandNotation(cards: Card[]): string {
  if (cards.length !== 2) {
    return '';
  }
  
  const [card1, card2] = cards;
  const rank1 = card1.rank;
  const rank2 = card2.rank;
  
  // Convert rank to poker notation (10 -> T)
  const rankToNotation = (rank: Rank): string => {
    return rank === '10' ? 'T' : rank;
  };
  
  // Sort ranks (A is highest)
  const rankOrder: { [key in Rank]: number } = {
    '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10,
    'J': 11, 'Q': 12, 'K': 13, 'A': 14
  };
  
  const isSuited = card1.suit === card2.suit;
  const isPair = rank1 === rank2;
  
  let result: string;
  
  if (isPair) {
    result = rankToNotation(rank1) + rankToNotation(rank1); // e.g., "AA", "KK", "TT"
  } else {
    const higherRank = rankOrder[rank1] > rankOrder[rank2] ? rank1 : rank2;
    const lowerRank = rankOrder[rank1] > rankOrder[rank2] ? rank2 : rank1;
    result = rankToNotation(higherRank) + rankToNotation(lowerRank) + (isSuited ? 's' : 'o'); // e.g., "AKs", "KJo", "T9o"
  }
  
  return result;
}

// Get correct action based on position and hand
export function getCorrectAction(position: Position, handNotation: string): Action {
  console.log(`🔍 getCorrectAction called with position: ${position}, handNotation: ${handNotation}`);
  
  const positionRange = handRanges[position];
  console.log(`📊 Position range for ${position}:`, positionRange);
  
  const action = positionRange[handNotation];
  console.log(`🎯 Action found for ${handNotation} in ${position}: ${action}`);
  
  if (!action) {
    console.log(`❌ No action found for ${handNotation} in ${position}, defaulting to fold`);
    return 'fold'; // Default to fold if not in range
  }
  
  switch (action) {
    case 'raise':
      console.log(`✅ Returning 'raise' for ${handNotation} in ${position}`);
      return 'raise';
    case 'call':
      console.log(`✅ Returning 'call' for ${handNotation} in ${position}`);
      return 'call';
    case 'mixed':
      console.log(`✅ Returning 'mixed' for ${handNotation} in ${position}`);
      return 'mixed';
    case 'fold':
    default:
      console.log(`✅ Returning 'fold' for ${handNotation} in ${position}`);
      return 'fold';
  }
}

// Check if player's action is correct
export function isActionCorrect(position: Position, handNotation: string, playerAction: Action): boolean {
  console.log(`🔍 isActionCorrect called with position: ${position}, handNotation: ${handNotation}, playerAction: ${playerAction}`);
  
  const correctAction = getCorrectAction(position, handNotation);
  console.log(`🎯 Correct action: ${correctAction}, Player action: ${playerAction}`);
  
  const isCorrect = playerAction === correctAction;
  console.log(`✅ Result: ${isCorrect ? 'CORRECT' : 'INCORRECT'}`);
  
  return isCorrect;
}

// Get feedback message for incorrect actions
export function getFeedbackMessage(position: Position, handNotation: string, playerAction: Action): string {
  const correctAction = getCorrectAction(position, handNotation);
  
  if (playerAction === correctAction) {
    return 'Correct!';
  }
  
  const positionNames = {
    'UTG': 'Under the Gun',
    'HJ': 'Hijack', 
    'CO': 'Cutoff',
    'BU': 'Button',
    'SB': 'Small Blind',
    'BB': 'Big Blind'
  };
  
  const actionText = correctAction === 'mixed' ? 'mixed' : correctAction + 'ed';
  const playerActionText = playerAction === 'mixed' ? 'mixed' : playerAction + 'ed';
  
  return `Incorrect! In ${positionNames[position]}, ${handNotation} should be ${actionText}, not ${playerActionText}.`;
}

// Assign positions based on dealer
export function assignPositions(players: Player[]): Player[] {
  const dealerIndex = players.findIndex(p => p.isDealer);
  
  // Visual positions after the swap in PlayerSeat:
  // 0 (human) -> bottom center, 1 -> bottom-right, 2 -> middle-right, 
  // 3 (Bot 3) -> top center, 4 -> top-left, 5 -> middle-left
  
  // Standard 6-max position sequence clockwise from dealer: BU, SB, BB, UTG, HJ, CO
  const positions: Position[] = ['BU', 'SB', 'BB', 'UTG', 'HJ', 'CO'];
  
  return players.map((player, index) => {
    // Map visual position to logical position
    let visualPosition;
    if (index === 0) visualPosition = 3; // Human player (bottom center)
    else if (index === 3) visualPosition = 0; // Bot 3 (top center)
    else visualPosition = index;
    
    // Calculate the relative position from the dealer (clockwise)
    const positionIndex = (visualPosition - dealerIndex + players.length) % players.length;
    const assignedPosition = positions[positionIndex];
    
    return {
      ...player,
      position: assignedPosition,
      // Set isDealer to true for the player who gets the BU position
      isDealer: assignedPosition === 'BU'
    };
  });
}

// Move dealer button to next position (to the left/counter-clockwise) and rotate all positions
export function moveDealerButton(players: Player[]): Player[] {
  console.log('🔄 moveDealerButton called');
  
  // Standard 6-max position sequence: BU, SB, BB, UTG, HJ, CO
  const positions: Position[] = ['BU', 'SB', 'BB', 'UTG', 'HJ', 'CO'];
  
  return players.map((player, index) => {
    console.log(`👤 Processing player ${player.name} at index ${index}, current position: ${player.position}`);
    
    // Calculate the new position index by rotating one position to the left (clockwise)
    const currentPositionIndex = positions.indexOf(player.position);
    const newPositionIndex = (currentPositionIndex - 1 + positions.length) % positions.length;
    const newPosition = positions[newPositionIndex];
    
    console.log(`🔄 ${player.name}: ${player.position} → ${newPosition}`);
    
    return {
      ...player,
      position: newPosition,
      // Set isDealer to true only for the player who gets the BU position
      isDealer: newPosition === 'BU'
    };
  });
} 

// Get correct postflop action based on scenario
export function getCorrectPostflopAction(
  scenario: string,
  boardTexture: BoardTexture,
  potType: PotType,
  handStrength: string
): PostflopAction {
  console.log(`🔍 getCorrectPostflopAction called with scenario: ${scenario}, boardTexture: ${boardTexture}, potType: ${potType}, handStrength: ${handStrength}`);
  
  const strategy = postflopStrategies[scenario];
  if (!strategy) {
    console.log(`❌ No strategy found for scenario: ${scenario}`);
    return 'check_call';
  }
  
  const boardStrategy = strategy[boardTexture];
  if (!boardStrategy) {
    console.log(`❌ No board strategy found for texture: ${boardTexture}`);
    return 'check_call';
  }
  
  const potStrategy = boardStrategy[potType];
  if (!potStrategy) {
    console.log(`❌ No pot strategy found for type: ${potType}`);
    return 'check_call';
  }
  
  const action = potStrategy[handStrength];
  console.log(`🎯 Postflop action found: ${action}`);
  
  return action || 'check_call';
}

// Check if postflop action is correct
export function isPostflopActionCorrect(
  scenario: string,
  boardTexture: BoardTexture,
  potType: PotType,
  handStrength: string,
  playerAction: Action
): boolean {
  console.log(`🔍 isPostflopActionCorrect called with playerAction: ${playerAction}`);
  
  const correctAction = getCorrectPostflopAction(scenario, boardTexture, potType, handStrength);
  console.log(`🎯 Correct postflop action: ${correctAction}, Player action: ${playerAction}`);
  
  // Map postflop actions to player actions
  const actionMap: { [key in PostflopAction]: Action[] } = {
    'check_call': ['check', 'call'],
    'check_raise_value': ['check_raise', 'raise'],
    'cbet': ['bet'],
    'call_3bet': ['call', 'raise'],
    'check_call_specific': ['check', 'call']
  };
  
  const validActions = actionMap[correctAction] || ['check'];
  const isCorrect = validActions.includes(playerAction);
  
  console.log(`✅ Postflop result: ${isCorrect ? 'CORRECT' : 'INCORRECT'}`);
  
  return isCorrect;
}

// Get postflop feedback message
export function getPostflopFeedbackMessage(
  scenario: string,
  boardTexture: BoardTexture,
  potType: PotType,
  handStrength: string,
  playerAction: Action
): string {
  const correctAction = getCorrectPostflopAction(scenario, boardTexture, potType, handStrength);
  
  if (isPostflopActionCorrect(scenario, boardTexture, potType, handStrength, playerAction)) {
    return 'Correct!';
  }
  
  const scenarioNames: { [key: string]: string } = {
    'vs_utg_mp': 'vs UTG/MP',
    'vs_co_bu_sb': 'vs CO/BU/SB',
    'pfr_in_position': 'PFR in position',
    'pfr_out_of_position': 'PFR out of position'
  };
  
  const actionNames = {
    'check_call': 'check/call',
    'check_raise_value': 'check/raise for value',
    'cbet': 'continuation bet',
    'call_3bet': 'call or 3-bet',
    'check_call_specific': 'check/call'
  };
  
  return `Incorrect! In ${scenarioNames[scenario] || scenario} with ${handStrength} on ${boardTexture} board, you should ${actionNames[correctAction]}, not ${playerAction}.`;
}

// Determine postflop scenario
export function getPostflopScenario(gameState: any): string {
  const humanPlayer = gameState.players.find((p: Player) => p.isHuman);
  const isPFR = humanPlayer?.isPFR;
  const isInPosition = humanPlayer?.isInPosition;
  
  if (isPFR) {
    return isInPosition ? 'pfr_in_position' : 'pfr_out_of_position';
  } else {
    // Determine opponent position - simplified logic
    const opponentPosition = gameState.players.find((p: Player) => !p.isHuman && !p.folded)?.position;
    if (opponentPosition === 'UTG' || opponentPosition === 'HJ') {
      return 'vs_utg_mp';
    } else {
      return 'vs_co_bu_sb';
    }
  }
}

// Deal community cards for different stages
export function dealCommunityCards(deck: Card[], stage: GameStage): { cards: Card[], remainingDeck: Card[] } {
  const cards: Card[] = [];
  let remainingDeck = [...deck];
  
  switch (stage) {
    case 'flop':
      // Deal 3 cards for flop
      for (let i = 0; i < 3; i++) {
        if (remainingDeck.length > 0) {
          cards.push(remainingDeck.pop()!);
        }
      }
      break;
    case 'turn':
      // Deal 1 card for turn
      if (remainingDeck.length > 0) {
        cards.push(remainingDeck.pop()!);
      }
      break;
    case 'river':
      // Deal 1 card for river
      if (remainingDeck.length > 0) {
        cards.push(remainingDeck.pop()!);
      }
      break;
    default:
      break;
  }
  
  return { cards, remainingDeck };
} 

 

// Bot action logic
export function getBotActionsAfterPlayerRaise(gameState: any, playerAction: Action, playerActionAmount: number): BotAction[] {
  const botActions: BotAction[] = [];
  const botPlayers = gameState.players.filter((p: Player) => !p.isHuman && !p.folded);
  
  if (playerAction !== 'raise' || botPlayers.length === 0) {
    return botActions;
  }

  // Randomly select one bot to continue playing (call or raise)
  const randomBotIndex = Math.floor(Math.random() * botPlayers.length);
  const selectedBot = botPlayers[randomBotIndex];
  
  // Determine bot action (70% call, 30% raise)
  const botAction = Math.random() < 0.7 ? 'call' : 'raise';
  const botActionAmount = botAction === 'raise' ? playerActionAmount * 1.5 : playerActionAmount;
  
  // Add selected bot action
  botActions.push({
    playerId: selectedBot.id,
    playerName: selectedBot.name,
    action: botAction,
    amount: botActionAmount,
    timestamp: Date.now()
  });
  
  // All other bots fold
  botPlayers.forEach((bot: Player, index: number) => {
    if (index !== randomBotIndex) {
      botActions.push({
        playerId: bot.id,
        playerName: bot.name,
        action: 'fold',
        timestamp: Date.now()
      });
    }
  });
  
  return botActions;
}

// Update game state with bot actions
export function updateGameStateWithBotActions(gameState: any, botActions: BotAction[]): any {
  const updatedPlayers = [...gameState.players];
  
  botActions.forEach(botAction => {
    const playerIndex = updatedPlayers.findIndex(p => p.id === botAction.playerId);
    if (playerIndex !== -1) {
      updatedPlayers[playerIndex] = {
        ...updatedPlayers[playerIndex],
        lastAction: botAction.action,
        lastActionAmount: botAction.amount,
        folded: botAction.action === 'fold',
        bet: botAction.action === 'fold' ? 0 : (botAction.amount || 0)
      };
    }
  });
  
  // Update pot
  const totalBets = updatedPlayers.reduce((sum, player) => sum + player.bet, 0);
  
  // Determine last raiser
  const lastRaiser = botActions.find(action => action.action === 'raise')?.playerId || 
                    (gameState.players.find((p: Player) => p.isHuman)?.lastAction === 'raise' ? 
                     gameState.players.find((p: Player) => p.isHuman)?.id : undefined);
  
  return {
    ...gameState,
    players: updatedPlayers,
    pot: totalBets,
    currentBet: Math.max(...updatedPlayers.map(p => p.bet)),
    botActions: [...(gameState.botActions || []), ...botActions],
    lastRaiser: lastRaiser
  };
}

// Determine if hero is in position for postflop
export function determineHeroPosition(gameState: any): boolean {
  const humanPlayer = gameState.players.find((p: Player) => p.isHuman);
  const activeBots = gameState.players.filter((p: Player) => !p.isHuman && !p.folded);
  
  if (activeBots.length === 0) return true;
  
  // Simple position logic - can be expanded
  const humanPosition = humanPlayer?.position;
  const botPosition = activeBots[0]?.position;
  
  const positionOrder = ['UTG', 'HJ', 'CO', 'BU', 'SB', 'BB'];
  const humanIndex = positionOrder.indexOf(humanPosition || '');
  const botIndex = positionOrder.indexOf(botPosition || '');
  
  // Hero is in position if they act after the bot
  return humanIndex > botIndex;
} 

// Get bot action based on position and hand
export function getBotAction(player: Player): Action {
  console.log(`🤖 getBotAction called for ${player.name} at position ${player.position}`);
  
  if (player.cards.length !== 2) {
    console.log(`❌ Invalid number of cards for bot: ${player.cards.length}`);
    return 'fold';
  }
  
  const handNotation = getHandNotation(player.cards);
  console.log(`🎴 Bot hand notation: ${handNotation}`);
  
  const positionRange = handRanges[player.position];
  const action = positionRange[handNotation];
  
  console.log(`📊 Bot action from range: ${action}`);
  
  if (!action) {
    console.log(`⚠️ No action found for hand ${handNotation} at position ${player.position}, defaulting to fold`);
    return 'fold';
  }
  
  // Handle mixed strategy (25% or 50% play)
  if (action === 'mixed') {
    const random = Math.random();
    // For mixed strategy, we'll use 50% probability to play
    return random < 0.5 ? 'raise' : 'fold';
  }
  
  return action;
} 

// Auto-play all bot actions in preflop
export function autoPlayBotActions(gameState: any): { 
  updatedGameState: any, 
  botActions: BotAction[],
  allBotsFolded: boolean 
} {
  console.log(`🤖 autoPlayBotActions called`);
  
  const botActions: BotAction[] = [];
  const updatedPlayers = [...gameState.players];
  const updatedHistory = [...gameState.history];
  let allBotsFolded = true;
  
  // Process each bot player
  for (let i = 0; i < updatedPlayers.length; i++) {
    const player = updatedPlayers[i];
    
    if (player.isHuman) {
      continue; // Skip human player
    }
    
    console.log(`🤖 Processing bot: ${player.name} at position ${player.position}`);
    
    const action = getBotAction(player);
    console.log(`🤖 Bot ${player.name} decided to: ${action}`);
    
    // Create bot action entry
    const botAction: BotAction = {
      playerId: player.id,
      playerName: player.name,
      action: action,
      amount: action === 'raise' ? 50 : 0,
      timestamp: Date.now()
    };
    
    botActions.push(botAction);
    
    // Create history entry for bot action
    const historyEntry = {
      handNumber: gameState.handNumber,
      position: player.position,
      cards: getHandNotation(player.cards),
      action: action,
      correct: true, // Bot actions are always "correct" according to their strategy
      message: `${player.name} (${player.position}) ${action}${action === 'raise' ? ' $50' : ''}`,
      stage: gameState.stage
    };
    
    updatedHistory.push(historyEntry);
    
    // Update player state
    updatedPlayers[i] = {
      ...player,
      lastAction: action,
      lastActionAmount: action === 'raise' ? 50 : 0,
      bet: action === 'fold' ? 0 : (action === 'raise' ? 50 : 0),
      folded: action === 'fold'
    };
    
    if (action !== 'fold') {
      allBotsFolded = false;
    }
  }
  
  const updatedGameState: any = {
    ...gameState,
    players: updatedPlayers,
    botActions: botActions,
    history: updatedHistory
  };
  
  console.log(`🤖 Auto-play completed. All bots folded: ${allBotsFolded}`);
  console.log(`🤖 Bot actions:`, botActions);
  
  return { updatedGameState, botActions, allBotsFolded };
} 

// Sequential bot actions with raise logic
export function sequentialBotActions(gameState: any): { 
  updatedGameState: any, 
  botActions: BotAction[],
  allBotsFolded: boolean 
} {
  const updatedPlayers = [...gameState.players];
  const botPlayers = updatedPlayers.filter((p: any) => !p.isHuman);
  
  // Сортируем ботов по правильному порядку действий в покере
  // SB и BB уже сделали ставки, поэтому действия начинаются с UTG
  // Порядок действий: Бот 3 (UTG) -> Бот 4 (MP) -> Бот 5 (CO) -> Бот 1 (SB) -> Бот 2 (BB)
  const sortedBotPlayers = botPlayers.sort((a: any, b: any) => {
    // UTG (id: 3) идет первым, затем MP (id: 4), CO (id: 5), SB (id: 1), BB (id: 2)
    const order = { 3: 1, 4: 2, 5: 3, 1: 4, 2: 5 };
    return order[a.id as keyof typeof order] - order[b.id as keyof typeof order];
  });
  
  const updatedHistory = [...gameState.history];
  const botActions: BotAction[] = [];
  
  let currentBet = gameState.currentBet || 0;
  let hasRaise = false;
  let allBotsFolded = true;
  
  // Process each bot in order
  for (const player of sortedBotPlayers) {
    const playerIndex = updatedPlayers.findIndex((p: any) => p.id === player.id);
    if (playerIndex === -1) continue;
    
    // Get hand notation and determine action
    const handNotation = getHandNotation(player.cards);
    const positionRange = handRanges[player.position as keyof typeof handRanges];
    const rangeAction = positionRange[handNotation];
    
    let action: Action;
    
    if (hasRaise) {
      // There's already a raise, bot must call, fold, or re-raise
      if (rangeAction === 'raise') {
        // Bot has a raise hand but there's already a raise
        // So bot calls
        action = 'call';
      } else {
        // Bot follows normal range
        action = rangeAction || 'fold';
      }
    } else {
      // No raise yet, bot can raise, call, or fold
      if (rangeAction === 'raise') {
        // Bot has a raise hand
        const random = Math.random();
        if (random < 0.7) { // 70% chance to raise
          action = 'raise';
          hasRaise = true;
          currentBet = 50; // Raise amount
        } else {
          action = 'call';
        }
      } else if (rangeAction === 'mixed') {
        // Mixed strategy
        const random = Math.random();
        if (random < 0.5) { // 50% chance to play
          const playRandom = Math.random();
          if (playRandom < 0.3) { // 30% chance to raise
            action = 'raise';
            hasRaise = true;
            currentBet = 50;
          } else {
            action = 'call';
          }
        } else {
          action = 'fold';
        }
      } else {
        // Fold or call based on range
        action = rangeAction || 'fold';
      }
    }
    
    // Create bot action entry
    const botAction: BotAction = {
      playerId: player.id,
      playerName: player.name,
      action: action,
      amount: action === 'raise' ? 50 : 0,
      timestamp: Date.now()
    };
    
    botActions.push(botAction);
    
    // Create history entry for bot action
    const historyEntry = {
      handNumber: gameState.handNumber,
      position: player.position,
      cards: getHandNotation(player.cards),
      action: action,
      correct: true,
      message: `${player.name} (${player.position}) ${action}${action === 'raise' ? ' $50' : ''}`,
      stage: gameState.stage
    };
    
    updatedHistory.push(historyEntry);
    
    // Update player state - PRESERVE CARDS!
    updatedPlayers[playerIndex] = {
      ...player,
      lastAction: action,
      lastActionAmount: action === 'raise' ? 50 : 0,
      bet: action === 'fold' ? 0 : (action === 'raise' ? 50 : 0),
      folded: action === 'fold',
      cards: player.cards || [] // Принудительно сохраняем карты
    };
    
    if (action !== 'fold') {
      allBotsFolded = false;
    }
  }
  
  const updatedGameState: any = {
    ...gameState,
    players: updatedPlayers,
    botActions: botActions,
    history: updatedHistory,
    currentBet: currentBet
  };
  
  return { updatedGameState, botActions, allBotsFolded };
} 