import Foundation
import Combine

@MainActor
final class AppStore: ObservableObject {
    @Published var language: AppLanguage {
        didSet { UserDefaults.standard.set(language.rawValue, forKey: Self.languageKey) }
    }

    @Published private(set) var favorites: Set<String> {
        didSet { UserDefaults.standard.set(Array(favorites), forKey: Self.favoritesKey) }
    }

    private static let languageKey = "compassto.language"
    private static let favoritesKey = "compassto.favorites"

    init() {
        language = AppLanguage(rawValue: UserDefaults.standard.string(forKey: Self.languageKey) ?? "") ?? .english
        favorites = Set(UserDefaults.standard.stringArray(forKey: Self.favoritesKey) ?? [])
    }

    func text(_ key: CopyKey) -> String {
        AppCopy.text(key, language: language)
    }

    func toggleFavorite(_ id: String) {
        if favorites.contains(id) {
            favorites.remove(id)
        } else {
            favorites.insert(id)
        }
    }
}
