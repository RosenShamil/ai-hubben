# Roadmap: Nya funktioner och verktyg

> Skapad: 2026-03-26
> Status: Brainstorm-fas — varje punkt ska gås igenom steg för steg innan implementation
> Research-underlag: `docs/research-kommunala-behov.md`

---

## Ägarskap och affärsmodell

**Viktigt:** AI-hubben är skapad av Shamil som anställd i Katrineholms kommun. Det innebär att kommunen äger plattformen och Shamil inte kan ta betalt för den. Nya funktioner/verktyg behöver utvärderas:

- **Inbyggt i AI-hubben** → Gratis, kommunägt, kan delas med andra kommuner
- **Separat produkt** → Kräver privat bolag, kan kommersialiseras
- **Hybrid** → Grundfunktion gratis i AI-hubben, premiumversion som separat produkt

Varje punkt nedan ska utvärderas med hänsyn till detta.

---

## Fas 0: Utöka AI-hubben (kommunägt, gratis)

### F1. Compliance Toolkit
**Problem:** Alla 290 kommuner måste göra samma compliance-arbete. Vi har redan gjort det.
**Lösning:**
- [ ] Parametrisera befintliga compliance-dokument (byt "Katrineholm" → `{kommun}`)
- [ ] Interaktiv checklista-tracker (som vår compliance-tabell, men per kommun)
- [ ] Nedladdningsbara mallar: DPIA, AI-policy, registerförteckning, incidentrutin, suveränitetsanalys, informationsklassificering, kontinuitetsplan
- [ ] Steg-för-steg-wizard: "Svara på frågor → få anpassad AI-policy"
- [ ] Deadline-tracker med EU AI Act-milstenar

**Datapunkter:** EU AI Act deadline 2 aug 2026 (4 mån bort). 90% av kommuner har inte implementerat AI = har inte gjort compliance-arbetet.

**Feasibility:** Hög — dokumenten finns, behöver UI + parametrisering
**Impact:** Mycket hög — akut behov, ingen konkurrent erbjuder detta
**Ägarskap:** Kan vara del av AI-hubben (kommunägt, gratis)

---

### F2. AI-mognadsmätare
**Problem:** Kommuner vet inte var de står eller var de ska börja med AI.
**Lösning:**
- [ ] Self-assessment: 20-30 frågor om organisation, teknik, kompetens, styrning
- [ ] Resultat: mognadsnivå (1-5) med jämförelse mot rikssnitt
- [ ] Handlingsplan per gap-område
- [ ] Koppla till AI-akademins kurser per identifierat gap
- [ ] Anonymiserad benchmarking mellan kommuner (opt-in)

**Datapunkter:** PwC mäter digitalt mognad men ingen produkt. 59% ser budget som barriär, 40% låg IT-mognad, 38% chefers kompetens.

**Feasibility:** Hög — frågeformulär + poängberäkning
**Impact:** Hög — bra "ingång" till plattformen, lead-gen
**Ägarskap:** AI-hubben

---

### F3. Förvaltningsspecifika AI-guider
**Problem:** Generell AI-utbildning räcker inte — social, bildning, samhällsbyggnad har helt olika behov och lagar.
**Lösning:**
- [ ] **Social/Omsorg:** AI för dokumentation, sekretessregler, journalanteckningar, biståndsbedömning
- [ ] **Bildning:** AI för lärare, IUP-stöd, åtgärdsprogram, administrativ avlastning
- [ ] **Samhällsbyggnad:** AI för bygglov, detaljplaner, miljötillsyn
- [ ] **Kommunledning:** AI för HR, rekrytering, ekonomianalys, kommunikation
- [ ] **Vård/Omsorg:** AI för genomförandeplaner, schemaläggning, hemtjänst
- [ ] Varje guide: relevanta lagar, verktyg, "vad får/får inte matas in i AI"

**Datapunkter:** 79% av lärare 5+ tim/vecka admin. 70% av socialsekreterares tid = dokumentation. 61% av kommuner: AI-mål = bättre medborgarservice.

**Feasibility:** Hög — utöka befintlig akademi med nytt innehåll
**Impact:** Hög — direkt kopplat till vardagsarbete
**Ägarskap:** AI-hubben

---

### F4. Flerspråkig AI-guide
**Problem:** Flerspråkig personalstyrka (hemtjänst, förskola). Medborgare med språkbarriärer.
**Lösning:**
- [ ] Snabbguide AI på 5+ språk (arabiska, somaliska, tigrinja, dari, engelska)
- [ ] Grundläggande AI-intro anpassad för personer med begränsad svenska
- [ ] Kopplat till Katrineholms befintliga hemtjänst-AI (flerspråkig)

**Datapunkter:** Katrineholm redan rullat ut flerspråkig AI-assistent för hemtjänst. DOS-lagen + EAA kräver tillgänglighet. 22% av funktionsnedsatta har svårt med e-tjänster.

**Feasibility:** Hög — översättning av befintligt innehåll
**Impact:** Medium — viktigt för inkludering
**Ägarskap:** AI-hubben

