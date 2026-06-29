import Foundation

enum CopyKey: String {
    case appName, tagline, chooseHelp, navigator, navigatorBody, eviction, evictionBody
    case seniors, seniorsBody, home, services, favorites, language
    case privacyTitle, privacyBody, urgentTitle, emergency, call211, call911
    case searchPlaceholder, all, noResults, citywide, call, website, save, saved
    case officialOnly, evictionTitle, evictionIntro, arrears, notice, assistance
    case income, postal, yes, no, optional, buildPlan, planTitle, planRentBank
    case planLegal, planCaseworker, planGeneral, documents, documentList
    case openRentBank, findLegalClinic, reset, seniorTitle, seniorIntro
    case largerText, seniorHelp, caregiverHelp, callHelpline, emptyFavorites, invalidPostal
}

enum AppCopy {
    static func text(_ key: CopyKey, language: AppLanguage) -> String {
        extendedCatalog?.copy[language.rawValue]?[key.rawValue] ?? values[key]!.value(for: language)
    }

    static func categoryText(_ category: String, language: AppLanguage) -> String? {
        extendedCatalog?.categories[language.rawValue]?[category]
    }

    static func serviceDescription(_ id: String, fallback: LocalizedValue, language: AppLanguage) -> String {
        extendedCatalog?.serviceDescriptions[language.rawValue]?[id] ?? fallback.value(for: language)
    }

    private struct ExtendedCatalog: Decodable {
        let copy: [String: [String: String]]
        let categories: [String: [String: String]]
        let serviceDescriptions: [String: [String: String]]
    }

    private static let extendedCatalog: ExtendedCatalog? = {
        guard let url = Bundle.main.url(forResource: "localizations", withExtension: "json"),
              let data = try? Data(contentsOf: url) else { return nil }
        return try? JSONDecoder().decode(ExtendedCatalog.self, from: data)
    }()

