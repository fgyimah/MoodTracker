import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { MoodListProvider } from './providers/moodLists.provider';
import { BottomTabsNavigator } from './screens/BottomTabs.navigator';

export const App: React.FC = () => {
  return (
    <MoodListProvider>
      <NavigationContainer>
        <BottomTabsNavigator />
      </NavigationContainer>
    </MoodListProvider>
  );
};
