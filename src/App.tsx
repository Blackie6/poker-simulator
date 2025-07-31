import { useState, useEffect, useCallback, useRef } from 'react';
import { GameState, Action, GameStage, Player, Card, Position, SessionHistoryEntry } from './types/poker';
import { 
  createDeck, 
  shuffleDeck, 
  dealCards, 
  getHandNotation, 
  dealCommunityCards
} from './utils/pokerUtils';
import { handRanges } from './data/handRanges';
import PokerTable from './components/PokerTable';
import ActionButtons from './components/ActionButtons';

import History from './components/History';
import Statistics from './components/Statistics';
import BotActions from './components/BotActions';
import './App.css';

function App() {
  const [gameState, setGameState] = useState<GameState>({
    players: [],
    currentPlayerIndex: 0,
    dealerIndex: 0,
    pot: 0,
    currentBet: 0,
    stage: 'preflop',
    communityCards: [],
    handNumber: 1,
    feedback: {
      show: false,
      correct: false,
      message: ''
    },
    history: [],
    botActions: [],
    bettingRound: 'preflop',
    gameMode: 'preflop-training',
    sessionHistory: [],
    currentPosition: 'BU',
    isTrainingMode: true
  });

  const [remainingDeck, setRemainingDeck] = useState<any[]>([]);
  const [showPlayerActions, setShowPlayerActions] = useState(false);
  const [showBotActions, setShowBotActions] = useState(false);
  const [botsStarted, setBotsStarted] = useState(false);
  const [preflopCompleted, setPreflopCompleted] = useState(false);
  const [showNextHandButton, setShowNextHandButton] = useState(false);
  const processBotRef = useRef<((playerIndex: number) => void) | null>(null);
  // Новый state для отслеживания текущего игрока, чей ход

  const [isStartingNewHand, setIsStartingNewHand] = useState(false);
  const [gameMode, setGameMode] = useState<'preflop-training' | 'postflop-training'>(() => {
    const savedMode = localStorage.getItem('pokerGameMode');
    return savedMode === 'postflop-training' ? 'postflop-training' : 'preflop-training';
  });

  // Initialize game on component mount
  useEffect(() => {
    console.log('useEffect for initializeGame triggered');
    initializeGame();
  }, []);

  // Effect for checking hasRaise in postflop mode
  useEffect(() => {
    if (gameMode === 'postflop-training' && gameState.stage === 'preflop') {
      const hasRaise = gameState.players.some(p => p.lastAction === 'raise');
      const allPlayersActed = gameState.players.every(p => p.lastAction !== undefined || p.folded);
      const allFolded = gameState.players.every(p => p.folded);
      
      console.log('useEffect checking hasRaise:', hasRaise);
      console.log('All players acted:', allPlayersActed);
      console.log('All players folded:', allFolded);
      console.log('All players actions:', gameState.players.map(p => `${p.name}: ${p.lastAction} (folded: ${p.folded})`));
      
      // Если все сфолдили, начинаем новую раздачу
      if (allFolded && allPlayersActed && !isStartingNewHand) {
        console.log('All players folded, starting new hand');
        setIsStartingNewHand(true);
        setTimeout(() => {
          startNewHandInPostflopMode();
        }, 1000);
        return;
      }
      
      // Показываем флоп только если был рейз И все игроки сделали свои действия
      if (hasRaise && allPlayersActed) {
        console.log('Raise detected and all players acted, showing flop');
        setTimeout(() => {
          handleNextStage();
        }, 1000);
      }
    }
  }, [gameState.players, gameMode, gameState.stage]);

  // Effect for saving gameMode to localStorage
  useEffect(() => {
    localStorage.setItem('pokerGameMode', gameMode);
  }, [gameMode]);

  // Function to toggle game mode
  const toggleGameMode = () => {
    const newMode = gameMode === 'preflop-training' ? 'postflop-training' : 'preflop-training';
    setGameMode(newMode);
    
    // Save mode to localStorage
    localStorage.setItem('pokerGameMode', newMode);
    console.log(`Switched to ${newMode} mode and saved to localStorage`);
    
    // Save current session history before resetting
    const currentSessionHistory = gameState.sessionHistory;
    console.log('Saving current session history:', currentSessionHistory.length, 'entries');
    
    // Reset game state for new mode
    setShowPlayerActions(false);
    setShowBotActions(false);
    setBotsStarted(false);
    setPreflopCompleted(false);
    setShowNextHandButton(false);
    
    // Clear processBotRef before reinitializing
    processBotRef.current = null;
    console.log('processBotRef.current cleared during mode switch');
    
    // Reinitialize game with new mode, preserving session history
    setTimeout(() => {
      // Temporarily set session history to preserve it during initialization
      setGameState(prev => ({
        ...prev,
        sessionHistory: currentSessionHistory
      }));
      initializeGame();
    }, 100);
  };

  // Новый порядок действий для префлопа
  const actionOrder: Position[] = ['UTG', 'HJ', 'CO', 'BU', 'SB', 'BB'];

  const autoPlayBots = useCallback(() => {
    console.log('autoPlayBots called, gameMode:', gameMode);
    const currentPlayersInState = gameState.players;
    const actionOrder: Position[] = ['UTG', 'HJ', 'CO', 'BU', 'SB', 'BB'];
    const sortedActionPlayers = actionOrder
      .map(pos => currentPlayersInState.find(p => p.position === pos))
      .filter(Boolean);

    // Локальная переменная для подсчета рейзов в этом раунде
    let raiseCountInRound = 0;

    const processPlayer = (playerIndex: number, currentGameMode: 'preflop-training' | 'postflop-training' = gameMode, currentPlayers?: Player[]) => {
      console.log(`processPlayer called with index: ${playerIndex}, gameMode: ${currentGameMode}`);
      if (playerIndex >= sortedActionPlayers.length) {
        // Разделяем логику для префлоп и постфлоп режимов
        if (currentGameMode === 'postflop-training') {
          // В постфлоп режиме проверяем, сфолдили ли все игроки
          const allFolded = sortedActionPlayers.every(player => player?.folded);
          
          if (allFolded && !isStartingNewHand) {
            console.log('All players folded in postflop mode, starting new hand');
            setShowPlayerActions(false);
            setShowBotActions(false);
            setIsStartingNewHand(true);
            setTimeout(() => {
              startNewHandInPostflopMode();
            }, 1000);
            return;
          }
          
          console.log('Round completed in postflop mode, waiting for useEffect to check hasRaise');
          // useEffect автоматически проверит hasRaise и покажет флоп или начнет новую руку
        } else {
          // В префлоп режиме показываем кнопку Next Hand (как раньше)
          setPreflopCompleted(true);
          setShowNextHandButton(true);
        }
        setShowPlayerActions(false);
        setShowBotActions(false);
        return;
      }
      const player = sortedActionPlayers[playerIndex];
      if (!player) {
        // Если игрока с такой позицией нет, пропускаем к следующему
        processPlayer(playerIndex + 1);
        return;
      }
      if (player.isHuman) {
        setShowPlayerActions(true);
        setShowBotActions(false);

        return;
      }
      const handNotation = getHandNotation(player.cards);
      const positionRange = handRanges[player.position as keyof typeof handRanges];
      
      console.log(`🔍 Bot ${player.name} (${player.position}) analysis:`);
      console.log(`   Cards: ${player.cards.map(c => `${c.rank}${c.suit}`).join(' ')}`);
      console.log(`   Hand notation: ${handNotation}`);
      console.log(`   Position range exists: ${!!positionRange}`);
      
      if (!positionRange) {
        console.error(`No position range found for position: ${player.position}`);
        // Если нет диапазона для позиции, бот фолдит
        const action: Action = 'fold';
        
        setGameState(prev => {
          const updatedPlayers = [...prev.players];
          const playerIndex = updatedPlayers.findIndex((p: any) => p.id === player.id);
          
          if (playerIndex !== -1) {
            updatedPlayers[playerIndex] = {
              ...player,
              lastAction: action,
              lastActionAmount: 0,
              bet: 0,
              folded: true,
              cards: player.cards || []
            };
          }

          return {
            ...prev,
            players: updatedPlayers,
            currentBet: prev.currentBet
          };
        });

        setTimeout(() => {
          processPlayer(playerIndex + 1, currentGameMode, currentPlayers);
        }, 1000);
        return;
      }
      
      const rangeAction = positionRange[handNotation];
      
      console.log(`   Range action for ${handNotation}: ${rangeAction}`);
      console.log(`   Has raise in game: ${gameState.players.some((p: any) => p.lastAction === 'raise')}`);
      console.log(`   Current raise count in round: ${raiseCountInRound}`);
      
      if (rangeAction === undefined) {
        console.log(`No action defined for ${handNotation}, defaulting to fold`);
      }

      let action: Action;
      
      if (raiseCountInRound >= 2) {
        // Если уже было 2 рейза, то бот может только CALL или FOLD
        if (rangeAction === 'raise') {
          action = 'call';
        } else {
          action = rangeAction || 'fold';
        }
      } else if (raiseCountInRound === 1) {
        // Если был один рейз, то бот с рейз-рукой может ререйзить или коллить
        if (rangeAction === 'raise') {
          const random = Math.random();
          if (random < 0.5) { // 50% вероятность ререйза
            action = 'raise';
            raiseCountInRound++; // Увеличиваем счетчик рейзов
          } else {
            action = 'call';
          }
        } else {
          action = rangeAction || 'fold';
        }
      } else {
        // Если рейзов еще не было, бот может рейзить или фолдить
        if (rangeAction === 'raise') {
          action = 'raise'; // Всегда рейзим если в диапазоне рейза
          raiseCountInRound++; // Увеличиваем счетчик рейзов
        } else if (rangeAction === 'mixed') {
          const random = Math.random();
          if (random < 0.5) {
            const playRandom = Math.random();
            if (playRandom < 0.3) {
              action = 'raise';
              raiseCountInRound++; // Увеличиваем счетчик рейзов
            } else {
              action = 'fold'; // Если не рейзит, то фолдит
            }
          } else {
            action = 'fold';
          }
        } else {
          action = rangeAction || 'fold';
        }
      }

      console.log(`🎯 ${player.name} final decision: ${action}`);
      console.log(`   Logic: rangeAction=${rangeAction}, raiseCountInRound=${raiseCountInRound}`);

      // Обновляем состояние с действием этого бота
      setGameState(prev => {
        const updatedPlayers = [...prev.players];
        const playerIndex = updatedPlayers.findIndex((p: any) => p.id === player.id);
        
        if (playerIndex !== -1) {
          updatedPlayers[playerIndex] = {
            ...player,
            lastAction: action,
            lastActionAmount: action === 'raise' ? 50 : 0,
            bet: action === 'fold' ? 0 : (action === 'raise' ? 50 : 0),
            folded: action === 'fold',
            cards: player.cards || []
          };
        }

        // Обновляем currentBet и проверяем hasRaise
        const newCurrentBet = action === 'raise' ? 50 : prev.currentBet;
        const newHasRaise = action === 'raise' || updatedPlayers.some((p: any) => p.lastAction === 'raise');

        console.log(`Updating game state: newCurrentBet=${newCurrentBet}, newHasRaise=${newHasRaise}`);

        return {
          ...prev,
          players: updatedPlayers,
          currentBet: newCurrentBet
        };
      });

      // Обновляем локальные переменные для следующего бота
      if (action === 'raise') {
        // currentBet = 50; // This line was removed from the new_code, so it's removed here.
        // hasRaise = true; // This line was removed from the new_code, so it's removed here.
      }

      console.log(`Scheduling next player in 1 second...`);
      console.log(`Updated local state: currentBet=${gameState.currentBet}, hasRaise=${gameState.players.some((p: any) => p.lastAction === 'raise')}`);
      
      // Через 1 секунду обрабатываем следующего бота
      setTimeout(() => {
        processPlayer(playerIndex + 1);
      }, 1000);
    };

    // Сохраняем ссылку на функцию
    processBotRef.current = (playerIndex: number, currentPlayers?: Player[]) => processPlayer(playerIndex, gameMode, currentPlayers);
    console.log('processBotRef.current set to processPlayer function');

    // Начинаем с первого бота
    processPlayer(0);
  }, [gameState.players]);

  // Auto-play bots when game is initialized
  useEffect(() => {
    if (!botsStarted && !preflopCompleted && gameState.players.length > 0) {
      console.log('Starting bot actions...');
      console.log('Current game state:', gameState);
      console.log('Players count:', gameState.players.length);
      console.log('Current gameMode:', gameMode);
      setBotsStarted(true);
      
      // Добавляем небольшую задержку для обеспечения полного обновления состояния
      setTimeout(() => {
        autoPlayBots();
      }, 500);
    }
  }, [botsStarted, preflopCompleted, autoPlayBots, gameState.players.length, gameMode]);

  // Функция для обработки действий ботов после игрока (удалена - теперь все в основном потоке)

  // Функция для оценки действий игрока согласно HandRanges
  const evaluatePlayerAction = (playerCards: Card[], position: Position, action: Action): { isCorrect: boolean; expectedAction: Action; message: string } => {
    const handNotation = getHandNotation(playerCards);
    const positionRange = handRanges[position as keyof typeof handRanges];
    
    if (!positionRange) {
      return {
        isCorrect: false,
        expectedAction: 'fold',
        message: `No hand range found for position ${position}`
      };
    }
    
    const expectedAction = positionRange[handNotation];
    
    if (expectedAction === undefined) {
      return {
        isCorrect: action === 'fold',
        expectedAction: 'fold',
        message: `Hand ${handNotation} not in range for ${position}, should fold`
      };
    }
    
    let isCorrect = false;
    let message = '';
    
    if (expectedAction === 'fold') {
      isCorrect = action === 'fold';
      message = isCorrect ? 'Correct fold' : `Should fold with ${handNotation} in ${position}`;
    } else if (expectedAction === 'raise') {
      isCorrect = action === 'raise' || action === 'call';
      message = isCorrect ? 'Correct raise/call' : `Should raise with ${handNotation} in ${position}`;
    } else if (expectedAction === 'mixed') {
      isCorrect = action === 'fold' || action === 'raise' || action === 'call';
      message = isCorrect ? 'Correct mixed action' : `Mixed hands can fold, raise, or call`;
    } else {
      isCorrect = action === expectedAction;
      message = isCorrect ? `Correct ${expectedAction}` : `Should ${expectedAction} with ${handNotation} in ${position}`;
    }
    
    return { isCorrect, expectedAction: expectedAction || 'fold', message };
  };

  const handleAction = (action: Action) => {
    console.log(`Player decided to ${action}`);
    
    // Получаем текущего игрока (человека)
    const humanPlayer = gameState.players.find(p => p.isHuman);
    if (!humanPlayer) {
      console.error('Human player not found');
      return;
    }
    
    // Оцениваем действие игрока
    const evaluation = evaluatePlayerAction(humanPlayer.cards, gameState.currentPosition, action);
    
    // Создаем запись для Session History
    const sessionEntry: SessionHistoryEntry = {
      handNumber: gameState.handNumber,
      position: gameState.currentPosition,
      cards: humanPlayer.cards,
      action: action,
      isCorrect: evaluation.isCorrect,
      expectedAction: evaluation.expectedAction,
      timestamp: new Date()
    };
    
    console.log('Adding session entry:', sessionEntry);
    
    // Calculate action amount
    let playerActionAmount = 0;
    if (action === 'raise') {
      playerActionAmount = 50; // Fixed raise amount for now
    } else if (action === 'call') {
      playerActionAmount = gameState.currentBet || 0;
    }
    
    // Create updated players array for immediate use
    const updatedPlayers = [...gameState.players];
    const playerIndex = updatedPlayers.findIndex(p => p.isHuman);
    
    if (playerIndex !== -1) {
      updatedPlayers[playerIndex] = {
        ...humanPlayer,
        lastAction: action,
        lastActionAmount: playerActionAmount,
        bet: action === 'fold' ? 0 : playerActionAmount,
        folded: action === 'fold',
        cards: humanPlayer.cards || []
      } as Player;
      
      console.log('Updated player in handleAction:', {
        name: updatedPlayers[playerIndex].name,
        lastAction: updatedPlayers[playerIndex].lastAction,
        folded: updatedPlayers[playerIndex].folded,
        bet: updatedPlayers[playerIndex].bet
      });
    }
    
    // Update game state
    setGameState(prev => {
      const newSessionHistory = [...prev.sessionHistory, sessionEntry];
      console.log('Updated session history:', newSessionHistory.length, 'entries');
      console.log('Latest entry:', sessionEntry);
      
      return {
        ...prev,
        players: updatedPlayers,
        currentBet: action === 'raise' ? playerActionAmount : prev.currentBet,
        pot: prev.pot + playerActionAmount,
        sessionHistory: newSessionHistory,
        feedback: {
          show: true,
          correct: evaluation.isCorrect,
          message: evaluation.message
        }
      };
    });

    // Hide player actions during feedback
    setShowPlayerActions(false);
    
    // В режиме тренировки продолжаем основной поток действий после игрока
    if (gameMode === 'preflop-training') {
      // Скрываем фидбек через 2 секунды
      setTimeout(() => {
        setGameState(prev => ({
          ...prev,
          feedback: {
            show: false,
            correct: false,
            message: ''
          }
        }));
      }, 2000);
      
      // Продолжаем основной поток действий после игрока
      setTimeout(() => {
        console.log('Continuing action flow after player...');
        console.log('Current game state after player action:', gameState);
        
        // Получаем актуальное состояние игроков с обновленными данными
        const currentPlayers = updatedPlayers;

        const sortedActionPlayers = actionOrder
          .map(pos => currentPlayers.find(p => p.position === pos))
          .filter(Boolean);
        
        // Находим индекс человека в отсортированном списке
        const humanIndex = sortedActionPlayers.findIndex(p => p?.isHuman);
        console.log('Human index in sorted list:', humanIndex);
        console.log('Sorted players:', sortedActionPlayers.map(p => `${p?.name} (${p?.position})`));
        console.log('Players after human:', sortedActionPlayers.slice(humanIndex + 1).map(p => `${p?.name} (${p?.position})`));
        
        if (humanIndex !== -1 && humanIndex + 1 < sortedActionPlayers.length) {
          // Продолжаем с следующего игрока после человека
          console.log(`Continuing with player ${humanIndex + 1}: ${sortedActionPlayers[humanIndex + 1]?.name}`);
          console.log('processBotRef.current exists (preflop):', !!processBotRef.current);
                         if (processBotRef.current) {
                 console.log('Calling processBotRef.current with index (preflop):', humanIndex + 1);
                 processBotRef.current(humanIndex + 1);
               } else {
            console.error('processBotRef.current is null in preflop mode!');
          }
        } else {
          // Человек был последним, завершаем раунд
          console.log('Human was last player, completing round');
          setPreflopCompleted(true);
          setShowNextHandButton(true);
        }
      }, 1000);
    } else {
      // Post-flop mode logic
      // Скрываем фидбек через 2 секунды
      setTimeout(() => {
        setGameState(prev => ({
          ...prev,
          feedback: {
            show: false,
            correct: false,
            message: ''
          }
        }));
      }, 2000);
      
      // Проверяем, сбросил ли игрок карты
      const humanPlayer = gameState.players.find(p => p.isHuman);
      if (humanPlayer && humanPlayer.folded) {
        // Если игрок сбросил карты, переходим к следующей раздаче
        console.log('Player folded, starting new hand');
        setTimeout(() => {
          nextHand();
        }, 1000);
        return;
      }
      
      // Продолжаем основной поток действий после игрока (как в префлопе)
      setTimeout(() => {
        console.log('Continuing action flow after player in postflop mode...');
        console.log('Current game state after player action:', gameState);
        
        // Получаем актуальное состояние игроков с обновленными данными
        const currentPlayers = updatedPlayers;
        const sortedActionPlayers = actionOrder
          .map(pos => currentPlayers.find(p => p.position === pos))
          .filter(Boolean);
        
        // Находим индекс человека в отсортированном списке
        const humanIndex = sortedActionPlayers.findIndex(p => p?.isHuman);
        console.log('Human index in sorted list:', humanIndex);
        console.log('Sorted players:', sortedActionPlayers.map(p => `${p?.name} (${p?.position})`));
        console.log('Players after human:', sortedActionPlayers.slice(humanIndex + 1).map(p => `${p?.name} (${p?.position})`));
        
        if (humanIndex !== -1 && humanIndex + 1 < sortedActionPlayers.length) {
          // Продолжаем с следующего игрока после человека
          console.log(`Continuing with player ${humanIndex + 1}: ${sortedActionPlayers[humanIndex + 1]?.name}`);
          console.log('processBotRef.current exists (postflop):', !!processBotRef.current);
                         if (processBotRef.current) {
                 console.log('Calling processBotRef.current with index (postflop):', humanIndex + 1);
                 processBotRef.current(humanIndex + 1);
               } else {
            console.error('processBotRef.current is null in postflop mode!');
          }
        } else {
          // Человек был последним, проверяем был ли рейз
          const hasRaise = gameState.players.some(p => p.lastAction === 'raise');
          if (hasRaise) {
            // Показываем флоп вместо кнопки Next Hand
            setTimeout(() => {
              handleNextStage();
            }, 1000);
          } else {
            // Если не было рейза, переходим к следующей раздаче
            setTimeout(() => {
              nextHand();
            }, 1000);
          }
        }
      }, 1000);
    }
  };

  const initializeGame = () => {
    console.log('initializeGame called');
    
    const deck = createDeck();
    const shuffledDeck = shuffleDeck(deck);
    
    // Create players with human as dealer (BU)
    const players: any[] = [
      { id: 0, name: 'You', position: 'BU', isHuman: true, isDealer: true, cards: [], bet: 0, folded: false },
      { id: 1, name: 'Bot 1', position: 'SB', isHuman: false, isDealer: false, cards: [], bet: 0, folded: false },
      { id: 2, name: 'Bot 2', position: 'BB', isHuman: false, isDealer: false, cards: [], bet: 0, folded: false },
      { id: 3, name: 'Bot 3', position: 'UTG', isHuman: false, isDealer: false, cards: [], bet: 0, folded: false },
      { id: 4, name: 'Bot 4', position: 'HJ', isHuman: false, isDealer: false, cards: [], bet: 0, folded: false },
      { id: 5, name: 'Bot 5', position: 'CO', isHuman: false, isDealer: false, cards: [], bet: 0, folded: false }
    ];
    
    console.log('Created players:', players);
    
    // Deal cards to all players
    const { players: dealtPlayers, remainingDeck } = dealCards(players, shuffledDeck);
    
    console.log('Dealt players:', dealtPlayers);
    
    const initialGameState: GameState = {
      players: dealtPlayers,
      dealerIndex: 0, // Human is dealer
      handNumber: 1,
      stage: 'preflop',
      communityCards: [],
      history: [],
      feedback: { show: false, correct: false, message: '' },
      botActions: [],
      bettingRound: 'preflop',
      currentPlayerIndex: 3, // Start with UTG (Bot 3)
      currentBet: 0,
      lastRaiser: undefined,
      pot: 0,
      gameMode: gameMode, // Используем текущий режим
      sessionHistory: gameState.sessionHistory, // Сохраняем существующую статистику
      currentPosition: 'BU',
      isTrainingMode: true
    };
    
    console.log('Setting initial game state:', initialGameState);
    
    setGameState(initialGameState);
    setRemainingDeck(remainingDeck);
    setShowPlayerActions(false); // Скрываем кнопки действий игрока
    setShowBotActions(false);
    setBotsStarted(false);
    setPreflopCompleted(false);
    setShowNextHandButton(false);
    
    console.log('initializeGame completed');
  };

  const handleNextStage = () => {
    console.log('handleNextStage called');
    console.log('Current stage:', gameState.stage);
    console.log('Current player index:', gameState.currentPlayerIndex);
    console.log('All players actions:', gameState.players.map(p => `${p.name}: ${p.lastAction} (folded: ${p.folded})`));
    
    // Защита от множественных вызовов
    if (gameState.stage !== 'preflop' && gameState.stage !== 'flop' && gameState.stage !== 'turn') {
      console.log('handleNextStage called for invalid stage, ignoring');
      return;
    }
    
    // Check if human player folded
    const humanPlayer = gameState.players.find(p => p.isHuman);
    if (humanPlayer && humanPlayer.folded) {
      console.log('Human player folded, going to next hand');
      nextHand();
      return;
    }
    
    // Determine next stage
    let nextStage: GameStage;
    if (gameState.stage === 'preflop') {
      nextStage = 'flop';
    } else if (gameState.stage === 'flop') {
      nextStage = 'turn';
    } else if (gameState.stage === 'turn') {
      nextStage = 'river';
    } else {
      // River - move to next hand
      nextHand();
      return;
    }
    
    // Deal community cards for next stage
    const { cards: newCommunityCards, remainingDeck: newRemainingDeck } = dealCommunityCards(remainingDeck, nextStage);
    
    console.log(`Dealing ${newCommunityCards.length} cards for ${nextStage}:`, newCommunityCards.map(c => `${c.rank}${c.suit}`));
    
    setRemainingDeck(newRemainingDeck);
    
    setGameState(prev => {
      const newState = {
        ...prev,
        stage: nextStage,
        communityCards: [...prev.communityCards, ...newCommunityCards],
        feedback: {
          show: false,
          correct: false,
          message: ''
        }
      };
      
      console.log('Updated game state with new community cards:');
      console.log('Previous community cards:', prev.communityCards.map(c => `${c.rank}${c.suit}`));
      console.log('New community cards:', newCommunityCards.map(c => `${c.rank}${c.suit}`));
      console.log('Total community cards:', newState.communityCards.map(c => `${c.rank}${c.suit}`));
      console.log('New stage:', nextStage);
      
      // Дополнительная проверка сохранения карт
      newState.players = newState.players.map((player: any, index: number) => ({
        ...player,
        cards: player.cards || prev.players[index]?.cards || []
      }));
      
      return newState;
    });
    
    // В постфлоп режиме показываем действия игрока только если он не сбросил карты
    const currentHumanPlayer = gameState.players.find(p => p.isHuman);
    if (currentHumanPlayer && !currentHumanPlayer.folded) {
      console.log('Player is still in hand, showing actions for postflop');
      setShowPlayerActions(true);
    } else {
      // Если игрок сбросил карты, переходим к следующей раздаче
      console.log('Player folded, starting new hand');
      nextHand();
    }
  };



  const startNewHandInPostflopMode = () => {
    console.log('=== STARTING NEW HAND IN POSTFLOP MODE ===');
    console.log('Current hand number:', gameState.handNumber);
    console.log('Current players state:', gameState.players.map(p => `${p.name}: ${p.position} (folded: ${p.folded})`));
    
    // Rotate positions: BU -> SB -> BB -> UTG -> HJ -> CO -> BU
    const positions: Position[] = ['BU', 'SB', 'BB', 'UTG', 'HJ', 'CO'];
    
    // Обновляем позиции игроков - сдвигаем влево (по часовой стрелке)
    const updatedPlayers = gameState.players.map((player) => {
      // Находим текущую позицию игрока в массиве positions
      const currentPositionIndex = positions.indexOf(player.position);
      // Сдвигаем влево: (currentPositionIndex - 1 + 6) % 6
      const newPositionIndex = (currentPositionIndex - 1 + 6) % 6;
      const newPosition = positions[newPositionIndex];
      
      return {
        ...player,
        position: newPosition,
        isDealer: newPosition === 'BU', // Дилер - это тот, у кого позиция BU
        folded: false,
        lastAction: undefined,
        lastActionAmount: undefined,
        bet: 0
      };
    });
    
    // Определяем новую позицию человека
    const humanPlayer = updatedPlayers.find(p => p.isHuman);
    const newHumanPosition = humanPlayer?.position || 'BU';
    
    // Находим нового дилера для проверки
    const newDealerPlayer = updatedPlayers.find(p => p.isDealer);
    const newDealerIndex = updatedPlayers.findIndex(p => p.isDealer);
    
    console.log('Next dealer player:', newDealerPlayer?.name);
    console.log('New dealer index:', newDealerIndex);
    console.log('Updated players after rotation:', updatedPlayers.map(p => `${p.name}: ${p.position}${p.isDealer ? ' (BU)' : ''}${p.isHuman ? ' (Human)' : ''}`));
    
    // Создаем новую колоду и раздаем карты
    const deck = createDeck();
    const shuffledDeck = shuffleDeck(deck);
    const { players: dealtPlayers, remainingDeck } = dealCards(updatedPlayers, shuffledDeck);
    
    setGameState(prev => ({
      ...prev,
      players: dealtPlayers,
      dealerIndex: newDealerIndex,
      handNumber: prev.handNumber + 1,
      stage: 'preflop',
      communityCards: [],
      currentBet: 0,
      pot: 0,
      currentPosition: newHumanPosition,
      feedback: { show: false, correct: false, message: '' },
      gameMode: gameMode
    }));
    
    setRemainingDeck(remainingDeck);
    
    // Reset flags for new hand
    setShowPlayerActions(false);
    setShowBotActions(false);
    setBotsStarted(false);
    setPreflopCompleted(false);
    setShowNextHandButton(false);
    setIsStartingNewHand(false);
    
    // Start bot actions after a short delay
    setTimeout(() => {
      autoPlayBots();
    }, 500);
  };

  const nextHand = () => {
    
    // Rotate positions: BU -> SB -> BB -> UTG -> HJ -> CO -> BU
    const positions: Position[] = ['BU', 'SB', 'BB', 'UTG', 'HJ', 'CO'];
    
    // Обновляем позиции игроков - сдвигаем влево (по часовой стрелке)
    const updatedPlayers = gameState.players.map((player) => {
      // Находим текущую позицию игрока в массиве positions
      const currentPositionIndex = positions.indexOf(player.position);
      // Сдвигаем влево: (currentPositionIndex - 1 + 6) % 6
      const newPositionIndex = (currentPositionIndex - 1 + 6) % 6;
      const newPosition = positions[newPositionIndex];
      
      return {
        ...player,
        position: newPosition,
        isDealer: newPosition === 'BU', // Дилер - это тот, у кого позиция BU
        folded: false,
        lastAction: undefined,
        lastActionAmount: undefined,
        bet: 0
      };
    });
    
    // Определяем новую позицию человека
    const humanPlayer = updatedPlayers.find(p => p.isHuman);
    const newHumanPosition = humanPlayer?.position || 'BU';
    
    // Находим нового дилера для проверки
    const newDealerPlayer = updatedPlayers.find(p => p.isDealer);
    const newDealerIndex = updatedPlayers.findIndex(p => p.isDealer);
    
    console.log('Next dealer player:', newDealerPlayer?.name);
    console.log('New dealer index:', newDealerIndex);
    console.log('Updated players after rotation:', updatedPlayers.map(p => `${p.name}: ${p.position}${p.isDealer ? ' (BU)' : ''}${p.isHuman ? ' (Human)' : ''}`));
    
    // Проверяем, что только один дилер
    const dealerCount = updatedPlayers.filter(p => p.isDealer).length;
    if (dealerCount !== 1) {
      console.error(`ERROR: Found ${dealerCount} dealers instead of 1!`);
      console.log('Players with isDealer=true:', updatedPlayers.filter(p => p.isDealer).map(p => p.name));
    }
    
    // Создаем новую колоду и раздаем карты
    const deck = createDeck();
    const shuffledDeck = shuffleDeck(deck);
    const { players: dealtPlayers, remainingDeck } = dealCards(updatedPlayers, shuffledDeck);
    
    setGameState(prev => ({
      ...prev,
      players: dealtPlayers,
      dealerIndex: newDealerIndex, // Используем найденный индекс дилера
      handNumber: prev.handNumber + 1,
      stage: 'preflop',
      communityCards: [],
      currentBet: 0,
      pot: 0,
      currentPosition: newHumanPosition,
      feedback: { show: false, correct: false, message: '' },
      gameMode: gameMode // Обновляем режим игры
    }));
    
    setRemainingDeck(remainingDeck);

    // Reset flags for new hand
    setShowPlayerActions(false);
    setShowBotActions(false);
    setBotsStarted(false);
    setPreflopCompleted(false);
    setShowNextHandButton(false);

    // Auto-play bot actions after a short delay
    setTimeout(() => {
      setShowPlayerActions(false); // Hide player actions during bot play
      autoPlayBots();
    }, 1000);
  };

  // Функция для обработки нажатия кнопки Next Hand
  const handleNextHand = () => {
    console.log('Next Hand button clicked');
    setShowNextHandButton(false);
    rotatePositions();
  };

  // Функция для ротации позиций и перехода к следующей раздаче
  const rotatePositions = () => {
    console.log('Rotating positions for next hand');
    
    // Правильный порядок позиций (по часовой стрелке)
    const positions: Position[] = ['BU', 'SB', 'BB', 'UTG', 'HJ', 'CO'];
    const currentDealerIndex = gameState.dealerIndex;
    const nextDealerIndex = (currentDealerIndex + 1) % 6;
    
    console.log('Position rotation:');
    console.log('Current dealer index:', currentDealerIndex);
    console.log('Next dealer index:', nextDealerIndex);
    console.log('Current players before rotation:', gameState.players.map(p => `${p.name}: ${p.position}${p.isDealer ? ' (BU)' : ''}`));
    
    // Обновляем позиции игроков - сдвигаем влево (по часовой стрелке)
    const updatedPlayers = gameState.players.map((player) => {
      // Находим текущую позицию игрока в массиве positions
      const currentPositionIndex = positions.indexOf(player.position);
      // Сдвигаем влево: (currentPositionIndex - 1 + 6) % 6
      const newPositionIndex = (currentPositionIndex - 1 + 6) % 6;
      const newPosition = positions[newPositionIndex];
      
      return {
        ...player,
        position: newPosition,
        isDealer: newPosition === 'BU', // Дилер - это тот, у кого позиция BU
        folded: false,
        lastAction: undefined,
        lastActionAmount: undefined,
        bet: 0
      };
    });
    
    // Определяем новую позицию человека
    const humanPlayer = updatedPlayers.find(p => p.isHuman);
    const newHumanPosition = humanPlayer?.position || 'BU';
    
    // Находим нового дилера для проверки
    const newDealerPlayer = updatedPlayers.find(p => p.isDealer);
    const newDealerIndex = updatedPlayers.findIndex(p => p.isDealer);
    
    console.log('Next dealer player:', newDealerPlayer?.name);
    console.log('New dealer index:', newDealerIndex);
    console.log('Updated players after rotation:', updatedPlayers.map(p => `${p.name}: ${p.position}${p.isDealer ? ' (BU)' : ''}${p.isHuman ? ' (Human)' : ''}`));
    
    // Проверяем, что только один дилер
    const dealerCount = updatedPlayers.filter(p => p.isDealer).length;
    if (dealerCount !== 1) {
      console.error(`ERROR: Found ${dealerCount} dealers instead of 1!`);
      console.log('Players with isDealer=true:', updatedPlayers.filter(p => p.isDealer).map(p => p.name));
    }
    
    // Создаем новую колоду и раздаем карты
    const deck = createDeck();
    const shuffledDeck = shuffleDeck(deck);
    const { players: dealtPlayers, remainingDeck } = dealCards(updatedPlayers, shuffledDeck);

    setGameState(prev => ({
      ...prev,
      players: dealtPlayers,
      dealerIndex: newDealerIndex, // Используем найденный индекс дилера
      handNumber: prev.handNumber + 1,
      stage: 'preflop',
      communityCards: [],
      currentBet: 0,
      pot: 0,
      currentPosition: newHumanPosition,
      feedback: { show: false, correct: false, message: '' },
      gameMode: gameMode // Обновляем режим игры
    }));
    
    setRemainingDeck(remainingDeck);
    setShowPlayerActions(false);
    setShowBotActions(false);
    setBotsStarted(false);
    setPreflopCompleted(false);
    setShowNextHandButton(false);
    
    console.log(`New hand started. Human position: ${newHumanPosition}, Dealer index: ${newDealerIndex}`);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-content">
          <div className="header-left">
            <h1>Poker Simulator - {gameMode === 'preflop-training' ? 'Preflop' : 'Post-Flop'} Training</h1>
            <div className="game-info">
              <p>Hand #{gameState.handNumber} - {gameState.stage.toUpperCase()}</p>
              <p>Your Position: {gameState.currentPosition}</p>
              <p>Dealer: {gameState.players[gameState.dealerIndex]?.name} (BU)</p>
              <p>Players: {gameState.players.filter(p => !p.folded).length}/6 active</p>
            </div>
          </div>
          <div className="header-right">
            <button 
              className="mode-toggle-button"
              onClick={toggleGameMode}
            >
              Switch to {gameMode === 'preflop-training' ? 'Post-Flop' : 'Preflop'} Mode
            </button>
          </div>
        </div>
      </header>
      
      <main className="App-main">
        <PokerTable gameState={gameState} />
        
        {/* Player action buttons */}
        {showPlayerActions && (
          <ActionButtons 
            onAction={handleAction} 
            stage={gameState.stage} 
          />
        )}
        
        {/* Bot actions display */}
        {showBotActions && (
        <BotActions botActions={gameState.botActions} isVisible={showBotActions} />
        )}

        {/* Next Hand button - только в префлоп режиме */}
        {showNextHandButton && gameMode === 'preflop-training' && (
          <div className="next-hand-container">
            <button 
              className="next-hand-button"
              onClick={handleNextHand}
            >
              Next Hand
            </button>
          </div>
        )}

        {/* Feedback */}
        {gameState.feedback.show && (
          <div className={`feedback ${gameState.feedback.correct ? 'correct' : 'incorrect'}`}>
            <h3>{gameState.feedback.correct ? 'Correct!' : 'Incorrect!'}</h3>
            <p>{gameState.feedback.message}</p>
          </div>
        )}
      </main>
      
      <History history={gameState.sessionHistory} />
      <Statistics history={gameState.sessionHistory} />
    </div>
  );
}

export default App; 