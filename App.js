import React, {
  useContext, useMemo, useState, useEffect,
} from 'react';
import {
  View, StatusBar, SafeAreaView, StyleSheet, Platform, LogBox,
} from 'react-native';
// import Routes from './routes';
import { AppearanceProvider, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import theme from './src/theme';
// import PushNotificationsMain from './PushNotificationsMain'
import './i18n';
import { useFonts } from '@use-expo/font';
// import * as Font from 'expo-font';
import { NewsContext } from './src/hooks/NewsContext';
import { SearchContext } from './src/hooks/SearchContext';
// import ArticleModal from './src/screens/ArticleModal'
// import * as ScreenOrientation from 'expo-screen-orientation';

import { NavigationContainer } from '@react-navigation/native';
import Navigation from './Navigation';

const { COLORS } = theme;

function App(){
  const [newsContextValue, setNewsContextValue] = useState({
    keyboardFocus: false,
    showModal: false,
    selectedArticle: {},
    searchPayload: [],
  });
  const memoizedNewsContext = useMemo(
    () => ({ newsContextValue, setNewsContextValue }, [newsContextValue, setNewsContextValue]),
  );

  const [searchContextValue, setSearchContextValue] = useState([]);

  useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
    LogBox.ignoreLogs(['Animated: `event`']);
  }, []);

  const [loaded, error] = useFonts({
    // FrutigerLight: require('./assets/fonts/FrutigerLTArabic-45Light.ttf'),
    Frutiger: require('./assets/fonts/FrutigerLTArabic-55Roman.ttf'),
    Gothici: require('./assets/fonts/GOTHIC_0.ttf'),
  });

  const colorScheme = useColorScheme();
  //   const themeStatusBarStyle = colorScheme === 'no-preference' ? 'light' : colorScheme;

  const themeStatusBarStyle = colorScheme === 'dark'
    ? 'dark-content'
    : colorScheme === 'no-preference'
      ? 'dark-content'
      : 'light-content';
  const themeStatusBarFont = colorScheme === 'light'
    ? 'dark-content'
    : colorScheme === 'no-preference'
      ? 'dark-content'
      : 'light-content';
  const themeTextStyle = colorScheme === 'dark' ? styles.darkThemeText : styles.lightThemeText;
  const themeContainerStyle = colorScheme === 'dark' ? styles.darkContainer : styles.lightContainer;
  return (
    <SafeAreaProvider>
      <AppearanceProvider>
        <NavigationContainer>
          <View style={[styles.container, themeContainerStyle, themeTextStyle]}>
            <StatusBar
              hidden={Platform.OS != 'ios'}
              barStyle={(themeStatusBarStyle, themeStatusBarFont)}
            />
            <NewsContext.Provider value={memoizedNewsContext}>
              <SearchContext.Provider value={[searchContextValue, setSearchContextValue]}>
                {loaded && <Navigation />}
                {error && alert('Something went wrong please try again')}
              </SearchContext.Provider>
            </NewsContext.Provider>
          </View>
        </NavigationContainer>
      </AppearanceProvider>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: COLORS.LIGHT_CONTAINER_BACKGROUND,
  },
  lightContainer: {
    backgroundColor: COLORS.LIGHT_CONTAINER_BACKGROUND,
    color: COLORS.LIGHT_CONTAINER_COLOR,
  },
  darkContainer: {
    backgroundColor: COLORS.DARK_CONTAINER_BACKGROUND,

    color: COLORS.DARK_CONTAINER_COLOR,
  },
  lightThemeText: {
    color: COLORS.LIGHT_THEME_TEXT,
  },
  darkThemeText: {
    color: COLORS.DARK_THEME_TEXT,
  },
});



export default App ;