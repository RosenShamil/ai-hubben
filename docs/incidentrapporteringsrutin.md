# Incidentrapporteringsrutin — AI-hubben

> **Regelverk:** Cybersäkerhetslagen (SFS 2025:1506), GDPR Art. 33–34
> **Datum:** 2026-03-26
> **Ansvarig:** Digitaliseringsavdelningen
> **Gäller för:** AI-hubben, Intric AI-plattformen och tillhörande molntjänster

---

## 1. Syfte

Denna rutin beskriver hur säkerhetsincidenter som rör AI-hubben och Intric AI-plattformen ska hanteras, rapporteras och följas upp — i enlighet med cybersäkerhetslagen (NIS2) och GDPR.

---

## 2. Definitioner

| Begrepp | Definition |
|---------|-----------|
| **Incident** | En händelse som påverkar eller hotar AI-hubbens eller Intrics säkerhet, tillgänglighet eller integritet |
| **Betydande incident** (NIS2) | Incident som orsakar eller kan orsaka allvarlig driftstörning, ekonomisk förlust eller skada för tredje part |
| **Personuppgiftsincident** (GDPR) | Säkerhetsincident som leder till oavsiktlig eller olaglig förstöring, förlust, ändring eller obehörig åtkomst till personuppgifter |

---

## 3. Incidentklassificering

| Nivå | Beskrivning | Exempel | Åtgärd |
|------|-------------|---------|--------|
| **1 — Mindre** | Begränsad påverkan, hanteras av IT | Tillfällig otillgänglighet, enskild inloggningsproblem | Intern hantering |
| **2 — Betydande** | Allvarlig driftstörning eller dataexponering | Tjänsten nere >4h, obehörig åtkomst till konton, dataläckage av personuppgifter | Eskalering + extern rapportering |
| **3 — Kritisk** | Omfattande dataintrång, total driftstörning | Ransomware, storskaligt dataintrång, säkerhetsintrång hos Intric/Supabase | Full incidenthantering + extern rapportering |

---

## 4. Roller och ansvar

| Roll | Person/funktion | Ansvar |
|------|----------------|--------|
| **Incidentansvarig** | Digitaliseringsavdelningen | Leder incidenthanteringen, koordinerar åtgärder |
| **IT-ansvarig** | IT-avdelningen | Teknisk utredning och åtgärder |
| **Dataskyddsombud** | Sydarkivera (dataskydd@sydarkivera.se) | Rådgivning vid personuppgiftsincidenter |
| **Kommunikationsansvarig** | Kommunikationsavdelningen | Extern kommunikation vid behov |
| **Kommundirektör** | Kommunledningsförvaltningen | Beslut vid kritiska incidenter |

---

## 5. Rapporteringstidsfrister

### 5.1 Cybersäkerhetslagen (NIS2) — Rapportering till CERT-SE

| Steg | Tidsfrist | Innehåll |
|------|-----------|----------|
| **Tidig varning** | **Inom 24 timmar** från upptäckt | Att incident inträffat, om brottsmisstanke finns, om gränsöverskridande påverkan befaras |
| **Incidentanmälan** | **Inom 72 timmar** från upptäckt | Uppdatering av tidig varning + preliminär bedömning av allvarlighet, konsekvenser, indikatorer |
| **Slutrapport** | **Inom 1 månad** efter incidentanmälan | Detaljerad beskrivning, hottyp/grundorsak, vidtagna åtgärder, gränsöverskridande påverkan |
| **Mellanrapport** | Vid behov (pågående incident) | Statusuppdatering om incidenten fortfarande pågår vid 1-månadsgränsen |

### 5.2 GDPR Art. 33 — Rapportering till IMY

| Tidsfrist | Villkor |
|-----------|---------|
| **Inom 72 timmar** | Vid personuppgiftsincident som sannolikt medför risk för registrerades rättigheter |

### 5.3 GDPR Art. 34 — Information till registrerade

| Tidsfrist | Villkor |
|-----------|---------|
| **Utan onödigt dröjsmål** | Om incidenten sannolikt medför **hög risk** för registrerades rättigheter och friheter |

---

## 6. Kontaktuppgifter

### Extern rapportering

| Mottagare | Kontakt | När |
|-----------|---------|-----|
| **CERT-SE** (MCF:s CSIRT) | Tel: 010-240 40 40, E-post: cert@cert.se, Portal: https://iron.msb.se | Betydande/kritisk incident (NIS2) |
| **IMY** | Via IMY:s anmälningsportal på imy.se | Personuppgiftsincident (GDPR Art. 33) |
| **Polisen** | 114 14 (eller 112 vid pågående brott) | Vid misstanke om brott |

