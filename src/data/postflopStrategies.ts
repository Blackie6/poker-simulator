import { PostflopStrategy, BoardTexture, PotType, Card } from '../types/poker';

// Postflop strategies based on the Russian poker chart
export const postflopStrategies: PostflopStrategy = {
  // Hero vs Regular UTG/MP
  'vs_utg_mp': {
    dry: {
      single_raised: {
        'Nut Gut+': 'check_call',
        '3rd paire+': 'check_call',
        'Ax+2 ov': 'check_call',
        'BDFD': 'check_call',
        'TPGK+': 'check_raise_value',
        'OESD+': 'check_raise_value',
        '2 paire+': 'check_raise_value',
        'set+': 'check_raise_value'
      },
      three_bet: {
        'TP+': 'check_call',
        'pocket+BDFD': 'check_call',
        'BDOESD': 'check_call',
        'TPTK+': 'check_raise_value',
        'FD+': 'check_raise_value',
        '2d flush': 'check_raise_value'
      }
    },
    wet: {
      single_raised: {
        '1 over+': 'check_call',
        '2d paire+': 'check_call',
        'TPGK+': 'check_raise_value',
        'OESD+': 'check_raise_value',
        '2 paire+': 'check_raise_value',
        'set+': 'check_raise_value'
      },
      three_bet: {
        'TP+': 'check_call',
        'TPTK+': 'check_raise_value',
        'FD+': 'check_raise_value'
      }
    },
    flush_draw: {
      single_raised: {
        'FD+': 'check_raise_value',
        '2d flush': 'check_call'
      },
      three_bet: {
        'FD+': 'check_raise_value'
      }
    }
  },

  // Hero vs Regular CO/BU/SB
  'vs_co_bu_sb': {
    dry: {
      single_raised: {
        'Nut Gut+': 'check_call',
        '3rd paire+': 'check_call',
        'Ax+2 ov': 'check_call',
        'BDFD': 'check_call',
        'TPGK+': 'check_raise_value',
        'OESD+': 'check_raise_value',
        '2 paire+': 'check_raise_value',
        'set+': 'check_raise_value'
      },
      three_bet: {
        'TP+': 'check_call',
        'pocket+BDFD': 'check_call',
        'BDOESD': 'check_call',
        'TPTK+': 'check_raise_value',
        'FD+': 'check_raise_value',
        '2d flush': 'check_raise_value'
      }
    },
    wet: {
      single_raised: {
        '1 over+': 'check_call',
        '2d paire+': 'check_call',
        'TPGK+': 'check_raise_value',
        'OESD+': 'check_raise_value',
        '2 paire+': 'check_raise_value',
        'set+': 'check_raise_value'
      },
      three_bet: {
        'TP+': 'check_call',
        'TPTK+': 'check_raise_value',
        'FD+': 'check_raise_value'
      }
    },
    flush_draw: {
      single_raised: {
        'FD+': 'check_raise_value',
        '2d flush': 'check_call'
      },
      three_bet: {
        'FD+': 'check_raise_value'
      }
    }
  },

  // PFR Hero In Position
  'pfr_in_position': {
    dry: {
      single_raised: {
        'Nut Gut+': 'cbet',
        '3rd paire+': 'cbet',
        'Ax+2 ov': 'cbet',
        'BDFD': 'cbet',
        'TPGK+': 'cbet',
        'OESD+': 'cbet',
        '2 paire+': 'cbet',
        'set+': 'cbet'
      },
      three_bet: {
        'TP+': 'cbet',
        'pocket+BDFD': 'cbet',
        'BDOESD': 'cbet',
        'TPTK+': 'cbet',
        'FD+': 'cbet',
        '2d flush': 'cbet'
      }
    },
    wet: {
      single_raised: {
        '1 over+': 'cbet',
        '2d paire+': 'cbet',
        'TPGK+': 'cbet',
        'OESD+': 'cbet',
        '2 paire+': 'cbet',
        'set+': 'cbet'
      },
      three_bet: {
        'TP+': 'cbet',
        'TPTK+': 'cbet',
        'FD+': 'cbet'
      }
    },
    flush_draw: {
      single_raised: {
        'FD+': 'cbet',
        '2d flush': 'cbet'
      },
      three_bet: {
        'FD+': 'cbet'
      }
    }
  },

  // PFR Hero Out of Position
  'pfr_out_of_position': {
    dry: {
      single_raised: {
        'Nut Gut+': 'check_call',
        '3rd paire+': 'check_call',
        'Ax+2 ov': 'check_call',
        'BDFD': 'check_call',
        'TPGK+': 'check_call',
        'OESD+': 'check_call',
        '2 paire+': 'check_call',
        'set+': 'check_call'
      },
      three_bet: {
        'TP+': 'check_call',
        'pocket+BDFD': 'check_call',
        'BDOESD': 'check_call',
        'TPTK+': 'check_call',
        'FD+': 'check_call',
        '2d flush': 'check_call'
      }
    },
    wet: {
      single_raised: {
        '1 over+': 'check_call',
        '2d paire+': 'check_call',
        'TPGK+': 'check_call',
        'OESD+': 'check_call',
        '2 paire+': 'check_call',
        'set+': 'check_call'
      },
      three_bet: {
        'TP+': 'check_call',
        'TPTK+': 'check_call',
        'FD+': 'check_call'
      }
    },
    flush_draw: {
      single_raised: {
        'FD+': 'check_call',
        '2d flush': 'check_call'
      },
      three_bet: {
        'FD+': 'check_call'
      }
    }
  }
};

