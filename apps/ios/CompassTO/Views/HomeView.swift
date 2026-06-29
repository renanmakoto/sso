import SwiftUI

struct HomeView: View {
    @EnvironmentObject private var store: AppStore

    var body: some View {
        ScrollView {
            VStack(spacing: 16) {
                VStack(spacing: 12) {
                    Text("TO")
                        .font(.headline.bold())
                        .foregroundStyle(.white)
                        .frame(width: 58, height: 58)
                        .background(Color.helpPrimary, in: RoundedRectangle(cornerRadius: 18))
                    Text(store.text(.tagline))
                        .font(.largeTitle.bold())
                        .foregroundStyle(Color.helpInk)
                        .multilineTextAlignment(.center)
                    Text(store.text(.chooseHelp))
                        .font(.body.weight(.semibold))
                        .foregroundStyle(Color.helpMuted)
                }
                .padding(.vertical, 8)

                NavigationLink { NavigatorView() } label: {
                    FeatureCard(icon: "magnifyingglass", title: store.text(.navigator), description: store.text(.navigatorBody), color: .helpPrimarySoft)
                }
                NavigationLink { EvictionGuideView() } label: {
                    FeatureCard(icon: "house", title: store.text(.eviction), description: store.text(.evictionBody), color: .helpAmberSoft)
                }
                NavigationLink { SeniorsView() } label: {
                    FeatureCard(icon: "heart", title: store.text(.seniors), description: store.text(.seniorsBody), color: .helpBlueSoft)
                }

                InfoCard(title: store.text(.privacyTitle), text: store.text(.privacyBody))
                InfoCard(title: store.text(.urgentTitle), text: store.text(.emergency), color: .helpAmberSoft)

                HStack {
                    Link(store.text(.call211), destination: URL(string: "tel:211")!)
                        .frame(maxWidth: .infinity)
                        .padding()
                        .foregroundStyle(.white)
                        .background(Color.helpPrimary, in: RoundedRectangle(cornerRadius: 12))
                    Link(store.text(.call911), destination: URL(string: "tel:911")!)
                        .frame(maxWidth: .infinity)
                        .padding()
                        .foregroundStyle(.red)
                        .overlay(RoundedRectangle(cornerRadius: 12).stroke(.red))
                }
                .font(.headline)
            }
            .padding()
        }
        .navigationTitle(store.text(.appName))
        .helpPage()
    }
}

private struct FeatureCard: View {
    let icon: String
    let title: String
    let description: String
    let color: Color

    var body: some View {
        HStack(spacing: 14) {
            Image(systemName: icon)
                .font(.title2.bold())
                .foregroundStyle(Color.helpInk)
                .frame(width: 52, height: 52)
                .background(color, in: RoundedRectangle(cornerRadius: 14))
            VStack(alignment: .leading, spacing: 4) {
                Text(title).font(.headline).foregroundStyle(Color.helpInk)
                Text(description).font(.subheadline).foregroundStyle(Color.helpMuted).multilineTextAlignment(.leading)
            }
            Spacer(minLength: 4)
            Image(systemName: "chevron.right").foregroundStyle(Color.helpPrimary)
        }
        .padding()
        .background(.white, in: RoundedRectangle(cornerRadius: 18))
        .overlay(RoundedRectangle(cornerRadius: 18).stroke(Color.helpBorder))
    }
}
