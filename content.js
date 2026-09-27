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
  prenom: "Alex",
  // Mot utilisé à la place de {pour} quand le lien n'a pas de ?pour=...
  // Laisse "" pour simplement l'enlever (« Alors, on se voit ? »).
  pourParDefaut: "Cloé",

  /* ---------- Page d'accueil ---------- */
  hero: {
    salut: "À l’attention de Cloé aka 3octobergirl",
    poste: "ton futur amoureux",
    accroche:
      "Plutôt qu'un profil de trois lignes, voici mon dossier complet. Prends ton temps, " +
      "il y a des photos, des vidéos, ma voix… et même un test de compatibilité.",
    photo: "assets/photos/profil.jpg",
    legendePhoto: "moi, en vrai (non retouché)",
    tampon: "Candidat sérieux",
    vocal: { src: "assets/audio/bonjour.mp3", titre: "Écoute ma voix" },
  },

  /* ---------- 01 · Identité ---------- */
  identite: {
    titre: "Fiche d'identité",
    photo: "assets/photos/identite.jpg",
    champs: [
      { label: "Âge", valeur: "29 ans" },
      { label: "Ville", valeur: "Lyon" },
      { label: "Taille", valeur: "1m82 (oui j'ai vérifié)" },
      { label: "Métier", valeur: "Développeur le jour" },
      { label: "Signe", valeur: "Lion ♌ ascendant câlin" },
      { label: "Statut", valeur: "Disponible immédiatement" },
    ],
    aPropos:
      "Je suis curieux, un peu drôle (d'après ma mère) et j'ai une passion sincère pour les " +
      "bons restos, les voyages improvisés et les longues discussions qui finissent à 2h du matin. " +
      "Je cherche quelqu'un avec qui rire, partir en week-end sur un coup de tête et partager des frites.",
    passions: ["🍝 Cuisine", "✈️ Voyages", "🎸 Guitare", "🏃 Course à pied", "🎬 Cinéma", "📚 Romans"],
  },

  /* ---------- 02 · Expériences ---------- */
  experiences: {
    titre: "Expériences de vie",
    liste: [
      {
        poste: "Chef cuisinier du dimanche",
        lieu: "Ma cuisine",
        description: "Spécialiste des pâtes fraîches. Taux de satisfaction des invités : 100 % (ils sont polis).",
      },
      {
        poste: "Explorateur en sac à dos",
        lieu: "Asie du Sud-Est",
        description: "6 mois, 4 pays, 1 seul sac. J'ai appris à négocier, à me perdre et à retrouver mon chemin.",
      },
      {
        poste: "Meilleur ami de mes amis",
        lieu: "Partout",
        description: "Déménagements, ruptures, anniversaires surprises : toujours présent, toujours avec des croissants.",
      },
    ],
  },

  /* ---------- 03 · Compétences ---------- */
  competences: {
    titre: "Compétences",
    liste: [
      { nom: "Carbonara (la vraie, sans crème)", niveau: 95 },
      { nom: "Écoute & conversations profondes", niveau: 88 },
      { nom: "Trouver des restos cachés", niveau: 90 },
      { nom: "Câlins", niveau: 99 },
      { nom: "Plier un drap-housse", niveau: 12 },
      { nom: "Se lever tôt le week-end", niveau: 25 },
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
      "Je réponds aux messages (vraiment)",
      "Je me souviens des petits détails",
      "Je cuisine pour deux sans qu'on me le demande",
      "Je sais dire pardon",
    ],
    defautsTitre: "Petits défauts",
    defauts: [
      "Je chante faux sous la douche",
      "Je pique les frites dans ton assiette",
      "Je regarde « juste un épisode » (jamais un seul)",
    ],
  },

  /* ---------- 07 · Profil recherché ---------- */
  recherche: {
    titre: "Profil recherché",
    intro: "Poste à pourvoir immédiatement. CDI envisageable après période d'essai concluante.",
    missions: [
      "Rire à mes blagues (même les nulles)",
      "Choisir le film quand je n'y arrive pas",
      "Partager des desserts et des aventures",
    ],
    avantages: [
      "Petit-déj au lit le dimanche",
      "Accès illimité à mes sweats",
      "Un partenaire de voyage motivé",
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
      message: "Les résultats sont formels : il ne reste plus qu'à vérifier ça autour d'un verre.",
    },
  },

  /* ---------- 09 · Recommandations ---------- */
  temoignages: {
    titre: "Recommandations",
    liste: [
      { texte: "Il m'appelle tous les dimanches. Et il fait très bien le ménage.", auteur: "Maman", role: "Référence n°1, totalement objective" },
      { texte: "Le pote qui répond présent à 3h du matin. Et qui ramène des pizzas.", auteur: "Thomas", role: "Meilleur ami depuis 15 ans" },
      { texte: "Il m'a appris à faire du vélo. Il m'a aussi fait tomber. On est quittes.", auteur: "Julie", role: "Petite sœur" },
    ],
  },

  /* ---------- Final : la grande question ---------- */
  final: {
    titre: "Alors {pour}, on se voit ?",
    sousTitre: "Entretien d'embauche autour d'un verre, lieu et date à définir ensemble.",
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

  piedDePage: "Fait avec ❤️ et beaucoup trop de café.",
};