---

## Fas 1: Verktyg (utred ägarskap per punkt)

### F5. Protokoll-AI
**Problem:** Varje nämnd, styrelse, arbetsgrupp i 290 kommuner skriver mötesprotokoll manuellt.
**Lösning:**
- [ ] Ladda upp inspelning eller anteckningar
- [ ] AI genererar strukturerat protokoll (närvarande, §-numrering, beslut, reservationer)
- [ ] Mallbibliotek per typ (KS, nämnd, AU, arbetsgrupp)
- [ ] Export PDF/Word
- [ ] Redigeringsvy för justerare

**Datapunkter:** Alla 290 kommuner gör detta. Format standardiserat. Lagkrav: 2 dagar. Eneo/Intric har transkription men inte strukturerade protokoll.

**Feasibility:** Medium — transkription (Whisper) + strukturering (LLM) + mallmotor
**Impact:** Mycket hög — universellt behov, daglig användning
**Teknik:** Intric (Whisper + Claude) eller eget (OpenAI Whisper + Claude API)
**Ägarskap:** Bör utredas — kan vara separat produkt ELLER Intric-baserad assistent

---

### F6. Tjänsteskrivelse-assistent
**Problem:** Tjänsteskrivelser/beslutsunderlag skrivs dagligen. Kräver rätt struktur och juridiskt språk.
**Lösning:**
- [ ] Mall-driven: välj typ (informationsärende, beslutsärende, remissvar, motion)
- [ ] Fyll i nyckelinfo → AI genererar utkast
- [ ] Inbyggda kontroller: saknas lagstöd? konsekvensanalys? jämställdhet?
- [ ] Kommunspecifika mallar (varje kommun har egna format)
- [ ] Export i kommunens format

**Datapunkter:** Lidköping använder redan Intric för detta. Bevisat koncept. Universellt behov.

**Feasibility:** Medium — mallmotor + LLM + kommunspecifik anpassning
**Impact:** Mycket hög — daglig tidsbesparing för handläggare och chefer
**Ägarskap:** Kan vara Intric-assistent (Katrineholm-specifik) + generell version som produkt

---

### F7. Dokumentationsassistent socialtjänst
**Problem:** 70% dokumentation, 30% klientarbete. Omvänt vore bättre.
**Lösning:**
- [ ] Spela in klientsamtal (med samtycke) → AI transkriberar
- [ ] Generera strukturerad journalanteckning i SoL-format
- [ ] Sekretessfilter: varnar om känslig info
- [ ] Integration med Treserva/Combine
- [ ] GDPR-kompatibel (samtycke, radering, lokal bearbetning)

**Datapunkter:** Nacka: 20 min/journal spart. Vännäs: 300+ tim/mån spart. 69% nöjda med talteknik. Personalbristen akut — 410 000 nya medarbetare behövs till 2031.

**Feasibility:** Låg (kräver sekretesshantering, DPA, eventuell lokal hosting, systemintegration)
**Impact:** Mycket hög — direkt kopplad till personalbristkrisen
**Ägarskap:** Separat produkt — kräver djupa integrationer och specialistkompetens
**Konkurrenter:** Pulsen Omsorg (Nacka), Vännäs-lösning

---

### F8. Medborgarassistent (citizen chatbot)
**Problem:** Kontaktcenter 8-16 mån-fre. Telefonköer. Samma frågor gång på gång.
**Lösning:**
- [ ] AI-chatbot på kommun-webbplatsen, 24/7
- [ ] Tränad på kommunens dokument, taxor, regler, e-tjänster
- [ ] Flerspråkig (minst sv/en/ar)
- [ ] Eskalering till människa
- [ ] Dashboard: vanligaste frågor, obesvarade, kundnöjdhet

**Datapunkter:** Bara Helsingborg (Sally) har detta. Katrineholm planerar inom 18 mån. Riksrevisionen rekommenderar callback-alternativ. 22% med funktionsnedsättning har svårt med e-tjänster.

**Feasibility:** Medium — Intric + RAG + webbwidget
**Impact:** Mycket hög — 24/7 service, avlastar kontaktcenter
**Ägarskap:** Kan byggas som Intric-lösning för Katrineholm, produktifieras för andra kommuner

---

### F9. Ärendeklassificerare & router
**Problem:** Inkommande ärenden måste diarieföras, klassificeras, skickas till rätt handläggare.
**Lösning:**
- [ ] AI läser inkommande ärende → föreslår: ärendetyp, ansvarig förvaltning, sekretessbedömning, prioritet
- [ ] Handläggare bekräftar med ett klick
- [ ] Integration med Platina/Public 360

**Datapunkter:** Platina har 80% av statliga institutioner. Diarieföring: lagkrav nästa arbetsdag. 290 kommuner gör samma sak.

**Feasibility:** Låg — kräver integration med ärendehanteringssystem
**Impact:** Hög — daglig tidsbesparing för registratorer
**Ägarskap:** Separat produkt — kräver leverantörssamarbete (Formpipe, TietoEvry)

