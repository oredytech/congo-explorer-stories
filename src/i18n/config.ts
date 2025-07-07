
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  fr: {
    translation: {
      nav: {
        home: "Accueil",
        explore: "Explorer",
        documentaries: "Documentaires",
        gallery: "Galerie",
        articles: "Articles",
        join: "Rejoindre",
        add: "Ajouter",
        support: "Soutenir",
        contact: "Contact"
      },
      home: {
        title: "VISITE CONGO",
        subtitle: "Découvrez les trésors cachés de la République Démocratique du Congo",
        heroText: "Nous sommes un groupe de jeunes explorateurs qui veulent révéler au monde la beauté méconnue de la RDC, ses paysages époustouflants, sa culture riche et ses communautés authentiques.",
        discoverMonth: "Découverte du mois",
        featuredArticles: "Articles phares",
        joinExplorers: "Rejoindre les explorateurs",
        addContent: "Ajouter une photo/vidéo",
        aboutTitle: "À propos de notre mission",
        aboutText: "Notre mission est de documenter et partager les merveilles cachées de la RDC à travers des récits authentiques, des images captivantes et des témoignages de nos explorateurs locaux."
      },
      join: {
        title: "Rejoindre les Explorateurs",
        subtitle: "Devenez ambassadeur de la beauté congolaise. Rejoignez notre équipe d'explorateurs passionnés et contribuez à révéler les trésors cachés de la RDC.",
        protocolTitle: "Protocole d'Accord – Explorateurs Bénévoles",
        protocolSubtitle: "Veuillez lire attentivement les conditions ci-dessous avant de compléter votre candidature",
        protocolSections: {
          object: "1. Objet du protocole",
          objectText: "Définit les engagements réciproques entre VisiteCongo et le bénévole souhaitant contribuer en tant qu'explorateur terrain, photographe ou reporter culturel à titre non rémunéré.",
          status: "2. Statut du bénévole",
          statusItems: [
            "Agit à titre strictement bénévole",
            "N'est pas salarié, ni prestataire, ni mandataire",
            "Aucune obligation d'exclusivité",
            "Responsable de sa propre sécurité"
          ],
          contributions: "3. Contributions attendues",
          contributionsItems: [
            "Photographies, vidéos ou articles courts",
            "Informations utiles : nom, date, contexte, GPS",
            "Respect de la charte des explorateurs"
          ],
          publication: "4. Modalités de publication",
          publicationItems: [
            "Transmission via email ou formulaire",
            "Modération avant publication",
            "Respect de la ligne éditoriale"
          ],
          rights: "5. Droits sur les contenus",
          rightsItems: [
            "Images publiées deviennent propriété du site",
            "Mention possible des auteurs",
            "Utilisation conforme aux valeurs éthiques"
          ],
          responsibility: "6. Engagement de responsabilité",
          responsibilityItems: [
            "Respect des populations locales et de la nature",
            "Responsabilité des risques personnels",
            "VisiteCongo non responsable des incidents"
          ],
          duration: "7. Durée et résiliation",
          durationItems: [
            "Durée indéterminée",
            "Résiliation libre à tout moment",
            "Contenus publiés restent propriété du site"
          ],
          acceptance: "8. Acceptation en ligne",
          acceptanceText: "En envoyant du contenu à VisiteCongo, le contributeur accepte automatiquement ce protocole."
        },
        acceptanceRequired: "Acceptation requise",
        acceptanceNote: "En complétant le formulaire ci-dessous, vous acceptez automatiquement les termes du protocole d'accord pour explorateurs bénévoles de VisiteCongo.",
        rereadProtocol: "Relire le protocole"
      },
      explore: {
        title: "Explorer la RDC",
        subtitle: "Découvrez les 26 provinces et leurs trésors cachés",
        selectProvince: "Sélectionnez une province pour commencer l'exploration"
      },
      footer: {
        contact: "Contact",
        legal: "Mentions légales",
        privacy: "Confidentialité",
        partners: "Nos partenaires",
        becomePartner: "Devenir partenaire",
        needHelp: "Besoin d'assistance ?"
      }
    }
  },
  en: {
    translation: {
      nav: {
        home: "Home",
        explore: "Explore",
        documentaries: "Documentaries",
        gallery: "Gallery",
        articles: "Articles",
        join: "Join",
        add: "Add",
        support: "Support",
        contact: "Contact"
      },
      home: {
        title: "VISIT CONGO",
        subtitle: "Discover the hidden treasures of the Democratic Republic of Congo",
        heroText: "We are a group of young explorers who want to reveal to the world the unknown beauty of the DRC, its breathtaking landscapes, rich culture and authentic communities.",
        discoverMonth: "Discovery of the month",
        featuredArticles: "Featured articles",
        joinExplorers: "Join the explorers",
        addContent: "Add a photo/video",
        aboutTitle: "About our mission",
        aboutText: "Our mission is to document and share the hidden wonders of the DRC through authentic stories, captivating images and testimonies from our local explorers."
      },
      join: {
        title: "Join the Explorers",
        subtitle: "Become an ambassador of Congolese beauty. Join our team of passionate explorers and help reveal the hidden treasures of the DRC.",
        protocolTitle: "Agreement Protocol – Volunteer Explorers",
        protocolSubtitle: "Please read the conditions below carefully before completing your application",
        protocolSections: {
          object: "1. Purpose of the protocol",
          objectText: "Defines the mutual commitments between VisiteCongo and the volunteer wishing to contribute as a field explorer, photographer or cultural reporter on a non-remunerated basis.",
          status: "2. Volunteer status",
          statusItems: [
            "Acts strictly as a volunteer",
            "Is not an employee, contractor, or agent",
            "No exclusivity obligation",
            "Responsible for their own safety"
          ],
          contributions: "3. Expected contributions",
          contributionsItems: [
            "Photographs, videos or short articles",
            "Useful information: name, date, context, GPS",
            "Respect for the explorers' charter"
          ],
          publication: "4. Publication procedures",
          publicationItems: [
            "Transmission via email or form",
            "Moderation before publication",
            "Respect for editorial line"
          ],
          rights: "5. Content rights",
          rightsItems: [
            "Published images become property of the site",
            "Possible mention of authors",
            "Use in accordance with ethical values"
          ],
          responsibility: "6. Responsibility commitment",
          responsibilityItems: [
            "Respect for local populations and nature",
            "Responsibility for personal risks",
            "VisiteCongo not responsible for incidents"
          ],
          duration: "7. Duration and termination",
          durationItems: [
            "Indefinite duration",
            "Free termination at any time",
            "Published content remains property of the site"
          ],
          acceptance: "8. Online acceptance",
          acceptanceText: "By sending content to VisiteCongo, the contributor automatically accepts this protocol."
        },
        acceptanceRequired: "Acceptance required",
        acceptanceNote: "By completing the form below, you automatically accept the terms of the volunteer explorers agreement protocol for VisiteCongo.",
        rereadProtocol: "Re-read the protocol"
      },
      explore: {
        title: "Explore DRC",
        subtitle: "Discover the 26 provinces and their hidden treasures",
        selectProvince: "Select a province to start exploring"
      },
      footer: {
        contact: "Contact",
        legal: "Legal Notice",
        privacy: "Privacy",
        partners: "Our Partners",
        becomePartner: "Become a Partner",
        needHelp: "Need Help?"
      }
    }
  },
  sw: {
    translation: {
      nav: {
        home: "Nyumbani",
        explore: "Kuchunguza",
        documentaries: "Documentary",
        gallery: "Galeri",
        articles: "Makala",
        join: "Kuungana",
        add: "Kuongeza",
        support: "Kusaidia",
        contact: "Mawasiliano"
      },
      home: {
        title: "TEMBELEA KONGO",
        subtitle: "Gundua hazina za fiche za Jamhuri ya Kidemokrasia ya Kongo",
        heroText: "Sisi ni kikundi cha vijana wavumbuzi wanaotaka kuonyesha ulimwengu uzuri usijulikani wa DRC, mazingira yake ya kutisha, utamaduni mkuu na jamii za kweli.",
        discoverMonth: "Uvumbuzi wa mwezi",
        featuredArticles: "Makala kuu",
        joinExplorers: "Jiunge na wavumbuzi",
        addContent: "Ongeza picha/video",
        aboutTitle: "Kuhusu dhamira yetu",
        aboutText: "Dhamira yetu ni kuweka nyaraka na kushiriki maajabu ya fiche ya DRC kupitia hadithi za kweli, picha za kuvutia na ushahidi kutoka kwa wavumbuzi wetu wa ndani."
      },
      join: {
        title: "Jiunge na Wavumbuzi",
        subtitle: "Kuwa balozi wa uzuri wa Kikongo. Jiunge na timu yetu ya wavumbuzi wenye shauku na kusaidia kufunua hazina za fiche za DRC.",
        protocolTitle: "Itifaki ya Makubaliano – Wavumbuzi wa Kujitolea",
        protocolSubtitle: "Tafadhali soma masharti yafuatayo kwa makini kabla ya kukamilisha maombi yako",
        protocolSections: {
          object: "1. Madhumuni ya itifaki",
          objectText: "Inafafanua maagano ya pande zote kati ya VisiteCongo na mtumiaji anayetaka kuchangia kama mvumbuzi wa uwandani, mpiga picha au mwandishi wa kitamaduni bila malipo.",
          status: "2. Hali ya kujitolea",
          statusItems: [
            "Anafanya kazi kwa njia ya kujitolea tu",
            "Si mfanyakazi, mkandarasi, au wakala",
            "Hakuna wajibu wa kipekee",
            "Anawajibika kwa usalama wake mwenyewe"
          ],
          contributions: "3. Michango inayotarajiwa",
          contributionsItems: [
            "Picha, video au makala fupi",
            "Habari muhimu: jina, tarehe, muktadha, GPS",
            "Kuheshimu mkataba wa wavumbuzi"
          ],
          publication: "4. Taratibu za uchapishaji",
          publicationItems: [
            "Uhamishaji kupitia barua pepe au fomu",
            "Udhibiti kabla ya uchapishaji",
            "Kuheshimu mstari wa kihariri"
          ],
          rights: "5. Haki za maudhui",
          rightsItems: [
            "Picha zilizochapishwa zinakuwa mali ya tovuti",
            "Kutajwa kwa waandishi kunawezekana",
            "Matumizi yanayolingana na maadili"
          ],
          responsibility: "6. Ahadi ya uwajibikaji",
          responsibilityItems: [
            "Kuheshimu watu wa ndani na mazingira",
            "Uwajibikaji wa hatari za kibinafsi",
            "VisiteCongo haiwajibiki kwa matukio"
          ],
          duration: "7. Muda na ukatishaji",
          durationItems: [
            "Muda usio na kikomo",
            "Ukatishaji wa bure wakati wowote",
            "Maudhui yaliyochapishwa yanabaki mali ya tovuti"
          ],
          acceptance: "8. Ukubalaji wa mtandaoni",
          acceptanceText: "Kwa kutuma maudhui kwa VisiteCongo, mchangiaji anakubali kiotomatiki itifaki hii."
        },
        acceptanceRequired: "Kukubali kunahitajika",
        acceptanceNote: "Kwa kukamilisha fomu iliyo hapa chini, unakubali kiotomatiki masharti ya itifaki ya makubaliano ya wavumbuzi wa kujitolea kwa VisiteCongo.",
        rereadProtocol: "Soma tena itifaki"
      },
      explore: {
        title: "Kuchunguza DRC",
        subtitle: "Gundua jimbo 26 na hazina zao za fiche",
        selectProvince: "Chagua jimbo kuanza kuchunguza"
      },
      footer: {
        contact: "Mawasiliano",
        legal: "Ilani ya Kisheria",
        privacy: "Faragha",
        partners: "Washirika Wetu",
        becomePartner: "Kuwa Mshirika",
        needHelp: "Unahitaji Msaada?"
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'fr',
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
