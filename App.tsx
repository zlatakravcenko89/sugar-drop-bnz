/**
 * SUGAR DROP — tap-to-pick / tap-to-drop dessert boards.
 * State machine: loader -> menu -> game -> gameover -> menu (+ shelf).
 *
 * @format
 */

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { BackHandler, StatusBar, StyleSheet, View } from 'react-native';
import { START_SCORE } from './src/constants/config';
import THEME from './src/constants/theme';
import { getBoards } from './src/game/boardStore';
import type { GameResult } from './src/hooks/useSugarGame';
import LoaderScreen from './src/screens/LoaderScreen';
import MenuScreen from './src/screens/MenuScreen';
import GameScreen from './src/screens/GameScreen';
import ResultScreen from './src/screens/ResultScreen';
import BoardsScreen from './src/screens/BoardsScreen';

/** The result/game-over step is a discrete screen of its own. */
const GameOverScreen = ResultScreen;

export type Screen = 'loader' | 'menu' | 'game' | 'result' | 'gameover' | 'shelf';

const EMPTY_RESULT: GameResult = {
  won: false,
  score: START_SCORE,
  gained: 0,
  bestCombo: 1,
  filled: 0,
  recipeName: 'BERRY BONANZA',
  slots: [null, null, null, null, null, null],
};

function App(): React.JSX.Element {
  const [screen, setScreen] = useState<Screen>('loader');
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(START_SCORE);
  const [result, setResult] = useState<GameResult>(EMPTY_RESULT);
  const [shelfVersion, setShelfVersion] = useState(0);

  const boards = useMemo(() => getBoards().slice(), [shelfVersion, screen]);

  const goMenu = useCallback(() => {
    setShelfVersion(v => v + 1);
    setScreen('menu');
  }, []);

  const goGame = useCallback(() => {
    setRound(r => r + 1);
    setScreen('game');
  }, []);

  const goShelf = useCallback(() => {
    setShelfVersion(v => v + 1);
    setScreen('shelf');
  }, []);

  const handleGameOver = useCallback((next: GameResult) => {
    setResult(next);
    setScore(next.score);
    setScreen('gameover');
  }, []);

  /** Android hardware back — never leave the user stuck on a sub-screen. */
  useEffect(() => {
    const onBack = () => {
      if (screen === 'loader') {
        return true;
      }
      if (screen === 'menu') {
        return false;
      }
      goMenu();
      return true;
    };
    const sub = BackHandler.addEventListener('hardwareBackPress', onBack);
    return () => sub.remove();
  }, [goMenu, screen]);

  const darkStatus = screen === 'loader' || screen === 'gameover' || screen === 'result';

  return (
    <View style={styles.root}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={darkStatus ? 'light-content' : 'dark-content'}
      />

      {screen === 'loader' ? <LoaderScreen onDone={goMenu} /> : null}

      {screen === 'menu' ? (
        <MenuScreen
          score={score}
          savedCount={boards.length}
          onPlay={goGame}
          onShelf={goShelf}
        />
      ) : null}

      {screen === 'game' ? (
        <GameScreen
          round={round}
          startScore={score}
          onExit={goMenu}
          onGameOver={handleGameOver}
        />
      ) : null}

      {screen === 'gameover' || screen === 'result' ? (
        <GameOverScreen
          result={result}
          onAgain={goGame}
          onMenu={goMenu}
          onShelf={goShelf}
        />
      ) : null}

      {screen === 'shelf' ? (
        <BoardsScreen boards={boards} onBack={goMenu} onPlay={goGame} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: THEME.colors.bg.primary },
});

export default App;
