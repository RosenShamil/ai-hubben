import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn } from "@/components/shared/fade-in";
import { BRAND_GRADIENT } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Integritetspolicy",
  description:
    "Information om hur AI-hubben behandlar dina personuppgifter enligt GDPR.",
};

/* ── section helper ──────────────────────────────────────── */

function Section({
  label,
  heading,
  children,
}: {
  label: string;
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="mx-auto max-w-[68.75rem] px-6">
        <div className="h-px" style={{ background: BRAND_GRADIENT }} />
      </div>
      <section className="mx-auto max-w-[68.75rem] px-6 py-12 md:py-16">
        <FadeIn>
          <p
            className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-muted-foreground"
            style={{ fontFamily: "var(--font-geist-mono), monospace" }}
          >
            {label}
          </p>
          <h2
            className="mt-4 text-[1.75rem] leading-[1.1] tracking-[-0.04em] md:text-[2.75rem]"
            style={{
              fontFamily: "var(--font-bodoni), serif",
              fontWeight: 400,
            }}
          >
            {heading}
          </h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="mt-8 max-w-[52rem] space-y-5 text-[1.0625rem] leading-[1.8] text-muted-foreground">
            {children}
          </div>
        </FadeIn>
      </section>
    </>
  );
}

/* ── page ────────────────────────────────────────────────── */

