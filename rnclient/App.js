import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import Navigation from './js/navigation';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {Provider} from '@ant-design/react-native';
import {AppProvider} from './js/context/AppContext';
import {LogBox} from 'react-native';

const App = () => {
  const colorScheme = useColorScheme();
  LogBox.ignoreLogs(['Warning: componentWillReceiveProps has been renamed']);
  return (
    <AppProvider>
      <Provider>
        <NavigationContainer
          theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Navigation />
          <StatusBar />
        </NavigationContainer>
      </Provider>
    </AppProvider>
  );
};

export default App;
