import Foundation

enum AppLanguage: String, CaseIterable, Identifiable {
    case english = "en"
    case french = "fr"
    case portuguese = "pt"
    case spanish = "es"
    case ukrainian = "uk"
    case russian = "ru"
    case arabic = "ar"
    case korean = "ko"
    case japanese = "ja"
    case mandarin = "zh"
    case vietnamese = "vi"
    case tagalog = "tl"

    var id: String { rawValue }
    var shortLabel: String { rawValue.uppercased() }

    var displayName: String {
        switch self {
        case .english: "English"
        case .french: "Français"
        case .portuguese: "Português"
        case .spanish: "Español"
        case .ukrainian: "Українська"
        case .russian: "Русский"
        case .arabic: "العربية"
        case .korean: "한국어"
        case .japanese: "日本語"
        case .mandarin: "简体中文"
        case .vietnamese: "Tiếng Việt"
        case .tagalog: "Tagalog"
        }
    }

    var isRightToLeft: Bool { self == .arabic }
}

struct LocalizedValue: Hashable {
    let en: String
    let fr: String
    let pt: String

    func value(for language: AppLanguage) -> String {
        switch language {
        case .english: en
        case .french: fr
        case .portuguese: pt
        case .spanish, .ukrainian, .russian, .arabic, .korean, .japanese, .mandarin, .vietnamese, .tagalog: en
        }
    }
}

enum ServiceCategory: String, CaseIterable, Identifiable {
    case food
    case housing
    case legal
    case mentalHealth
    case financial
    case seniors
    case caregivers
    case newcomers

    var id: String { rawValue }

    func label(for language: AppLanguage) -> String {
        let labels: [ServiceCategory: LocalizedValue] = [
            .food: .init(en: "Food", fr: "Alimentation", pt: "Alimentação"),
            .housing: .init(en: "Housing", fr: "Logement", pt: "Moradia"),
            .legal: .init(en: "Legal help", fr: "Aide juridique", pt: "Ajuda jurídica"),
            .mentalHealth: .init(en: "Mental health", fr: "Santé mentale", pt: "Saúde mental"),
            .financial: .init(en: "Financial", fr: "Finances", pt: "Financeiro"),
            .seniors: .init(en: "Seniors", fr: "Aînés", pt: "Idosos"),
            .caregivers: .init(en: "Caregivers", fr: "Proches aidants", pt: "Cuidadores"),
            .newcomers: .init(en: "Newcomers", fr: "Nouveaux arrivants", pt: "Recém-chegados")
        ]
        let fallback = labels[self]?.value(for: language) ?? rawValue
        return AppCopy.categoryText(rawValue, language: language) ?? fallback
    }
}

struct SupportService: Identifiable, Hashable {
    let id: String
    let name: String
    let category: ServiceCategory
    let description: LocalizedValue
    let coverage: LocalizedValue
    let phone: String?
    let phoneLabel: String?
    let website: URL
    let seniorFocused: Bool
    let caregiverFocused: Bool

    init(
        id: String,
        name: String,
        category: ServiceCategory,
        description: LocalizedValue,
        coverage: LocalizedValue = .init(en: "Toronto-wide", fr: "Partout à Toronto", pt: "Toda Toronto"),
        phone: String? = nil,
        phoneLabel: String? = nil,
        website: String,
        seniorFocused: Bool = false,
        caregiverFocused: Bool = false
    ) {
        self.id = id
        self.name = name
        self.category = category
        self.description = description
        self.coverage = coverage
        self.phone = phone
        self.phoneLabel = phoneLabel
        self.website = URL(string: website)!
        self.seniorFocused = seniorFocused
        self.caregiverFocused = caregiverFocused
    }
}
