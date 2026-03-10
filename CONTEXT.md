# CONTEXT.md — Vitrine Portfolio

> Ce fichier documente l'architecture, les conventions et les points d'attention du projet.
> Dernière mise à jour : 2026-03-05

---

## Vue d'ensemble

Site vitrine / portfolio pour **Canopérenne**, construit en **React 18 + Vite 6**.
Le site est une single-page avec 3 sections plein écran empilées, animées au scroll via **GSAP ScrollTrigger**.
Déploiement sur GitHub Pages via `gh-pages`.

---

## Stack technique

| Outil          | Version   | Rôle                                   |
|----------------|-----------|----------------------------------------|
| React          | ^18.2.0   | UI                                     |
| Vite           | ^6.4.1    | Bundler / dev server                   |
| GSAP           | (via @gsap/react ^2.1.2) | Animations scroll       |
| Web3Forms      | API       | Envoi de formulaire contact            |
| gh-pages       | ^6.3.0    | Déploiement                            |

> **Note** : `@emailjs/browser` est listé dans package.json mais **non utilisé** (Contact.jsx utilise Web3Forms).

---

## Architecture des composants

```
App.jsx                         ← State activeSection, scrollToSection()
├── Navbar                      ← Navigation fixe (3 items)
│   └── NavItem                 ← Lien ancre vers chaque section
└── StickySections              ← Container principal, orchestre TOUT le scroll
    ├── Presentation            ← Offres / pricing (wrappé dans Section)
    ├── Projets                 ← Cartes projets (wrappé dans Section)
    │   └── ProjectCard         ← Carte individuelle
    └── Contact                 ← Formulaire (wrappé dans Section)
```

### Composant `Section` (wrapper générique)

Rendu : `<section class="section"> → <div class="section-content"> → {children}`

Chaque section reçoit un `id` utilisé pour la navigation et le tracking de section active.

---

## Système d'animation scroll (GSAP)

### Principe : "Card-Stack Fold-Away" orchestré par StickySections

Toutes les animations scroll sont centralisées dans **StickySections.jsx**.
Les sections sont empilées en plein écran. En scrollant :

1. **Presentation** est pinnée → se plie (fold-away 3D) quand Projets arrive
2. **Projets** est pinnée → animation interne (titre + apparition des cartes stagger) → se plie quand Contact arrive
3. **Contact** est la dernière section, pas de fold-away

| Section       | Animation                                    | Orchestrateur     |
|---------------|----------------------------------------------|--------------------|
| Presentation  | Fold-away (rotateX + z + y) + opacity overlay| StickySections     |
| Projets       | Pin + titre fade-in + cartes apparition      | StickySections     |
| Contact       | Dernière section (pas de fold-away)          | StickySections     |

### Conventions GSAP

- `pinSpacing: false` partout (cohérent card-stack)
- Pas de `markers: true` en production
- IDs de ScrollTrigger explicites pour le cleanup (`section-0`, `section-1`, `projets-internal`)
- `ScrollTrigger.matchMedia()` pour gérer desktop vs mobile
- Cleanup complet dans le return du useEffect

---

## Fichiers clés et responsabilités

| Fichier                            | Rôle                                              |
|------------------------------------|----------------------------------------------------|
| `src/App.jsx`                      | State global, navigation (gsap.to + scrollTo)      |
| `src/App.css`                      | Reset CSS, variable `--navbar-height`              |
| `src/styles/index.css`             | Reset + variables CSS globales                     |
| `src/components/StickySections/`   | Orchestrateur unique de toutes les animations scroll|
| `src/components/Section/`          | Wrapper générique (structure DOM pour animations)  |
| `src/components/Projets/`          | Section projets — composant purement visuel        |
| `src/components/Presentation/`     | Section offres — composant purement visuel         |
| `src/components/Contact/`          | Formulaire Web3Forms                               |
| `src/components/Navbar/`           | Navigation fixe + items                            |

---

## Variables CSS importantes

- `--navbar-height` : 100px (desktop), 80px (mobile) — définie dans App.css
- `navbarHeight = 100` hardcodé en JS dans Projets.jsx (décision : garder hardcodé)

---

## Déploiement

- `base: '/vitrine/'` dans vite.config.js
- `npm run deploy` → build + gh-pages
- Homepage : `https://trabifou.github.io/vitrine`

---

## Conventions à respecter

- Composants React en `.jsx`, CSS co-localisé par composant
- Pas de TypeScript
- Pas de state management externe (useState local)
- **Animations GSAP centralisées dans StickySections** (les composants enfants sont purement visuels)
- Mobile-first responsive avec breakpoint principal à 768px
- Pas de console.log de debug en production
