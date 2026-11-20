import { useState } from "react";
import { useForm } from "react-hook-form";
import { Clock, Mail, MapPin, MessageCircle, Phone, CheckCircle2 } from "lucide-react";
import { ButtonLink, Container, Provisional, Section } from "../components/site/ui";
import { PageHero } from "./services";
import { useLang } from "../lib/i18n";
import { site, whatsappLink } from "../lib/site";
import { destinations } from "../data/content";
import { useSubmitQuote } from "../queries/quote";
import { cn } from "../lib/utils";

interface FormValues {
  fullName: string;
  organization: string;
  email: string;
  phone: string;
  tripType: string;
  destination: string;
  participants: number | "";
  travelDate: string;
  duration: string;
  budget: string;
  message: string;
}

const tripTypes = [
  { value: "etudes", fr: "Voyage d'études", en: "Study trip" },
  { value: "excursion", fr: "Excursion scolaire ou universitaire", en: "School or university excursion" },
  { value: "circuit", fr: "Circuit touristique", en: "Guided tour" },
  { value: "entreprise", fr: "Voyage d'entreprise", en: "Corporate travel" },
  { value: "sur-mesure", fr: "Voyage sur mesure", en: "Tailor-made trip" },
];

const inputCls =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-[15px] text-ink placeholder:text-muted/70 focus:border-ocean focus:outline-none focus:ring-4 focus:ring-ocean/15";
const labelCls = "mb-1.5 block text-sm font-semibold text-forest";

