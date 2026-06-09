# Guide de Style & Directives d'Intégration (Névé Rando)

Ce document rassemble les règles de style et les bonnes pratiques à respecter pour toute modification ou ajout sur la landing page et l'application **Névé**.

---

## 1. Système de Couleurs & Variables de Thème

Toutes les couleurs de l'application sont déclarées de manière centralisée dans le fichier [globals.css](file:///Users/maudii/Desktop/WM3/startup/landing-rando/src/app/globals.css) sous la directive `@theme` de Tailwind. **Il est strictement interdit d'utiliser des variables de marque personnalisées ("brand") ou d'écrire des codes hexadécimaux en dur dans les classes HTML/JSX.**

### Palette de Couleurs Standard (Primary Scale)
Vous devez utiliser exclusivement la palette de couleur primaire (`primary-50` à `primary-950`) pour représenter l'identité verte de Névé :
*   `primary-50` (`#F4F8ED`) : Teintes légères de fond, fond de transition de carte.
*   `primary-600` (`#62893D`) : Couleur verte principale pour les boutons d'action (CTA), les en-têtes secondaires, le texte mis en valeur et les icônes.
*   `primary-700` (`#445E2D`) : État de survol des boutons primaires.
*   `primary-900` (`#324225`) : Couleur de fond ou textuelle pour les cartes et sections sombres.

### Autres Accents standard
*   **Orange (Accents, Tracés GPS, Étoiles de note)** : Utiliser la palette de couleur par défaut de Tailwind **`amber-500`** (`#f59e0b`).
*   **Neutres (Fonds, Bordures, Textes secondaires)** : Utiliser la palette de couleur par défaut de Tailwind **`neutral-50`** à **`neutral-950`**.

### Exemples d'application :
*   **Mauvais** : `<button className="bg-brand-green hover:bg-brand-green-hover text-white">` ou `bg-[#508235]`
*   **Bon** : `<button className="bg-primary-600 hover:bg-primary-700 text-white">`
*   **Dans du CSS en ligne (style attribute)** :
    *   Utiliser la variable CSS correspondante : `var(--color-neutral-50)` ou `var(--color-primary-600)`.

---

## 2. Accessibilité & Contrastes du Texte sur Image

Lorsque du texte est superposé sur des images d'arrière-plan (comme dans le Hero ou le Footer), sa lisibilité doit être garantie à 100% sur tous les écrans.

### Règles d'accessibilité :
1.  **Ombres Portées (Text Shadow)** :
    *   Toujours appliquer un `textShadow` prononcé via l'attribut `style` sur les titres et paragraphes blancs superposés sur une image.
    *   *Titre principal* : `style={{ textShadow: '0 2px 14px rgba(0,0,0,0.75), 0 1px 3px rgba(0,0,0,0.9)' }}`
    *   *Description/Paragraphe* : `style={{ textShadow: '0 1px 8px rgba(0,0,0,0.7), 0 1px 2px rgba(0,0,0,0.9)' }}`
2.  **Filtres de Contraste (Overlay Gradients)** :
    *   Placer un calque dégradé sombre (`linear-gradient(to top, rgba(9, 9, 11, 0.95), rgba(9, 9, 11, 0.25))`) au-dessus de l'image de fond pour obscurcir l'image derrière le texte sans gâcher le visuel.

---

## 3. Transitions de Sections Immersives (Fading effect)

Pour intégrer un arrière-plan visuel (comme la forêt ou la montagne dans le footer) de manière continue avec le reste de la page, suivez le protocole suivant :

1.  **Retrait des Frontières** : Supprimer toute classe `border-b` ou `border-t` sur la section adjacente (ex: `#instagram`).
2.  **Top-Down Fade** : Le conteneur parent doit avoir une couleur de fond identique à la section précédente (ex: `bg-neutral-50`).
3.  **Dégradé Supérieur (Mist Overlay)** : Appliquer un dégradé allant de la couleur de fond de page opaque (`var(--color-neutral-50)`) sur les premiers 15% à 20% de hauteur, puis transitionner rapidement vers la transparence complète (0%) aux alentours de 35% à 45% de hauteur. Cela crée l'effet que le paysage émerge naturellement d'une nappe de brume intégrée dans la page.

---

## 4. Règles de Structure Visuelle (Footer & Hero)

*   **Footer CTA** : La hauteur doit rester compacte et équilibrée (`min-h-[540px] md:min-h-[600px]`). Le texte doit être aligné en bas du flux principal (`justify-end flex-1 pb-6 mt-12`) pour se superposer sur la partie sombre de l'image de fond.
*   **Boutons d'action** : Toujours utiliser le style arrondi complet (`rounded-full`), les lettres majuscules (`uppercase`), le grand espacement des lettres (`tracking-widest`) et des transitions douces de transformation (`transition-all duration-300 hover:scale-[1.02] active:scale-98`).

---

## 5. Directives Générales d'Accessibilité Web (A11y)

Le respect des normes d'accessibilité (WCAG / RGAA) est obligatoire sur tout le site. Assurez-vous de valider les points suivants lors de chaque développement :

### Contrastes & Texte
*   **Ratio de Contraste** : Le texte standard doit respecter un ratio minimal de **4.5:1** contre son arrière-plan (et **3:1** pour le grand texte). 
*   **Texte sur Image** : Ne jamais poser de texte de couleur claire sur une image sans calque d'assombrissement ou sans ombres portées (`text-shadow`) pour prévenir la perte d'accessibilité en cas de chargement partiel ou de redimensionnement de l'image.

### Navigation au Clavier & États
*   **Focus Visible** : Tous les éléments interactifs (liens, boutons, champs) doivent avoir un indicateur de focus bien visible au clavier. Utiliser des classes comme `focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:outline-none`.
*   **Cibles Tactiles (Tap Targets)** : Tous les boutons cliquables et liens doivent avoir une surface active minimale de **44x44 pixels** (ou padding suffisant, par exemple `py-3 px-6`) pour faciliter l'usage sur les écrans tactiles.

### Sémantique & Lecteurs d'Écran
*   **Balises Sémantiques** : Utiliser les balises appropriées (`<section>`, `<nav>`, `<main>`, `<footer>`, `<header>`) au lieu de simples `<div>` pour permettre aux outils d'assistance de cartographier la page.
*   **Textes Alternatifs** : Toutes les images doivent posséder un attribut `alt` décrivant le contenu de l'image. Si l'image est purement décorative, utiliser `alt=""`.
*   **Attributs ARIA** : Utiliser les attributs ARIA pour les composants dynamiques (ex: `aria-expanded="true/false"` sur les boutons de l'accordéon de la FAQ, `aria-label` sur les icônes cliquables sans texte visible).