---

### F10. Rekryteringstext-generator
**Problem:** Kommuner skriver ständigt platsannonser. Ofta generiska och oinspirerande.
**Lösning:**
- [ ] Välj roll (undersköterska, lärare, socialsekreterare)
- [ ] AI genererar engagerande annonstext
- [ ] Kommunens profil och fördelar inbakade
- [ ] Diskrimineringsfri formulering (DO:s riktlinjer)
- [ ] A/B-testning av formuleringar

**Datapunkter:** 410 000 nya medarbetare till 2031. 7/10 kommuner: svårt rekrytera undersköterskor. <50% vill stanna 3+ år.

**Feasibility:** Hög — LLM + mallar, inga integrationer
**Impact:** Medium — direkt nytta, låg risk
**Ägarskap:** Kan vara AI-hubben-funktion eller Intric-assistent

---

## Fas 2: Avancerade verktyg (framtid)

### F11. Enhetligt AI-lager över kommunsystem
**Problem:** Anställda använder 5-10 system dagligen. Ingen sökning som spänner alla.
**Lösning:** AI-assistent som kan söka Platina + Raindance + Treserva + intranät samtidigt.

**Ägarskap:** Separat produkt — kräver partnerskap med systemleverantörer
**Feasibility:** Mycket låg — komplexa integrationer

---

### F12. Bygglovsassistent
**Problem:** 10-20 veckors handläggningstid. Nacka automatiserar 26%.
**Lösning:** AI som bedömer fullständighet, klassificerar, föreslår beslut.

**Ägarskap:** Separat produkt
**Feasibility:** Låg — kräver PBL-kunskap och Platina-integration

---

### F13. Onboarding-hub
**Problem:** Nya medarbetare måste lära sig system + lagstiftning. Ingen standard. 410 000 pensioneringar → institutionell kunskap försvinner.
**Lösning:** Strukturerad onboarding per förvaltning med AI-stöd och kunskapsbevarande.

**Ägarskap:** Utökning av AI-hubben (LMS-vision i befintlig roadmap)
**Feasibility:** Medium — bygger på befintlig akademi

---

### F14. AI-incident/compliance-dashboard
**Problem:** NIS2 kräver incidentrapportering, EU AI Act kräver dokumentation, GDPR kräver register. Ingen samlad vy.
**Lösning:** Dashboard som visar compliance-status, AI-system, incidenter, deadlines.

**Ägarskap:** Kan vara del av AI-hubben admin-vy
**Feasibility:** Medium

---

## Prioriteringsöversikt

| Prio | Funktion | Impact | Feasibility | Ägarskap |
|------|----------|--------|-------------|----------|
| 🔴 1 | F1. Compliance Toolkit | ★★★★★ | ★★★★★ | AI-hubben |
| 🔴 2 | F5. Protokoll-AI | ★★★★★ | ★★★☆☆ | Utred |
| 🔴 3 | F6. Tjänsteskrivelse-assistent | ★★★★★ | ★★★☆☆ | Utred |
| 🟡 4 | F2. AI-mognadsmätare | ★★★★☆ | ★★★★★ | AI-hubben |
| 🟡 5 | F3. Förvaltningsspecifika guider | ★★★★☆ | ★★★★★ | AI-hubben |
| 🟡 6 | F10. Rekryteringstext-gen | ★★★☆☆ | ★★★★★ | AI-hubben/Intric |
| 🟡 7 | F8. Medborgarassistent | ★★★★★ | ★★★☆☆ | Utred |
| 🟢 8 | F4. Flerspråkig guide | ★★★☆☆ | ★★★★☆ | AI-hubben |
| 🟢 9 | F7. Dokumentation social | ★★★★★ | ★★☆☆☆ | Separat |
| 🟢 10 | F9. Ärendeklassificerare | ★★★★☆ | ★★☆☆☆ | Separat |
| ⚪ 11 | F13. Onboarding-hub | ★★★★☆ | ★★★☆☆ | AI-hubben (LMS) |
| ⚪ 12 | F14. Compliance-dashboard | ★★★☆☆ | ★★★☆☆ | AI-hubben |
| ⚪ 13 | F11. Enhetligt AI-lager | ★★★★★ | ★☆☆☆☆ | Separat |
| ⚪ 14 | F12. Bygglovsassistent | ★★★★☆ | ★★☆☆☆ | Separat |

---

## Nästa steg

Varje punkt ovan ska gås igenom steg för steg:
1. **Djupare research** per funktion (juridiskt, tekniskt, affärsmässigt)
2. **Ägarskapsutredning** — AI-hubben vs separat produkt vs Intric-assistent
3. **Teknisk feasibility** — arkitektur, integrationer, kostnader
4. **Användarbehov** — intervjuer/validering med faktiska kommunanställda
5. **Prioritering** — baserat på alla faktorer ovan
6. **Implementationsplan** — per vald funktion
