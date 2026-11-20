// Informations de l'agence. Les valeurs marquées « provisoire » sont à confirmer par le client.
export const site = {
  // Nom provisoire : à remplacer par le nom officiel de l'agence.
  name: "Madagascar Voyages",
  nameIsProvisional: true,
  phoneDisplay: "+261 38 35 174 85",
  phoneTel: "+261383517485",
  // WhatsApp utilise le même numéro au format international, sans le +.
  whatsappNumber: "261383517485",
  email: "tiavinaonja27@gmail.com",
  city: "Antsirabe, Madagascar",
  // Adresse précise et horaires : provisoires.
  address: { fr: "Adresse précise à confirmer — Antsirabe, Madagascar", en: "Exact address to be confirmed — Antsirabe, Madagascar" },
  hours: { fr: "Lun – Ven, 8h – 17h (provisoire)", en: "Mon – Fri, 8am – 5pm (provisional)" },
  mapQuery: "Antsirabe, Madagascar",
};

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${site.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
