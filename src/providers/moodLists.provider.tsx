import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MoodOptionType, MoodOptionWithTimestamp } from '../types';

const MOOD_LIST_KEY = 'mood-list-key';

interface MoodListContextType {
  moodList: MoodOptionWithTimestamp[];
  handleSelectMood: (mood: MoodOptionType) => void;
  handleDeleteMood: (mood: MoodOptionWithTimestamp) => void;
}

const defaultValue: MoodListContextType = {
  moodList: [],
  handleSelectMood: () => {},
  handleDeleteMood: () => {},
};

const MoodListContext = React.createContext<MoodListContextType>(defaultValue);
export const useMoodListContext = () => React.useContext(MoodListContext);

/**
 * function to get saved moods in async storage
 * @returns - saved moodLists
 */
const loadSavedMoods = async (): Promise<
  MoodOptionWithTimestamp[] | undefined
> => {
  try {
    const moods = await AsyncStorage.getItem(MOOD_LIST_KEY);
    if (moods) {
      return JSON.parse(moods) as MoodOptionWithTimestamp[];
    }
  } catch (error) {
    console.error(error);
  }
};

/**
 * function to persist current app moods to async storage
 * @param moods - moods to be persisted
 */
const saveMoods = async (moods: MoodOptionWithTimestamp[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(MOOD_LIST_KEY, JSON.stringify(moods));
  } catch (error) {
    console.error(error);
  }
};

export const MoodListProvider: React.FC = ({ children }) => {
  const [moodList, setMoodList] = React.useState<MoodOptionWithTimestamp[]>([]);

  React.useEffect(() => {
    const getSavedMoods = async () => {
      const moods = await loadSavedMoods();
      if (moods) {
        setMoodList(moods);
      }
    };

    getSavedMoods();
  }, []);

  const handleSelectMood = React.useCallback((mood: MoodOptionType) => {
    setMoodList(current => {
      const updatedMoods = [...current, { mood, timestamp: Date.now() }];
      saveMoods(updatedMoods);

      return updatedMoods;
    });
  }, []);

  const handleDeleteMood = React.useCallback(
    (mood: MoodOptionWithTimestamp) => {
      setMoodList(current => {
        const updatedMoods = current.filter(
          item => mood.timestamp !== item.timestamp,
        );
        saveMoods(updatedMoods);

        return updatedMoods;
      });
    },
    [],
  );

  return (
    <MoodListContext.Provider
      value={{ moodList, handleSelectMood, handleDeleteMood }}>
      {children}
    </MoodListContext.Provider>
  );
};
