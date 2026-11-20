import type { Bi } from "../lib/i18n";

export interface Destination {
  slug: string;
  name: string;
  region: Bi;
  image: string | null;
  tags: ("etudes" | "nature" | "culture" | "mer")[];
  description: Bi;
  activities: Bi[];
}

export const categories = [
  { key: "all", label: { fr: "Tous", en: "All" } },
  { key: "etudes", label: { fr: "Voyages d'études", en: "Study trips" } },
  { key: "nature", label: { fr: "Nature", en: "Nature" } },
  { key: "culture", label: { fr: "Culture", en: "Culture" } },
  { key: "mer", label: { fr: "Mer", en: "Sea" } },
] as const;

export const destinations: Destination[] = [
  {
    slug: "antsirabe",
    name: "Antsirabe",
    region: { fr: "Hautes Terres centrales", en: "Central Highlands" },
    image: "/images/antsirabe.jpg",
    tags: ["culture", "nature"],
    description: {
      fr: "Ville thermale au cœur des Hautes Terres, réputée pour ses lacs de cratère et son artisanat.",
      en: "A spa town in the Highlands, known for its crater lakes and craftsmanship.",
    },
    activities: [
      { fr: "Visite des lacs de cratère", en: "Crater lake visits" },
      { fr: "Atelier artisanat", en: "Craft workshop" },
      { fr: "Découverte de la ville et du marché", en: "City and market tour" },
    ],
  },
  {
    slug: "andasibe",
    name: "Andasibe",
    region: { fr: "Est, Parc national de Mantadia", en: "East, Mantadia National Park" },
    image: "/images/lemur.jpg",
    tags: ["etudes", "nature"],
    description: {
      fr: "Une des meilleures portes d'entrée pour observer les lémuriens et la biodiversité de la forêt tropicale.",
      en: "One of the best places to observe lemurs and rainforest biodiversity.",
    },
    activities: [
      { fr: "Observation des indris", en: "Indri lemur watching" },
      { fr: "Randonnée guidée en forêt", en: "Guided forest walk" },
      { fr: "Initiation à l'écologie", en: "Introduction to ecology" },
    ],
  },
  {
    slug: "morondava",
    name: "Morondava",
    region: { fr: "Ouest", en: "West" },
    image: "/images/baobab.jpg",
    tags: ["nature", "culture"],
    description: {
      fr: "L'avenue des Baobabs, l'un des paysages les plus emblématiques de l'île, au coucher du soleil.",
      en: "The Avenue of the Baobabs, one of the island's most iconic landscapes, at sunset.",
    },
    activities: [
      { fr: "Avenue des Baobabs au lever ou coucher du soleil", en: "Avenue of the Baobabs at sunrise or sunset" },
      { fr: "Visite des tombeaux vezo", en: "Visit to the Vezo tombs" },
    ],
  },
  {
    slug: "nosy-be",
    name: "Nosy Be",
    region: { fr: "Nord-Ouest", en: "North-West" },
    image: "/images/nosy-be.jpg",
    tags: ["mer", "nature"],
    description: {
      fr: "Plages de sable blanc, eaux turquoise et îles voisines : l'archipel idéal pour la détente et la découverte marine.",
      en: "White sand beaches, turquoise waters and nearby islands: an ideal archipelago for relaxation and marine discovery.",
    },
    activities: [
      { fr: "Excursions en bateau vers les îles", en: "Boat trips to the islands" },
      { fr: "Observation de la biodiversité marine", en: "Marine biodiversity observation" },
      { fr: "Visite de plantations d'ylang-ylang", en: "Ylang-ylang plantation visit" },
    ],
  },
  {
    slug: "isalo",
    name: "Isalo",
    region: { fr: "Sud", en: "South" },
    image: "/images/isalo.jpg",
    tags: ["nature", "etudes"],
    description: {
      fr: "Canyons de grès, piscines naturelles et randonnées spectaculaires dans le parc national de l'Isalo.",
      en: "Sandstone canyons, natural pools and spectacular hikes in Isalo National Park.",
    },
    activities: [
      { fr: "Randonnées dans les canyons", en: "Canyon hikes" },
      { fr: "Observation de la flore endémique", en: "Endemic flora observation" },
      { fr: "Bivouac et couchers de soleil", en: "Camping and sunsets" },
    ],
  },
  {
    slug: "ranomafana",
    name: "Ranomafana",
    region: { fr: "Hautes Terres du Sud-Est", en: "South-East Highlands" },
    image: "/images/ranomafana.jpg",
    tags: ["etudes", "nature"],
    description: {
      fr: "Forêt tropicale de montagne, référence mondiale pour la recherche sur la biodiversité et les lémuriens.",
      en: "Montane rainforest, a world reference for biodiversity research and lemurs.",
    },
    activities: [
      { fr: "Recherche de lémuriens nocturnes", en: "Nocturnal lemur search" },
      { fr: "Visite d'une station de recherche", en: "Research station visit" },
      { fr: "Randonnée et sources chaudes", en: "Hiking and hot springs" },
    ],
  },
  {
    slug: "sainte-marie",
    name: "Sainte-Marie",
    region: { fr: "Est, Île Sainte-Marie", en: "East, Sainte-Marie Island" },
    image: "/images/sainte-marie.jpg",
    tags: ["mer", "culture"],
    description: {
      fr: "Histoire maritime, baleines à bosse en saison et lagons paisibles : une île à part, riche en histoire.",
      en: "Maritime history, humpback whales in season and calm lagoons: a unique island rich in history.",
    },
    activities: [
      { fr: "Observation des baleines à bosse (saison)", en: "Humpback whale watching (season)" },
      { fr: "Visite du cimetière des pirates", en: "Visit to the pirates' cemetery" },
      { fr: "Plongée et snorkeling", en: "Diving and snorkeling" },
    ],
  },
  {
    slug: "tsingy",
    name: "Tsingy de Bemaraha",
    region: { fr: "Ouest", en: "West" },
    image: "/images/tsingy.jpg",
    tags: ["nature", "etudes"],
    description: {
      fr: "Formations calcaires acérées classées au patrimoine mondial de l'UNESCO, un terrain exceptionnel pour la géologie.",
      en: "Sharp limestone formations listed as a UNESCO World Heritage Site, an exceptional ground for geology.",
    },
    activities: [
      { fr: "Parcours en passerelles et échelles", en: "Walkways and ladders trail" },
      { fr: "Initiation à la géologie karstique", en: "Introduction to karst geology" },
      { fr: "Observation des grottes et forêts sèches", en: "Caves and dry forest observation" },
    ],
  },
];
