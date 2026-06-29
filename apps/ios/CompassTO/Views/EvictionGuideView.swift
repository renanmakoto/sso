import SwiftUI

private enum GuideAnswer: String {
    case unanswered, yes, no
}

struct EvictionGuideView: View {
    @EnvironmentObject private var store: AppStore
    @State private var arrears: GuideAnswer = .unanswered
    @State private var notice: GuideAnswer = .unanswered
    @State private var assistance: GuideAnswer = .unanswered
    @State private var income = ""
    @State private var postalCode = ""
    @State private var showPlan = false

    private var postalIsValid: Bool {
        let trimmed = postalCode.trimmingCharacters(in: .whitespacesAndNewlines)
        if trimmed.isEmpty { return true }
        return trimmed.range(of: #"^M\d[A-Z](?: ?\d[A-Z]\d)?$"#, options: [.regularExpression, .caseInsensitive]) != nil
    }

    private var showRentBankStep: Bool {
        arrears == .yes && assistance != .yes
    }

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 16) {
                InfoCard(title: store.text(.evictionTitle), text: store.text(.evictionIntro), color: .helpAmberSoft)
                if showPlan {
                    plan
                } else {
                    form
                }
            }
            .padding()
        }
        .navigationTitle(store.text(.evictionTitle))
        .helpInlineNavigationTitle()
        .helpPage()
    }

    private var form: some View {
        VStack(alignment: .leading, spacing: 18) {
            QuestionPicker(title: store.text(.arrears), answer: $arrears)
            QuestionPicker(title: store.text(.notice), answer: $notice)
            QuestionPicker(title: store.text(.assistance), answer: $assistance)

            VStack(alignment: .leading, spacing: 8) {
                Text("\(store.text(.income)) · \(store.text(.optional))").font(.subheadline.bold())
                TextField("$", text: $income).helpNumberKeyboard().textFieldStyle(HelpTextFieldStyle())
            }
            VStack(alignment: .leading, spacing: 8) {
                Text("\(store.text(.postal)) · \(store.text(.optional))").font(.subheadline.bold())
                TextField("M5V 2T6", text: $postalCode)
                    .helpPostalInput()
                    .textFieldStyle(HelpTextFieldStyle(error: !postalIsValid))
                if !postalIsValid {
                    Text(store.text(.invalidPostal)).font(.caption).foregroundStyle(.red)
                }
            }

            Button {
                showPlan = true
            } label: {
                Text(store.text(.buildPlan)).font(.headline).frame(maxWidth: .infinity).padding()
            }
            .foregroundStyle(.white)
            .background(Color.helpPrimary, in: RoundedRectangle(cornerRadius: 12))
            .disabled(!postalIsValid)
            .opacity(postalIsValid ? 1 : 0.45)
        }
    }

    private var plan: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text(store.text(.planTitle)).font(.title2.bold()).foregroundStyle(Color.helpInk)
            if showRentBankStep { PlanStep(number: "1", text: store.text(.planRentBank)) }
            if notice == .yes { PlanStep(number: showRentBankStep ? "2" : "1", text: store.text(.planLegal)) }
            if assistance == .yes { PlanStep(number: "•", text: store.text(.planCaseworker)) }
            PlanStep(number: "•", text: store.text(.planGeneral))
            InfoCard(title: store.text(.documents), text: store.text(.documentList), color: .helpBlueSoft)

            if assistance != .yes {
                Link(store.text(.openRentBank), destination: URL(string: "https://www.toronto.ca/community-people/housing-shelter/financial-support-for-housing/financial-support-for-renters/toronto-rent-bank/")!)
                    .font(.headline)
                    .frame(maxWidth: .infinity)
                    .padding()
                    .foregroundStyle(.white)
                    .background(Color.helpPrimary, in: RoundedRectangle(cornerRadius: 12))
            }
            Link(store.text(.findLegalClinic), destination: URL(string: "https://www.legalaid.on.ca/legal-clinics/")!)
                .font(.headline)
                .frame(maxWidth: .infinity)
                .padding()
                .foregroundStyle(Color.helpPrimary)
                .overlay(RoundedRectangle(cornerRadius: 12).stroke(Color.helpPrimary))
            Button(store.text(.reset), action: reset)
                .font(.subheadline.bold())
                .foregroundStyle(Color.helpMuted)
                .frame(maxWidth: .infinity)
                .padding()
        }
    }

    private func reset() {
        arrears = .unanswered
        notice = .unanswered
        assistance = .unanswered
        income = ""
        postalCode = ""
        showPlan = false
    }
}

private struct QuestionPicker: View {
    @EnvironmentObject private var store: AppStore
    let title: String
    @Binding var answer: GuideAnswer

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text(title).font(.headline).foregroundStyle(Color.helpInk)
            Picker(title, selection: $answer) {
                Text(store.text(.yes)).tag(GuideAnswer.yes)
                Text(store.text(.no)).tag(GuideAnswer.no)
            }
            .pickerStyle(.segmented)
        }
    }
}

private struct HelpTextFieldStyle: TextFieldStyle {
    var error = false

    func _body(configuration: TextField<Self._Label>) -> some View {
        configuration
            .padding(14)
            .background(.white, in: RoundedRectangle(cornerRadius: 12))
            .overlay(RoundedRectangle(cornerRadius: 12).stroke(error ? .red : Color.helpBorder))
    }
}

private struct PlanStep: View {
    let number: String
    let text: String

    var body: some View {
        HStack(alignment: .top, spacing: 14) {
            Text(number)
                .font(.headline.bold())
                .foregroundStyle(Color.helpPrimary)
                .frame(width: 36, height: 36)
                .background(Color.helpPrimarySoft, in: Circle())
            Text(text).font(.body).foregroundStyle(Color.helpInk)
            Spacer(minLength: 0)
        }
        .padding()
        .background(.white, in: RoundedRectangle(cornerRadius: 14))
        .overlay(RoundedRectangle(cornerRadius: 14).stroke(Color.helpBorder))
    }
}
