# AI-riskklassificering — AI-hubben

> Enligt EU:s AI-förordning (2024/1689), Artikel 6 och Annex III
> Ansvarig: Digitaliseringsavdelningen, Katrineholms kommun
> Senast uppdaterad: 2026-03-26
> Ska granskas minst en gång per år, nästa granskning: 2026-09-01

---

## 1. Översikt

| Funktion | Leverantör | AI-system? | Risknivå | Annex III |
|----------|-----------|------------|----------|-----------|
| AI-assistenter (chatbotar) | Intric AB | Ja | Begränsad risk | Ej tillämplig |
| AI-akademin (quiz, certifikat) | Eget (regelbaserat) | Nej* | Minimal risk | Ej tillämplig |
| Kunskapsbank | Eget (statiskt) | Nej | Utanför AI-förordningen | — |
| Statistikdashboard | Eget (datavisning) | Nej | Utanför AI-förordningen | — |
| Nyheter, dokumentation | Eget (CMS) | Nej | Utanför AI-förordningen | — |
| Webbanalys | Umami Cloud | Nej | Utanför AI-förordningen | — |

*Quiz-modulen använder fördefinierade frågor och svar, ingen AI-modell för bedömning.

---

## 2. Detaljerad bedömning

### 2.1 AI-assistenter (Intric)

| Fält | Värde |
|------|-------|
| **System** | Intric AI-assistenter (Marketplace + kommunspecifika) |
| **Leverantör** | Intric AB |
| **Syfte** | Ge kommunanställda svar på frågor om verksamheten, regelverk och processer |
| **AI-modell** | Generativ AI (LLM) via Intric-plattformen |
| **Riskklass** | **Begränsad risk** — AI-system som interagerar direkt med fysiska personer (Art. 50.1) |
| **Annex III** | Ej tillämplig — assistenterna fattar inga beslut om tillgång till tjänster, utbildning eller anställning |
| **Motivering** | Informationsassistent i rådgivande roll. Användaren fattar egna beslut baserat på svaren. Ingen automatiserad beslutsfattning. |
| **Transparensåtgärd** | ✅ Implementerat: AI-transparensmeddelanden på chatwidget, assistentdetaljsida och assistentbibliotek |
| **Mänsklig tillsyn** | Administratörer granskar assistenternas konfiguration. Användare uppmanas granska AI-genererade svar. |
| **Dataskydd** | Konversationsdata hanteras av Intric. DPA med Intric ska verifieras. |
| **Risk: Felaktiga svar** | Sannolikhet: Medel. Konsekvens: Låg (rådgivande, ej beslutsfattande). Åtgärd: Transparensmeddelande uppmanar till granskning. |
| **Risk: Bias** | Sannolikhet: Låg. Konsekvens: Låg. Åtgärd: Regelbunden granskning av svarskvalitet. |

### 2.2 AI-akademin

| Fält | Värde |
|------|-------|
| **System** | Utbildningsplattform med kurser, quiz och certifikat |
| **Leverantör** | Eget (del av AI-hubben) |
| **Syfte** | Utbilda kommunanställda i AI-kompetens |
| **AI-modell** | Ingen — regelbaserade quiz med fördefinierade svar |
| **Riskklass** | **Minimal risk** |
| **Motivering** | Inga AI-modeller används för bedömning eller poängsättning. Quiz har fasta rätta svar. Certifikat är interna kompetensintyg utan rättslig verkan — de påverkar inte tillgång till utbildning, anställning eller befordran. |
| **Notering** | Om AI-baserad bedömning eller adaptiv inlärning införs i framtiden, ska riskklassificeringen omvärderas — det kan medföra hög risk enligt Annex III punkt 3 (utbildning). |

---

## 3. Samlad bedömning

AI-hubbens funktioner faller i kategorierna **begränsad risk** och **minimal risk**. Inga funktioner klassificeras som hög risk eller oacceptabel risk.

**Primär skyldighet:** Transparens (Art. 50) — att informera användare när de interagerar med AI-system. Detta är implementerat.

**Inga krav på:**
- Konformitetsbedömning (CE-märkning)
- Riskhanteringssystem enligt Art. 9
- Kvalitetsledningssystem enligt Art. 17
- Teknisk dokumentation enligt Annex IV

---

## 4. Villkor för omklassificering

Riskklassificeringen ska omvärderas om:

1. AI-assistenterna börjar användas för **beslutsfattande** (inte bara rådgivning)
2. Quiz/certifikat börjar påverka **anställning, befordran eller tillgång till utbildning**
3. **Medborgare** (inte bara anställda) börjar interagera med AI-assistenterna för att få tillgång till kommunala tjänster
4. **Ny AI-funktionalitet** läggs till (t.ex. AI-genererade kurser, automatisk bedömning)
5. AI-förordningens delegerade akter eller nationella implementering ändrar klassificeringen

---

## 5. Referenser

- [EU AI Act, Artikel 6 & Annex III](https://artificialintelligenceact.eu/annex/iii/)
- [EU AI Act, Artikel 50 — Transparens](https://artificialintelligenceact.eu/article/50/)
- [DIGG: Förbered verksamheten inför AI-förordningen](https://www.digg.se/ai-for-offentlig-forvaltning/riktlinjer-for-generativ-ai/forbered-verksamheten-infor-ai-forordningen)