export default function Contact() {
  const { t, lang } = useLang();
  const [params] = useState(() => new URLSearchParams(window.location.search));
  const presetDestination = params.get("destination") ?? "";
  const presetType = params.get("type") ?? "";
  const destinationOptions = destinations.map((d) => ({ value: d.slug, label: d.name }));
  const presetDestinationValid = destinationOptions.some((d) => d.value === presetDestination)
    ? presetDestination
    : "";
  const presetTypeValid = tripTypes.some((x) => x.value === presetType) ? presetType : "";

  const submit = useSubmitQuote();
  const [sent, setSent] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      fullName: "",
      organization: "",
      email: "",
      phone: "",
      tripType: presetTypeValid,
      destination: presetDestinationValid,
      participants: "",
      travelDate: "",
      duration: "",
      budget: "",
      message: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setServerError(null);
    try {
      await submit.mutateAsync({
        ...values,
        participants: values.participants === "" ? undefined : Number(values.participants),
        locale: lang,
      });
      setSent(true);
      reset();
    } catch {
      setServerError(
        t({
          fr: "L'envoi a échoué. Réessayez ou écrivez-nous sur WhatsApp.",
          en: "Sending failed. Please try again or message us on WhatsApp.",
        }),
      );
    }
  };

  const err = (msg?: string) => (msg ? <p className="mt-1 text-sm text-ember">{msg}</p> : null);
  const required = t({ fr: "Champ obligatoire", en: "Required field" });

  return (
    <>
      <PageHero
        eyebrow={t({ fr: "Contact", en: "Contact" })}
        title={t({ fr: "Parlons de votre prochain voyage", en: "Let's talk about your next trip" })}
        text={t({
          fr: "Décrivez votre projet : nous revenons vers vous avec une proposition adaptée.",
          en: "Describe your project and we will come back to you with a tailored proposal.",
        })}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          {/* Coordonnées */}
          <div>
            <h2 className="text-3xl text-forest">{t({ fr: "Nos coordonnées", en: "Contact details" })}</h2>
            <ul className="mt-8 space-y-5">
              <li className="flex gap-4">
                <Phone className="mt-1 size-5 shrink-0 text-ocean" />
                <div>
                  <p className="font-semibold text-forest">{t({ fr: "Téléphone", en: "Phone" })}</p>
                  <a href={`tel:${site.phoneTel}`} className="text-muted hover:text-forest">
                    {site.phoneDisplay}
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <Mail className="mt-1 size-5 shrink-0 text-ocean" />
                <div>
                  <p className="font-semibold text-forest">Email</p>
                  <a href={`mailto:${site.email}`} className="break-all text-muted hover:text-forest">
                    {site.email}
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <MapPin className="mt-1 size-5 shrink-0 text-ocean" />
                <div>
                  <p className="font-semibold text-forest">{t({ fr: "Adresse", en: "Address" })}</p>
                  <p className="text-muted">{t(site.address)}</p>
                  <Provisional className="mt-1" />
                </div>
              </li>
              <li className="flex gap-4">
                <Clock className="mt-1 size-5 shrink-0 text-ocean" />
                <div>
                  <p className="font-semibold text-forest">{t({ fr: "Horaires", en: "Hours" })}</p>
                  <p className="text-muted">{t(site.hours)}</p>
                </div>
              </li>
            </ul>

            <a
              href={whatsappLink(
                t({
                  fr: "Bonjour, je souhaite demander un devis.",
                  en: "Hello, I would like to request a quote.",
                }),
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#1ebe5a]"
            >
              <MessageCircle className="size-5" />
              WhatsApp
            </a>

            <div className="mt-10 overflow-hidden rounded-2xl border border-line">
              <iframe
                title={t({ fr: "Carte : Antsirabe", en: "Map: Antsirabe" })}
                src={`https://www.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&output=embed`}
                className="h-72 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Formulaire */}
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-line md:p-10">
            {sent ? (
              <div className="flex flex-col items-start gap-4 py-10">
                <CheckCircle2 className="size-12 text-ocean" />
                <h2 className="text-3xl text-forest">{t({ fr: "Merci, votre demande est envoyée", en: "Thank you, your request has been sent" })}</h2>
                <p className="text-muted">
                  {t({
                    fr: "Nous revenons vers vous rapidement à l'adresse indiquée.",
                    en: "We will get back to you soon at the address you provided.",
                  })}
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="text-sm font-semibold text-ocean underline underline-offset-4"
                >
                  {t({ fr: "Envoyer une autre demande", en: "Send another request" })}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
                <div>
                  <h2 className="text-3xl text-forest">{t({ fr: "Demande de devis", en: "Quote request" })}</h2>
                  <p className="mt-2 text-sm text-muted">
                    {t({ fr: "Les champs marqués * sont obligatoires.", en: "Fields marked * are required." })}
                  </p>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className={labelCls} htmlFor="fullName">{t({ fr: "Nom complet *", en: "Full name *" })}</label>
                    <input
                      id="fullName"
                      className={inputCls}
                      autoComplete="name"
                      {...register("fullName", { required: required, minLength: { value: 2, message: required } })}
                    />
                    {err(errors.fullName?.message)}
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="organization">{t({ fr: "Établissement / entreprise", en: "Organisation" })}</label>
                    <input id="organization" className={inputCls} {...register("organization")} />
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="email">Email *</label>
                    <input
                      id="email"
                      type="email"
                      className={inputCls}
                      autoComplete="email"
                      {...register("email", {
                        required: required,
                        pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: t({ fr: "Email invalide", en: "Invalid email" }) },
                      })}
                    />
                    {err(errors.email?.message)}
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="phone">{t({ fr: "Téléphone *", en: "Phone *" })}</label>
                    <input
                      id="phone"
                      type="tel"
                      className={inputCls}
                      autoComplete="tel"
                      {...register("phone", { required: required, minLength: { value: 6, message: required } })}
                    />
                    {err(errors.phone?.message)}
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="tripType">{t({ fr: "Type de voyage *", en: "Trip type *" })}</label>
                    <select id="tripType" className={inputCls} {...register("tripType", { required: required })}>
                      <option value="">{t({ fr: "Choisir…", en: "Choose…" })}</option>
                      {tripTypes.map((x) => (
                        <option key={x.value} value={x.value}>{t(x)}</option>
                      ))}
                    </select>
                    {err(errors.tripType?.message)}
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="destination">{t({ fr: "Destination souhaitée", en: "Preferred destination" })}</label>
                    <select id="destination" className={inputCls} {...register("destination")}>
                      <option value="">{t({ fr: "Pas encore décidé", en: "Not decided yet" })}</option>
                      {destinationOptions.map((d) => (
                        <option key={d.value} value={d.value}>{d.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="participants">{t({ fr: "Nombre de participants", en: "Number of participants" })}</label>
                    <input
                      id="participants"
                      type="number"
                      min={1}
                      className={inputCls}
                      {...register("participants", { min: 1, valueAsNumber: false })}
                    />
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="travelDate">{t({ fr: "Date souhaitée", en: "Preferred date" })}</label>
                    <input id="travelDate" type="date" className={inputCls} {...register("travelDate")} />
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="duration">{t({ fr: "Durée", en: "Duration" })}</label>
                    <input
                      id="duration"
                      className={inputCls}
                      placeholder={t({ fr: "ex. 4 jours", en: "e.g. 4 days" })}
                      {...register("duration")}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className={labelCls} htmlFor="budget">{t({ fr: "Budget indicatif", en: "Indicative budget" })}</label>
                    <input
                      id="budget"
                      className={inputCls}
                      placeholder={t({ fr: "Facultatif", en: "Optional" })}
                      {...register("budget")}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelCls} htmlFor="message">{t({ fr: "Votre projet *", en: "Your project *" })}</label>
                  <textarea
                    id="message"
                    rows={5}
                    className={cn(inputCls, "resize-y")}
                    placeholder={t({
                      fr: "Objectifs, niveau des participants, centres d'intérêt…",
                      en: "Goals, participants' level, interests…",
                    })}
                    {...register("message", {
                      required: required,
                      minLength: { value: 10, message: t({ fr: "Merci de détailler un peu plus votre projet", en: "Please describe your project in a bit more detail" }) },
                    })}
                  />
                  {err(errors.message?.message)}
                </div>

                {serverError && (
                  <p role="alert" className="rounded-xl bg-ember/10 px-4 py-3 text-sm text-ember">{serverError}</p>
                )}

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-muted">
                    {t({
                      fr: "Vos données servent uniquement à répondre à votre demande.",
                      en: "Your details are only used to answer your request.",
                    })}
                  </p>
                  <button
                    type="submit"
                    disabled={submit.isPending}
                    className="inline-flex items-center justify-center rounded-full bg-sun px-7 py-3 font-semibold text-forest transition-colors hover:bg-[#f0b155] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {submit.isPending
                      ? t({ fr: "Envoi en cours…", en: "Sending…" })
                      : t({ fr: "Envoyer la demande", en: "Send request" })}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </Section>

      <Container className="pb-16 text-center">
        <p className="text-muted">
          {t({ fr: "Vous préférez un échange rapide ?", en: "Prefer a quick chat?" })}{" "}
          <ButtonLink to={`tel:${site.phoneTel}`} external variant="ghost" className="ml-2">
            {t({ fr: "Appeler", en: "Call" })}
          </ButtonLink>
        </p>
      </Container>
    </>
  );
}
