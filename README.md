# Poker Simulator

A No-Limit Hold'em poker simulator designed to help players learn preflop and postflop hand ranges based on position with advanced bot behavior and debugging features.

## Game Modes

### 1. Preflop Training Mode (Current)
**Цель**: Тренировка префлоп стратегии на разных позициях

#### Логика игры:
1. **Начальная раздача**: Человек всегда дилер (BU) в первом раунде
2. **Порядок действий**: UTG → HJ → CO → BU (человек) → SB → BB
3. **Видимость карт**: Все карты видны для отладки и обучения
4. **Действия ботов**: Строго по таблице `handRanges.ts`

#### Логика рейзов:
- **0 рейзов**: Бот с рейз-рукой всегда рейзит
- **1 рейз**: Бот с рейз-рукой рейзит (50%) или коллит (50%)
- **2+ рейза**: Бот с рейз-рукой всегда коллит

#### Оценка действий игрока:
- **Сравнение с таблицей**: Действие игрока сравнивается с `handRanges.ts`
- **Фидбек**: Зеленое "OK" или красное "Wrong" с объяснением
- **Session History**: Все действия игрока записываются в таблицу

#### Ротация позиций:
- **После каждого раунда**: Кнопка и позиции сдвигаются влево (по часовой стрелке)
- **Новые позиции**: Человек получает новую позицию в каждом раунде
- **Автоматический переход**: Кнопка "Next Hand" для перехода к следующей раздаче

#### Действия игрока:
- **4 кнопки**: Fold, Call, Raise, Mixed
- **Mixed стратегия**: Случайный выбор между Raise и Fold
- **Мгновенная оценка**: Правильность действия определяется сразу

### 2. Postflop Training Mode (Planned)
**Цель**: Тренировка постфлоп стратегии

#### Планируемые функции:
- **Флоп/Тёрн/Ривер**: Полные раунды после префлопа
- **Анализ текстуры борда**: Определение типа флопа
- **Стратегии в зависимости от позиции**: Разные подходы на разных улицах
- **Оценка силы руки**: Сравнение с оппонентами
- **Беттинг паттерны**: Правильные размеры ставок

## Features

- **6 Players**: 5 bots + 1 human player
- **Position-Based Hand Ranges**: Based on professional poker charts for UTG, HJ, CO, BU, SB, and BB positions
- **Advanced Bot AI**: Bots follow realistic preflop strategies with raise/call logic
- **Debug Mode**: All player cards are visible for learning and debugging
- **Four Actions**: Fold, Call, Raise, Mixed buttons for human player
- **Sequential Bot Actions**: Bots act in order with realistic raise dynamics
- **Auto-Play System**: Automatic bot actions with visual feedback
- **Instant Feedback**: Shows green "OK" for correct moves and red "Wrong" with explanation for incorrect moves
- **Visual Poker Table**: Beautiful 3D-style poker table with player positions
- **Action History**: Track all actions and decisions
- **Statistics**: Detailed statistics for both human and bot performance
- **Position Rotation**: Human player experiences all positions over multiple hands

## Game Logic

### Player Setup
- **Human Player**: Rotates through all positions (BU → SB → BB → UTG → HJ → CO)
- **Bot Players**: 5 bots with rotating positions
- **Position Order**: BU → SB → BB → UTG → HJ → CO

### Bot Behavior Logic
1. **Sequential Actions**: Bots act in order from UTG to BB
2. **Hand Range Based**: Each bot follows position-specific hand ranges from `handRanges.ts`
3. **Raise Dynamics**:
   - **0 рейзов**: Бот с рейз-рукой всегда рейзит
   - **1 рейз**: Бот с рейз-рукой рейзит (50%) или коллит (50%)
   - **2+ рейза**: Бот с рейз-рукой всегда коллит
4. **Mixed Strategy**: 50% вероятность игры, 30% вероятность рейза при игре
5. **Realistic Betting**: Raises are $50, calls match current bet

### Human Player Experience
- **Full Control**: 4 action buttons (Fold, Call, Raise, Mixed)
- **Position Learning**: Practice with different positions as they rotate
- **Feedback System**: Immediate validation of decisions
- **Session History**: Track all player decisions and correctness

## Hand Ranges

The simulator uses professional hand ranges for each position:

- **UTG (Under the Gun)**: Tightest range, only premium hands
- **HJ (Hijack)**: Slightly wider range than UTG
- **CO (Cutoff)**: Wider range with some mixed strategies
- **BU (Button)**: Very wide range, most hands
- **SB (Small Blind)**: Wide range with mixed strategies
- **BB (Big Blind)**: Defending range (simplified for this simulator)

## Debug Features

### Card Visibility
- **All Cards Visible**: Every player's cards are shown for learning purposes
- **Hand Notation**: Each player's hand is displayed (e.g., "AKs", "QQ")
- **Action Display**: Shows last action and amount for each player

### Auto-Play Controls
- **Automatic Bot Actions**: Bots act sequentially with delays
- **Next Hand Button**: Appears after preflop round completion
- **Visual Feedback**: Bot actions are displayed with timing

### Statistics
- **Human Performance**: Total actions, correct actions, accuracy percentage
- **Session History**: All player actions with correctness evaluation
- **Position Tracking**: Performance by position

## How to Play

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start the Development Server**:
   ```bash
   npm run dev
   ```

3. **Open in Browser**:
   Navigate to `http://localhost:5173`

