import {services} from '../src/data/services';
import extendedCatalog from '../../shared/localizations.json';
import {categoryLabel, serviceDescription, translate} from '../src/i18n';
import {supportedLanguages} from '../src/types';

describe('CompassTO content', () => {
  it('includes the three core service paths', () => {
    expect(services.some(service => service.id === '211-ontario')).toBe(true);
    expect(services.some(service => service.id === 'toronto-rent-bank')).toBe(true);
    expect(services.some(service => service.id === 'seniors-helpline')).toBe(true);
  });

  it('provides the primary navigation in every supported language', () => {
    for (const language of supportedLanguages) {
      expect(translate(language, 'navigator')).toBeTruthy();
      expect(categoryLabel('housing', language)).toBeTruthy();
      expect(serviceDescription(services[0].id, services[0].description, language)).toBeTruthy();
    }
  });

  it('keeps every extended language catalog complete', () => {
    const referenceKeys = Object.keys(extendedCatalog.copy.es).sort();
    for (const language of ['es', 'uk', 'ru', 'ar', 'ko', 'ja', 'zh', 'vi', 'tl'] as const) {
      expect(Object.keys(extendedCatalog.copy[language]).sort()).toEqual(referenceKeys);
      expect(Object.keys(extendedCatalog.categories[language])).toHaveLength(8);
      expect(Object.keys(extendedCatalog.serviceDescriptions[language])).toHaveLength(services.length);
    }
  });
});