    private static let values: [CopyKey: LocalizedValue] = [
        .appName: .init(en: "CompassTO", fr: "CompassTO", pt: "CompassTO"),
        .tagline: .init(en: "Toronto support, one clear next step at a time.", fr: "Le soutien à Toronto, une prochaine étape claire à la fois.", pt: "Apoio em Toronto, um próximo passo claro de cada vez."),
        .chooseHelp: .init(en: "What do you need help with?", fr: "De quelle aide avez-vous besoin?", pt: "Com o que você precisa de ajuda?"),
        .navigator: .init(en: "Find social services", fr: "Trouver des services sociaux", pt: "Encontrar serviços sociais"),
        .navigatorBody: .init(en: "Search trusted services by need and location.", fr: "Recherchez des services fiables selon le besoin et le lieu.", pt: "Busque serviços confiáveis por necessidade e localização."),
        .eviction: .init(en: "Prevent an eviction", fr: "Prévenir une expulsion", pt: "Prevenir um despejo"),
        .evictionBody: .init(en: "Answer a few questions and get an action plan.", fr: "Répondez à quelques questions pour obtenir un plan d’action.", pt: "Responda algumas perguntas e receba um plano de ação."),
        .seniors: .init(en: "Support for seniors", fr: "Soutien aux aînés", pt: "Apoio para idosos"),
        .seniorsBody: .init(en: "Direct help for seniors, families and caregivers.", fr: "Aide directe pour les aînés, les familles et les proches aidants.", pt: "Ajuda direta para idosos, famílias e cuidadores."),
        .home: .init(en: "Home", fr: "Accueil", pt: "Início"),
        .services: .init(en: "Services", fr: "Services", pt: "Serviços"),
        .favorites: .init(en: "Saved", fr: "Enregistrés", pt: "Salvos"),
        .language: .init(en: "Language", fr: "Langue", pt: "Idioma"),
        .privacyTitle: .init(en: "Private by design", fr: "Confidentiel par conception", pt: "Privacidade desde o início"),
        .privacyBody: .init(en: "Your answers and saved services stay on this device. Do not enter a SIN, medical records or identity documents.", fr: "Vos réponses et services enregistrés restent sur cet appareil. N’entrez pas de NAS, de dossier médical ou de pièce d’identité.", pt: "Suas respostas e serviços salvos ficam neste aparelho. Não informe SIN, prontuários médicos ou documentos de identidade."),
        .urgentTitle: .init(en: "Need urgent help?", fr: "Besoin d’aide urgente?", pt: "Precisa de ajuda urgente?"),
        .emergency: .init(en: "Call 911 for immediate danger. Call 211 for social services available now.", fr: "Composez le 911 en cas de danger immédiat. Composez le 211 pour les services sociaux disponibles.", pt: "Ligue 911 em caso de perigo imediato. Ligue 211 para serviços sociais disponíveis agora."),
        .call211: .init(en: "Call 211", fr: "Appeler le 211", pt: "Ligar para 211"),
        .call911: .init(en: "Call 911", fr: "Appeler le 911", pt: "Ligar para 911"),
        .searchPlaceholder: .init(en: "Service, need or neighbourhood", fr: "Service, besoin ou quartier", pt: "Serviço, necessidade ou bairro"),
        .all: .init(en: "All", fr: "Tous", pt: "Todos"),
        .noResults: .init(en: "No matching services. Try a broader search or call 211.", fr: "Aucun service correspondant. Élargissez la recherche ou composez le 211.", pt: "Nenhum serviço encontrado. Amplie a busca ou ligue para 211."),
        .citywide: .init(en: "Toronto-wide", fr: "Partout à Toronto", pt: "Toda Toronto"),
        .call: .init(en: "Call", fr: "Appeler", pt: "Ligar"),
        .website: .init(en: "Official website", fr: "Site officiel", pt: "Site oficial"),
        .save: .init(en: "Save", fr: "Enregistrer", pt: "Salvar"),
        .saved: .init(en: "Saved", fr: "Enregistré", pt: "Salvo"),
        .officialOnly: .init(en: "Links open official provider pages. Availability and eligibility can change.", fr: "Les liens ouvrent les pages officielles. La disponibilité et l’admissibilité peuvent changer.", pt: "Os links abrem páginas oficiais. Disponibilidade e elegibilidade podem mudar."),
        .evictionTitle: .init(en: "Eviction prevention guide", fr: "Guide de prévention de l’expulsion", pt: "Guia de prevenção de despejo"),
        .evictionIntro: .init(en: "This guide helps you prepare. It is not legal advice and does not replace a legal clinic.", fr: "Ce guide vous aide à vous préparer. Il ne constitue pas un avis juridique et ne remplace pas une clinique juridique.", pt: "Este guia ajuda na preparação. Não é aconselhamento jurídico e não substitui uma clínica jurídica."),
        .arrears: .init(en: "Are you behind on rent?", fr: "Avez-vous un retard de loyer?", pt: "Você está com aluguel atrasado?"),
        .notice: .init(en: "Did your landlord give you a notice or LTB document?", fr: "Votre propriétaire vous a-t-il remis un avis ou un document de la CLI?", pt: "O proprietário entregou uma notificação ou documento do LTB?"),
        .assistance: .init(en: "Do you receive Ontario Works or ODSP?", fr: "Recevez-vous Ontario au travail ou le POSPH?", pt: "Você recebe Ontario Works ou ODSP?"),
        .income: .init(en: "Approximate monthly household income", fr: "Revenu mensuel approximatif du ménage", pt: "Renda familiar mensal aproximada"),
        .postal: .init(en: "Toronto postal code", fr: "Code postal de Toronto", pt: "Código postal de Toronto"),
        .yes: .init(en: "Yes", fr: "Oui", pt: "Sim"),
        .no: .init(en: "No", fr: "Non", pt: "Não"),
        .optional: .init(en: "Optional", fr: "Facultatif", pt: "Opcional"),
        .buildPlan: .init(en: "Build my action plan", fr: "Créer mon plan d’action", pt: "Criar meu plano de ação"),
        .planTitle: .init(en: "Your next steps", fr: "Vos prochaines étapes", pt: "Seus próximos passos"),
        .planRentBank: .init(en: "Check Toronto Rent Bank eligibility and prepare proof of rent, arrears and household income.", fr: "Vérifiez l’admissibilité à la Toronto Rent Bank et préparez les preuves de loyer, d’arriérés et de revenu.", pt: "Confira a elegibilidade ao Toronto Rent Bank e prepare comprovantes do aluguel, atraso e renda familiar."),
        .planLegal: .init(en: "Contact a community legal clinic before your deadline. Keep every notice and record of communication.", fr: "Contactez une clinique juridique communautaire avant l’échéance. Conservez chaque avis et communication.", pt: "Contate uma clínica jurídica comunitária antes do prazo. Guarde todas as notificações e comunicações."),
        .planCaseworker: .init(en: "Contact your OW or ODSP caseworker and ask about housing stabilization support.", fr: "Contactez votre agente ou agent d’OT/POSPH et demandez du soutien à la stabilisation du logement.", pt: "Contate seu responsável do OW ou ODSP e peça apoio de estabilização habitacional."),
        .planGeneral: .init(en: "Call 211 to confirm the nearest service and current hours before travelling.", fr: "Composez le 211 pour confirmer le service le plus proche et ses heures avant de vous déplacer.", pt: "Ligue 211 para confirmar o serviço mais próximo e o horário atual antes de sair."),
        .documents: .init(en: "Documents to prepare", fr: "Documents à préparer", pt: "Documentos para preparar"),
        .documentList: .init(en: "Government ID (if requested)\nLease or proof of tenancy\nRent statements or notices\nRecent income information", fr: "Pièce d’identité (si demandée)\nBail ou preuve de location\nRelevés de loyer ou avis\nRenseignements récents sur le revenu", pt: "Documento de identidade (se solicitado)\nContrato ou comprovante de locação\nExtratos do aluguel ou notificações\nInformações recentes de renda"),
        .openRentBank: .init(en: "Open Toronto Rent Bank", fr: "Ouvrir Toronto Rent Bank", pt: "Abrir Toronto Rent Bank"),
        .findLegalClinic: .init(en: "Find a legal clinic", fr: "Trouver une clinique juridique", pt: "Encontrar clínica jurídica"),
        .reset: .init(en: "Start over", fr: "Recommencer", pt: "Recomeçar"),
        .seniorTitle: .init(en: "Seniors Connect", fr: "Aînés Connectés", pt: "Seniors Connect"),
        .seniorIntro: .init(en: "Clear routes to community support for seniors and the people who care for them.", fr: "Des chemins clairs vers le soutien communautaire pour les aînés et leurs proches aidants.", pt: "Caminhos claros para apoio comunitário a idosos e às pessoas que cuidam deles."),
        .largerText: .init(en: "Larger text", fr: "Texte agrandi", pt: "Texto maior"),
        .seniorHelp: .init(en: "Help for seniors", fr: "Aide aux aînés", pt: "Ajuda para idosos"),
        .caregiverHelp: .init(en: "Help for caregivers", fr: "Aide aux proches aidants", pt: "Ajuda para cuidadores"),
        .callHelpline: .init(en: "Call Seniors Helpline", fr: "Appeler la ligne des aînés", pt: "Ligar para Seniors Helpline"),
        .emptyFavorites: .init(en: "Save useful services and they will appear here.", fr: "Enregistrez des services utiles; ils apparaîtront ici.", pt: "Salve serviços úteis para encontrá-los aqui."),
        .invalidPostal: .init(en: "Enter a Toronto postal code beginning with M, or leave it blank.", fr: "Entrez un code postal de Toronto commençant par M ou laissez le champ vide.", pt: "Digite um código postal de Toronto começando com M ou deixe em branco.")
    ]
}
