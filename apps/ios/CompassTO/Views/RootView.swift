import SwiftUI

private enum MainTab: Hashable {
    case home, services, favorites
}

struct RootView: View {
    @EnvironmentObject private var store: AppStore
    @State private var selectedTab: MainTab = .home

    var body: some View {
        TabView(selection: $selectedTab) {
            NavigationStack { HomeView() }
                .tabItem { Label(store.text(.home), systemImage: "house") }
                .tag(MainTab.home)

            NavigationStack { NavigatorView() }
                .tabItem { Label(store.text(.services), systemImage: "magnifyingglass") }
                .tag(MainTab.services)

            NavigationStack { FavoritesView() }
                .tabItem { Label(store.text(.favorites), systemImage: "star") }
                .tag(MainTab.favorites)
        }
        .tint(.helpPrimary)
        .environment(\.layoutDirection, store.language.isRightToLeft ? .rightToLeft : .leftToRight)
    }
}
