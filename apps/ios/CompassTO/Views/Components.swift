import SwiftUI

extension Color {
    static let helpInk = Color(red: 0.09, green: 0.17, blue: 0.23)
    static let helpMuted = Color(red: 0.36, green: 0.42, blue: 0.46)
    static let helpBackground = Color(red: 0.96, green: 0.97, blue: 0.95)
    static let helpPrimary = Color(red: 0.0, green: 0.42, blue: 0.37)
    static let helpPrimarySoft = Color(red: 0.85, green: 0.93, blue: 0.91)
    static let helpBlueSoft = Color(red: 0.89, green: 0.94, blue: 0.97)
    static let helpAmberSoft = Color(red: 1.0, green: 0.94, blue: 0.87)
    static let helpBorder = Color(red: 0.85, green: 0.88, blue: 0.87)
}

struct LanguageMenu: View {
    @EnvironmentObject private var store: AppStore

    var body: some View {
        Menu {
            Picker(store.text(.language), selection: $store.language) {
                ForEach(AppLanguage.allCases) { language in
                    Text(language.displayName).tag(language)
                }
            }
        } label: {
            Text(store.language.shortLabel)
                .font(.caption.bold())
                .foregroundStyle(Color.helpPrimary)
                .padding(.horizontal, 10)
                .padding(.vertical, 7)
                .background(.white, in: Capsule())
                .overlay(Capsule().stroke(Color.helpBorder))
        }
        .accessibilityLabel(store.text(.language))
    }
}

struct InfoCard: View {
    let title: String
    let text: String
    var color: Color = .helpPrimarySoft

    var body: some View {
        VStack(alignment: .leading, spacing: 6) {
            Text(title).font(.headline).foregroundStyle(Color.helpInk)
            Text(text).font(.subheadline).foregroundStyle(Color.helpInk)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding()
        .background(color, in: RoundedRectangle(cornerRadius: 14))
    }
}

struct ServiceCardView: View {
    @EnvironmentObject private var store: AppStore
    let service: SupportService

    private var isSaved: Bool { store.favorites.contains(service.id) }

    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            HStack(alignment: .top) {
                VStack(alignment: .leading, spacing: 4) {
                    Text(service.category.label(for: store.language).uppercased())
                        .font(.caption.bold())
                        .tracking(0.6)
                        .foregroundStyle(Color.helpPrimary)
                    Text(service.name)
                        .font(.title3.bold())
                        .foregroundStyle(Color.helpInk)
                }
                Spacer(minLength: 8)
                Button {
                    store.toggleFavorite(service.id)
                } label: {
                    Image(systemName: isSaved ? "star.fill" : "star")
                        .font(.title3)
                        .foregroundStyle(Color.helpPrimary)
                        .frame(width: 40, height: 40)
                        .background(isSaved ? Color.helpPrimarySoft : .clear, in: Circle())
                        .overlay(Circle().stroke(Color.helpBorder))
                }
                .accessibilityLabel(store.text(isSaved ? .saved : .save))
            }

            Text(AppCopy.serviceDescription(service.id, fallback: service.description, language: store.language))
                .font(.body)
                .foregroundStyle(Color.helpMuted)

            Label(store.text(.citywide), systemImage: "mappin.and.ellipse")
                .font(.caption.bold())
                .foregroundStyle(Color.helpMuted)

            HStack {
                if let phone = service.phone,
                   let phoneURL = URL(string: "tel:\(phone)") {
                    Link(destination: phoneURL) {
                        Label("\(store.text(.call)) \(service.phoneLabel ?? phone)", systemImage: "phone.fill")
                    }
                    .buttonStyle(PrimaryLinkButtonStyle())
                }
                Link(destination: service.website) {
                    Label(store.text(.website), systemImage: "arrow.up.right.square")
                }
                .buttonStyle(SecondaryLinkButtonStyle())
            }
            .font(.caption.bold())
        }
        .padding()
        .background(.white, in: RoundedRectangle(cornerRadius: 18))
        .overlay(RoundedRectangle(cornerRadius: 18).stroke(Color.helpBorder))
    }
}

private struct PrimaryLinkButtonStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .lineLimit(1)
            .minimumScaleFactor(0.75)
            .foregroundStyle(.white)
            .padding(.horizontal, 12)
            .padding(.vertical, 10)
            .background(Color.helpPrimary, in: RoundedRectangle(cornerRadius: 10))
            .opacity(configuration.isPressed ? 0.7 : 1)
    }
}

private struct SecondaryLinkButtonStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .lineLimit(1)
            .minimumScaleFactor(0.75)
            .foregroundStyle(Color.helpPrimary)
            .padding(.horizontal, 12)
            .padding(.vertical, 9)
            .overlay(RoundedRectangle(cornerRadius: 10).stroke(Color.helpPrimary))
            .opacity(configuration.isPressed ? 0.7 : 1)
    }
}

struct PageBackground: ViewModifier {
    func body(content: Content) -> some View {
        content
            .background(Color.helpBackground.ignoresSafeArea())
            .toolbar { ToolbarItem(placement: .automatic) { LanguageMenu() } }
    }
}

extension View {
    func helpPage() -> some View { modifier(PageBackground()) }

    @ViewBuilder
    func helpInlineNavigationTitle() -> some View {
#if os(iOS)
        navigationBarTitleDisplayMode(.inline)
#else
        self
#endif
    }

    @ViewBuilder
    func helpNumberKeyboard() -> some View {
#if os(iOS)
        keyboardType(.numberPad)
#else
        self
#endif
    }

    @ViewBuilder
    func helpPostalInput() -> some View {
#if os(iOS)
        textInputAutocapitalization(.characters)
#else
        self
#endif
    }
}
