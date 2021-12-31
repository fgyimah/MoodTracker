import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { format } from 'date-fns';
import { MoodOptionWithTimestamp } from '../types';
import { theme } from '../theme';

interface Props {
  moodItem: MoodOptionWithTimestamp;
}

export const MoodCard: React.FC<Props> = ({
  moodItem: { timestamp, mood },
}) => {
  return (
    <View key={timestamp} style={styles.container}>
      <View style={styles.emojiAndDescriptionContainer}>
        <Text style={styles.emoji}>{mood.emoji}</Text>
        <Text style={styles.description}>{mood.description}</Text>
      </View>
      <Text style={styles.datetime}>
        {format(timestamp, "dd MMM, yyyy 'at' h:mmaaa")}
      </Text>
    </View>
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
  },
  datetime: {
    color: theme.colorLavender,
    fontSize: 16,
    fontWeight: '500',
  },
});
