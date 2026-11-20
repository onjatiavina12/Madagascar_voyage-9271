import { Compass, Eye, HeartHandshake, ShieldCheck, Target } from "lucide-react";
import { ButtonLink, Photo, Provisional, Section, SectionHeading } from "../components/site/ui";
import { useLang } from "../lib/i18n";
import { PageHero } from "./services";

const values = [
  { icon: Compass, fr: ["Passion du voyage", "Nous aimons faire découvrir Madagascar sous ses vrais visages."], en: ["Passion for travel", "We love showing Madagascar in its true colours."] },
  { icon: Target, fr: ["Connaissance du territoire", "Routes, parcs, guides et saisons : nous connaissons le terrain."], en: ["Knowledge of the territory", "Roads, parks, guides and seasons: we know the ground."] },
  { icon: ShieldCheck, fr: ["Sérieux", "Des engagements clairs, un devis détaillé et une organisation suivie."], en: ["Reliability", "Clear commitments, a detailed quote and a followed organisation."] },
  { icon: HeartHandshake, fr: ["Accompagnement", "Un interlocuteur attentif, de la préparation au retour."], en: ["Support", "An attentive contact, from preparation to return."] },
];

export default function About() {
  const { t } = useLang();
  return (
    <>
      <PageHero
        eyebrow={t({ fr: "À propos", en: "About" })}
        title={t({ fr: "Une agence qui connaît Madagascar de l'intérieur", en: "An agency that knows Madagascar from the inside" })}
        text={t({ fr: "Notre métier : organiser des voyages qui ont du sens, pour les élèves, les étudiants, les entreprises et les voyageurs.", en: "Our job: organise meaningful trips for pupils, students, companies and travellers." })}
      />

      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Photo src="/images/nosy-be.jpg" alt={t({ fr: "Plage de Nosy Be", en: "Nosy Be beach" })} className="aspect-[4/5] w-full rounded-xl shadow-xl lg:aspect-[5/6]" />
          <div>
            <SectionHeading eyebrow={t({ fr: "Notre histoire", en: "Our story" })} title={t({ fr: "Une équipe basée à Antsirabe", en: "A team based in Antsirabe" })} />
            <p className="mt-5 text-lg text-muted">
              {t({
                fr: "Depuis les Hautes Terres, nous organisons des sorties et des circuits à travers l'île. Notre force : la connaissance du terrain et une organisation pensée pour les groupes.",
                en: "From the Highlands, we organise trips and tours across the island. Our strength: knowledge of the ground and organisation designed for groups.",
              })}
            </p>
            <div className="mt-6 flex items-center gap-3">
              <Provisional />
              <span className="text-sm text-muted">{t({ fr: "Date de création et chiffres clés à confirmer.", en: "Founding date and key figures to be confirmed." })}</span>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="sand">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl bg-white p-10 shadow-sm">
            <Target className="size-7 text-ocean" />
            <h2 className="mt-5 text-3xl text-forest">{t({ fr: "Notre mission", en: "Our mission" })}</h2>
            <p className="mt-4 text-muted">
              {t({
                fr: "Rendre les voyages à Madagascar accessibles, sûrs et enrichissants, en particulier pour les établissements qui veulent faire de la sortie un véritable outil pédagogique.",
                en: "Make travel in Madagascar accessible, safe and enriching, especially for institutions that want the trip to be a real teaching tool.",
              })}
            </p>
          </div>
          <div className="rounded-xl bg-forest p-10 text-paper shadow-sm">
            <Eye className="size-7 text-sun" />
            <h2 className="mt-5 text-3xl">{t({ fr: "Notre vision", en: "Our vision" })}</h2>
            <p className="mt-4 text-paper/80">
              {t({
                fr: "Être la référence des voyages d'études et des circuits à Madagascar, par la qualité de l'organisation et le respect des territoires et des communautés.",
                en: "Be the reference for study trips and tours in Madagascar, through quality organisation and respect for territories and communities.",
              })}
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow={t({ fr: "Nos valeurs", en: "Our values" })} title={t({ fr: "Ce qui guide chacun de nos voyages", en: "What guides each of our trips" })} />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <div key={v.fr[0]} className="rounded-xl border border-line bg-white p-7">
              <v.icon className="size-6 text-ocean" />
              <h3 className="mt-4 text-xl text-forest">{t({ fr: v.fr[0], en: v.en[0] })}</h3>
              <p className="mt-2 text-[15px] text-muted">{t({ fr: v.fr[1], en: v.en[1] })}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="forest">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <h2 className="max-w-xl text-3xl md:text-4xl">{t({ fr: "Parlons de votre projet de voyage", en: "Let's talk about your travel project" })}</h2>
          <ButtonLink to="/contact">{t({ fr: "Nous contacter", en: "Contact us" })}</ButtonLink>
        </div>
      </Section>
    </>
  );
}
