import React, {useMemo, useState} from 'react';
import {ScrollView, StyleSheet, Text, TextInput, Pressable} from 'react-native';
import {ServiceCard} from '../components/ServiceCard';
import {InfoBox, Page} from '../components/Page';
import {useApp} from '../context/AppContext';
import {services} from '../data/services';
import {categoryLabel, serviceDescription} from '../i18n';
import {colors, spacing} from '../theme';
import {ServiceCategory} from '../types';

type Props = {onBack: () => void};
const categories: ServiceCategory[] = ['food', 'housing', 'legal', 'mentalHealth', 'financial', 'newcomers', 'seniors', 'caregivers'];

export function NavigatorScreen({onBack}: Props) {
  const {language, t} = useApp();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<ServiceCategory | null>(null);
  const normalizedQuery = query.trim().toLocaleLowerCase();

  const matches = useMemo(
    () => services.filter(service => {
      if (category && service.category !== category) {
        return false;
      }
      if (!normalizedQuery) {
        return true;
      }
      const haystack = `${service.name} ${serviceDescription(service.id, service.description, language)} ${t('citywide')}`.toLocaleLowerCase();
      return haystack.includes(normalizedQuery);
    }),
    [category, language, normalizedQuery, t],
  );

  return (
    <Page onBack={onBack} title={t('navigator')}>
      <TextInput
        accessibilityLabel={t('searchPlaceholder')}
        autoCapitalize="words"
        onChangeText={setQuery}
        placeholder={t('searchPlaceholder')}
        placeholderTextColor={colors.muted}
        returnKeyType="search"
        style={styles.search}
        value={query}
      />
      <ScrollView contentContainerStyle={styles.chips} horizontal showsHorizontalScrollIndicator={false}>
        <Pressable onPress={() => setCategory(null)} style={[styles.chip, !category && styles.chipSelected]}>
          <Text style={[styles.chipText, !category && styles.chipTextSelected]}>{t('all')}</Text>
        </Pressable>
        {categories.map(item => {
          const selected = item === category;
          return (
            <Pressable key={item} onPress={() => setCategory(item)} style={[styles.chip, selected && styles.chipSelected]}>
              <Text style={[styles.chipText, selected && styles.chipTextSelected]}>{categoryLabel(item, language)}</Text>
            </Pressable>
          );
        })}
      </ScrollView>
      <InfoBox title={t('citywide')} tone="blue">{t('officialOnly')}</InfoBox>
      <Text style={styles.count}>{matches.length} {t('services').toLocaleLowerCase()}</Text>
      {matches.length ? matches.map(service => <ServiceCard key={service.id} service={service} />) : <Text style={styles.empty}>{t('noResults')}</Text>}
    </Page>
  );
}

const styles = StyleSheet.create({
  search: {backgroundColor: colors.surface, borderColor: colors.border, borderRadius: 14, borderWidth: 1, color: colors.ink, fontSize: 16, marginBottom: spacing.md, minHeight: 52, paddingHorizontal: spacing.md},
  chips: {gap: spacing.sm, paddingBottom: spacing.md},
  chip: {backgroundColor: colors.surface, borderColor: colors.border, borderRadius: 20, borderWidth: 1, paddingHorizontal: 14, paddingVertical: 9},
  chipSelected: {backgroundColor: colors.primary, borderColor: colors.primary},
  chipText: {color: colors.ink, fontSize: 14, fontWeight: '700'},
  chipTextSelected: {color: colors.white},
  count: {color: colors.muted, fontSize: 13, fontWeight: '700', marginBottom: spacing.sm, textTransform: 'uppercase'},
  empty: {color: colors.muted, fontSize: 16, lineHeight: 24, padding: spacing.lg, textAlign: 'center'},
});
