import React, {useState} from 'react';
import {Linking, Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {InfoBox, Page, SectionTitle} from '../components/Page';
import {useApp} from '../context/AppContext';
import {colors, spacing} from '../theme';

type Answer = 'yes' | 'no' | null;
type Props = {onBack: () => void};

function Choice({answer, onChange}: {answer: Answer; onChange: (answer: Answer) => void}) {
  const {t} = useApp();
  return (
    <View style={styles.choiceRow}>
      {(['yes', 'no'] as const).map(option => {
        const selected = answer === option;
        return (
          <Pressable accessibilityRole="radio" accessibilityState={{selected}} key={option} onPress={() => onChange(option)} style={[styles.choice, selected && styles.choiceSelected]}>
            <Text style={[styles.choiceText, selected && styles.choiceTextSelected]}>{t(option)}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export function EvictionScreen({onBack}: Props) {
  const {t} = useApp();
  const [arrears, setArrears] = useState<Answer>(null);
  const [notice, setNotice] = useState<Answer>(null);
  const [assistance, setAssistance] = useState<Answer>(null);
  const [income, setIncome] = useState('');
  const [postal, setPostal] = useState('');
  const [showPlan, setShowPlan] = useState(false);
  const postalIsValid = !postal.trim() || /^M\d[A-Z](?: ?\d[A-Z]\d)?$/i.test(postal.trim());
  const showRentBankStep = arrears === 'yes' && assistance !== 'yes';

  const reset = () => {
    setArrears(null);
    setNotice(null);
    setAssistance(null);
    setIncome('');
    setPostal('');
    setShowPlan(false);
  };

  return (
    <Page onBack={onBack} title={t('evictionTitle')}>
      <InfoBox title={t('evictionTitle')} tone="amber">{t('evictionIntro')}</InfoBox>
      {!showPlan ? (
        <View>
          <Text style={styles.question}>{t('arrears')}</Text>
          <Choice answer={arrears} onChange={setArrears} />
          <Text style={styles.question}>{t('notice')}</Text>
          <Choice answer={notice} onChange={setNotice} />
          <Text style={styles.question}>{t('assistance')}</Text>
          <Choice answer={assistance} onChange={setAssistance} />
          <Text style={styles.label}>{t('income')} · {t('optional')}</Text>
          <TextInput keyboardType="numeric" onChangeText={setIncome} placeholder="$" placeholderTextColor={colors.muted} style={styles.input} value={income} />
          <Text style={styles.label}>{t('postal')} · {t('optional')}</Text>
          <TextInput autoCapitalize="characters" maxLength={7} onChangeText={setPostal} placeholder="M5V 2T6" placeholderTextColor={colors.muted} style={[styles.input, !postalIsValid && styles.inputError]} value={postal} />
          {!postalIsValid ? <Text style={styles.error}>{t('invalidPostal')}</Text> : null}
          <Pressable disabled={!postalIsValid} onPress={() => setShowPlan(true)} style={[styles.primary, !postalIsValid && styles.disabled]}>
            <Text style={styles.primaryText}>{t('buildPlan')}</Text>
          </Pressable>
        </View>
      ) : (
        <View>
          <SectionTitle>{t('planTitle')}</SectionTitle>
          {showRentBankStep ? <PlanStep number="1" text={t('planRentBank')} /> : null}
          {notice === 'yes' ? <PlanStep number={showRentBankStep ? '2' : '1'} text={t('planLegal')} /> : null}
          {assistance === 'yes' ? <PlanStep number="•" text={t('planCaseworker')} /> : null}
          <PlanStep number="•" text={t('planGeneral')} />
          <InfoBox title={t('documents')} tone="blue">{t('documentList')}</InfoBox>
          {assistance !== 'yes' ? (
            <Pressable onPress={() => Linking.openURL('https://www.toronto.ca/community-people/housing-shelter/financial-support-for-housing/financial-support-for-renters/toronto-rent-bank/')} style={styles.primary}>
              <Text style={styles.primaryText}>{t('openRentBank')} ↗</Text>
            </Pressable>
          ) : null}
          <Pressable onPress={() => Linking.openURL('https://www.legalaid.on.ca/legal-clinics/')} style={styles.secondary}>
            <Text style={styles.secondaryText}>{t('findLegalClinic')} ↗</Text>
          </Pressable>
          <Pressable onPress={reset} style={styles.reset}><Text style={styles.resetText}>{t('reset')}</Text></Pressable>
        </View>
      )}
    </Page>
  );
}

function PlanStep({number, text}: {number: string; text: string}) {
  return (
    <View style={styles.planStep}>
      <View style={styles.number}><Text style={styles.numberText}>{number}</Text></View>
      <Text style={styles.planText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  question: {color: colors.ink, fontSize: 17, fontWeight: '800', lineHeight: 23, marginTop: spacing.md},
  choiceRow: {flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.sm, marginTop: spacing.sm},
  choice: {alignItems: 'center', backgroundColor: colors.surface, borderColor: colors.border, borderRadius: 12, borderWidth: 1, flex: 1, padding: 13},
  choiceSelected: {backgroundColor: colors.primary, borderColor: colors.primary},
  choiceText: {color: colors.ink, fontSize: 15, fontWeight: '800'},
  choiceTextSelected: {color: colors.white},
  label: {color: colors.ink, fontSize: 15, fontWeight: '700', marginBottom: spacing.sm, marginTop: spacing.md},
  input: {backgroundColor: colors.surface, borderColor: colors.border, borderRadius: 12, borderWidth: 1, color: colors.ink, fontSize: 17, minHeight: 52, paddingHorizontal: spacing.md},
  inputError: {borderColor: colors.danger},
  error: {color: colors.danger, fontSize: 13, marginTop: spacing.xs},
  primary: {alignItems: 'center', backgroundColor: colors.primary, borderRadius: 12, marginTop: spacing.md, padding: 15},
  primaryText: {color: colors.white, fontSize: 16, fontWeight: '800'},
  disabled: {opacity: 0.45},
  secondary: {alignItems: 'center', borderColor: colors.primary, borderRadius: 12, borderWidth: 1, marginTop: spacing.sm, padding: 14},
  secondaryText: {color: colors.primary, fontSize: 16, fontWeight: '800'},
  reset: {alignItems: 'center', marginTop: spacing.md, padding: 12},
  resetText: {color: colors.muted, fontSize: 15, fontWeight: '700'},
  planStep: {alignItems: 'flex-start', backgroundColor: colors.surface, borderColor: colors.border, borderRadius: 14, borderWidth: 1, flexDirection: 'row', marginBottom: spacing.sm, padding: spacing.md},
  number: {alignItems: 'center', backgroundColor: colors.primarySoft, borderRadius: 18, height: 36, justifyContent: 'center', marginRight: spacing.md, width: 36},
  numberText: {color: colors.primary, fontSize: 16, fontWeight: '900'},
  planText: {color: colors.ink, flex: 1, fontSize: 15, lineHeight: 22},
});