// Helper function to determine board texture
export function getBoardTexture(communityCards: Card[]): BoardTexture {
  if (communityCards.length < 3) return 'dry';
  
  // Simple logic - can be expanded
  const suits = communityCards.map(card => card.suit);
  const uniqueSuits = new Set(suits);
  
  // Check for flush draw potential
  if (uniqueSuits.size <= 2) {
    return 'flush_draw';
  }
  
  // Check for wet board (straight draws, pairs, etc.)
  const ranks = communityCards.map(card => card.rank);
  const rankCounts: { [key: string]: number } = {};
  ranks.forEach(rank => {
    rankCounts[rank] = (rankCounts[rank] || 0) + 1;
  });
  
  // If there are pairs or connected cards, it's wet
  const hasPairs = Object.values(rankCounts).some(count => count > 1);
  const hasConnected = ranks.some((rank, index) => {
    const rankOrder = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    const currentIndex = rankOrder.indexOf(rank);
    return ranks.some((otherRank, otherIndex) => 
      otherIndex !== index && Math.abs(rankOrder.indexOf(otherRank) - currentIndex) <= 2
    );
  });
  
  return (hasPairs || hasConnected) ? 'wet' : 'dry';
}

// Helper function to determine pot type
export function getPotType(): PotType {
  // Simplified logic - can be expanded based on betting history
  return 'single_raised'; // Default for now
}

// Helper function to get hand strength
export function getHandStrength(holeCards: Card[], communityCards: Card[]): string {
  // This is a simplified version - would need more complex poker hand evaluation
  if (communityCards.length === 0) return 'preflop';
  
  // Simple examples - would need full poker hand evaluator
  const allCards = [...holeCards, ...communityCards];
  const ranks = allCards.map(card => card.rank);
  const suits = allCards.map(card => card.suit);
  
  // Check for pairs
  const rankCounts: { [key: string]: number } = {};
  ranks.forEach(rank => {
    rankCounts[rank] = (rankCounts[rank] || 0) + 1;
  });
  
  const pairs = Object.values(rankCounts).filter(count => count >= 2);
  
  if (pairs.length >= 2) return '2 paire+';
  if (pairs.length === 1 && pairs[0] >= 3) return 'set+';
  if (pairs.length === 1) return 'TPGK+';
  
  // Check for flush draw
  const suitCounts: { [key: string]: number } = {};
  suits.forEach(suit => {
    suitCounts[suit] = (suitCounts[suit] || 0) + 1;
  });
  
  if (Object.values(suitCounts).some(count => count >= 4)) return 'FD+';
  if (Object.values(suitCounts).some(count => count >= 3)) return 'BDFD';
  
  return '1 over+'; // Default for weak hands
} 