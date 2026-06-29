import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {Page, SectionTitle} from '../components/Page';
import {ServiceCard} from '../components/ServiceCard';
import {useApp} from '../context/AppContext';
import {services} from '../data/services';
import {colors, spacing} from '../theme';

export function FavoritesScreen() {
  const {favorites, t} = useApp();
  const savedServices = services.filter(service => favorites.has(service.id));

  return (
    <Page title={t('favorites')}>
      <SectionTitle>{t('favorites')}</SectionTitle>
      {savedServices.length ? savedServices.map(service => <ServiceCard key={service.id} service={service} />) : <Text style={styles.empty}>{t('emptyFavorites')}</Text>}
    </Page>
  );
}

const styles = StyleSheet.create({
  empty: {color: colors.muted, fontSize: 17, lineHeight: 25, paddingHorizontal: spacing.lg, paddingTop: spacing.xl, textAlign: 'center'},
});