### Leverantörskontakter

| Leverantör | Kontakt | SLA |
|-----------|---------|-----|
| **Intric AB** | support@intric.ai | Kritiska incidenter: 48h (begär 24h) |
| **Supabase** | Via dashboard/support | Enligt servicevillkor |
| **Vercel** | Via dashboard/support | Enligt servicevillkor |

### Intern kontakt

| Roll | Kontakt |
|------|---------|
| Digitaliseringsavdelningen | digitaliseringsavdelningen@katrineholm.se |
| Dataskyddsombud | dataskydd@sydarkivera.se |

---

## 7. Incidenthanteringsflöde

```
┌──────────────────────────────────────────────┐
│  1. UPPTÄCKT                                  │
│  Medarbetare, systemövervakning, leverantör   │
│  → Rapportera till Digitaliseringsavdelningen │
│    eller IT-avdelningen omedelbart            │
└──────────────────────┬───────────────────────┘
                       ▼
┌──────────────────────────────────────────────┐
│  2. BEDÖMNING (inom 1 timme)                  │
│  - Klassificera: Nivå 1/2/3                  │
│  - Personuppgifter påverkade? → DPO           │
│  - Pågående attack? → Isolera system          │
└──────────────────────┬───────────────────────┘
                       ▼
┌──────────────────────────────────────────────┐
│  3. ÅTGÄRD                                    │
│  - Begränsa skadan (isolera, stänga av)       │
│  - Bevara bevis (loggar, skärmbilder)         │
│  - Kontakta leverantör om nödvändigt          │
└──────────────────────┬───────────────────────┘
                       ▼
┌──────────────────────────────────────────────┐
│  4. RAPPORTERING                              │
│  Nivå 2-3:                                    │
│  - CERT-SE inom 24h (tidig varning)           │
│  - CERT-SE inom 72h (incidentanmälan)         │
│  Personuppgifter:                             │
│  - IMY inom 72h                               │
│  - Registrerade vid hög risk                  │
│  Brott:                                       │
│  - Polisen                                    │
└──────────────────────┬───────────────────────┘
                       ▼
┌──────────────────────────────────────────────┐
│  5. ÅTERSTÄLLNING                             │
│  - Återställ tjänster                         │
│  - Verifiera att hotet är eliminerat          │
│  - Kommunicera status till berörda            │
└──────────────────────┬───────────────────────┘
                       ▼
┌──────────────────────────────────────────────┐
│  6. UPPFÖLJNING (inom 2 veckor)               │
│  - Lessons learned                            │
│  - Uppdatera säkerhetsåtgärder                │
│  - Uppdatera denna rutin vid behov            │
│  - Slutrapport till CERT-SE inom 1 månad      │
└──────────────────────────────────────────────┘
```

---

## 8. Dokumentationskrav

Vid varje incident ska följande dokumenteras:

| Fält | Beskrivning |
|------|-------------|
| Incidentnummer | Löpnummer (t.ex. INC-2026-001) |
| Datum och tid för upptäckt | |
| Rapporterad av | Namn/funktion |
| Klassificering | Nivå 1/2/3 |
| Beskrivning | Vad hände? |
| Påverkade system | AI-hubben, Intric, Supabase, Vercel? |
| Personuppgifter påverkade? | Ja/Nej — vilka kategorier? |
| Antal berörda registrerade | Uppskattat |
| Vidtagna åtgärder | Kronologisk lista |
| Extern rapportering | CERT-SE datum, IMY datum, Polis datum |
| Återställd | Datum och tid |
| Grundorsak | Utredningsresultat |
| Förbättringsåtgärder | Vad ändras för att förhindra upprepning |

---

## 9. Övning och utbildning

| Aktivitet | Frekvens | Ansvarig |
|-----------|----------|----------|
| Genomgång av rutin med nyckelpersoner | Årligen | Digitaliseringsavdelningen |
| Tabletop-övning (simulerad incident) | Årligen | IT-avdelningen + Digitaliseringsavdelningen |
| Information till alla medarbetare | Vid onboarding + årligen | HR + Digitaliseringsavdelningen |

---

## 10. Revidering

Denna rutin revideras:
- Årligen (ordinarie granskning)
- Efter varje incident av nivå 2 eller 3
- Vid förändrad lagstiftning
