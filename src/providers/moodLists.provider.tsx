import React from 'react';
import { MoodOptionType, MoodOptionWithTimestamp } from '../types';

interface MoodListContextType {
  moodList: MoodOptionWithTimestamp[];
  handleSelectMood: (mood: MoodOptionType) => void;
}

const defaultValue: MoodListContextType = {
  moodList: [],
  handleSelectMood: () => {},
};

export const MoodListContext =
  React.createContext<MoodListContextType>(defaultValue);

export const MoodListProvider: React.FC = ({ children }) => {
  const [moodList, setMoodList] = React.useState<MoodOptionWithTimestamp[]>([]);

  const handleSelectMood = React.useCallback((mood: MoodOptionType) => {
    setMoodList(current => [...current, { mood, timestamp: Date.now() }]);
  }, []);

  return (
    <MoodListContext.Provider value={{ moodList, handleSelectMood }}>
      {children}
    </MoodListContext.Provider>
  );
};
