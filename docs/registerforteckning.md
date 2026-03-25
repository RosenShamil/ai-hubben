# Registerförteckning — AI-hubben

> GDPR Art. 30: Förteckning över behandlingar av personuppgifter
> Senast uppdaterad: 2026-03-26
> Ska granskas och uppdateras minst en gång per år.

## Personuppgiftsansvarig

| Fält | Värde |
|------|-------|
| **Organisation** | Katrineholms kommun |
| **Ansvarig nämnd** | Kommunstyrelsen |
| **Förvaltning** | Kommunledningsförvaltningen, Digitaliseringsavdelningen |
| **Kontaktperson** | digitaliseringsavdelningen@katrineholm.se |
| **Dataskyddsombud** | Sydarkivera — dataskydd@sydarkivera.se |
| **System** | AI-hubben (webbplattform för AI-resurser, utbildning och statistik) |

---

## 1. Användarregistrering och kontoinformation

| Fält | Värde |
|------|-------|
| **Behandling** | Skapa och hantera användarkonton |
| **Kategorier av registrerade** | Kommunanställda i Katrineholms kommun |
| **Kategorier av personuppgifter** | Namn (för- och efternamn), e-postadress, krypterat lösenord, kommun, yrkestitel |
| **Rättslig grund** | Avtal (GDPR Art. 6.1.b) — användaren skapar ett konto |
| **Ändamål** | Identifiera användaren, möjliggöra inloggning och personlig upplevelse |
| **Mottagare** | Supabase (personuppgiftsbiträde, datalagring) |
| **Tredjelandsöverföring** | Nej — data lagras i EU (Irland, AWS eu-west-1) |
| **Lagringstid** | Så länge kontot är aktivt. Raderas vid kontoborttagning. |
| **Tekniska skyddsåtgärder** | Lösenord krypterat (bcrypt), HTTPS, rollbaserad åtkomstkontroll |

---

## 2. Utbildningsframsteg

| Fält | Värde |
|------|-------|
| **Behandling** | Spåra utbildningsframsteg i AI-akademin och kunskapsbanken |
| **Kategorier av registrerade** | Inloggade användare |
| **Kategorier av personuppgifter** | Användar-ID, genomförda lektioner, quizresultat, XP-poäng, certifikat, badges, streak |
| **Rättslig grund** | Allmänt intresse (GDPR Art. 6.1.e) — kommunens uppdrag att utbilda anställda i AI |
| **Ändamål** | Möjliggöra individuellt anpassad utbildning och spåra kompetensuppbyggnad |
| **Mottagare** | Supabase (personuppgiftsbiträde) |
| **Tredjelandsöverföring** | Nej |
| **Lagringstid** | Så länge kontot är aktivt. Raderas vid kontoborttagning. |
| **Tekniska skyddsåtgärder** | HTTPS, rollbaserad åtkomstkontroll, data kopplad till pseudonymiserat user_id |

---

## 3. Favoriter

| Fält | Värde |
|------|-------|
| **Behandling** | Spara användarens favoritassistenter och kurser |
| **Kategorier av registrerade** | Inloggade användare |
| **Kategorier av personuppgifter** | Användar-ID, typ av favorit (assistent/kurs), ID på favoriserat objekt |
| **Rättslig grund** | Avtal (GDPR Art. 6.1.b) — del av kontofunktionaliteten |
| **Ändamål** | Användaren kan snabbt hitta sina sparade resurser |
| **Mottagare** | Supabase (personuppgiftsbiträde) |
| **Tredjelandsöverföring** | Nej |
| **Lagringstid** | Så länge kontot är aktivt. Raderas vid kontoborttagning. |
| **Tekniska skyddsåtgärder** | HTTPS, rollbaserad åtkomstkontroll |

---

## 4. Utbildningsanmälningar

