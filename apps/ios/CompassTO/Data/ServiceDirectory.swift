import Foundation

enum ServiceDirectory {
    static let services: [SupportService] = [
        .init(
            id: "211-ontario",
            name: "211 Ontario",
            category: .financial,
            description: .init(
                en: "Navigation for community, government, health and social services.",
                fr: "Orientation vers les services communautaires, gouvernementaux, sociaux et de santé.",
                pt: "Orientação para serviços comunitários, públicos, sociais e de saúde."
            ),
            phone: "211",
            phoneLabel: "211",
            website: "https://211ontario.ca/search/"
        ),
        .init(
            id: "toronto-rent-bank",
            name: "Toronto Rent Bank",
            category: .housing,
            description: .init(
                en: "Support for eligible Toronto residents facing rental arrears or needing a rental deposit.",
                fr: "Soutien aux résidents admissibles ayant des arriérés de loyer ou besoin d’un dépôt.",
                pt: "Apoio a moradores elegíveis com aluguel atrasado ou que precisam de depósito para locação."
            ),
            website: "https://www.toronto.ca/community-people/housing-shelter/financial-support-for-housing/financial-support-for-renters/toronto-rent-bank/"
        ),
        .init(
            id: "legal-aid-clinics",
            name: "Legal Aid Ontario — Community Legal Clinics",
            category: .legal,
            description: .init(
                en: "Find a local clinic for help with housing, income assistance and other legal issues.",
                fr: "Trouvez une clinique locale pour le logement, l’aide au revenu et d’autres questions juridiques.",
                pt: "Encontre uma clínica local para questões de moradia, assistência de renda e outros assuntos jurídicos."
            ),
            phone: "18006688258",
            phoneLabel: "1-800-668-8258",
            website: "https://www.legalaid.on.ca/legal-clinics/"
        ),
        .init(
            id: "daily-bread",
            name: "Daily Bread Food Bank",
            category: .food,
            description: .init(
                en: "Find nearby food banks and review access information before visiting.",
                fr: "Trouvez une banque alimentaire et vérifiez les renseignements avant votre visite.",
                pt: "Encontre um banco de alimentos próximo e confira as informações antes da visita."
            ),
            phone: "4162030050",
            phoneLabel: "416-203-0050",
            website: "https://www.dailybread.ca/need-food/programs-by-location/"
        ),
        .init(
            id: "central-intake",
            name: "Toronto Central Intake",
            category: .housing,
            description: .init(
                en: "City access line for emergency shelter referrals and street outreach requests.",
                fr: "Ligne municipale pour l’hébergement d’urgence et les demandes d’intervention de rue.",
                pt: "Linha municipal para encaminhamento a abrigos de emergência e atendimento nas ruas."
            ),
            phone: "4163384766",
            phoneLabel: "416-338-4766",
            website: "https://www.toronto.ca/community-people/housing-shelter/homeless-help/central-intake/"
        ),
        .init(
            id: "findhelp-988",
            name: "9-8-8 Suicide Crisis Helpline",
            category: .mentalHealth,
            description: .init(
                en: "Call or text 9-8-8 for suicide crisis support anywhere in Canada, at any time.",
                fr: "Appelez ou textez le 9-8-8 pour du soutien en cas de crise suicidaire, partout au Canada.",
                pt: "Ligue ou envie mensagem para 9-8-8 para apoio em crise suicida, a qualquer hora no Canadá."
            ),
            phone: "988",
            phoneLabel: "9-8-8",
            website: "https://988.ca/"
        ),
        .init(
            id: "seniors-helpline",
            name: "Toronto Seniors Helpline",
            category: .seniors,
            description: .init(
                en: "Information, referrals and crisis support for seniors and caregivers.",
                fr: "Information, aiguillage et soutien en situation de crise pour les aînés et leurs proches aidants.",
                pt: "Informação, encaminhamento e apoio em crises para idosos e cuidadores."
            ),
            phone: "4162172077",
            phoneLabel: "416-217-2077",
            website: "https://torontoseniorshelpline.ca/",
            seniorFocused: true,
            caregiverFocused: true
        ),
        .init(
            id: "meals-on-wheels",
            name: "Meals on Wheels — Toronto",
            category: .seniors,
            description: .init(
                en: "Locate community agencies that deliver meals to seniors and people with disabilities.",
                fr: "Trouvez des organismes qui livrent des repas aux aînés et aux personnes handicapées.",
                pt: "Encontre organizações que entregam refeições a idosos e pessoas com deficiência."
            ),
            phone: "4162563010",
            phoneLabel: "416-256-3010",
            website: "https://www.mealsonwheels.ca/",
            seniorFocused: true,
            caregiverFocused: true
        ),
        .init(
            id: "ontario-health-at-home",
            name: "Ontario Health atHome — Toronto",
            category: .seniors,
            description: .init(
                en: "Assessment and coordination for publicly funded home and community care.",
                fr: "Évaluation et coordination des soins à domicile et communautaires financés par le public.",
                pt: "Avaliação e coordenação de cuidados domiciliares e comunitários públicos."
            ),
            phone: "18335151234",
            phoneLabel: "1-833-515-1234",
            website: "https://ontariohealthathome.ca/",
            seniorFocused: true,
            caregiverFocused: true
        ),
        .init(
            id: "wheel-trans",
            name: "TTC Wheel-Trans",
            category: .seniors,
            description: .init(
                en: "Accessible transit information, eligibility and registration.",
                fr: "Information, admissibilité et inscription au transport adapté.",
                pt: "Informações, elegibilidade e cadastro para transporte acessível."
            ),
            phone: "4163934111",
            phoneLabel: "416-393-4111",
            website: "https://www.ttc.ca/wheel-trans",
            seniorFocused: true,
            caregiverFocused: true
        ),
        .init(
            id: "caregiver-ontario",
            name: "Ontario Caregiver Helpline",
            category: .caregivers,
            description: .init(
                en: "Information and referrals for unpaid caregivers across Ontario.",
                fr: "Information et aiguillage pour les proches aidants non rémunérés en Ontario.",
                pt: "Informação e encaminhamento para cuidadores não remunerados em Ontário."
            ),
            phone: "18334162273",
            phoneLabel: "1-833-416-2273",
            website: "https://ontariocaregiver.ca/",
            caregiverFocused: true
        ),
        .init(
            id: "newcomer-services",
            name: "City of Toronto — Newcomer Services",
            category: .newcomers,
            description: .init(
                en: "Settlement, language, employment and community resources for newcomers.",
                fr: "Ressources d’établissement, de langue, d’emploi et communautaires pour les nouveaux arrivants.",
                pt: "Recursos de integração, idioma, emprego e comunidade para recém-chegados."
            ),
            website: "https://www.toronto.ca/community-people/moving-to-toronto/"
        )
    ]
}
