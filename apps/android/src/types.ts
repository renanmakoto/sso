export const supportedLanguages = ['en', 'fr', 'pt', 'es', 'uk', 'ru', 'ar', 'ko', 'ja', 'zh', 'vi', 'tl'] as const;

export type Language = (typeof supportedLanguages)[number];
export type BaseLanguage = 'en' | 'fr' | 'pt';

export type LocalizedText = Record<BaseLanguage, string> & Partial<Record<Language, string>>;

export type ServiceCategory =
  | 'food'
  | 'housing'
  | 'legal'
  | 'mentalHealth'
  | 'financial'
  | 'seniors'
  | 'caregivers'
  | 'newcomers';

export type Service = {
  id: string;
  name: string;
  category: ServiceCategory;
  description: LocalizedText;
  coverage: LocalizedText;
  phone?: string;
  phoneLabel?: string;
  url: string;
  seniorFocused?: boolean;
  caregiverFocused?: boolean;
};

export type Screen = 'home' | 'navigator' | 'eviction' | 'seniors' | 'favorites';
