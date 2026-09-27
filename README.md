# 💌 Dossier de candidature — mon CV version cœur

Un site vitrine d'une seule page, pensé pour le téléphone comme pour l'ordinateur,
à envoyer à quelqu'un qui te plaît. Il contient :

- une page d'accueil avec photo polaroid et **message vocal** ;
- une **fiche d'identité** façon carte d'identité, tes passions ;
- tes **expériences de vie** (timeline) et tes **compétences** (barres animées) ;
- une **galerie photos et vidéos** avec visionneuse plein écran (swipe sur mobile) ;
- des **messages vocaux** avec lecteur façon WhatsApp ;
- tes green flags / petits défauts, et une **offre « profil recherché »** ;
- un **test de compatibilité** (le score est toujours flatteur 😉) ;
- des **recommandations** de tes proches ;
- la grande question finale : **« On se voit ? »**, avec un bouton *Non* qui s'enfuit,
  une pluie de cœurs sur *Oui* et tes liens de contact.

Aucun framework, aucune installation : juste des fichiers HTML/CSS/JS.

---

## ✏️ Modifier le contenu

**Tout se passe dans [`content.js`](content.js).** Les textes, les listes, les chemins
des photos/vidéos/vocaux, tes liens de contact. Ouvre-le, change ce qui est entre
guillemets, enregistre. Tu peux le faire directement sur GitHub (icône crayon ✏️).

- **Ajouter un élément** (une photo, une compétence, un vocal…) : copie un bloc `{ ... },`
  et colle-le juste en dessous.
- **Retirer une section** entière : remplace-la par `null`, par exemple `quiz: null,`.
- **Attention aux guillemets et aux virgules** : chaque texte est entre `"…"`, chaque
  élément de liste se termine par une virgule. Si la page devient blanche, c'est
  souvent une virgule oubliée.

## 📸 Ajouter photos, vidéos et vocaux

Dépose tes fichiers dans les dossiers suivants (sur GitHub : *Add file → Upload files*) :

| Type    | Dossier          | Formats conseillés                 |
|---------|------------------|------------------------------------|
| Photos  | `assets/photos/` | `.jpg`, `.webp` (≤ 500 Ko idéalement) |
| Vidéos  | `assets/videos/` | `.mp4` (H.264), courtes, ≤ 20 Mo    |
| Vocaux  | `assets/audio/`  | `.mp3` ou `.m4a`                   |

Puis indique le chemin dans `content.js`, par exemple `src: "assets/photos/plage.jpg"`.

Tant qu'un fichier n'existe pas, le site affiche un joli cadre « Photo à venir » avec
le chemin attendu : tu vois tout de suite ce qu'il reste à ajouter.

> 💡 Un vocal WhatsApp/iPhone s'exporte en `.m4a` ou `.opus`. Le `.m4a` marche partout ;
> pour un `.opus`, convertis-le d'abord en `.mp3`. Évite les noms avec espaces ou accents
> (`ma-blague.mp3` plutôt que `Ma blague.mp3`).

## 💘 Personnaliser le lien

Ajoute `?pour=Prénom` à la fin du lien :

```
https://ton-pseudo.github.io/Perso/?pour=Léa
```

Partout où tu écris `{pour}` dans `content.js` (par exemple la question finale
« Alors {pour}, on se voit ? »), ce prénom est inséré. Sans `?pour=`, c'est la valeur
de `pourParDefaut` qui est utilisée. Si tu vides `hero.salut`, l'accueil affiche
« Léa, ce dossier est pour toi. ».

## 🌍 Mettre le site en ligne (gratuit, avec GitHub Pages)

1. Fusionne cette branche dans `main`.
2. Sur GitHub : **Settings → Pages → Build and deployment → Source : Deploy from a branch**,
   choisis `main` et le dossier `/ (root)`, puis **Save**.
3. Après une minute, ton site est à l'adresse `https://ton-pseudo.github.io/Perso/`.

⚠️ **Si le dépôt est public, tout le monde peut voir son contenu** (photos comprises).
GitHub Pages sur un dépôt privé demande un compte payant ; sinon, des alternatives
gratuites comme Netlify ou Vercel (glisser-déposer du dossier) fonctionnent aussi.

### Aperçu du lien dans WhatsApp / Instagram

Dans [`index.html`](index.html), modifie les balises `og:` en haut du fichier
(titre, description, et l'URL **complète** de la photo d'aperçu). C'est ce qui
s'affiche quand tu envoies le lien.

## 🎨 Changer les couleurs

En haut de [`style.css`](style.css), la section `:root` regroupe les couleurs
(`--rose`, `--paper`, `--night`…) et les polices. Change une valeur, tout le site suit.

## 👀 Tester en local

Ouvre simplement `index.html` dans ton navigateur, ou lance un petit serveur :

```bash
python3 -m http.server 8000
# puis http://localhost:8000/?pour=Léa
```
