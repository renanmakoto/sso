import extendedCatalogJson from '../../shared/localizations.json';
import {BaseLanguage, Language, LocalizedText, ServiceCategory} from './types';

type ExtendedCatalog = {
  copy: Record<string, Record<string, string>>;
  categories: Record<string, Record<string, string>>;
  serviceDescriptions: Record<string, Record<string, string>>;
};

const extendedCatalog = extendedCatalogJson as ExtendedCatalog;

const copy = {
  en: {
    appName: 'CompassTO',
    tagline: 'Toronto support, one clear next step at a time.',
    chooseHelp: 'What do you need help with?',
    navigator: 'Find social services',
    navigatorBody: 'Search trusted services by need and location.',
    eviction: 'Prevent an eviction',
    evictionBody: 'Answer a few questions and get an action plan.',
    seniors: 'Support for seniors',
    seniorsBody: 'Direct help for seniors, families and caregivers.',
    home: 'Home',
    services: 'Services',
    favorites: 'Saved',
    back: 'Back',
    language: 'Language',
    privacyTitle: 'Private by design',
    privacyBody: 'Your answers and saved services stay on this device. Do not enter a SIN, medical records or identity documents.',
    urgentTitle: 'Need urgent help?',
    emergency: 'Call 911 for immediate danger. Call 211 for social services available now.',
    call211: 'Call 211',
    call911: 'Call 911',
    searchPlaceholder: 'Service, need or neighbourhood',
    all: 'All',
    noResults: 'No matching services. Try a broader search or call 211.',
    citywide: 'Toronto-wide',
    call: 'Call',
    website: 'Official website',
    save: 'Save',
    saved: 'Saved',
    officialOnly: 'Links open official provider pages. Availability and eligibility can change.',
    evictionTitle: 'Eviction prevention guide',
    evictionIntro: 'This guide helps you prepare. It is not legal advice and does not replace a legal clinic.',
    arrears: 'Are you behind on rent?',
    notice: 'Did your landlord give you a notice or LTB document?',
    assistance: 'Do you receive Ontario Works or ODSP?',
    income: 'Approximate monthly household income',
    postal: 'Toronto postal code',
    yes: 'Yes',
    no: 'No',
    optional: 'Optional',
    buildPlan: 'Build my action plan',
    planTitle: 'Your next steps',
    planRentBank: 'Check Toronto Rent Bank eligibility and prepare proof of rent, arrears and household income.',
    planLegal: 'Contact a community legal clinic before your deadline. Keep every notice and record of communication.',
    planCaseworker: 'Contact your OW or ODSP caseworker and ask about housing stabilization support.',
    planGeneral: 'Call 211 to confirm the nearest service and current hours before travelling.',
    documents: 'Documents to prepare',
    documentList: 'Government ID (if requested)\nLease or proof of tenancy\nRent statements or notices\nRecent income information',
    openRentBank: 'Open Toronto Rent Bank',
    findLegalClinic: 'Find a legal clinic',
    reset: 'Start over',
    seniorTitle: 'Seniors Connect',
    seniorIntro: 'Clear routes to community support for seniors and the people who care for them.',
    largerText: 'Larger text',
    seniorHelp: 'Help for seniors',
    caregiverHelp: 'Help for caregivers',
    callHelpline: 'Call Seniors Helpline',
    emptyFavorites: 'Save useful services and they will appear here.',
    invalidPostal: 'Enter a Toronto postal code beginning with M, or leave it blank.',
  },
  fr: {
    appName: 'CompassTO',
    tagline: 'Le soutien à Toronto, une prochaine étape claire à la fois.',
    chooseHelp: 'De quelle aide avez-vous besoin?',
    navigator: 'Trouver des services sociaux',
    navigatorBody: 'Recherchez des services fiables selon le besoin et le lieu.',
    eviction: 'Prévenir une expulsion',
    evictionBody: "Répondez à quelques questions pour obtenir un plan d'action.",
    seniors: 'Soutien aux aînés',
    seniorsBody: 'Aide directe pour les aînés, les familles et les proches aidants.',
    home: 'Accueil',
    services: 'Services',
    favorites: 'Enregistrés',
    back: 'Retour',
    language: 'Langue',
    privacyTitle: 'Confidentiel par conception',
    privacyBody: "Vos réponses et services enregistrés restent sur cet appareil. N'entrez pas de NAS, de dossier médical ou de pièce d'identité.",
    urgentTitle: "Besoin d'aide urgente?",
    emergency: 'Composez le 911 en cas de danger immédiat. Composez le 211 pour les services sociaux disponibles.',
    call211: 'Appeler le 211',
    call911: 'Appeler le 911',
    searchPlaceholder: 'Service, besoin ou quartier',
    all: 'Tous',
    noResults: 'Aucun service correspondant. Élargissez la recherche ou composez le 211.',
    citywide: 'Partout à Toronto',
    call: 'Appeler',
    website: 'Site officiel',
    save: 'Enregistrer',
    saved: 'Enregistré',
    officialOnly: "Les liens ouvrent les pages officielles. La disponibilité et l'admissibilité peuvent changer.",
    evictionTitle: "Guide de prévention de l'expulsion",
    evictionIntro: "Ce guide vous aide à vous préparer. Il ne constitue pas un avis juridique et ne remplace pas une clinique juridique.",
    arrears: 'Avez-vous un retard de loyer?',
    notice: 'Votre propriétaire vous a-t-il remis un avis ou un document de la CLI?',
    assistance: 'Recevez-vous Ontario au travail ou le POSPH?',
    income: 'Revenu mensuel approximatif du ménage',
    postal: 'Code postal de Toronto',
    yes: 'Oui',
    no: 'Non',
    optional: 'Facultatif',
    buildPlan: "Créer mon plan d'action",
    planTitle: 'Vos prochaines étapes',
    planRentBank: "Vérifiez l'admissibilité à la Toronto Rent Bank et préparez les preuves de loyer, d'arriérés et de revenu.",
    planLegal: "Contactez une clinique juridique communautaire avant l'échéance. Conservez chaque avis et communication.",
    planCaseworker: "Contactez votre agente ou agent d'OT/POSPH et demandez du soutien à la stabilisation du logement.",
    planGeneral: 'Composez le 211 pour confirmer le service le plus proche et ses heures avant de vous déplacer.',
    documents: 'Documents à préparer',
    documentList: "Pièce d'identité (si demandée)\nBail ou preuve de location\nRelevés de loyer ou avis\nRenseignements récents sur le revenu",
    openRentBank: 'Ouvrir Toronto Rent Bank',
    findLegalClinic: 'Trouver une clinique juridique',
    reset: 'Recommencer',
    seniorTitle: 'Aînés Connectés',
    seniorIntro: 'Des chemins clairs vers le soutien communautaire pour les aînés et leurs proches aidants.',
    largerText: 'Texte agrandi',
    seniorHelp: 'Aide aux aînés',
    caregiverHelp: 'Aide aux proches aidants',
    callHelpline: 'Appeler la ligne des aînés',
    emptyFavorites: 'Enregistrez des services utiles; ils apparaîtront ici.',
    invalidPostal: 'Entrez un code postal de Toronto commençant par M ou laissez le champ vide.',
  },
  pt: {
    appName: 'CompassTO',
    tagline: 'Apoio em Toronto, um próximo passo claro de cada vez.',
    chooseHelp: 'Com o que você precisa de ajuda?',
    navigator: 'Encontrar serviços sociais',
    navigatorBody: 'Busque serviços confiáveis por necessidade e localização.',
    eviction: 'Prevenir um despejo',
    evictionBody: 'Responda algumas perguntas e receba um plano de ação.',
    seniors: 'Apoio para idosos',
    seniorsBody: 'Ajuda direta para idosos, famílias e cuidadores.',
    home: 'Início',
    services: 'Serviços',
    favorites: 'Salvos',
    back: 'Voltar',
    language: 'Idioma',
    privacyTitle: 'Privacidade desde o início',
    privacyBody: 'Suas respostas e serviços salvos ficam neste aparelho. Não informe SIN, prontuários médicos ou documentos de identidade.',
    urgentTitle: 'Precisa de ajuda urgente?',
    emergency: 'Ligue 911 em caso de perigo imediato. Ligue 211 para serviços sociais disponíveis agora.',
    call211: 'Ligar para 211',
    call911: 'Ligar para 911',
    searchPlaceholder: 'Serviço, necessidade ou bairro',
    all: 'Todos',
    noResults: 'Nenhum serviço encontrado. Amplie a busca ou ligue para 211.',
    citywide: 'Toda Toronto',
    call: 'Ligar',
    website: 'Site oficial',
    save: 'Salvar',
    saved: 'Salvo',
    officialOnly: 'Os links abrem páginas oficiais. Disponibilidade e elegibilidade podem mudar.',
    evictionTitle: 'Guia de prevenção de despejo',
    evictionIntro: 'Este guia ajuda na preparação. Não é aconselhamento jurídico e não substitui uma clínica jurídica.',
    arrears: 'Você está com aluguel atrasado?',
    notice: 'O proprietário entregou uma notificação ou documento do LTB?',
    assistance: 'Você recebe Ontario Works ou ODSP?',
    income: 'Renda familiar mensal aproximada',
    postal: 'Código postal de Toronto',
    yes: 'Sim',
    no: 'Não',
    optional: 'Opcional',
    buildPlan: 'Criar meu plano de ação',
    planTitle: 'Seus próximos passos',
    planRentBank: 'Confira a elegibilidade ao Toronto Rent Bank e prepare comprovantes do aluguel, atraso e renda familiar.',
    planLegal: 'Contate uma clínica jurídica comunitária antes do prazo. Guarde todas as notificações e comunicações.',
    planCaseworker: 'Contate seu responsável do OW ou ODSP e peça apoio de estabilização habitacional.',
    planGeneral: 'Ligue 211 para confirmar o serviço mais próximo e o horário atual antes de sair.',
    documents: 'Documentos para preparar',
    documentList: 'Documento de identidade (se solicitado)\nContrato ou comprovante de locação\nExtratos do aluguel ou notificações\nInformações recentes de renda',
    openRentBank: 'Abrir Toronto Rent Bank',
    findLegalClinic: 'Encontrar clínica jurídica',
    reset: 'Recomeçar',
    seniorTitle: 'Seniors Connect',
    seniorIntro: 'Caminhos claros para apoio comunitário a idosos e às pessoas que cuidam deles.',
    largerText: 'Texto maior',
    seniorHelp: 'Ajuda para idosos',
    caregiverHelp: 'Ajuda para cuidadores',
    callHelpline: 'Ligar para Seniors Helpline',
    emptyFavorites: 'Salve serviços úteis para encontrá-los aqui.',
    invalidPostal: 'Digite um código postal de Toronto começando com M ou deixe em branco.',
  },
} as const;