4. **Gameplay (Preflop Training)**:
   - Game starts with human as dealer (BU)
   - Bots act sequentially: UTG → HJ → CO → BU (human) → SB → BB
   - When it's your turn, choose from 4 actions: Fold, Call, Raise, or Mixed
   - Get instant feedback on your decision
   - After BB acts, click "Next Hand" to continue
   - Positions rotate automatically - you'll experience all positions

## Learning Objectives

- **Position Strategy**: Learn which hands to play from each position
- **Bot Observation**: Watch how bots make decisions based on hand ranges
- **Raise Dynamics**: Understand when and why raises happen
- **Decision Making**: Practice making quick preflop decisions
- **Range Understanding**: See how different positions require different hand ranges
- **Position Rotation**: Experience all positions over multiple hands

## Technical Details

- **Built with**: React + TypeScript
- **Styling**: Tailwind CSS
- **Hand Ranges**: Based on professional poker charts in `handRanges.ts`
- **Bot AI**: Custom logic with realistic raise dynamics
- **State Management**: React hooks for game state
- **Responsive Design**: Works on different screen sizes

## File Structure

```
src/
├── App.tsx                 # Main game component with preflop training logic
├── components/
│   ├── PokerTable.tsx      # Visual poker table
│   ├── PlayerSeat.tsx      # Individual player display
│   ├── ActionButtons.tsx   # Human action buttons
│   ├── History.tsx         # Session history display
│   └── ...
├── data/
│   └── handRanges.ts       # Position-based hand ranges
├── utils/
│   └── pokerUtils.ts       # Game logic and bot AI
└── types/
    └── poker.ts           # TypeScript type definitions
```

## Hand Range Legend

- **White cells**: 100% play (raise)
- **Blue cells**: 25% play (mixed strategy)
- **Green cells**: 50% play (mixed strategy)
- **Dark gray cells**: Fold

## Recent Updates

### Preflop Training Mode Implementation
- **Position Rotation**: Human player rotates through all positions
- **Realistic Raise Logic**: Maximum 2 raises per round (initial + one re-raise)
- **Sequential Bot Actions**: Proper order with pauses for human player
- **Session History**: Track all player decisions with correctness evaluation
- **Mixed Strategy**: Proper handling of mixed strategy hands (50% play, 30% raise when playing)

### Bot AI Improvements
- **Raise Count Tracking**: Local variable prevents more than 2 raises per round
- **Position-Aware Decisions**: Bots consider their position when making decisions
- **Realistic Re-raise Logic**: 50% probability of re-raising after first raise
- **Proper Action Order**: UTG → HJ → CO → BU (human) → SB → BB

### User Experience
- **Automatic Position Rotation**: Human experiences all positions over multiple hands
- **Better Feedback**: Enhanced action validation and feedback
- **Visual Improvements**: Better action display and positioning
- **Next Hand Button**: Appears after preflop round completion

## Future Development

### Postflop Training Mode
- **Full Street Play**: Flop, Turn, River rounds
- **Board Texture Analysis**: Different strategies for different board types
- **Pot Odds Calculation**: Help with calling decisions
- **Bet Sizing**: Learn proper bet sizes for different situations
- **Hand Reading**: Practice reading opponent ranges

Описываю Preflot training.
Логика префлопа.
Первый раунд. Сначала человек, дилер, и он на баттоне BU.
Карты раздаются случайным образом, всем ботам и человеку, чтобы мы их видели.
Бот УТГ принимает решение.
Бот МП принимает решение.
Вот CO принимает решение.
Человек принимает решение, нажав кнопки, у него выбор четыре кнопки
Бот Small Blind принимает решение.
Вот Big Blind принимает решение
Действия всех заканчиваются, и показывается флоп.
Preflop раунд Завершился.

Каждый из ботов принимает решение по таблице hand ranges Либо рейс, либо фолд, Там, где написано Mixed, бот должен случайным образом сделать либо Raise, либо Fold.
Если один из ботов согласно таблице принял решение RAISE, Следующий бот, которому по таблице выпадает рейз, должен случайным образом подумать сделать колл, либо ререйз. После ререйза, если у ботов решение согласно таблице raise, то они все равно должны делать кол. Таким у нас образом будет лишь один ререйс.

Помни что мы должны оценивать действия игрока и отображать ему правильное или не правильное у него действие согласно таблице HandRanges.
Все действия игрока выводятся в табличку Session History
Действие ботов в эту табличку не выводим.
После того, как раунд закончился в префлоп-моде, мы тут же переходим к следующей раздаче
Для этого кнопка Button и все позиции сдвигаются на одну позицию влево по кругу.
И раунд повторяется, только теперь у человека другая позиция.
и в pre-flop training mode Движение дальше просто происходит по кругу, мы тренируем человека на префлоп.

## 📋 Version 1.0

**Статус**: ✅ Стабильная рабочая версия  
**Дата**: Декабрь 2024

Version 1.0 представляет собой полностью функциональный симулятор покера для тренировки префлоп стратегии. Все функции работают корректно:

- ✅ Логика рейзов (максимум 2 рейза за раунд)
- ✅ Ротация позиций (человек проходит все позиции)
- ✅ Оценка действий игрока по таблице handRanges
- ✅ Session History с правильностью действий
- ✅ Последовательные действия ботов с паузой для игрока

**Подробная документация**: См. файл `VERSION_1.0.md`

---

**Для возврата к Version 1.0**: Используйте файл `VERSION_1.0.md` как референс для восстановления функциональности.


