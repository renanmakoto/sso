import SwiftUI

struct FavoritesView: View {
    @EnvironmentObject private var store: AppStore

    private var savedServices: [SupportService] {
        ServiceDirectory.services.filter { store.favorites.contains($0.id) }
    }

    var body: some View {
        ScrollView {
            VStack(spacing: 14) {
                if savedServices.isEmpty {
                    VStack(spacing: 14) {
                        Image(systemName: "star")
                            .font(.system(size: 42))
                            .foregroundStyle(Color.helpMuted)
                        Text(store.text(.favorites)).font(.title2.bold())
                        Text(store.text(.emptyFavorites))
                            .foregroundStyle(Color.helpMuted)
                            .multilineTextAlignment(.center)
                    }
                    .frame(maxWidth: .infinity)
                    .padding(.top, 80)
                } else {
                    ForEach(savedServices) { service in ServiceCardView(service: service) }
                }
            }
            .padding()
        }
        .navigationTitle(store.text(.favorites))
        .helpPage()
    }
}
