import { useCallback, useRef } from 'react';
import { Animated } from 'react-native';
import THEME from '../constants/theme';

/**
 * Press feedback: the Pressable is the PARENT, the Animated.View is a CHILD.
 * Only `transform` is animated, so useNativeDriver stays true.
 */
export function usePressScale(to = 0.96) {
  const scale = useRef(new Animated.Value(1)).current;

  const onPressIn = useCallback(() => {
    Animated.spring(scale, {
      toValue: to,
      tension: THEME.animation.press.tension,
      friction: THEME.animation.press.friction,
      useNativeDriver: true,
    }).start();
  }, [scale, to]);

  const onPressOut = useCallback(() => {
    Animated.spring(scale, {
      toValue: 1,
      tension: THEME.animation.press.tension,
      friction: THEME.animation.press.friction,
      useNativeDriver: true,
    }).start();
  }, [scale]);

  return { scale, onPressIn, onPressOut };
}

export default usePressScale;
