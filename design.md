# Madagascar Voyages — Design

Site vitrine bilingue (FR/EN) pour une agence de voyages à Madagascar : voyages d'études, excursions scolaires et universitaires, circuits touristiques, voyages d'entreprise, voyages sur mesure. Web only (responsive ordinateur, tablette, smartphone). Job: en 10 secondes le visiteur comprend qui, quoi, où, pourquoi confiance, comment demander un devis.

## Direction

- Immersif mais épuré : grandes photos plein cadre, blocs de texte courts, beaucoup d'air.
- Chaleureux et naturel : vert forêt dominant, bleu océan en accent, sable/orange en touches.
- Cartes aux coins légèrement arrondis (12px), ombres discrètes.
- Mouvement : révélation douce au scroll (fade + translate 12px), transitions 300ms. Pas d'animations gratuites.
- Éviter : dégradés violets, grilles de cartes génériques sans image, emojis.

## Colors (CSS variables in `packages/web/src/web/styles.css`)

| Token | Hex | Use |
|-------|-----|-----|
| forest | #1F3D2B | Titres, header sur fond clair, footer |
| ocean | #0E5A7A | Liens, boutons secondaires, badges |
| sand | #F4EBDD | Fonds de sections alternées |
| paper | #FBF8F2 | Fond principal (blanc cassé) |
| sun | #E9A23B | Bouton principal CTA, petits accents |
| ember | #C8612B | Survol / états d'alerte doux |
| ink | #1E2420 | Texte principal |
| muted | #5E6B63 | Texte secondaire |
| line | #E4DDCF | Filets, bordures |

## Typography

- Display: **Fraunces** (serif, 600) — titres.
- Body/UI: **Manrope** (400/500/600) — texte, boutons, navigation.
- Échelle : H1 56–72px, H2 36–44px, H3 22px, corps 17px, line-height 1.6.

## Layout

- Conteneur max 1200px, padding latéral 20px mobile / 32px desktop.
- Sections : padding vertical 96px desktop, 64px mobile.
- Hero plein écran (min 88vh) avec overlay forest → transparent.

## Components

- Header sticky, fond paper translucide, logo texte à gauche, liens, sélecteur FR/EN, bouton « Demander un devis ». Menu burger < 960px.
- Bouton WhatsApp flottant (vert WhatsApp #25D366 uniquement pour ce bouton).
- Cartes destination : photo 4:5, titre, description, activités (tags), bouton « Découvrir ».
- Filtres : pills par catégorie (Tous, Voyages d'études, Nature, Culture, Mer).
- Formulaire devis : sections regroupées, validation côté client, confirmation après envoi.
- Placeholder de contenu provisoire : badge « Provisoire » ouvert en ambre.

## Pages

- `/` Accueil — hero, services en bref, destinations phares, voyages d'études, avantages, témoignages (provisoires), CTA final.
- `/services` Nos services — 5 cartes détaillées.
- `/destinations` Destinations — galerie filtrable, 8 destinations.
- `/voyages-etudes` Voyages d'études — objectifs, programme type sur plusieurs jours, organisation, personnalisation.
- `/a-propos` À propos — mission, vision, valeurs.
- `/contact` Contact — coordonnées, WhatsApp, horaires, formulaire de devis.

## Content rules

- Pas de faux nom d'agence, faux avis, ou fausses certifications. Éléments non confirmés marqués « Provisoire ».
- Le formulaire enregistre la demande en base (table `quote_requests`). Aucun faux système de réservation.

## Architecture

- Bilingue : `useLang()` (contexte) + helper `bi({fr, en})`. Langue sauvegardée dans localStorage.
- Données : `src/web/data/*.ts`. Pas de CMS.
- API : oRPC `quote.submit` (`src/api/routes/quote.ts`) validé avec zod, persisté via drizzle.
