import React, {useState} from 'react';
import {Linking, Pressable, StyleSheet, Switch, Text, View} from 'react-native';
import {InfoBox, Page, SectionTitle} from '../components/Page';
import {ServiceCard} from '../components/ServiceCard';
import {useApp} from '../context/AppContext';
import {services} from '../data/services';
import {colors, spacing} from '../theme';

type Props = {onBack: () => void};

export function SeniorsScreen({onBack}: Props) {
  const {t} = useApp();
  const [largeText, setLargeText] = useState(false);
  const seniorServices = services.filter(service => service.seniorFocused);
  const caregiverServices = services.filter(service => service.caregiverFocused && !service.seniorFocused);

  return (
    <Page onBack={onBack} title={t('seniorTitle')}>
      <Text style={[styles.intro, largeText && styles.introLarge]}>{t('seniorIntro')}</Text>
      <View style={styles.setting}>
        <Text style={[styles.settingText, largeText && styles.settingTextLarge]}>{t('largerText')}</Text>
        <Switch accessibilityLabel={t('largerText')} onValueChange={setLargeText} thumbColor={colors.white} trackColor={{false: colors.border, true: colors.primary}} value={largeText} />
      </View>
      <Pressable onPress={() => Linking.openURL('tel:4162172077')} style={styles.helpline}>
        <Text style={[styles.helplineText, largeText && styles.actionLarge]}>{t('callHelpline')}</Text>
        <Text style={[styles.helplineNumber, largeText && styles.actionLarge]}>416-217-2077</Text>
      </Pressable>
      <InfoBox title={t('urgentTitle')} tone="amber">{t('emergency')}</InfoBox>
      <SectionTitle>{t('seniorHelp')}</SectionTitle>
      {seniorServices.map(service => <ServiceCard key={service.id} largeText={largeText} service={service} />)}
      <SectionTitle>{t('caregiverHelp')}</SectionTitle>
      {caregiverServices.map(service => <ServiceCard key={service.id} largeText={largeText} service={service} />)}
    </Page>
  );
}

const styles = StyleSheet.create({
  intro: {color: colors.muted, fontSize: 17, lineHeight: 25, marginBottom: spacing.md},
  introLarge: {fontSize: 21, lineHeight: 31},
  setting: {alignItems: 'center', backgroundColor: colors.surface, borderColor: colors.border, borderRadius: 14, borderWidth: 1, flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.md, padding: spacing.md},
  settingText: {color: colors.ink, fontSize: 16, fontWeight: '800'},
  settingTextLarge: {fontSize: 21},
  helpline: {backgroundColor: colors.primary, borderRadius: 16, marginBottom: spacing.md, padding: spacing.md},
  helplineText: {color: colors.white, fontSize: 17, fontWeight: '800'},
  helplineNumber: {color: colors.white, fontSize: 21, fontWeight: '900', marginTop: 3},
  actionLarge: {fontSize: 23},
});
