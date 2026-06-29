import React from 'react';
import {Linking, Pressable, StyleSheet, Text, View} from 'react-native';
import {useApp} from '../context/AppContext';
import {colors, spacing} from '../theme';
import {Screen} from '../types';
import {InfoBox, Page} from '../components/Page';

type Props = {navigate: (screen: Screen) => void};

const cards: Array<{screen: Screen; icon: string; title: 'navigator' | 'eviction' | 'seniors'; body: 'navigatorBody' | 'evictionBody' | 'seniorsBody'; tone: string}> = [
  {screen: 'navigator', icon: '⌕', title: 'navigator', body: 'navigatorBody', tone: colors.primarySoft},
  {screen: 'eviction', icon: '⌂', title: 'eviction', body: 'evictionBody', tone: colors.amberSoft},
  {screen: 'seniors', icon: '♡', title: 'seniors', body: 'seniorsBody', tone: colors.blueSoft},
];

export function HomeScreen({navigate}: Props) {
  const {t} = useApp();

  return (
    <Page title="">
      <View style={styles.hero}>
        <View style={styles.logoMark}><Text style={styles.logoText}>TO</Text></View>
        <Text style={styles.heroTitle}>{t('tagline')}</Text>
        <Text style={styles.heroSubtitle}>{t('chooseHelp')}</Text>
      </View>

      {cards.map(card => (
        <Pressable
          accessibilityRole="button"
          key={card.screen}
          onPress={() => navigate(card.screen)}
          style={({pressed}) => [styles.card, pressed && styles.pressed]}>
          <View style={[styles.icon, {backgroundColor: card.tone}]}><Text style={styles.iconText}>{card.icon}</Text></View>
          <View style={styles.cardCopy}>
            <Text style={styles.cardTitle}>{t(card.title)}</Text>
            <Text style={styles.cardBody}>{t(card.body)}</Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </Pressable>
      ))}

      <InfoBox title={t('privacyTitle')}>{t('privacyBody')}</InfoBox>
      <InfoBox title={t('urgentTitle')} tone="amber">
        {t('emergency')}
      </InfoBox>
      <View style={styles.callRow}>
        <Pressable accessibilityRole="button" onPress={() => Linking.openURL('tel:211')} style={styles.call211}>
          <Text style={styles.call211Text}>{t('call211')}</Text>
        </Pressable>
        <Pressable accessibilityRole="button" onPress={() => Linking.openURL('tel:911')} style={styles.call911}>
          <Text style={styles.call911Text}>{t('call911')}</Text>
        </Pressable>
      </View>
    </Page>
  );
}

const styles = StyleSheet.create({
  hero: {alignItems: 'center', paddingBottom: spacing.lg, paddingTop: spacing.sm},
  logoMark: {alignItems: 'center', backgroundColor: colors.primary, borderRadius: 18, height: 56, justifyContent: 'center', marginBottom: spacing.md, width: 56},
  logoText: {color: colors.white, fontSize: 18, fontWeight: '900'},
  heroTitle: {color: colors.ink, fontSize: 26, fontWeight: '900', lineHeight: 33, maxWidth: 340, textAlign: 'center'},
  heroSubtitle: {color: colors.muted, fontSize: 16, fontWeight: '600', marginTop: spacing.sm},
  card: {alignItems: 'center', backgroundColor: colors.surface, borderColor: colors.border, borderRadius: 18, borderWidth: 1, flexDirection: 'row', marginBottom: spacing.md, padding: spacing.md},
  pressed: {opacity: 0.7},
  icon: {alignItems: 'center', borderRadius: 14, height: 52, justifyContent: 'center', width: 52},
  iconText: {color: colors.ink, fontSize: 28, fontWeight: '800'},
  cardCopy: {flex: 1, paddingHorizontal: spacing.md},
  cardTitle: {color: colors.ink, fontSize: 18, fontWeight: '800'},
  cardBody: {color: colors.muted, fontSize: 14, lineHeight: 20, marginTop: 3},
  arrow: {color: colors.primary, fontSize: 32, fontWeight: '500'},
  callRow: {flexDirection: 'row', gap: spacing.sm},
  call211: {alignItems: 'center', backgroundColor: colors.primary, borderRadius: 12, flex: 1, padding: 14},
  call211Text: {color: colors.white, fontSize: 15, fontWeight: '800'},
  call911: {alignItems: 'center', borderColor: colors.danger, borderRadius: 12, borderWidth: 1, flex: 1, padding: 13},
  call911Text: {color: colors.danger, fontSize: 15, fontWeight: '800'},
});
