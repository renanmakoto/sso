import SwiftUI

struct NavigatorView: View {
    @EnvironmentObject private var store: AppStore
    @State private var searchText = ""
    @State private var selectedCategory: ServiceCategory?

    private var filteredServices: [SupportService] {
        ServiceDirectory.services.filter { service in
            if let selectedCategory, service.category != selectedCategory { return false }
            guard !searchText.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty else { return true }
            let query = searchText.localizedLowercase
            let searchable = "\(service.name) \(AppCopy.serviceDescription(service.id, fallback: service.description, language: store.language)) \(store.text(.citywide))".localizedLowercase
            return searchable.contains(query)
        }
    }

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 14) {
                ScrollView(.horizontal, showsIndicators: false) {
                    HStack {
                        CategoryChip(title: store.text(.all), selected: selectedCategory == nil) { selectedCategory = nil }
                        ForEach(ServiceCategory.allCases) { category in
                            CategoryChip(title: category.label(for: store.language), selected: selectedCategory == category) { selectedCategory = category }
                        }
                    }
                }
                InfoCard(title: store.text(.citywide), text: store.text(.officialOnly), color: .helpBlueSoft)
                Text("\(filteredServices.count) \(store.text(.services).lowercased())")
                    .font(.caption.bold())
                    .foregroundStyle(Color.helpMuted)
                if filteredServices.isEmpty {
                    Text(store.text(.noResults))
                        .foregroundStyle(Color.helpMuted)
                        .multilineTextAlignment(.center)
                        .frame(maxWidth: .infinity)
                        .padding(32)
                } else {
                    ForEach(filteredServices) { service in
                        ServiceCardView(service: service)
                    }
                }
            }
            .padding()
        }
        .searchable(text: $searchText, prompt: store.text(.searchPlaceholder))
        .navigationTitle(store.text(.navigator))
        .helpInlineNavigationTitle()
        .helpPage()
    }
}

private struct CategoryChip: View {
    let title: String
    let selected: Bool
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            Text(title).font(.subheadline.bold())
                .foregroundStyle(selected ? .white : Color.helpInk)
                .padding(.horizontal, 14)
                .padding(.vertical, 9)
                .background(selected ? Color.helpPrimary : .white, in: Capsule())
                .overlay(Capsule().stroke(selected ? Color.helpPrimary : Color.helpBorder))
        }
    }
}