| Fält | Värde |
|------|-------|
| **Behandling** | Hantera anmälningar till utbildningstillfällen |
| **Kategorier av registrerade** | Inloggade användare som anmäler sig till utbildning |
| **Kategorier av personuppgifter** | Användar-ID, utbildningstillfälle-ID, anmälningsdatum |
| **Rättslig grund** | Allmänt intresse (GDPR Art. 6.1.e) — kommunens utbildningsuppdrag |
| **Ändamål** | Administrera deltagare i utbildningstillfällen |
| **Mottagare** | Supabase (personuppgiftsbiträde), administratörer |
| **Tredjelandsöverföring** | Nej |
| **Lagringstid** | Så länge kontot är aktivt. Raderas vid kontoborttagning. |
| **Tekniska skyddsåtgärder** | HTTPS, rollbaserad åtkomstkontroll |

---

## 5. Kontaktformulär

| Fält | Värde |
|------|-------|
| **Behandling** | Ta emot och hantera kontaktförfrågningar |
| **Kategorier av registrerade** | Alla besökare som skickar meddelande |
| **Kategorier av personuppgifter** | Namn, e-postadress, meddelandeinnehåll |
| **Rättslig grund** | Allmänt intresse (GDPR Art. 6.1.e) — kommunens serviceskyldighet |
| **Ändamål** | Besvara frågor och förfrågningar |
| **Mottagare** | Supabase (personuppgiftsbiträde), administratörer |
| **Tredjelandsöverföring** | Nej |
| **Lagringstid** | Enligt kommunens arkiv- och gallringsregler |
| **Tekniska skyddsåtgärder** | HTTPS, läs/oläst-markering, enbart administratörer har tillgång |

---

## 6. Administratörshantering

| Fält | Värde |
|------|-------|
| **Behandling** | Identifiera administratörer för plattformen |
| **Kategorier av registrerade** | Utsedda administratörer |
| **Kategorier av personuppgifter** | Användar-ID (referens till auth-konto) |
| **Rättslig grund** | Berättigat intresse (GDPR Art. 6.1.f) — nödvändigt för plattformsförvaltning |
| **Ändamål** | Kontrollera behörighet till admin-funktioner |
| **Mottagare** | Supabase (personuppgiftsbiträde) |
| **Tredjelandsöverföring** | Nej |
| **Lagringstid** | Så länge personen har administratörsroll |
| **Tekniska skyddsåtgärder** | HTTPS, admin-tabell separerad från övrig data |

---

## 7. Webbanalys

| Fält | Värde |
|------|-------|
| **Behandling** | Aggregerad besöksstatistik |
| **Kategorier av registrerade** | Alla besökare |
| **Kategorier av personuppgifter** | Inga — anonymiserad och aggregerad data, inga cookies |
| **Rättslig grund** | Berättigat intresse (GDPR Art. 6.1.f) |
| **Ändamål** | Förbättra plattformen baserat på användningsmönster |
| **Mottagare** | Umami Cloud |
| **Tredjelandsöverföring** | Att verifiera — kontrollera var Umami Cloud lagrar data |
| **Lagringstid** | Aggregerad data, kan inte kopplas till individ |
| **Tekniska skyddsåtgärder** | Cookie-fri, ingen personlig identifiering möjlig |

---

## Personuppgiftsbiträden

| Leverantör | Tjänst | DPA-status | Datalokalisering |
|-----------|--------|-----------|-----------------|
| **Supabase** | Databas, Auth, Storage | ⬜ Att teckna | EU (Irland, eu-west-1) |
| **Vercel** | Webbhosting, CDN | ⬜ Att teckna | USA/EU (DPF-certifierad) |
| **Umami Cloud** | Webbanalys | ⬜ Att verifiera | Att verifiera |
| **Intric** | AI-assistenter | ⬜ Att verifiera | Att verifiera |

---

## Registrerade personers rättigheter

Följande rättigheter stöds tekniskt i AI-hubben:

| Rättighet | Implementation |
|-----------|---------------|
| **Tillgång (Art. 15)** | Dataexport via profilsidan (JSON) |
| **Rättelse (Art. 16)** | Redigera profil via profilsidan |
| **Radering (Art. 17)** | Radera konto via profilsidan (raderar all data) |
| **Dataportabilitet (Art. 20)** | JSON-export via profilsidan |
| **Invändning (Art. 21)** | Kontakta dataskyddsombudet (dataskydd@sydarkivera.se) |
| **Begränsning (Art. 18)** | Kontakta dataskyddsombudet |
