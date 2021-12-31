import React from 'react';
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import Toast from 'react-native-toast-message';
import { theme } from '../theme';
import { MoodOptionType } from '../types';

const moodOptions: MoodOptionType[] = [
  { emoji: '👨‍💻', description: 'studious' },
  { emoji: '🤔', description: 'pensive' },
  { emoji: '😊', description: 'happy' },
  { emoji: '🥳', description: 'celebratory' },
  { emoji: '😤', description: 'frustrated' },
];

interface Props {
  onSelect: (mood: MoodOptionType) => void;
}

export const MoodPicker: React.FC<Props> = ({ onSelect }) => {
  const [selectedMood, setSelectedMood] = React.useState<MoodOptionType>();
  const [hasSelected, setHasSelected] = React.useState(false);

  const handleMoodSelected = React.useCallback(() => {
    if (selectedMood) {
      onSelect(selectedMood);
      setSelectedMood(undefined);
      setHasSelected(true);
      Toast.show({
        type: 'success',
        text1: 'Mood saved',
      });
    }
  }, [selectedMood, onSelect]);

  return (
    <View style={styles.container}>
      {hasSelected ? (
        <>
          <Image source={require('../assets/butterflies.png')} />
          <Pressable
            onPress={() => setHasSelected(false)}
            style={styles.buttonWrapper}>
            <Text style={styles.buttonText}>Back</Text>
          </Pressable>
        </>
      ) : (
        <>
          <Text style={styles.title}>How are you right now?</Text>
          <View style={styles.moodOptions}>
            {moodOptions.map(option => (
              <View key={option.emoji}>
                <Pressable
                  onPress={() => setSelectedMood(option)}
                  style={[
                    styles.moodItem,
                    selectedMood === option
                      ? styles.selectedMoodItem
                      : undefined,
                  ]}>
                  <Text style={styles.moodText}>{option.emoji}</Text>
                </Pressable>
                <Text style={styles.descriptionText}>
                  {selectedMood === option ? option.description : undefined}
                </Text>
              </View>
            ))}
          </View>
          <Pressable style={styles.buttonWrapper} onPress={handleMoodSelected}>
            <Text style={styles.buttonText}>Choose</Text>
          </Pressable>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 230,
  },
  moodOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  moodText: {
    fontSize: 24,
  },
  moodItem: {
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginBottom: 5,
  },
  selectedMoodItem: {
    borderWidth: 2,
    backgroundColor: theme.colorPurple,
    borderColor: theme.colorWhite,
  },
  descriptionText: {
    color: theme.colorPurple,
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    marginVertical: 5,
    textAlign: 'center',
  },
  buttonWrapper: {
    padding: 10,
    backgroundColor: theme.colorPurple,
    width: '45%',
    borderRadius: 20,
    alignSelf: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: theme.colorWhite,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});
