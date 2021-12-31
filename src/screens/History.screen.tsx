import React from 'react';
import { View } from 'react-native';
import { MoodCard } from '../components/MoodCard';
import { useMoodListContext } from '../providers/moodLists.provider';

export const History: React.FC = () => {
  const { moodList } = useMoodListContext();

  return (
    <View>
      {moodList.map(moodItem => (
        <MoodCard key={moodItem.timestamp} moodItem={moodItem} />
      ))}
    </View>
  );
};