export default function IntegritetspolicyPage() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-[68.75rem] px-6 pt-20 pb-12 md:pt-28 md:pb-16">
        <FadeIn>
          <p
            className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-muted-foreground"
            style={{ fontFamily: "var(--font-geist-mono), monospace" }}
          >
            Dataskydd
          </p>
          <h1
            className="mt-4 text-[1.75rem] leading-[1.1] tracking-[-0.04em] sm:text-[2.75rem] md:text-[4.5rem]"
            style={{
              fontFamily: "var(--font-bodoni), serif",
              fontWeight: 400,
            }}
          >
            Integritetspolicy
          </h1>
          <p className="mt-6 max-w-[42rem] text-[1.0625rem] leading-[1.7] text-muted-foreground">
            Här beskriver vi hur AI-hubben, Katrineholms kommuns plattform för
            AI-resurser, behandlar dina personuppgifter i enlighet med EU:s
            dataskyddsförordning (GDPR).
          </p>
          <p
            className="mt-4 text-[0.75rem] uppercase tracking-[0.1em] text-muted-foreground/60"
            style={{ fontFamily: "var(--font-geist-mono), monospace" }}
          >
            Senast uppdaterad: 25 mars 2026
          </p>
        </FadeIn>
      </section>

      {/* 1. Personuppgiftsansvarig */}
      <Section label="01" heading="Personuppgiftsansvarig">
        <p>
          <strong className="text-foreground">Katrineholms kommun</strong>,
          Kommunledningsförvaltningen, är personuppgiftsansvarig för
          behandlingen av dina personuppgifter på AI-hubben.
        </p>
        <div className="rounded-lg border border-border bg-card p-6 space-y-3 text-[0.9375rem]">
          <p>
            <strong className="text-foreground">Katrineholms kommun</strong>
            <br />
            Kommunledningsförvaltningen
            <br />
            641 80 Katrineholm
            <br />
            Org.nr: 212000-0340
          </p>
          <p>
            <strong className="text-foreground">Dataskyddsombud:</strong>{" "}
            Katrineholms kommun har ett gemensamt dataskyddsombud via{" "}
            <strong className="text-foreground">Sydarkivera</strong>.
          </p>
          <p>
            E-post:{" "}
            <a
              href="mailto:dataskydd@sydarkivera.se"
              className="text-foreground underline underline-offset-4 hover:opacity-80"
            >
              dataskydd@sydarkivera.se
            </a>
          </p>
        </div>
      </Section>

      {/* 2. Vilka uppgifter vi samlar in */}
      <Section label="02" heading="Vilka uppgifter vi samlar in">
        <p>Vi behandlar följande personuppgifter beroende på hur du använder AI-hubben:</p>

        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="text-[1rem] font-medium text-foreground">
              Vid registrering och inloggning
            </h3>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[0.9375rem]">
              <li>Namn (för- och efternamn)</li>
              <li>E-postadress</li>
              <li>Lösenord (krypterat, vi kan aldrig se ditt lösenord)</li>
            </ul>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="text-[1rem] font-medium text-foreground">
              Vid användning av plattformen
            </h3>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[0.9375rem]">
              <li>Utbildningsframsteg och quizresultat</li>
              <li>Sparade favoriter (assistenter och kurser)</li>
              <li>Profilinformation du frivilligt anger (kommun, befattning)</li>
            </ul>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="text-[1rem] font-medium text-foreground">
              Vid kontakt
            </h3>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[0.9375rem]">
              <li>Namn och e-postadress du anger i kontaktformuläret</li>
              <li>Meddelandeinnehåll</li>
            </ul>
          </div>
        </div>

        <p>
          <strong className="text-foreground">Webbanalys:</strong> Vi använder
          Umami Cloud för aggregerad, anonymiserad besöksstatistik. Inga
          personuppgifter eller cookies lagras för detta ändamål.
        </p>
      </Section>

      {/* 3. Varför vi behandlar uppgifterna */}
      <Section label="03" heading="Varför vi behandlar dina uppgifter">
        <div className="overflow-x-auto">
          <table className="w-full text-[0.9375rem]">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="pb-3 pr-4 font-medium text-foreground">Ändamål</th>
                <th className="pb-3 pr-4 font-medium text-foreground">Rättslig grund</th>
                <th className="pb-3 font-medium text-foreground">Uppgifter</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="py-3 pr-4 align-top">Skapa och hantera ditt konto</td>
                <td className="py-3 pr-4 align-top">Avtal (GDPR Art. 6.1.b)</td>
                <td className="py-3 align-top">Namn, e-post, lösenord</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 align-top">Tillhandahålla utbildning och spåra framsteg</td>
                <td className="py-3 pr-4 align-top">Allmänt intresse (GDPR Art. 6.1.e)</td>
                <td className="py-3 align-top">Utbildningsframsteg, quizresultat</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 align-top">Hantera kontaktförfrågningar</td>
                <td className="py-3 pr-4 align-top">Allmänt intresse (GDPR Art. 6.1.e)</td>
                <td className="py-3 align-top">Namn, e-post, meddelande</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 align-top">Förbättra plattformen</td>
                <td className="py-3 pr-4 align-top">Berättigat intresse (GDPR Art. 6.1.f)</td>
                <td className="py-3 align-top">Aggregerad besöksstatistik (anonymiserad)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      {/* 4. Lagring och säkerhet */}
      <Section label="04" heading="Lagring och säkerhet">
        <p>
          Dina personuppgifter lagras i{" "}
          <strong className="text-foreground">Supabase</strong> (databasplattform
          baserad på PostgreSQL) med datacenter i{" "}
          <strong className="text-foreground">EU (Irland, AWS eu-west-1)</strong>.
          All data överförs krypterat via HTTPS och lagras krypterat.
        </p>
        <p>
          Webbplatsen hostas av{" "}
          <strong className="text-foreground">Vercel</strong> som är certifierade
          under EU-US Data Privacy Framework. Statiskt innehåll kan cachas
          globalt via CDN, men personuppgifter behandlas inom EU.
        </p>
        <p>
          Vi vidtar tekniska och organisatoriska åtgärder för att skydda dina
          uppgifter, bland annat:
        </p>
        <ul className="list-disc space-y-1.5 pl-5 text-[0.9375rem]">
          <li>Krypterade lösenord (bcrypt via Supabase Auth)</li>
          <li>HTTPS för all datatrafik</li>
          <li>Rollbaserad åtkomstkontroll (admin/användare)</li>
          <li>Regelbunden säkerhetsöversyn</li>
        </ul>
      </Section>

      {/* 5. Dina rättigheter */}
      <Section label="05" heading="Dina rättigheter">
        <p>
          Enligt GDPR har du följande rättigheter gällande dina personuppgifter:
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            {
              title: "Tillgång",
              text: "Du har rätt att få veta vilka personuppgifter vi har om dig.",
            },
            {
              title: "Rättelse",
              text: "Du kan begära att felaktiga uppgifter korrigeras.",
            },
            {
              title: "Radering",
              text: "Du kan radera ditt konto och all tillhörande data via din profilsida.",
            },
            {
              title: "Begränsning",
              text: "Du kan begära att behandlingen begränsas under vissa omständigheter.",
            },
            {
              title: "Dataportabilitet",
              text: "Du har rätt att få ut dina uppgifter i maskinläsbart format.",
            },
            {
              title: "Invändning",
              text: "Du kan invända mot behandling som grundar sig på allmänt intresse.",
            },
          ].map((right) => (
            <div
              key={right.title}
              className="rounded-lg border border-border bg-card p-5"
            >
              <h3 className="text-[0.9375rem] font-medium text-foreground">
                {right.title}
              </h3>
              <p className="mt-1.5 text-[0.875rem]">{right.text}</p>
            </div>
          ))}
        </div>
        <p>
          Kontakta dataskyddsombudet via{" "}
          <a
            href="mailto:dataskydd@sydarkivera.se"
            className="text-foreground underline underline-offset-4 hover:opacity-80"
          >
            dataskydd@sydarkivera.se
          </a>{" "}
          eller via{" "}
          <Link
            href="/kontakt"
            className="text-foreground underline underline-offset-4 hover:opacity-80"
          >
            kontaktformuläret
          </Link>{" "}
          för att utöva dina rättigheter.
        </p>
      </Section>

      {/* 6. Lagringstid */}
      <Section label="06" heading="Hur länge sparar vi dina uppgifter">
        <div className="overflow-x-auto">
          <table className="w-full text-[0.9375rem]">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="pb-3 pr-4 font-medium text-foreground">Uppgift</th>
                <th className="pb-3 font-medium text-foreground">Lagringstid</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="py-3 pr-4 align-top">Kontoinformation</td>
                <td className="py-3 align-top">
                  Så länge du har ett aktivt konto. Raderas vid kontoborttagning.
                </td>
              </tr>
              <tr>
                <td className="py-3 pr-4 align-top">Utbildningsframsteg</td>
                <td className="py-3 align-top">
                  Så länge du har ett aktivt konto. Raderas vid kontoborttagning.
                </td>
              </tr>
              <tr>
                <td className="py-3 pr-4 align-top">Kontaktmeddelanden</td>
                <td className="py-3 align-top">
                  Hanteras enligt kommunens arkiv- och gallringsregler.
                </td>
              </tr>
              <tr>
                <td className="py-3 pr-4 align-top">Besöksstatistik</td>
                <td className="py-3 align-top">
                  Aggregerad och anonymiserad — kan inte kopplas till dig som person.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      {/* 7. Cookies */}
      <Section label="07" heading="Cookies">
        <p>
          AI-hubben använder{" "}
          <strong className="text-foreground">inga spårningscookies</strong>.
          Vi använder enbart tekniskt nödvändiga cookies för att hantera din
          inloggningssession (Supabase Auth). Dessa cookies kräver inte
          samtycke enligt ePrivacy-direktivet/LEK.
        </p>
        <p>
          Vår webbanalys (Umami Cloud) är cookie-fri och samlar ingen
          personlig information.
        </p>
      </Section>

      {/* 8. AI-tjänster */}
      <Section label="08" heading="AI-tjänster och transparens">
        <p>
          AI-hubben tillhandahåller AI-assistenter via{" "}
          <strong className="text-foreground">Intric</strong>-plattformen.
          Dessa assistenter drivs av artificiell intelligens och:
        </p>
        <ul className="list-disc space-y-1.5 pl-5 text-[0.9375rem]">
          <li>Genererar svar baserat på AI-modeller — svaren ska alltid granskas av användaren</li>
          <li>Fattar inga automatiserade beslut med rättslig verkan</li>
          <li>
            Konversationsdata behandlas av Intric enligt deras
            dataskyddsvillkor
          </li>
        </ul>
        <p>
          Enligt EU:s AI-förordning (AI Act) informerar vi dig om att du
          interagerar med AI när du använder assistenterna på plattformen.
        </p>
      </Section>

      {/* 9. Klagomål */}
      <Section label="09" heading="Klagomål">
        <p>
          Om du anser att vi behandlar dina personuppgifter felaktigt har du
          rätt att lämna klagomål till{" "}
          <strong className="text-foreground">
            Integritetsskyddsmyndigheten (IMY)
          </strong>
          :
        </p>
        <div className="rounded-lg border border-border bg-card p-6">
          <p className="text-[0.9375rem]">
            <strong className="text-foreground">
              Integritetsskyddsmyndigheten
            </strong>
            <br />
            Box 8114, 104 20 Stockholm
            <br />
            <a
              href="mailto:imy@imy.se"
              className="text-foreground underline underline-offset-4 hover:opacity-80"
            >
              imy@imy.se
            </a>
            <br />
            <a
              href="https://www.imy.se"
              className="text-foreground underline underline-offset-4 hover:opacity-80"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.imy.se
            </a>
          </p>
        </div>
      </Section>

      {/* Bottom spacing */}
      <div className="pb-16" />
    </>
  );
}
