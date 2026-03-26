# Informationsklassificering — AI-hubben

> **Metod:** Baserad på SKR:s KLASSA-metodik och MSB:s klassificeringsmatris
> **Datum:** 2026-03-26
> **Ansvarig:** Digitaliseringsavdelningen
> **Deltagare:** Systemägare (Digitaliseringsavdelningen), DPO (Sydarkivera)
> **Nästa granskning:** 2026-09-26
>
> Notering: Denna klassificering är en dokumenterad bedömning. Vid tillgång till KLASSA-verktyget (klassa.skr.se) bör klassificeringen formaliseras i verktyget.

---

## 1. Klassificeringsskala

Enligt MSB:s matris (0040-09) och KLASSA:

| Nivå | Beteckning | Konsekvens vid brist |
|------|-----------|---------------------|
| **0** | Ingen/försumbar | Minimal eller ingen påverkan |
| **1** | Måttlig | Hanterbara konsekvenser med viss ansträngning |
| **2** | Betydande | Allvarliga konsekvenser för enskilda eller verksamheten |
| **3** | Allvarlig | Oåterkalleliga skador, kritiska funktioner påverkas |

---

## 2. Klassificering per informationstyp

### 2.1 AI-hubben (webbplattform)

| Informationstyp | K | R | T | Motivering |
|-----------------|---|---|---|------------|
| **Användarkonton** (namn, e-post, kommun, yrkestitel) | **2** | 1 | 1 | Personuppgifter (GDPR). Röjande ger måttlig skada för enskild. |
| **Lösenord** (bcrypt-hashade) | **3** | **2** | **2** | Komprometterade autentiseringsuppgifter kan ge obehörig åtkomst till hela kontot. |
| **Utbildningsframsteg** (quiz, XP, certifikat) | 1 | 1 | 1 | Intern arbetsrelaterad data. Begränsad känslighetsnivå. |
| **Favoriter** | 0 | 0 | 0 | Försumbar känslighetsnivå. |
| **Utbildningsanmälningar** | 1 | 1 | 1 | Personuppgifter men begränsad känslighetsnivå. |
| **Kontaktmeddelanden** | **2** | 1 | 1 | Kan innehålla känsliga förfrågningar. Allmän handling. |
| **Nyheter, FAQ, kurser** | 0 | 1 | 1 | Öppet innehåll. Riktigheten viktigt men inte kritiskt. |
| **Assistentdata** (namn, beskrivning, systemprompt) | 0 | 1 | 1 | Öppet innehåll. |
| **Statistikdata** | 0 | **2** | 1 | Aggregerad data. Riktigheten viktig — felaktig statistik kan leda till felaktiga beslut. |
| **Admin-åtkomst** (sessioner, behörigheter) | **3** | **2** | **2** | Komprometterad admin-åtkomst ger full kontroll över plattformen. |

**K = Konfidentialitet, R = Riktighet (Integritet), T = Tillgänglighet**

### 2.2 Intric AI-plattform

| Informationstyp | K | R | T | Motivering |
|-----------------|---|---|---|------------|
| **Konversationshistorik** | **2** | 1 | 1 | Kan innehålla verksamhetsrelaterad information. Användare kan oavsiktligt mata in personuppgifter. |
| **Kunskapsbaser** (uppladdade dokument) | **2** | **2** | 1 | Kan innehålla intern verksamhetsinformation. Riktigheten viktig — felaktig kunskap ger felaktiga AI-svar. |
| **AI-genererade svar** | 1 | 1 | 1 | Rådgivande, ej beslutsfattande. Hallucinationsrisk hanteras via transparens. |
| **Systemprompts** | 1 | **2** | 1 | Manipulation av systemprompts kan styra AI:ns beteende. |
| **Granskningsloggar** (audit trail) | **2** | **2** | 1 | Nödvändiga för spårbarhet och incidentutredning. |
| **Tekniska loggar** (IP, tidsstämplar) | 1 | 1 | 1 | Personuppgifter (IP-adresser) men begränsad skada vid röjande. |

---

## 3. Sammanfattande systemnivå

Systemets övergripande klassificering bestäms av de **högsta värdena** per dimension:

| System | K (max) | R (max) | T (max) |
|--------|---------|---------|---------|
| **AI-hubben** | **3** (lösenord, admin) | **2** (statistik, admin) | **2** (lösenord, admin) |
| **Intric** | **2** (konversationer, kunskapsbaser) | **2** (kunskapsbaser, systemprompts) | **1** |

### Samlad nivå: **K3 / R2 / T2**

Detta innebär:
- **Konfidentialitet 3:** Allvarlig — kräver stark åtkomstkontroll, kryptering, MFA
- **Riktighet 2:** Betydande — kräver integritetskontroller, ändringsloggning
- **Tillgänglighet 2:** Betydande — kräver backuprutiner, rimlig redundans

---

## 4. Skyddsåtgärder baserat på klassificering

### 4.1 Befintliga åtgärder (redan implementerade)

| Åtgärd | Täcker | Status |
|--------|--------|--------|
| HTTPS/TLS för all trafik | K, R | ✅ |
| Bcrypt-hashade lösenord | K | ✅ |
| Row Level Security (Supabase) | K | ✅ |
| Rollbaserad åtkomstkontroll (RBAC) | K | ✅ |
| ISO 27001 (Intric) | K, R, T | ✅ |
| DPA:er med alla leverantörer | K | ✅ |
| Dagliga backuper (Supabase) | T | ✅ |
| Granskningsloggning (Intric) | R | ✅ |
| Metadataborttagning vid LLM-anrop | K | ✅ |

### 4.2 Rekommenderade åtgärder (att genomföra)

| Åtgärd | Täcker | Prioritet |
|--------|--------|-----------|
| MFA/SSO för alla användare | K | Hög |
| Automatisk konversationsgallring (90 dagar) | K | Hög |
| EU/svenska AI-modeller som standard | K | Hög |
| PII-redigering på känsliga Spaces | K | Medel |
| Exitstrategi dokumenterad | T | Medel |
| Årlig penetrationstest av AI-hubben | K, R | Låg |

---

## 5. Notering om KLASSA-verktyget

Denna klassificering är gjord manuellt baserat på KLASSA:s metodik. För att formalisera:

1. Registrera Katrineholms kommun i KLASSA (klassa@skr.se)
2. Licensavgift: ~17 000 kr/år (Medium-kommun, 1 501–4 000 anställda)
3. Mata in klassificeringen i verktyget
4. Generera åtgärdsplan och upphandlingskrav

KLASSA 5 har stöd för NIS2/cybersäkerhetslagen i sina kravkataloger.
