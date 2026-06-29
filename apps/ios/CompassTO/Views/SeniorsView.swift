import SwiftUI

struct SeniorsView: View {
    @EnvironmentObject private var store: AppStore
    @State private var largerText = false

    private var seniorServices: [SupportService] {
        ServiceDirectory.services.filter(\.seniorFocused)
    }

    private var caregiverServices: [SupportService] {
        ServiceDirectory.services.filter { $0.caregiverFocused && !$0.seniorFocused }
    }

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 16) {
                Text(store.text(.seniorIntro)).foregroundStyle(Color.helpMuted)

                Toggle(store.text(.largerText), isOn: $largerText)
                    .font(.headline)
                    .tint(.helpPrimary)
                    .padding()
                    .background(.white, in: RoundedRectangle(cornerRadius: 14))
                    .overlay(RoundedRectangle(cornerRadius: 14).stroke(Color.helpBorder))

                Link(destination: URL(string: "tel:4162172077")!) {
                    VStack(alignment: .leading, spacing: 3) {
                        Label(store.text(.callHelpline), systemImage: "phone.fill").font(.headline)
                        Text("416-217-2077").font(.title3.bold())
                    }
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding()
                    .foregroundStyle(.white)
                    .background(Color.helpPrimary, in: RoundedRectangle(cornerRadius: 16))
                }

                InfoCard(title: store.text(.urgentTitle), text: store.text(.emergency), color: .helpAmberSoft)
                Text(store.text(.seniorHelp)).font(.title2.bold()).foregroundStyle(Color.helpInk)
                ForEach(seniorServices) { service in ServiceCardView(service: service) }
                Text(store.text(.caregiverHelp)).font(.title2.bold()).foregroundStyle(Color.helpInk)
                ForEach(caregiverServices) { service in ServiceCardView(service: service) }
            }
            .padding()
        }
        .environment(\.dynamicTypeSize, largerText ? .accessibility2 : .large)
        .navigationTitle(store.text(.seniorTitle))
        .helpInlineNavigationTitle()
        .helpPage()
    }
}
