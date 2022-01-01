import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { MoodCard } from '../components/MoodCard';
import { useMoodListContext } from '../providers/moodLists.provider';

export const History: React.FC = () => {
  const { moodList } = useMoodListContext();

  return (
    <ScrollView>
      {moodList.map(moodItem => (
        <MoodCard key={moodItem.timestamp} moodItem={moodItem} />
      ))}
    </ScrollView>
  );
};
