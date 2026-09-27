/* ==========================================================================
   ✏️  TON CONTENU — c'est le SEUL fichier à modifier pour personnaliser le site.

   - Change les textes entre guillemets.
   - Mets tes fichiers dans assets/photos, assets/videos, assets/audio
     puis indique leur chemin ici (ex : "assets/photos/plage.jpg").
   - Pour retirer une section entière, mets-la à null (ex : quiz: null).
   - Pour ajouter un élément à une liste, copie un bloc { ... }, colle-le
     et n'oublie pas la virgule entre deux blocs.
   - Écris {pour} dans un texte pour y insérer le prénom de la personne
     (si tu envoies le lien avec ?pour=Léa à la fin).
   ========================================================================== */

window.CV = {
  prenom: "Alexis",
  // Mot utilisé à la place de {pour} quand le lien n'a pas de ?pour=...
  // Laisse "" pour simplement l'enlever (« Alors, on se voit ? »).
  pourParDefaut: "Cloé",

  /* ---------- Page d'accueil ---------- */
  hero: {
    salut: "À l’attention de Cloé aka 3octobergirl",
    poste: "ton futur amoureux",
    accroche:
      "Dossier de candidature sans prétention d'un garçon lambda, tombé par hasard sur tes créations audiovisuelles. " +
      "J'imagine que tes DM débordent de « slt ça va 😏 »… alors je me permets de faire une prise de contact un peu plus originale.",
    photo: "assets/photos/profil.jpg",
    legendePhoto: "Premier aperçu",
    tampon: "Candidat sérieux",
    vocal: { src: "assets/audio/bonjour.mp3", titre: "Écoute ma voix" },
  },

  /* ---------- 01 · Identité ---------- */
  identite: {
    titre: "Fiche d'identité",
    photo: "assets/photos/identite.jpg",
    champs: [
      { label: "Âge", valeur: "27 ans" },
      { label: "Ville", valeur: "Grenoble" },
      { label: "Taille", valeur: "1m88" },
      { label: "Métier", valeur: "Ingénieur Systèmes et Réseaux" },
      { label: "Signe", valeur: "Vierge" },
      { label: "Statut", valeur: "Disponible immédiatement" },
    ],
    aPropos:
      "Je suis curieux, relativement drôle et bon délire, j'ai une passion sincère pour les " +
      "bons restos, les voyages improvisés, les couchers de soleil et les fous rires. " +
      "Assez sportif : vélo de route, course à pied et rando, mais grand touche-à-tout. " +
      "Sinon, je fais aussi de la motocyclette. En revanche, je ne suis pas un grand fan de lecture.",
    passions: ["✈️ Voyages", "🚴 Vélo", "🏍️ Moto", "🥾 Rando", "🏃 Course à pied"],
  },

  /* ---------- 02 · Expériences ---------- */
  experiences: {
    titre: "Expériences de vie",
    liste: [
      {
        poste: "Chef cuisto",
        lieu: "Ma cuisine",
        description: "Spécialiste des vraies pâtes carbo, lasagnes et tout ce qui se rapproche de l'Italie. Taux de satisfaction des invités : 100 % (ils sont polis).",
      },
      {
        poste: "Explorateur",
        lieu: "Vietnam",
        description: "1 mois, du nord au sud, 1 seul sac. Pas de tourista, que des bons souvenirs.",
      },
      {
        poste: "Meilleur pote de mes amis",
        lieu: "Partout",
        description: "Déménagements, ruptures, anniversaires, commérages : toujours présent.",
      },
    ],
  },

  /* ---------- 03 · Compétences ---------- */
  competences: {
    titre: "Compétences",
    liste: [
      { nom: "Écoute & remise en question", niveau: 78 },
      { nom: "Trouver des restos stylés", niveau: 82 },
      { nom: "Petites attentions", niveau: 90 },
      { nom: "Plier un drap-housse", niveau: 23 },
      { nom: "Se lever tôt le week-end", niveau: 95 },
    ],
  },

  /* ---------- 04 · Galerie ---------- */
  // type: "photo" ou "video". Pour une vidéo, "poster" (image d'aperçu) est optionnel.
  galerie: {
    titre: "Portfolio",
    intro: "Quelques preuves que j'existe en dehors d'Internet.",
    medias: [
      { type: "photo", src: "assets/photos/1.jpg", legende: "Au sommet, fier de moi" },
      { type: "photo", src: "assets/photos/2.jpg", legende: "Mon plat signature" },
      { type: "video", src: "assets/videos/1.mp4", poster: "", legende: "Moi qui essaie de danser" },
      { type: "photo", src: "assets/photos/3.jpg", legende: "Avec ma bande" },
      { type: "photo", src: "assets/photos/4.jpg", legende: "Lisbonne, 2023" },
      { type: "photo", src: "assets/photos/5.jpg", legende: "Mon chien (il vient avec le pack)" },
    ],
  },

  /* ---------- 05 · Vocaux ---------- */
  vocaux: {
    titre: "Messages vocaux",
    intro: "Parce qu'une voix en dit plus long que mille textos.",
    liste: [
      { src: "assets/audio/vocal-1.mp3", titre: "Pourquoi ce site ?", description: "La petite histoire, en 30 secondes." },
      { src: "assets/audio/vocal-2.mp3", titre: "Mon rire", description: "Attention, il est contagieux." },
      { src: "assets/audio/vocal-3.mp3", titre: "Ma pire blague", description: "Je m'excuse d'avance." },
    ],
  },

  /* ---------- 06 · Qualités & défauts ---------- */
  flags: {
    titre: "En toute transparence",
    qualitesTitre: "Green flags",
    qualites: [
      "Je me souviens des petits détails (j'essaie)",
      "Je sais reconnaître quand j'ai tort",
    ],
    defautsTitre: "Petits défauts",
    defauts: [
      "Je chante pas super super bien",
      "Je m'endors avant la moitié du film",
    ],
  },

  /* ---------- 07 · Profil recherché ---------- */
  recherche: {
    titre: "Profil recherché",
    intro: "Poste à pourvoir immédiatement. CDI envisageable après période d'essai concluante.",
    missions: [
      "Faire les 400 coups ensemble",
      "Partager des aventures",
    ],
    avantages: [
      "Accès illimité à mes sweats et t-shirts",
      "Un partenaire de vie incroyable (en toute modestie)",
      "Massages après les longues journées",
    ],
  },

  /* ---------- 08 · Test de compatibilité ---------- */
  quiz: {
    titre: "Test de compatibilité",
    intro: "5 questions, aucune mauvaise réponse. Enfin… presque.",
    questions: [
      { question: "Ton dimanche idéal ?", reponses: ["Brunch puis balade", "Plaid & série", "Rando au lever du soleil"] },
      { question: "Plutôt…", reponses: ["Mer", "Montagne", "City-trip"] },
      { question: "Pizza ananas ?", reponses: ["Jamais de la vie", "Oui, et j'assume", "Je ne me prononce pas"] },
      { question: "Premier date parfait ?", reponses: ["Rando lever/coucher de soleil", "Café céramique", "Balade dans un musée"] },
      { question: "Chat ou chien ?", reponses: ["Chat 🐱", "Chien 🐶", "Les deux, évidemment"] },
    ],
    resultat: {
      titre: "Compatibilité exceptionnelle",
      message: "Les résultats sont formels : il ne reste plus qu'à vérifier ça :)",
    },
  },

  /* ---------- 09 · Recommandations ---------- */
  temoignages: {
    titre: "Recommandations",
    liste: [
      { texte: "Très bon tuteur, mais nous vanne H24.", auteur: "Ses alternants", role: "Référence pro." },
      { texte: "Le pote qui est toujours présent dans toutes les circonstances.", auteur: "Coco", role: "Meilleur pote" },
      { texte: "Trop chiant, m'embête tout le temps, mais moi aussi, alors on est quittes.", auteur: "Nina", role: "Petite sœur" },
    ],
  },

  /* ---------- Final : la grande question ---------- */
  final: {
    titre: "Alors {pour}, on se voit ?",
    boutonOui: "Oui, avec plaisir 💖",
    boutonNon: "Non",
    // Le bouton « Non » change de texte à chaque tentative… puis abandonne.
    nonTextes: ["T'es sûre ?", "Vraiment ?", "Réfléchis encore…", "Allez…", "Dernière chance !"],
    merci: "Trop bien ! Écris-moi, j'ai hâte 😊",
    contacts: [
      { type: "whatsapp", label: "WhatsApp", url: "https://wa.me/33600000000?text=Oui%20pour%20le%20verre%20%F0%9F%98%8A" },
      { type: "instagram", label: "Instagram", url: "https://instagram.com/ton_pseudo" },
      { type: "sms", label: "SMS", url: "sms:+33600000000" },
      { type: "email", label: "E-mail", url: "mailto:ton.email@exemple.fr" },
    ],
  },

  piedDePage: "Fait avec ❤️ et beaucoup de second degré.",
};
