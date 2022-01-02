import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Toast from 'react-native-toast-message';
import SplashScreen from 'react-native-splash-screen';
import { MoodListProvider } from './providers/moodLists.provider';
import { BottomTabsNavigator } from './screens/BottomTabs.navigator';

export const App: React.FC = () => {
  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <MoodListProvider>
      <NavigationContainer>
        <BottomTabsNavigator />
      </NavigationContainer>
      <Toast />
    </MoodListProvider>
  );
};
