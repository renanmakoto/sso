import React from 'react';
import {Linking, Pressable, StyleSheet, Text, View} from 'react-native';
import {categoryLabel, serviceDescription} from '../i18n';
import {useApp} from '../context/AppContext';
import {colors, spacing} from '../theme';
import {Service} from '../types';

type Props = {service: Service; largeText?: boolean};

export function ServiceCard({service, largeText = false}: Props) {
  const {favorites, language, t, toggleFavorite} = useApp();
  const isSaved = favorites.has(service.id);
  const open = (url: string) => Linking.openURL(url).catch(() => undefined);

  return (
    <View style={styles.card}>
      <View style={styles.titleRow}>
        <View style={styles.titleContent}>
          <Text style={[styles.category, largeText && styles.categoryLarge]}>
            {categoryLabel(service.category, language)}
          </Text>
          <Text style={[styles.title, largeText && styles.titleLarge]}>{service.name}</Text>
        </View>
        <Pressable
          accessibilityLabel={isSaved ? t('saved') : t('save')}
          accessibilityRole="button"
          accessibilityState={{selected: isSaved}}
          hitSlop={10}
          onPress={() => toggleFavorite(service.id)}
          style={[styles.saveButton, isSaved && styles.saveButtonActive]}>
          <Text style={[styles.saveSymbol, isSaved && styles.saveSymbolActive]}>{isSaved ? '★' : '☆'}</Text>
        </Pressable>
      </View>
      <Text style={[styles.description, largeText && styles.descriptionLarge]}>
        {serviceDescription(service.id, service.description, language)}
      </Text>
      <Text style={[styles.coverage, largeText && styles.descriptionLarge]}>● {t('citywide')}</Text>
      <View style={styles.actions}>
        {service.phone ? (
          <Pressable
            accessibilityRole="button"
            onPress={() => open(`tel:${service.phone}`)}
            style={styles.primaryAction}>
            <Text style={[styles.primaryActionText, largeText && styles.actionLarge]}>
              {t('call')} {service.phoneLabel}
            </Text>
          </Pressable>
        ) : null}
        <Pressable accessibilityRole="link" onPress={() => open(service.url)} style={styles.secondaryAction}>
          <Text style={[styles.secondaryActionText, largeText && styles.actionLarge]}>{t('website')} ↗</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 18,
    borderWidth: 1,
    marginBottom: spacing.md,
    padding: spacing.md,
  },
  titleRow: {alignItems: 'flex-start', flexDirection: 'row'},
  titleContent: {flex: 1, paddingRight: spacing.sm},
  category: {color: colors.primary, fontSize: 12, fontWeight: '800', letterSpacing: 0.6, textTransform: 'uppercase'},
  categoryLarge: {fontSize: 15},
  title: {color: colors.ink, fontSize: 19, fontWeight: '800', lineHeight: 25, marginTop: 3},
  titleLarge: {fontSize: 23, lineHeight: 30},
  description: {color: colors.muted, fontSize: 15, lineHeight: 22, marginTop: spacing.sm},
  descriptionLarge: {fontSize: 19, lineHeight: 28},
  coverage: {color: colors.muted, fontSize: 13, fontWeight: '600', marginTop: spacing.sm},
  saveButton: {alignItems: 'center', borderColor: colors.border, borderRadius: 20, borderWidth: 1, height: 40, justifyContent: 'center', width: 40},
  saveButtonActive: {backgroundColor: colors.primarySoft, borderColor: colors.primary},
  saveSymbol: {color: colors.muted, fontSize: 23},
  saveSymbolActive: {color: colors.primary},
  actions: {flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.md},
  primaryAction: {backgroundColor: colors.primary, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 11},
  primaryActionText: {color: colors.white, fontSize: 14, fontWeight: '800'},
  secondaryAction: {borderColor: colors.primary, borderRadius: 10, borderWidth: 1, paddingHorizontal: 14, paddingVertical: 10},
  secondaryActionText: {color: colors.primary, fontSize: 14, fontWeight: '800'},
  actionLarge: {fontSize: 17},
});
