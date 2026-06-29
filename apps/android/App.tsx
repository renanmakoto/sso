import React, {useEffect, useState} from 'react';
import {BackHandler, Pressable, StatusBar, StyleSheet, Text, View} from 'react-native';
import {SafeAreaProvider, useSafeAreaInsets} from 'react-native-safe-area-context';
import {AppProvider, useApp} from './src/context/AppContext';
import {FavoritesScreen} from './src/screens/FavoritesScreen';
import {EvictionScreen} from './src/screens/EvictionScreen';
import {HomeScreen} from './src/screens/HomeScreen';
import {NavigatorScreen} from './src/screens/NavigatorScreen';
import {SeniorsScreen} from './src/screens/SeniorsScreen';
import {colors} from './src/theme';
import {Screen} from './src/types';

function Application() {
  const {language} = useApp();
  const [screen, setScreen] = useState<Screen>('home');

  useEffect(() => {
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      if (screen !== 'home') {
        setScreen('home');
        return true;
      }
      return false;
    });
    return () => subscription.remove();
  }, [screen]);

  const goHome = () => setScreen('home');
  let content: React.ReactNode;

  switch (screen) {
    case 'navigator':
      content = <NavigatorScreen onBack={goHome} />;
      break;
    case 'eviction':
      content = <EvictionScreen onBack={goHome} />;
      break;
    case 'seniors':
      content = <SeniorsScreen onBack={goHome} />;
      break;
    case 'favorites':
      content = <FavoritesScreen />;
      break;
    default:
      content = <HomeScreen navigate={setScreen} />;
  }

  return (
    <View style={[styles.app, language === 'ar' ? styles.rtl : styles.ltr]}>
      <StatusBar backgroundColor={colors.background} barStyle="dark-content" />
      {content}
      <BottomNavigation active={screen} navigate={setScreen} />
    </View>
  );
}

function BottomNavigation({active, navigate}: {active: Screen; navigate: (screen: Screen) => void}) {
  const {t} = useApp();
  const insets = useSafeAreaInsets();
  const items: Array<{screen: Screen; symbol: string; label: string}> = [
    {screen: 'home', symbol: '⌂', label: t('home')},
    {screen: 'navigator', symbol: '⌕', label: t('services')},
    {screen: 'favorites', symbol: '★', label: t('favorites')},
  ];

  return (
    <View style={[styles.bottomBar, {paddingBottom: Math.max(insets.bottom, 8)}]}>
      {items.map(item => {
        const selected = active === item.screen || (item.screen === 'home' && (active === 'eviction' || active === 'seniors'));
        return (
          <Pressable
            accessibilityRole="tab"
            accessibilityState={{selected}}
            key={item.screen}
            onPress={() => navigate(item.screen)}
            style={styles.tab}>
            <Text style={[styles.tabSymbol, selected && styles.tabSelected]}>{item.symbol}</Text>
            <Text style={[styles.tabLabel, selected && styles.tabSelected]}>{item.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <Application />
      </AppProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  app: {backgroundColor: colors.background, flex: 1},
  ltr: {direction: 'ltr'},
  rtl: {direction: 'rtl'},
  bottomBar: {backgroundColor: colors.surface, borderTopColor: colors.border, borderTopWidth: 1, bottom: 0, flexDirection: 'row', left: 0, paddingTop: 8, position: 'absolute', right: 0},
  tab: {alignItems: 'center', flex: 1, minHeight: 54},
  tabSymbol: {color: colors.muted, fontSize: 22, fontWeight: '800'},
  tabLabel: {color: colors.muted, fontSize: 11, fontWeight: '700', marginTop: 2},
  tabSelected: {color: colors.primary},
});
