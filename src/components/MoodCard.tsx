import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  LayoutAnimation,
  UIManager,
  Platform,
} from 'react-native';
import Reanimated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { format } from 'date-fns';
import { MoodOptionWithTimestamp } from '../types';
import { theme } from '../theme';
import { useMoodListContext } from '../providers/moodLists.provider';

interface Props {
  moodItem: MoodOptionWithTimestamp;
}

interface AnimatedContext {
  shouldBeRemoved?: boolean;
}

// enable experimental UI animations in android
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export const MoodCard: React.FC<Props> = ({ moodItem }) => {
  const { timestamp, mood } = moodItem;
  const { handleDeleteMood } = useMoodListContext();
  const offset = useSharedValue(0);
  const MAX_PAN = 80;

  const handleDeletePress = React.useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    handleDeleteMood(moodItem);
  }, [handleDeleteMood, moodItem]);

  const removeWithDelay = React.useCallback(() => {
    setTimeout(() => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      handleDeleteMood(moodItem);
    }, 250);
  }, [handleDeleteMood, moodItem]);

  const onGestureEvent = useAnimatedGestureHandler(
    {
      onActive: (event, ctx: AnimatedContext) => {
        const xVal = Math.floor(event.translationX);
        offset.value = xVal;

        if (Math.abs(xVal) <= MAX_PAN) {
          ctx.shouldBeRemoved = false;
        } else {
          ctx.shouldBeRemoved = true;
        }
      },
      onEnd: (_, ctx: AnimatedContext) => {
        if (ctx.shouldBeRemoved) {
          runOnJS(removeWithDelay)();
        } else {
          offset.value = withTiming(0);
        }
      },
    },
    [],
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }));

  return (
    <PanGestureHandler
      // @ts-ignore
      minDeltaX={1}
      maxDeltaY={100}
      onGestureEvent={onGestureEvent}>
      <Reanimated.View
        key={timestamp}
        style={[styles.container, animatedStyle]}>
        <View style={styles.emojiAndDescriptionContainer}>
          <Text style={styles.emoji}>{mood.emoji}</Text>
          <Text style={styles.description}>{mood.description}</Text>
        </View>
        <Text style={styles.datetime}>
          {format(timestamp, "dd MMM, yyyy 'at' h:mmaaa")}
        </Text>
        <Pressable hitSlop={16}>
          <Text style={styles.deleteText} onPress={handleDeletePress}>
            Delete
          </Text>
        </Pressable>
      </Reanimated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colorWhite,
    flexDirection: 'row',
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  emojiAndDescriptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 32,
    marginRight: 10,
  },
  description: {
    fontWeight: 'bold',
    fontSize: 16,
    color: theme.colorPurple,
    fontFamily: theme.fontFamilyRegular,
  },
  datetime: {
    color: theme.colorLavender,
    fontSize: 16,
    fontWeight: '500',
    fontFamily: theme.fontFamilyLight,
  },
  deleteText: {
    fontSize: 18,
    color: theme.colorBlue,
    fontFamily: theme.fontFamilyLight,
  },
});