export type CopyKey = keyof typeof copy.en;

const isBaseLanguage = (language: Language): language is BaseLanguage =>
  language === 'en' || language === 'fr' || language === 'pt';

export const translate = (language: Language, key: CopyKey): string => {
  if (isBaseLanguage(language)) {
    return copy[language][key];
  }
  return extendedCatalog.copy[language]?.[key] ?? copy.en[key];
};

const baseCategoryLabels: Record<ServiceCategory, Record<BaseLanguage, string>> = {
  food: {en: 'Food', fr: 'Alimentation', pt: 'Alimentação'},
  housing: {en: 'Housing', fr: 'Logement', pt: 'Moradia'},
  legal: {en: 'Legal help', fr: 'Aide juridique', pt: 'Ajuda jurídica'},
  mentalHealth: {en: 'Mental health', fr: 'Santé mentale', pt: 'Saúde mental'},
  financial: {en: 'Financial', fr: 'Finances', pt: 'Financeiro'},
  seniors: {en: 'Seniors', fr: 'Aînés', pt: 'Idosos'},
  caregivers: {en: 'Caregivers', fr: 'Proches aidants', pt: 'Cuidadores'},
  newcomers: {en: 'Newcomers', fr: 'Nouveaux arrivants', pt: 'Recém-chegados'},
};

export const categoryLabel = (category: ServiceCategory, language: Language): string => {
  if (isBaseLanguage(language)) {
    return baseCategoryLabels[category][language];
  }
  return extendedCatalog.categories[language]?.[category] ?? baseCategoryLabels[category].en;
};

export const localizedValue = (value: LocalizedText, language: Language): string =>
  value[language] ?? value.en;

export const serviceDescription = (id: string, fallback: LocalizedText, language: Language): string => {
  if (isBaseLanguage(language)) {
    return fallback[language];
  }
  return extendedCatalog.serviceDescriptions[language]?.[id] ?? fallback.en;
};
