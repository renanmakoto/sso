import React, {useState} from 'react';
import {Modal, Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useApp} from '../context/AppContext';
import {colors, spacing} from '../theme';
import {Language} from '../types';

const languages: Array<{code: Language; name: string}> = [
  {code: 'en', name: 'English'},
  {code: 'fr', name: 'Français'},
  {code: 'pt', name: 'Português'},
  {code: 'es', name: 'Español'},
  {code: 'uk', name: 'Українська'},
  {code: 'ru', name: 'Русский'},
  {code: 'ar', name: 'العربية'},
  {code: 'ko', name: '한국어'},
  {code: 'ja', name: '日本語'},
  {code: 'zh', name: '简体中文'},
  {code: 'vi', name: 'Tiếng Việt'},
  {code: 'tl', name: 'Tagalog'},
];

export function LanguagePicker() {
  const {language, setLanguage, t} = useApp();
  const [visible, setVisible] = useState(false);

  const choose = (nextLanguage: Language) => {
    setLanguage(nextLanguage);
    setVisible(false);
  };

  return (
    <>
      <Pressable
        accessibilityLabel={t('language')}
        accessibilityRole="button"
        onPress={() => setVisible(true)}
        style={styles.trigger}>
        <Text style={styles.triggerText}>{language.toUpperCase()}⌄</Text>
      </Pressable>
      <Modal
        animationType="fade"
        onRequestClose={() => setVisible(false)}
        statusBarTranslucent
        transparent
        visible={visible}>
        <View style={[styles.overlay, language === 'ar' && styles.rtl]}>
          <Pressable accessible={false} onPress={() => setVisible(false)} style={StyleSheet.absoluteFill} />
          <View accessibilityViewIsModal style={[styles.dialog, language === 'ar' && styles.rtl]}>
            <Text style={styles.title}>{t('language')}</Text>
            <ScrollView contentContainerStyle={styles.options}>
              {languages.map(item => {
                const selected = language === item.code;
                return (
                  <Pressable
                    accessibilityRole="radio"
                    accessibilityState={{selected}}
                    key={item.code}
                    onPress={() => choose(item.code)}
                    style={[styles.option, selected && styles.selected]}>
                    <Text style={[styles.code, selected && styles.selectedText]}>{item.code.toUpperCase()}</Text>
                    <Text style={[styles.name, selected && styles.selectedText]}>{item.name}</Text>
                    {selected ? <Text style={styles.check}>✓</Text> : null}
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  trigger: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 18,
    borderWidth: 1,
    justifyContent: 'center',
    minWidth: 54,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  triggerText: {color: colors.primary, fontSize: 12, fontWeight: '900'},
  overlay: {
    alignItems: 'center',
    backgroundColor: 'rgba(23, 43, 58, 0.55)',
    flex: 1,
    justifyContent: 'center',
    padding: spacing.lg,
  },
  dialog: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    maxHeight: '78%',
    maxWidth: 430,
    overflow: 'hidden',
    padding: spacing.md,
    width: '100%',
  },
  title: {color: colors.ink, fontSize: 22, fontWeight: '900', marginBottom: spacing.md},
  options: {gap: spacing.sm, paddingBottom: spacing.sm},
  option: {
    alignItems: 'center',
    borderColor: colors.border,
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    minHeight: 50,
    paddingHorizontal: 14,
  },
  selected: {backgroundColor: colors.primary, borderColor: colors.primary},
  code: {color: colors.primary, fontSize: 12, fontWeight: '900', width: 42},
  name: {color: colors.ink, flex: 1, fontSize: 16, fontWeight: '700'},
  selectedText: {color: colors.white},
  check: {color: colors.white, fontSize: 18, fontWeight: '900'},
  rtl: {direction: 'rtl'},
});
