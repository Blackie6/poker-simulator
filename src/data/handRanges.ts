import { PositionRanges } from '../types/poker';

// Hand ranges based on the poker charts from the image
// White cells = 100% play (raise)
// Blue cells = 25% play (mixed strategy)
// Green cells = 50% play (mixed strategy)
// Dark gray cells = fold


export const handRanges: PositionRanges = {
  UTG: {
    // Pairs
    'AA': 'raise', 'KK': 'raise', 'QQ': 'raise', 'JJ': 'raise', 'TT': 'raise',
    '99': 'raise', '88': 'raise', '77': 'raise', '66': 'raise',
    '55': 'fold', '44': 'fold', '33': 'fold', '22': 'fold',
    
    // Suited hands
    'AKs': 'raise', 'AQs': 'raise', 'AJs': 'raise', 'ATs': 'raise', 'A9s': 'raise', 'A8s': 'raise', 'A7s': 'raise', 'A6s': 'raise', 'A5s': 'raise', 'A4s': 'raise', 'A3s': 'raise', 'A2s': 'raise',
    'KQs': 'raise', 'KJs': 'raise', 'KTs': 'raise',
    'K9s': 'fold', 'K8s': 'fold', 'K7s': 'fold', 'K6s': 'fold', 'K5s': 'fold', 'K4s': 'fold', 'K3s': 'fold', 'K2s': 'fold',
    'QJs': 'raise', 'QTs': 'raise',
    'Q9s': 'fold', 'Q8s': 'fold', 'Q7s': 'fold', 'Q6s': 'fold', 'Q5s': 'fold', 'Q4s': 'fold', 'Q3s': 'fold', 'Q2s': 'fold',
    'JTs': 'raise',
    'J9s': 'fold', 'J8s': 'fold', 'J7s': 'fold', 'J6s': 'fold', 'J5s': 'fold', 'J4s': 'fold', 'J3s': 'fold', 'J2s': 'fold',
    'T9s': 'fold', 'T8s': 'fold', 'T7s': 'fold', 'T6s': 'fold', 'T5s': 'fold', 'T4s': 'fold', 'T3s': 'fold', 'T2s': 'fold',
    '98s': 'fold', '97s': 'fold', '96s': 'fold', '95s': 'fold', '94s': 'fold', '93s': 'fold', '92s': 'fold',
    '87s': 'fold', '86s': 'fold', '85s': 'fold', '84s': 'fold', '83s': 'fold', '82s': 'fold',
    '76s': 'fold', '75s': 'fold', '74s': 'fold', '73s': 'fold', '72s': 'fold',
    '65s': 'fold', '64s': 'fold', '63s': 'fold', '62s': 'fold',
    '54s': 'fold', '53s': 'fold', '52s': 'fold',
    '43s': 'fold', '42s': 'fold',
    '32s': 'fold',
    
    // Offsuit hands
    'AKo': 'raise', 'AQo': 'raise', 'AJo': 'raise', 'ATo': 'raise', 
    'A9o': 'fold', 'A8o': 'fold', 'A7o': 'fold', 'A6o': 'fold', 'A5o': 'fold', 'A4o': 'fold', 'A3o': 'fold', 'A2o': 'fold',
    'KQo': 'raise', 'KJo': 'raise', 
    'KTo': 'fold', 'K9o': 'fold', 'K8o': 'fold', 'K7o': 'fold', 'K6o': 'fold', 'K5o': 'fold', 'K4o': 'fold', 'K3o': 'fold', 'K2o': 'fold',
    'QJo': 'fold', 'QTo': 'fold', 'Q9o': 'fold', 'Q8o': 'fold', 'Q7o': 'fold', 'Q6o': 'fold', 'Q5o': 'fold', 'Q4o': 'fold', 'Q3o': 'fold', 'Q2o': 'fold',
    'JTo': 'fold', 'J9o': 'fold', 'J8o': 'fold', 'J7o': 'fold', 'J6o': 'fold', 'J5o': 'fold', 'J4o': 'fold', 'J3o': 'fold', 'J2o': 'fold',
    'T9o': 'fold', 'T8o': 'fold', 'T7o': 'fold', 'T6o': 'fold', 'T5o': 'fold', 'T4o': 'fold', 'T3o': 'fold', 'T2o': 'fold',
    '98o': 'fold', '97o': 'fold', '96o': 'fold', '95o': 'fold', '94o': 'fold', '93o': 'fold', '92o': 'fold',
    '87o': 'fold', '86o': 'fold', '85o': 'fold', '84o': 'fold', '83o': 'fold', '82o': 'fold',
    '76o': 'fold', '75o': 'fold', '74o': 'fold', '73o': 'fold', '72o': 'fold',
    '65o': 'fold', '64o': 'fold', '63o': 'fold', '62o': 'fold',
    '54o': 'fold', '53o': 'fold', '52o': 'fold',
    '43o': 'fold', '42o': 'fold',
    '32o': 'fold'
  },

  HJ: {
    // Pairs
    'AA': 'raise', 'KK': 'raise', 'QQ': 'raise', 'JJ': 'raise', 'TT': 'raise',
    '99': 'raise', '88': 'raise', '77': 'raise', '66': 'raise',
    '55': 'fold', '44': 'fold', '33': 'fold', '22': 'fold',
    
    // Suited hands
    'AKs': 'raise', 'AQs': 'raise', 'AJs': 'raise', 'ATs': 'raise', 'A9s': 'raise', 'A8s': 'raise', 'A7s': 'raise', 'A6s': 'raise', 'A5s': 'raise', 'A4s': 'raise', 'A3s': 'raise', 'A2s': 'raise',
    'KQs': 'raise', 'KJs': 'raise', 'KTs': 'raise', 'K9s': 'raise', 
    'K8s': 'fold', 'K7s': 'fold', 'K6s': 'fold', 'K5s': 'fold', 'K4s': 'fold', 'K3s': 'fold', 'K2s': 'fold',
    'QJs': 'raise', 'QTs': 'raise', 'Q9s': 'raise', 
    'Q8s': 'fold', 'Q7s': 'fold', 'Q6s': 'fold', 'Q5s': 'fold', 'Q4s': 'fold', 'Q3s': 'fold', 'Q2s': 'fold',
    'JTs': 'raise', 'J9s': 'raise', 
    'J8s': 'fold', 'J7s': 'fold', 'J6s': 'fold', 'J5s': 'fold', 'J4s': 'fold', 'J3s': 'fold', 'J2s': 'fold',
    'T9s': 'raise', 
    'T8s': 'fold',
    'T7s': 'fold', 'T6s': 'fold', 'T5s': 'fold', 'T4s': 'fold', 'T3s': 'fold', 'T2s': 'fold',
    '98s': 'fold', '97s': 'fold', '96s': 'fold', '95s': 'fold', '94s': 'fold', '93s': 'fold', '92s': 'fold',
    '87s': 'fold', '86s': 'fold', '85s': 'fold', '84s': 'fold', '83s': 'fold', '82s': 'fold',
    '76s': 'fold', '75s': 'fold', '74s': 'fold', '73s': 'fold', '72s': 'fold',
    '65s': 'fold', '64s': 'fold', '63s': 'fold', '62s': 'fold',
    '54s': 'fold', '53s': 'fold', '52s': 'fold',
    '43s': 'fold', '42s': 'fold',
    '32s': 'fold',
    
    // Offsuit hands
    'AKo': 'raise', 'AQo': 'raise', 'AJo': 'raise', 'ATo': 'raise', 
    'A9o': 'fold', 'A8o': 'fold', 'A7o': 'fold', 'A6o': 'fold', 'A5o': 'fold', 'A4o': 'fold', 'A3o': 'fold', 'A2o': 'fold',
    'KQo': 'raise', 'KJo': 'raise', 
    'KTo': 'fold', 'K9o': 'fold', 'K8o': 'fold', 'K7o': 'fold', 'K6o': 'fold', 'K5o': 'fold', 'K4o': 'fold', 'K3o': 'fold', 'K2o': 'fold',
    'QJo': 'raise', 
    'QTo': 'fold', 'Q9o': 'fold', 'Q8o': 'fold', 'Q7o': 'fold', 'Q6o': 'fold', 'Q5o': 'fold', 'Q4o': 'fold', 'Q3o': 'fold', 'Q2o': 'fold',
    'JTo': 'fold', 'J9o': 'fold', 'J8o': 'fold', 'J7o': 'fold', 'J6o': 'fold', 'J5o': 'fold', 'J4o': 'fold', 'J3o': 'fold', 'J2o': 'fold',
    'T9o': 'fold', 'T8o': 'fold', 'T7o': 'fold', 'T6o': 'fold', 'T5o': 'fold', 'T4o': 'fold', 'T3o': 'fold', 'T2o': 'fold',
    '98o': 'fold', '97o': 'fold', '96o': 'fold', '95o': 'fold', '94o': 'fold', '93o': 'fold', '92o': 'fold',
    '87o': 'fold', '86o': 'fold', '85o': 'fold', '84o': 'fold', '83o': 'fold', '82o': 'fold',
    '76o': 'fold', '75o': 'fold', '74o': 'fold', '73o': 'fold', '72o': 'fold',
    '65o': 'fold', '64o': 'fold', '63o': 'fold', '62o': 'fold',
    '54o': 'fold', '53o': 'fold', '52o': 'fold',
    '43o': 'fold', '42o': 'fold',
    '32o': 'fold'
  },

  CO: {
    // Pairs
    'AA': 'raise', 'KK': 'raise', 'QQ': 'raise', 'JJ': 'raise', 'TT': 'raise', '99': 'raise', '88': 'raise', '77': 'raise', '66': 'raise',
    '55': 'mixed', '44': 'mixed', '33': 'mixed', '22': 'mixed',
    
    // Suited hands
    'AKs': 'raise', 'AQs': 'raise', 'AJs': 'raise', 'ATs': 'raise', 'A9s': 'raise', 'A8s': 'raise', 'A7s': 'raise', 'A6s': 'raise', 'A5s': 'raise', 'A4s': 'raise', 'A3s': 'raise', 'A2s': 'raise',
    'KQs': 'raise', 'KJs': 'raise', 'KTs': 'raise', 'K9s': 'raise', 'K8s': 'raise', 'K7s': 'raise', 'K6s': 'raise', 'K5s': 'raise', 
    'K4s': 'fold', 'K3s': 'fold', 'K2s': 'fold',
    'QJs': 'raise', 'QTs': 'raise', 'Q9s': 'raise', 'Q8s': 'raise', 
    'Q7s': 'fold', 'Q6s': 'fold', 'Q5s': 'fold', 'Q4s': 'fold', 'Q3s': 'fold', 'Q2s': 'fold',
    'JTs': 'raise', 'J9s': 'raise', 'J8s': 'raise', 
    'J7s': 'fold', 'J6s': 'fold', 'J5s': 'fold', 'J4s': 'fold', 'J3s': 'fold', 'J2s': 'fold',
    'T9s': 'raise', 'T8s': 'raise', 
    'T7s': 'fold', 'T6s': 'fold', 'T5s': 'fold', 'T4s': 'fold', 'T3s': 'fold', 'T2s': 'fold',
    '98s': 'raise', 
    '97s': 'fold', '96s': 'fold', '95s': 'fold', '94s': 'fold', '93s': 'fold', '92s': 'fold',
    '87s': 'raise', 
    '86s': 'fold', '85s': 'fold', '84s': 'fold', '83s': 'fold', '82s': 'fold',
    '76s': 'mixed',
    '75s': 'fold', '74s': 'fold', '73s': 'fold', '72s': 'fold',
    '65s': 'mixed',
    '64s': 'fold', '63s': 'fold', '62s': 'fold',
    '54s': 'mixed',
    '53s': 'fold', '52s': 'fold',
    '43s': 'fold', '42s': 'fold',
    '32s': 'fold',
    
    // Offsuit hands
    'AKo': 'raise', 'AQo': 'raise', 'AJo': 'raise', 'ATo': 'raise', 'A9o': 'raise', 'A8o': 'raise', 
    'A7o': 'fold', 'A6o': 'fold', 'A5o': 'fold', 'A4o': 'fold', 'A3o': 'fold', 'A2o': 'fold',
    'KQo': 'raise', 'KJo': 'raise', 'KTo': 'raise', 
    'K9o': 'fold', 'K8o': 'fold', 'K7o': 'fold', 'K6o': 'fold', 'K5o': 'fold', 'K4o': 'fold', 'K3o': 'fold', 'K2o': 'fold',
    'QJo': 'raise', 'QTo': 'raise', 
    'Q9o': 'fold', 'Q8o': 'fold', 'Q7o': 'fold', 'Q6o': 'fold', 'Q5o': 'fold', 'Q4o': 'fold', 'Q3o': 'fold', 'Q2o': 'fold',
    'JTo': 'raise', 
    'J9o': 'fold', 'J8o': 'fold', 'J7o': 'fold', 'J6o': 'fold', 'J5o': 'fold', 'J4o': 'fold', 'J3o': 'fold', 'J2o': 'fold',
    'T9o': 'fold', 'T8o': 'fold', 'T7o': 'fold', 'T6o': 'fold', 'T5o': 'fold', 'T4o': 'fold', 'T3o': 'fold', 'T2o': 'fold',
    '98o': 'fold', '97o': 'fold', '96o': 'fold', '95o': 'fold', '94o': 'fold', '93o': 'fold', '92o': 'fold',
    '87o': 'fold', '86o': 'fold', '85o': 'fold', '84o': 'fold', '83o': 'fold', '82o': 'fold',
    '76o': 'fold', '75o': 'fold', '74o': 'fold', '73o': 'fold', '72o': 'fold',
    '65o': 'fold', '64o': 'fold', '63o': 'fold', '62o': 'fold',
    '54o': 'fold', '53o': 'fold', '52o': 'fold',
    '43o': 'fold', '42o': 'fold',
    '32o': 'fold'
  },

  BU: {
    // Pairs
    'AA': 'raise', 'KK': 'raise', 'QQ': 'raise', 'JJ': 'raise', 'TT': 'raise',
    '99': 'raise', '88': 'raise', '77': 'raise', '66': 'raise',
    '55': 'raise', '44': 'raise', '33': 'raise', '22': 'raise',
    
    // Suited hands
    'AKs': 'raise', 'AQs': 'raise', 'AJs': 'raise', 'ATs': 'raise', 'A9s': 'raise', 'A8s': 'raise', 'A7s': 'raise', 'A6s': 'raise', 'A5s': 'raise', 'A4s': 'raise', 'A3s': 'raise', 'A2s': 'raise',
    'KQs': 'raise', 'KJs': 'raise', 'KTs': 'raise', 'K9s': 'raise', 'K8s': 'raise', 'K7s': 'raise', 'K6s': 'raise', 'K5s': 'raise', 'K4s': 'raise', 'K3s': 'raise', 'K2s': 'raise',
    'QJs': 'raise', 'QTs': 'raise', 'Q9s': 'raise', 'Q8s': 'raise', 'Q7s': 'raise', 'Q6s': 'raise', 'Q5s': 'raise', 'Q4s': 'raise', 'Q3s': 'raise', 'Q2s': 'raise',
    'JTs': 'raise', 'J9s': 'raise', 'J8s': 'raise', 'J7s': 'raise', 'J6s': 'raise', 'J5s': 'raise', 'J4s': 'raise', 
    'J3s': 'fold', 'J2s': 'fold',
    'T9s': 'raise', 'T8s': 'raise', 'T7s': 'raise', 'T6s': 'raise', 
    'T5s': 'fold', 'T4s': 'fold', 'T3s': 'fold', 'T2s': 'fold',
    '98s': 'raise', '97s': 'raise', '96s': 'raise', 
    '95s': 'fold', '94s': 'fold', '93s': 'fold', '92s': 'fold',
    '87s': 'raise', '86s': 'raise', 
    '85s': 'fold', '84s': 'fold', '83s': 'fold', '82s': 'fold',
    '76s': 'raise', '75s': 'raise',
    '74s': 'fold', '73s': 'fold', '72s': 'fold',
    '65s': 'raise',
    '64s': 'fold', '63s': 'fold', '62s': 'fold',
    '54s': 'raise',
    '53s': 'fold', '52s': 'fold',
    '43s': 'fold', '42s': 'fold',
    '32s': 'fold',
    
    // Offsuit hands
    'AKo': 'raise', 'AQo': 'raise', 'AJo': 'raise', 'ATo': 'raise', 'A9o': 'raise', 'A8o': 'raise', 'A7o': 'raise', 'A6o': 'raise', 'A5o': 'raise', 
    'A4o': 'fold', 'A3o': 'fold', 'A2o': 'fold',
    'KQo': 'raise', 'KJo': 'raise', 'KTo': 'raise', 'K9o': 'raise', 
    'K8o': 'fold', 'K7o': 'fold', 'K6o': 'fold', 'K5o': 'fold', 'K4o': 'fold', 'K3o': 'fold', 'K2o': 'fold',
    'QJo': 'raise', 'QTo': 'raise', 'Q9o': 'raise', 
    'Q8o': 'fold', 'Q7o': 'fold', 'Q6o': 'fold', 'Q5o': 'fold', 'Q4o': 'fold', 'Q3o': 'fold', 'Q2o': 'fold',
    'JTo': 'raise', 'J9o': 'raise', 
    'J8o': 'fold', 'J7o': 'fold', 'J6o': 'fold', 'J5o': 'fold', 'J4o': 'fold', 'J3o': 'fold', 'J2o': 'fold',
    'T9o': 'raise', 
    'T8o': 'fold', 'T7o': 'fold', 'T6o': 'fold', 'T5o': 'fold', 'T4o': 'fold', 'T3o': 'fold', 'T2o': 'fold',
    '98o': 'fold', '97o': 'fold', '96o': 'fold', '95o': 'fold', '94o': 'fold', '93o': 'fold', '92o': 'fold',
    '87o': 'fold', '86o': 'fold', '85o': 'fold', '84o': 'fold', '83o': 'fold', '82o': 'fold',
    '76o': 'fold', '75o': 'fold', '74o': 'fold', '73o': 'fold', '72o': 'fold',
    '65o': 'fold', '64o': 'fold', '63o': 'fold', '62o': 'fold',
    '54o': 'fold', '53o': 'fold', '52o': 'fold',
    '43o': 'fold', '42o': 'fold',
    '32o': 'fold'
  },

  SB: {
    // Pairs
    'AA': 'raise', 'KK': 'raise', 'QQ': 'raise', 'JJ': 'raise', 'TT': 'raise',
    '99': 'raise', '88': 'raise', '77': 'raise', '66': 'raise', '55': 'mixed',
    '44': 'mixed', '33': 'mixed', '22': 'mixed',
    
    // Suited hands
    'AKs': 'raise', 'AQs': 'raise', 'AJs': 'raise', 'ATs': 'raise', 'A9s': 'raise', 'A8s': 'raise', 'A7s': 'raise', 'A6s': 'raise', 'A5s': 'raise', 'A4s': 'raise', 'A3s': 'raise', 'A2s': 'raise',
    'KQs': 'raise', 'KJs': 'raise', 'KTs': 'raise', 'K9s': 'raise', 'K8s': 'raise', 'K7s': 'raise', 'K6s': 'raise', 'K5s': 'raise', 'K4s': 'raise', 'K3s': 'raise', 'K2s': 'raise',
    'QJs': 'raise', 'QTs': 'raise', 'Q9s': 'raise', 'Q8s': 'raise', 'Q7s': 'raise', 'Q6s': 'raise', 'Q5s': 'raise', 'Q4s': 'raise', 'Q3s': 'raise', 'Q2s': 'raise',
    'JTs': 'raise', 'J9s': 'raise', 'J8s': 'raise', 'J7s': 'raise', 'J6s': 'raise', 'J5s': 'raise', 'J4s': 'raise',
    'J3s': 'fold', 'J2s': 'fold',
    'T9s': 'raise', 'T8s': 'raise', 'T7s': 'raise', 'T6s': 'raise', 
    'T5s': 'fold', 'T4s': 'fold', 'T3s': 'fold', 'T2s': 'fold',
    '98s': 'raise', '97s': 'raise', '96s': 'raise', 
    '95s': 'fold', '94s': 'fold', '93s': 'fold', '92s': 'fold',
    '87s': 'raise', '86s': 'raise', '85s': 'raise', 
    '84s': 'fold', '83s': 'fold', '82s': 'fold',
    '76s': 'raise', '75s': 'raise', '74s': 'raise',
    '73s': 'fold', '72s': 'fold',
    '65s': 'raise', '64s': 'raise',
    '63s': 'fold', '62s': 'fold',
    '54s': 'raise', '53s': 'raise', 
    '52s': 'fold',
    '43s': 'fold',
    '42s': 'fold',
    '32s': 'fold',
    
    // Offsuit hands
    'AKo': 'raise', 'AQo': 'raise', 'AJo': 'raise', 'ATo': 'raise', 'A9o': 'raise', 'A8o': 'raise', 'A7o': 'raise', 'A6o': 'raise', 'A5o': 'raise', 'A4o': 'raise', 
    'A3o': 'fold', 'A2o': 'fold',
    'KQo': 'raise', 'KJo': 'raise', 'KTo': 'raise', 'K9o': 'raise', 'K8o': 'raise', 
    'K7o': 'fold', 'K6o': 'fold', 'K5o': 'fold', 'K4o': 'fold', 'K3o': 'fold', 'K2o': 'fold',
    'QJo': 'raise', 'QTo': 'raise', 'Q9o': 'raise', 
    'Q8o': 'fold', 'Q7o': 'fold', 'Q6o': 'fold', 'Q5o': 'fold', 'Q4o': 'fold', 'Q3o': 'fold', 'Q2o': 'fold',
    'JTo': 'raise', 'J9o': 'raise', 
    'J8o': 'fold', 'J7o': 'fold', 'J6o': 'fold', 'J5o': 'fold', 'J4o': 'fold', 'J3o': 'fold', 'J2o': 'fold',
    'T9o': 'raise', 
    'T8o': 'fold', 'T7o': 'fold', 'T6o': 'fold', 'T5o': 'fold', 'T4o': 'fold', 'T3o': 'fold', 'T2o': 'fold',
    '98o': 'raise', 
    '97o': 'fold', '96o': 'fold', '95o': 'fold', '94o': 'fold', '93o': 'fold', '92o': 'fold',
    '87o': 'raise', 
    '86o': 'fold', '85o': 'fold', '84o': 'fold', '83o': 'fold', '82o': 'fold',
    '76o': 'fold', '75o': 'fold', '74o': 'fold', '73o': 'fold', '72o': 'fold',
    '65o': 'fold', '64o': 'fold', '63o': 'fold', '62o': 'fold',
    '54o': 'fold', '53o': 'fold', '52o': 'fold',
    '43o': 'fold', '42o': 'fold',
    '32o': 'fold'
  },

  BB: {
    // Big Blind position - can call or raise
    // For simplicity, we'll use a similar range to SB 
    // Pairs
    'AA': 'raise', 'KK': 'raise', 'QQ': 'raise', 'JJ': 'raise', 'TT': 'raise',
    '99': 'raise', '88': 'raise', '77': 'raise', '66': 'raise', '55': 'mixed',
    '44': 'mixed', '33': 'mixed', '22': 'mixed',
    
    // Suited hands
    'AKs': 'raise', 'AQs': 'raise', 'AJs': 'raise', 'ATs': 'raise', 'A9s': 'raise', 'A8s': 'raise', 'A7s': 'raise', 'A6s': 'raise', 'A5s': 'raise', 'A4s': 'raise', 'A3s': 'raise', 'A2s': 'raise',
    'KQs': 'raise', 'KJs': 'raise', 'KTs': 'raise', 'K9s': 'raise', 'K8s': 'raise', 'K7s': 'raise', 'K6s': 'raise', 'K5s': 'raise', 'K4s': 'raise', 'K3s': 'raise', 'K2s': 'raise',
    'QJs': 'raise', 'QTs': 'raise', 'Q9s': 'raise', 'Q8s': 'raise', 'Q7s': 'raise', 'Q6s': 'raise', 'Q5s': 'raise', 'Q4s': 'raise', 'Q3s': 'raise', 'Q2s': 'raise',
    'JTs': 'raise', 'J9s': 'raise', 'J8s': 'raise', 'J7s': 'raise', 'J6s': 'raise', 'J5s': 'raise', 'J4s': 'raise',
    'J3s': 'fold', 'J2s': 'fold',
    'T9s': 'raise', 'T8s': 'raise', 'T7s': 'raise', 'T6s': 'raise', 
    'T5s': 'fold', 'T4s': 'fold', 'T3s': 'fold', 'T2s': 'fold',
    '98s': 'raise', '97s': 'raise', '96s': 'raise', 
    '95s': 'fold', '94s': 'fold', '93s': 'fold', '92s': 'fold',
    '87s': 'raise', '86s': 'raise', '85s': 'raise', 
    '84s': 'fold', '83s': 'fold', '82s': 'fold',
    '76s': 'raise', '75s': 'raise', '74s': 'raise',
    '73s': 'fold', '72s': 'fold',
    '65s': 'raise', '64s': 'raise',
    '63s': 'fold', '62s': 'fold',
    '54s': 'raise', '53s': 'raise', 
    '52s': 'fold',
    '43s': 'fold',
    '42s': 'fold',
    '32s': 'fold',
    
    // Offsuit hands
    'AKo': 'raise', 'AQo': 'raise', 'AJo': 'raise', 'ATo': 'raise', 'A9o': 'raise', 'A8o': 'raise', 'A7o': 'raise', 'A6o': 'raise', 'A5o': 'raise', 'A4o': 'raise', 
    'A3o': 'fold', 'A2o': 'fold',
    'KQo': 'raise', 'KJo': 'raise', 'KTo': 'raise', 'K9o': 'raise', 'K8o': 'raise', 
    'K7o': 'fold', 'K6o': 'fold', 'K5o': 'fold', 'K4o': 'fold', 'K3o': 'fold', 'K2o': 'fold',
    'QJo': 'raise', 'QTo': 'raise', 'Q9o': 'raise', 
    'Q8o': 'fold', 'Q7o': 'fold', 'Q6o': 'fold', 'Q5o': 'fold', 'Q4o': 'fold', 'Q3o': 'fold', 'Q2o': 'fold',
    'JTo': 'raise', 'J9o': 'raise', 
    'J8o': 'fold', 'J7o': 'fold', 'J6o': 'fold', 'J5o': 'fold', 'J4o': 'fold', 'J3o': 'fold', 'J2o': 'fold',
    'T9o': 'raise', 
    'T8o': 'fold', 'T7o': 'fold', 'T6o': 'fold', 'T5o': 'fold', 'T4o': 'fold', 'T3o': 'fold', 'T2o': 'fold',
    '98o': 'raise', 
    '97o': 'fold', '96o': 'fold', '95o': 'fold', '94o': 'fold', '93o': 'fold', '92o': 'fold',
    '87o': 'raise', 
    '86o': 'fold', '85o': 'fold', '84o': 'fold', '83o': 'fold', '82o': 'fold',
    '76o': 'fold', '75o': 'fold', '74o': 'fold', '73o': 'fold', '72o': 'fold',
    '65o': 'fold', '64o': 'fold', '63o': 'fold', '62o': 'fold',
    '54o': 'fold', '53o': 'fold', '52o': 'fold',
    '43o': 'fold', '42o': 'fold',
    '32o': 'fold'
  }
}; 