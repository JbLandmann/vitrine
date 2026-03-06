# PLAN.md — Correction du scroll GSAP

> Plan d'implémentation pour unifier les animations de scroll.
> Statut : TERMINÉ
> Dernière mise à jour : 2026-03-05

---

## Objectif

Unifier les deux systèmes d'animation scroll (StickySections fold-away + Projets pin interne) en un seul système cohérent orchestré par `StickySections`, sans perte de fonctionnalité.

---

## Décisions prises

| # | Décision | Choix |
|---|----------|-------|
| D1 | Animation cartes Projets | Animation d'apparition (stagger), pas de slide horizontal |
| D2 | Smooth scroll global | Oui — utiliser GSAP `ScrollSmoother` si disponible, sinon Lenis |
| D3 | Navbar height | Garder hardcodée (`navbarHeight = 100`) |
| D4 | Dépendance gsap | Garder implicite via `@gsap/react` |
| D5 | Valeurs de scroll (end: +=130%, etc.) | Garder telles quelles |

---

## Problèmes à corriger

| # | Problème | Fichier | Statut |
|---|----------|---------|--------|
| 1 | `pinSpacing` mismatch (`false` vs `true`) | StickySections.jsx / Projets.jsx | ✅ |
| 2 | Pas de transition fold-away Projets → Contact | StickySections.jsx:38 | ✅ |
| 3 | Double-pin collision sur Projets | Projets.jsx:56-62 | ✅ |
| 4 | NavItem n'appelle jamais onClick/onNavigate | NavItem.jsx:4-6 | ✅ |
| 5 | `markers: true` en production | StickySections.jsx:61 | ✅ |
| 6 | `gsap` utilisé sans import (NavItem, App) | NavItem.jsx:4, App.jsx:11 | ✅ |

---

## Steps d'implémentation

### Step 1 — CONTEXT.md ✅
Créer le fichier de contexte du projet.

### Step 2 — PLAN.md ✅
Ce fichier.

### Step 3 — Vérifier disponibilité ScrollSmoother ✅
- `ScrollSmoother.js` et `ScrollToPlugin.js` présents dans `node_modules/gsap`
- Disponibles via `import { ScrollSmoother } from 'gsap/ScrollSmoother'`
- Intégrés dans StickySections.jsx

### Step 4 — Refactorer StickySections.jsx ✅

**Changements :**
- Supprimer le skip `data-scroll-animation` — toutes les sections passent par la boucle
- Pour chaque section (sauf la dernière), créer :
  - Un `ScrollTrigger` de pin avec `pinSpacing: false`
  - L'animation fold-away (rotateX + z + y + opacity)
- Pour la section Projets spécifiquement, ajouter une sub-timeline qui anime :
  - Le titre (fade-in)
  - Les cartes : apparition staggerée (scale + opacity + translateY)
- Le pin de Projets utilise `end: +=130%` desktop, `end: +=${cards*60}%` mobile
- Supprimer `markers: true`
- Supprimer les `console.log` de debug

**Architecture cible :**
```
StickySections
├─ Presentation (pinned, pinSpacing: false)
│   → fold-away quand Projets entre
├─ Projets (pinned, pinSpacing: false, end: +=130%)
│   → sub-timeline : titre fade-in + cartes apparition staggered
│   → fold-away quand Contact entre
└─ Contact (dernière section, pas de fold-away)
```

### Step 5 — Simplifier Projets.jsx ✅
- Supprimer tout le `useEffect` ScrollTrigger
- Supprimer la prop `enableScrollAnimation`
- Garde la data des projets et le rendu JSX

### Step 6 — Simplifier Section.jsx ✅
- Supprimer la prop `enableScrollAnimation`
- Supprimer l'attribut `data-scroll-animation`

### Step 7 — Corriger NavItem.jsx ✅
- Importer `gsap` et `ScrollTrigger`
- Appeler `onClick()` passé en prop
- `e.preventDefault()` pour éviter le scroll natif

### Step 8 — Corriger App.jsx ✅
- Importer `gsap`, `ScrollTrigger`, `ScrollToPlugin`
- Utiliser `gsap.to(window, { scrollTo: section })` au lieu de `scrollIntoView`

### Step 9 — Nettoyage CSS ✅
- Section.css : retirer `animation: fadeInUp` (conflit GSAP)
- Section.css : retirer les styles commentés
- index.css : retirer `scroll-behavior: smooth` (conflit avec GSAP scroll)

### Step 10 — Test build ✅
- `npm run build` → ✓ 49 modules, 0 erreurs, built in 2.09s

---

## Vérification finale

- [ ] Transitions scroll : Presentation → Projets → Contact (desktop)
- [ ] Transitions scroll : Presentation → Projets → Contact (mobile)
- [ ] Fold-away Presentation ET Projets
- [ ] Animation apparition cartes Projets (stagger)
- [ ] Navigation Navbar → scrolle vers la bonne position
- [ ] Pas de markers debug visibles
- [ ] Pas de console.log debug
- [ ] Resize desktop ↔ mobile (ScrollTrigger.refresh)
- [ ] Formulaire Contact fonctionnel
- [ ] Build sans erreur
