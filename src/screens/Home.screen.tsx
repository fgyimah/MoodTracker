import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MoodPicker } from '../components/MoodPicker';
import { MoodListContext } from '../providers/moodLists.provider';

export const Home: React.FC = () => {
  const { handleSelectMood } = React.useContext(MoodListContext);

  return (
    <View style={styles.container}>
      <MoodPicker onSelect={handleSelectMood} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
});
