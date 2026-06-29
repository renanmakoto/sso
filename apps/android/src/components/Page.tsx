import React, {PropsWithChildren, ReactNode} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useApp} from '../context/AppContext';
import {colors, spacing} from '../theme';
import {LanguagePicker} from './LanguagePicker';

type PageProps = PropsWithChildren<{
  title: string;
  onBack?: () => void;
  headerRight?: ReactNode;
  scroll?: boolean;
}>;

export function Page({children, title, onBack, headerRight, scroll = true}: PageProps) {
  const insets = useSafeAreaInsets();
  const {t} = useApp();
  const content = <View style={styles.content}>{children}</View>;

  return (
    <View style={[styles.page, {paddingTop: insets.top}]}>
      <View style={styles.header}>
        {onBack ? (
          <Pressable accessibilityRole="button" onPress={onBack} style={styles.backButton}>
            <Text style={styles.backText}>‹ {t('back')}</Text>
          </Pressable>
        ) : (
          <Text style={styles.brand}>CompassTO</Text>
        )}
        <Text numberOfLines={1} style={styles.title}>{title}</Text>
        {headerRight ?? <LanguagePicker />}
      </View>
      {scroll ? (
        <ScrollView contentContainerStyle={[styles.scroll, {paddingBottom: insets.bottom + 96}]} keyboardShouldPersistTaps="handled">
          {content}
        </ScrollView>
      ) : content}
    </View>
  );
}

export function SectionTitle({children}: PropsWithChildren) {
  return <Text style={styles.sectionTitle}>{children}</Text>;
}

export function InfoBox({title, children, tone = 'green'}: PropsWithChildren<{title: string; tone?: 'green' | 'amber' | 'blue'}>) {
  return (
    <View style={[styles.infoBox, tone === 'amber' && styles.infoAmber, tone === 'blue' && styles.infoBlue]}>
      <Text style={styles.infoTitle}>{title}</Text>
      <Text style={styles.infoBody}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {backgroundColor: colors.background, flex: 1},
  header: {alignItems: 'center', backgroundColor: colors.background, borderBottomColor: colors.border, borderBottomWidth: 1, flexDirection: 'row', minHeight: 62, paddingHorizontal: spacing.md},
  brand: {color: colors.primary, fontSize: 17, fontWeight: '900', minWidth: 68},
  title: {color: colors.ink, flex: 1, fontSize: 16, fontWeight: '800', marginHorizontal: spacing.sm, textAlign: 'center'},
  backButton: {minWidth: 68, paddingVertical: 10},
  backText: {color: colors.primary, fontSize: 15, fontWeight: '800'},
  scroll: {flexGrow: 1},
  content: {padding: spacing.md},
  sectionTitle: {color: colors.ink, fontSize: 22, fontWeight: '900', lineHeight: 29, marginBottom: spacing.md, marginTop: spacing.sm},
  infoBox: {backgroundColor: colors.primarySoft, borderRadius: 14, marginBottom: spacing.md, padding: spacing.md},
  infoAmber: {backgroundColor: colors.amberSoft},
  infoBlue: {backgroundColor: colors.blueSoft},
  infoTitle: {color: colors.ink, fontSize: 16, fontWeight: '800', marginBottom: 5},
  infoBody: {color: colors.ink, fontSize: 14, lineHeight: 21},
});
