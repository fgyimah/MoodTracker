import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { MoodPicker } from '../components/MoodPicker';
import { useMoodListContext } from '../providers/moodLists.provider';

export const Home: React.FC = () => {
  const { handleSelectMood } = useMoodListContext();

  return (
    <ImageBackground
      source={{
        uri: 'https://images.unsplash.com/photo-1474540412665-1cdae210ae6b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1766&q=80',
      }}
      style={styles.container}>
      <MoodPicker onSelect={handleSelectMood} />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});
