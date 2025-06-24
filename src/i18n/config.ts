
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
