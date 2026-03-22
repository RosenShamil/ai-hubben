/** "Visste du att..." fun facts for each concept */
export const FUN_FACTS: Record<string, string> = {
  // =========================================================================
  // 1. IT-GRUNDERNA
  // =========================================================================
  "server":
    "De första servrarna på 1960-talet fyllde hela rum. Idag kan en server som ryms i din handflata vara kraftfullare än alla datorer som användes för att landa på månen.",
  "databas":
    "Den första databasen skapades av IBM 1966 för NASA:s Apollo-program. Idag hanterar Googles databaser över 100 petabyte data — det motsvarar ungefär 100 miljoner timmar musik.",
  "molntjanst":
    "Begreppet 'molnet' myntades redan 1996 av Compaq-chefer i ett internt dokument, men det tog nästan 10 år innan Amazon Web Services lanserades och gjorde det till verklighet.",
  "webblasare":
    "Den första webbläsaren hette WorldWideWeb och skapades 1990 av Tim Berners-Lee. Den kunde både visa och redigera webbsidor — något som dagens webbläsare fortfarande inte gör lika smidigt.",
  "url":
    "Den allra första URL:en pekade till CERN:s webbplats och laddades 1991. Tim Berners-Lee har sagt att han ångrar de dubbla snedstrecken (//) — de var onödiga men fastnade av tradition.",
  "http-https":
    "HTTPS blev standard på webben först 2018 när Google Chrome började varna för osäkra HTTP-sidor. Innan dess skickades de flesta lösenord okrypterat över internet.",
  "dns":
    "DNS hanterar över 600 miljarder förfrågningar per dag globalt. Innan DNS fanns (före 1983) behövde varje dator ha en manuellt uppdaterad textfil med alla adresser på internet.",
  "kryptering":
    "Caesar använde kryptering redan 50 f.Kr. — han flyttade varje bokstav 3 steg i alfabetet. Modern kryptering som AES-256 har fler möjliga nycklar än det finns atomer i det observerbara universum.",
  "vpn":
    "VPN-tekniken skapades 1996 av en Microsoft-anställd. Under pandemin ökade VPN-användningen globalt med över 150 % på bara några veckor.",
  "tvafaktor":
    "Tvåfaktorsautentisering minskar risken för kontokapning med över 99 % enligt Google. Ändå använder bara en bråkdel av alla internetanvändare det.",
  "cookies":
    "Cookies uppfanns 1994 av Lou Montulli på Netscape. Det ursprungliga syftet var att lösa ett kundvagnsproblem i nätbutiker — inte att spåra användare.",
  "cache":
    "Cache-minne i moderna processorer är så snabbt att det kan leverera data på under en nanosekund — det är snabbare än ljuset hinner resa 30 centimeter.",
  "brandvagg":
    "Begreppet 'brandvägg' kommer från byggindustrin — en fysisk vägg som hindrar eld från att sprida sig mellan byggnader. Den digitala varianten dök upp på 1980-talet.",
  "ip-adress":
    "Vi håller på att få slut på IPv4-adresser (4,3 miljarder). IPv6 löser det med 340 sextiljoner adresser — det räcker för att ge varje atom på jordens yta en egen IP-adress.",
  "saas":
    "Salesforce var en av de första SaaS-tjänsterna 1999 och kampanjade med skylten 'No Software'. Idag är SaaS en global marknad värd över 200 miljarder dollar.",

  // =========================================================================
  // 2. AI-GRUNDERNA
  // =========================================================================
  "ai":
    "Begreppet 'artificiell intelligens' myntades 1956 vid en sommarkonferens på Dartmouth College. Forskarna trodde då att problemet skulle lösas 'inom en generation'.",
  "maskininlarning":
    "Arthur Samuel myntade begreppet 'maskininlärning' 1959 när han byggde ett program som lärde sig spela dam bättre än sin skapare.",
  "neurala-natverk":
    "Den mänskliga hjärnan har ungefär 86 miljarder neuroner. GPT-4 uppskattas ha runt 1,7 biljoner parametrar — men fungerar ändå helt annorlunda än en biologisk hjärna.",
  "deep-learning":
    "Deep learning fanns som idé redan på 1960-talet men tog inte fart förrän 2012, då ett djupt nätverk plötsligt vann en bildtävling med överlägsen marginal.",
  "ai-modell":
    "OpenAI:s GPT-4 beräknas ha kostat över 100 miljoner dollar att träna. Att köra modellen kostar sedan bråkdelar av en krona per fråga.",
  "traningsdata":
    "GPT-3 tränades på cirka 570 GB ren text — det motsvarar ungefär 300 miljarder ord eller alla Wikipedias artiklar multiplicerat med 50.",
  "algoritm":
    "Ordet 'algoritm' kommer från den persiske matematikern al-Khwarizmi som levde på 800-talet. Hans bok om algebra lade grunden för moderna beräkningar.",
  "overvakad-inlarning":
    "ImageNet, ett av de mest kända dataseten för övervakad inlärning, tog tre år att skapa och krävde att miljontals bilder märktes av tiotusentals volontärer.",
  "oovervakad-inlarning":
    "Spotifys algoritmiska spellistor som 'Discover Weekly' bygger delvis på oövervakad inlärning — den grupperar låtar utan att någon sagt vilka genrer de tillhör.",
  "forstarkningsinlarning":
    "DeepMinds AlphaGo, tränad med förstärkningsinlärning, slog världsmästaren i Go 2016 — ett spel med fler möjliga ställningar än atomer i universum.",
  "datorseende":
    "Datorseende kan nu identifiera hudcancer med samma noggrannhet som erfarna dermatologer, enligt studier publicerade i Nature.",
  "nlp":
    "Den första chatboten, ELIZA, skapades 1966 och kunde föra enkla terapisamtal. Användare blev förvånandsvärt emotionellt engagerade trots att programmet bara matchade nyckelord.",

  // =========================================================================
  // 3. SPRÅKMODELLER & GENERATIV AI
  // =========================================================================
  "llm":
    "GPT-4 beräknas ha tränats på över 13 biljoner tokens. Det skulle ta en människa som läser dygnet runt ungefär 26 000 år att läsa igenom samma mängd text.",
  "gpt":
    "GPT-1 från 2018 hade 117 miljoner parametrar. Bara fem år senare hade GPT-4 troligen över 1 biljon — en ökning på nästan 10 000 gånger.",
  "transformer":
    "Forskningsartikeln 'Attention Is All You Need' från 2017 som introducerade transformer-arkitekturen har citerats över 100 000 gånger — en av de mest inflytelserika AI-artiklarna någonsin.",
  "attention":
    "Attention-mekanismen inspirerades av hur människor fokuserar på relevanta delar av information. Titeln 'Attention Is All You Need' var tänkt som en provokation — och den förändrade hela AI-fältet.",
  "generativ-ai":
    "Marknaden för generativ AI förväntas växa från 40 miljarder dollar 2022 till över 1 300 miljarder dollar 2032 — en av de snabbaste tillväxterna i teknikhistorien.",
  "token":
    "Det svenska ordet 'Katrineholm' blir oftast 3-4 tokens i engelsktränade modeller. Vanliga engelska ord som 'the' och 'a' är nästan alltid en enda token.",
  "kontextfonster":
    "GPT-4 kan hantera ungefär 128 000 tokens — det motsvarar ungefär en hel Harry Potter-bok i ett enda samtal. Gemini 1.5 Pro kan hantera 2 miljoner tokens.",
  "temperatur":
    "Vid temperatur 0 ger AI:n exakt samma svar varje gång du ställer samma fråga. Vid temperatur nära 2 kan svaren bli närmast surrealistiska och osammanhängande.",
  "top-p":
    "Top-p uppfanns 2018 av Ari Holtzman med kollegor som ett alternativ till temperatur. Deras paper hette 'The Curious Case of Neural Text Degeneration'.",
  "systemprompt":
    "ChatGPT:s systemprompt har läckt flera gånger och visar sig vara överraskande lång och detaljerad — med instruktioner om allt från ton till vad den inte får prata om.",
  "multimodal-ai":
    "GPT-4V kan beskriva bilder med sådan precision att synskadade användare har börjat använda det som ett dagligt hjälpmedel via appen 'Be My Eyes'.",
  "grundmodell":
    "Begreppet 'foundation model' myntades 2021 av Stanford-forskare för att beskriva modeller som GPT och BERT — allmänna modeller som kan specialiseras för tusentals uppgifter.",
  "parametrar":
    "GPT-3 har 175 miljarder parametrar. Om varje parameter vore en sandkorn skulle de fylla ungefär 175 badkar — och GPT-4 har troligen tio gånger fler.",
  "hallucination":
    "En amerikansk advokat lämnade in en rättslig skrift med sex helt påhittade rättsfall som ChatGPT fabricerat. Domaren var inte imponerad.",
  "grounding":
    "Microsofts Bing Chat (nu Copilot) var en av de första att visa källhänvisningar för varje påstående — just för att minska hallucinationer genom grounding.",

  // =========================================================================
  // 4. AI PÅ JOBBET
  // =========================================================================
  "ai-assistent":
    "Antalet dagliga ChatGPT-användare passerade 100 miljoner inom bara två månader efter lanseringen — det snabbaste en app någonsin nått den milstolpen.",
  "prompt":
    "Yrket 'prompt engineer' dök upp 2023 med löner på över en miljon kronor per år i Silicon Valley. Det handlar om konsten att kommunicera effektivt med AI.",
  "promptteknik":
    "Studier visar att en välformulerad prompt kan förbättra AI:ns svar med upp till 50 % jämfört med en enkel fråga — kontext och tydlighet gör enorm skillnad.",
  "chatbot":
    "Den första chatboten ELIZA (1966) var så övertygande att folk insisterade på att den verkligen förstod dem — trots att den bara matchade nyckelord.",
  "copilot-begrepp":
    "Microsofts val av namnet 'Copilot' var medvetet — termen kommer från flygvärlden och betonar att AI:n är en medhjälpare, inte en pilot som tar över styrningen.",
  "automatisering":
    "McKinsey uppskattar att ungefär 60 % av alla yrken har minst 30 % av sina arbetsuppgifter som kan automatiseras med befintlig teknik.",
  "sammanfattning":
    "AI kan sammanfatta en 100-sidig rapport på under 30 sekunder. En människa behöver i snitt 3-4 timmar för samma uppgift.",
  "textgenerering":
    "Redan 2023 uppskattades att över 10 % av allt nytt textinnehåll på internet var AI-genererat. Andelen ökar snabbt.",
  "transkribering":
    "OpenAI:s Whisper-modell kan transkribera tal på över 90 språk. Den tränades på 680 000 timmar inspelat tal — det motsvarar nästan 78 år av kontinuerligt lyssnande.",
  "motessammanfattning":
    "Den genomsnittlige kontorsarbetaren tillbringar ungefär 31 timmar per månad i möten. AI-sammanfattning kan spara upp till 4 timmar per vecka i mötesrelaterat arbete.",
  "ai-beslutsfattande":
    "Estland var ett av de första länderna att använda AI i offentliga beslut — deras AI-domare hanterar småtvister under 7 000 euro sedan 2019.",
  "arendehantering-ai":
    "Helsingborgs stad var en av de första svenska kommunerna att testa AI för ärendehantering och kunde minska svarstiderna med upp till 40 %.",
  "bildgenerering":
    "Ett AI-genererat konstverk vann första pris i en konsttävling i Colorado 2022 — och startade en enorm debatt om vad som räknas som konst.",
  "ocr":
    "OCR-tekniken har rötter från 1914 då Emanuel Goldberg utvecklade en maskin som kunde läsa tecken. Idag kan OCR-AI läsa handskrift med över 95 % noggrannhet.",
  "sentimentanalys":
    "Sentimentanalys kan avgöra känslan i en tweet med ungefär 80-85 % träffsäkerhet — men har fortfarande svårt med ironi och sarkasm.",
  "ai-agent":
    "År 2024 började AI-agenter för första gången klara av att boka resor, handla och utföra administrativa uppgifter helt självständigt via webbläsare.",

  // =========================================================================
  // 5. INTRIC-PLATTFORMEN
  // =========================================================================
  "intric-plattform":
    "Intric är byggt i Sverige och all data lagras inom EU. Plattformen utvecklades specifikt för att möta den offentliga sektorns krav på GDPR-efterlevnad och informationssäkerhet.",
  "intric-space":
    "Spaces i Intric fungerar som virtuella teamrum där du kan blanda assistenter, kunskap och kollegor — allt med rollbaserad åtkomstkontroll.",
  "intric-assistent":
    "En Intric-assistent kan kopplas till flera kunskapskällor samtidigt och byta språkmodell med ett klick — utan att du behöver konfigurera om något annat.",
  "intric-kunskap":
    "Intric kan omvandla hundratals dokument till sökbar kunskap på några minuter. Dokumenten delas automatiskt i bitar, vektoriseras och indexeras.",
  "intric-samling":
    "Varje samling i Intric har sin egen embeddingmodell, vilket betyder att du kan optimera sökningen för just den typen av innehåll du laddat upp.",
  "sakerhetsklasser":
    "Intrics säkerhetsklasser gör att du kan styra vilka AI-modeller som får användas beroende på hur känslig informationen är — från öppna modeller till strikt EU-baserade.",
  "intric-roller":
    "Med tre rollnivåer (Admin, Redigerare, Läsare) kan en organisation ge rätt personer rätt behörighet — precis som man gör med dokument i SharePoint.",
  "intric-personlig-chatt":
    "I Intrics personliga chatt kan du fritt byta mellan olika AI-modeller mitt i konversationen — perfekt för att jämföra hur olika modeller svarar.",
  "intric-bilagor-kunskap":
    "Skillnaden mellan bilagor och kunskap i Intric är avgörande: bilagor läses alltid, kunskap söks vid behov. Att förstå detta kan göra din assistent markant bättre.",
  "intric-plans":
    "Intric Plans kan köra flerstegsprocesser helt i bakgrunden — till exempel analysera ett dokument, sammanfatta det, och sedan skicka ett mejl med resultatet.",
  "intric-marketplace":
    "Via Intric Marketplace kan svenska kommuner dela färdiga AI-assistenter med varandra — en assistent byggd i en kommun kan återanvändas direkt av en annan.",
  "intric-arena":
    "Intric Arena samlar ambassadörer och användare från hela Sverige i branschspecifika grupper — HR, vård, utbildning, ekonomi och IT-säkerhet.",
  "intric-redacting":
    "Intrics redacting-funktion kan automatiskt upptäcka och maskera personnummer, telefonnummer och adresser innan AI:n analyserar en text.",
  "intric-data-retention":
    "Med Intrics data retention kan du ställa in att konversationer raderas efter 7, 30 eller 365 dagar — data förstörs permanent och kan inte återställas.",

  // =========================================================================
  // 6. MICROSOFT COPILOT & 365
  // =========================================================================
  "m365-copilot":
    "Microsoft investerade 13 miljarder dollar i OpenAI för att driva Copilot. Det är en av de största investeringarna i AI-historia.",
  "microsoft-graph":
    "Microsoft Graph innehåller data från över 400 miljoner betalande Microsoft 365-användare och deras mejl, filer, chattar och kalendrar.",
  "semantic-index":
    "Semantic Index gör att Copilot kan hitta ett dokument även om du inte minns exakt vad det hette — det räcker att beskriva vad det handlade om.",
  "copilot-outlook":
    "Copilot i Outlook kan sammanfatta en mejltråd med 30 meddelanden till en handfull punkter och föreslå ett svar — på under 10 sekunder.",
  "copilot-teams":
    "Copilot i Teams kan svara på frågor som 'vad missade jag?' om du anslöt sent till ett möte, baserat på realtidstranskribering.",
  "copilot-word":
    "Copilot i Word kan skapa ett första utkast av ett 10-sidigt dokument baserat på en kort beskrivning och dina befintliga filer som referens.",
  "copilot-excel":
    "Copilot i Excel kan skapa komplexa pivottabeller och diagram bara genom att du skriver 'visa försäljning per region i ett diagram' i naturligt språk.",
  "copilot-powerpoint":
    "Copilot i PowerPoint kan omvandla ett Word-dokument till en komplett presentation med layout, bilder och talarpunkter på under en minut.",
  "copilot-studio":
    "Copilot Studio gör det möjligt att bygga egna AI-agenter utan att kunna programmera. Microsoft kallar det 'low-code AI development'.",
  "copilot-agenter":
    "Copilot-agenter kan kopplas till specifika datakällor och affärsregler — en HR-agent har till exempel bara tillgång till HR-relaterade dokument och policies.",
  "copilot-kopplingar":
    "Microsoft erbjuder över 1 000 färdiga kopplingar till externa system som Salesforce, SAP och ServiceNow — data indexeras i Graph och blir sökbar via Copilot.",
  "microsoft-purview":
    "Microsoft Purview kan automatiskt klassificera och märka dokument med känslighetsnivåer — och ser till att Copilot aldrig visar information du inte har behörighet att se.",

  // =========================================================================
  // 7. TEKNIK & INFRASTRUKTUR
  // =========================================================================
  "api":
    "Över 80 % av all internettrafik passerar genom API:er. Varje gång du kollar väder på mobilen, gör en Swish-betalning eller söker på Google används ett API.",
  "rest-api":
    "REST-arkitekturen definierades år 2000 av Roy Fielding i hans doktorsavhandling. Det blev internets dominerande standard för kommunikation mellan system.",
  "mcp-server":
    "MCP (Model Context Protocol) lanserades 2024 av Anthropic som en öppen standard. Målet är att göra det lika enkelt att koppla AI till verktyg som det är att koppla in en USB-sladd.",
  "integration":
    "Den genomsnittliga organisationen använder över 100 olika SaaS-tjänster. Utan integrationer skulle anställda behöva kopiera data manuellt mellan alla dessa system.",
  "open-source":
    "Över 90 % av alla företag använder open source-mjukvara. Linux, som är open source, driver majoriteten av alla servrar och alla Android-telefoner.",
  "proprietar":
    "Coca-Colas recept har hållits hemligt sedan 1886. På samma sätt skyddar företag som OpenAI sina AI-modellers arkitektur — det är deras konkurrensfördelar.",
  "lokal-ai-vs-moln":
    "En lokal AI-server med en kraftfull GPU kan kosta från 50 000 kr och uppåt. Moln-AI kostar bråkdelar per fråga men kräver att data skickas till en extern leverantör.",
  "gpu":
    "NVIDIA:s aktie steg över 3 000 % mellan 2019 och 2024 tack vare AI-boomen. Deras GPU:er är så efterfrågade att leveranstiden kan vara månader.",
  "server-instans":
    "En enda modern molnserver kan hantera tusentals samtidiga AI-konversationer. Under ChatGPT:s första veckor krävdes uppskattningsvis tiotusentals GPU:er.",
  "on-premises":
    "Flera svenska myndigheter kräver on-premises-drift för känsliga AI-system. Det ger maximal kontroll men kräver egen personal för drift och underhåll.",
  "deployment":
    "Netflix gör tusentals deployments per dag. Moderna CI/CD-pipelines gör det möjligt att uppdatera system utan att användarna märker något.",
  "sso":
    "En genomsnittlig kontorsarbetare har 80-100 lösenord att hålla reda på. SSO löser detta genom att en enda inloggning ger tillgång till alla system.",
  "rbac":
    "RBAC-konceptet formaliserades av NIST 1992. Idag används det av i princip alla större IT-system, från molntjänster till sjukhusjournal-system.",
  "interoperabilitet":
    "EU:s Interoperability Act (2024) kräver att offentliga digitala tjänster ska kunna kommunicera sömlöst — ett steg mot att kommuners system pratar samma språk.",
  "pwa":
    "Starbucks PWA är 99,84 % mindre än sin iOS-app men erbjuder nästan samma funktionalitet. PWA:er fungerar offline, kan installeras och skickar push-notiser.",
  "json-xml":
    "JSON skapades av Douglas Crockford runt 2001 som ett enklare alternativ till XML. Idag används JSON i över 90 % av alla webb-API:er — XML var helt dominerande innan dess.",

  // =========================================================================
  // 8. DATA & SÖKNING
  // =========================================================================
  "rag":
    "RAG introducerades av Meta AI 2020 och har blivit den mest populära metoden för att ge AI tillgång till aktuell och organisationsspecifik information.",
  "embeddings":
    "Embedding-modeller kan fånga nyanser som att 'kung' minus 'man' plus 'kvinna' ungefär ger 'drottning'. Orden bildar meningsfulla mönster i ett matematiskt rum.",
  "vektordatabas":
    "Vektordatabaser som Pinecone och Weaviate har blivit en helt ny databasindustri sedan 2023. Marknaden förväntas växa explosionsartat de närmaste åren.",
  "semantisk-sokning":
    "Semantisk sökning kan hitta dokument om 'budgetproblem' även om texten bara nämner 'kostnadsöverskridanden' — den förstår betydelse, inte bara exakta ord.",
  "chunking":
    "Rätt chunk-storlek kan göra enorm skillnad för AI:ns svar. För stora chunks ger otydliga svar, för små chunks tappar sammanhanget. Typiskt funkar 500-1000 tokens bäst.",
  "kunskapsbas":
    "En väl underhållen kunskapsbas kan minska hallucinationer med upp till 90 % jämfört med att låta AI:n svara enbart från sin träningsdata.",
  "verksamhetssystem":
    "Svenska kommuner använder i snitt 200-400 olika IT-system. AI kan bli den röda tråden som kopplar ihop och tillgängliggör information från alla dessa system.",
  "strukturerad-ostrukturerad":
    "Ungefär 80-90 % av all data i världen är ostrukturerad — e-post, dokument, bilder och ljud. AI har blivit den första tekniken som verkligen kan hantera denna datamängd.",
  "metadata":
    "Metadata kan avslöja mer än du tror. Edward Snowden visade att enbart metadata från telefonsamtal (vem, när, hur länge) kan kartlägga hela sociala nätverk.",
  "oppna-data":
    "Sverige var ett av de första länderna att öppna sin statistik. SCB har publicerat data sedan 1749 — det gör det till en av världens äldsta statistikbyråer.",
  "dataflode":
    "GDPR kräver att organisationer kan rita upp och dokumentera alla sina dataflöden. Många organisationer upptäcker då att deras data tar oväntade omvägar.",
  "webbcrawling":
    "Googles webbcrawler upptäcker och indexerar hundratals miljarder webbsidor. Internet beräknas innehålla över 5 miljarder webbsidor — och växer med miljontals nya varje dag.",

  // =========================================================================
  // 9. LAGAR & REGLER
  // =========================================================================
  "gdpr":
    "Den högsta GDPR-bötern hittills var 1,2 miljarder euro — till Meta 2023 för olaglig överföring av persondata till USA. GDPR har inspirerat liknande lagar världen över.",
  "ai-act":
    "EU:s AI Act är världens första heltäckande AI-lag. Den antogs i mars 2024 och kan ge böter på upp till 35 miljoner euro eller 7 % av global omsättning.",
  "ai-act-riskkategorier":
    "Social scoring som i Kinas poängsystem är helt förbjudet under AI Act. AI i sjukvård, utbildning och rättsväsende klassas som högrisk med strikta krav.",
  "ai-act-litteracitet":
    "Sedan februari 2025 måste alla organisationer som använder AI se till att personalen har tillräcklig AI-kompetens — det gäller även kommuner.",
  "ai-act-fria":
    "FRIA (Fundamental Rights Impact Assessment) är obligatoriskt för offentliga organ som vill använda högrisk-AI. Det liknar en DPIA men fokuserar på grundläggande rättigheter.",
  "offentlighetsprincipen-ai":
    "I Sverige är chattar med kommunens AI-assistenter potentiella allmänna handlingar. Det betyder att vem som helst kan begära ut dem — tänk på det innan du promptar.",
  "personuppgiftsansvarig":
    "Kommunen är alltid personuppgiftsansvarig för sin AI-användning — oavsett vilken leverantör som tillhandahåller AI-tjänsten. Ansvaret kan inte delegeras bort.",
  "personuppgiftsbitrade":
    "Ett PUB-avtal (personuppgiftsbiträdesavtal) är inte valfritt utan ett lagkrav enligt GDPR artikel 28. Att använda en AI-tjänst utan PUB-avtal kan leda till sanktioner.",
  "dpia":
    "En konsekvensbedömning (DPIA) kan förhindra kostsamma misstag. Brittiska ICO rapporterade att organisationer som genomför DPIA:er har betydligt färre dataskyddsincidenter.",
  "dataskyddsombud":
    "Alla svenska kommuner och myndigheter måste ha ett dataskyddsombud enligt GDPR. Ombudet ska vara oberoende och får inte straffas för att utföra sitt uppdrag.",
  "tredjelandsoverforing":
    "Efter Schrems II-domen 2020 ogiltigförklarades Privacy Shield mellan EU och USA. Det skapade kaos för tusentals företag som använde amerikanska molntjänster.",
  "rattslig-grund":
    "GDPR har sex rättsliga grunder för behandling av personuppgifter. 'Berättigat intresse' är den vanligaste för företag, men kommuner använder oftast 'allmänt intresse' eller 'rättslig förpliktelse'.",
  "informationsklassificering":
    "MSB (Myndigheten för samhällsskydd och beredskap) rekommenderar fyra klassificeringsnivåer för information. Rätt klassificering avgör vilka AI-verktyg du får använda.",
  "ansvarsfragor":
    "Om en kommunal AI-assistent ger felaktiga råd till en medborgare är det kommunen — inte AI-leverantören — som bär det juridiska ansvaret.",
  "offentlig-upphandling-ai":
    "Upphandlingsmyndigheten har tagit fram vägledning specifikt för AI-upphandling. Krav på transparens, GDPR-efterlevnad och AI Act-kompatibilitet blir allt vanligare i förfrågningsunderlag.",
  "privacy-by-design":
    "Privacy by Design skapades av Ann Cavoukian redan 1995 och blev sedan lag genom GDPR artikel 25. Principen handlar om att bygga in integritet från start, inte som en eftertanke.",

  // =========================================================================
  // 10. SÄKERHET & ETIK
  // =========================================================================
  "bias":
    "Amazons AI-rekryteringsverktyg stängdes ner 2018 efter att det visade sig diskriminera kvinnor — det hade tränats på historisk rekryteringsdata som dominerades av män.",
  "transparens":
    "AI Act kräver att alla chatbotar tydligt informerar användaren om att de pratar med en AI. Straffet för att inte göra det kan bli böter på upp till 15 miljoner euro.",
  "ansvarsfull-ai":
    "UNESCO antog den första globala rekommendationen om AI-etik 2021, undertecknad av 193 länder. Den betonar mänskliga rättigheter, transparens och ekologisk hållbarhet.",
  "informationssakerhet":
    "Samsung förbjöd anställda att använda ChatGPT efter att känslig källkod av misstag delats med tjänsten 2023. Det blev ett varnande exempel för hela världen.",
  "ai-sekretess":
    "I februari 2023 rapporterade forskare att ChatGPT-konversationer kunde rekonstrueras av tredje part under vissa omständigheter — en påminnelse om att aldrig dela hemligheter med extern AI.",
  "upphovsratt":
    "The New York Times stämde OpenAI 2023 för upphovsrättsintrång. Tidningen visade att ChatGPT kunde återge artiklar nästan ordagrant — frågan om AI och upphovsrätt är fortfarande olöst.",
  "kallkritik":
    "En studie visade att AI-genererad text uppfattas som mer trovärdig än mänskligt skriven text av en majoritet av läsarna — vilket gör källkritik ännu viktigare.",
  "deepfakes":
    "I januari 2024 lurades en anställd på ett multinationellt företag att överföra 25 miljoner dollar efter ett videosamtal med deepfake-versioner av sina kollegor.",
  "prompt-injection":
    "Forskare har visat att osynlig text i dokument kan lura AI-assistenter att ignorera sina instruktioner. Det gör prompt injection till ett av de allvarligaste AI-säkerhetshoten.",
  "jailbreaking":
    "Communityn har gett kreativa namn åt jailbreak-metoder som 'DAN' (Do Anything Now) och 'Grandma Exploit'. AI-företagen lappar ständigt nya sårbarheter.",
  "svarta-ladan":
    "Inte ens forskarna som bygger stora AI-modeller kan fullt ut förklara varför modellen ger ett specifikt svar. Det kallas ibland 'the interpretability problem'.",
  "forklarbar-ai":
    "EU:s AI Act kräver att högrisk-AI kan förklara sina beslut. Det har gjort förklarbar AI till ett av de snabbast växande forskningsområdena inom maskininlärning.",
  "mansklig-kontroll":
    "Alla svenska myndigheter som använder AI för beslut som rör medborgare måste säkerställa att en människa alltid kan granska och övertrumfa AI:ns rekommendation.",
  "overtro-ai":
    "Studier visar att människor som använder AI-verktyg dagligen gradvis blir sämre på att ifrågasätta AI:ns svar — ett fenomen forskare kallar 'automation bias'.",

  // =========================================================================
  // 11. VERKTYG & PLATTFORMAR
  // =========================================================================
  "chatgpt":
    "ChatGPT nådde 100 miljoner användare på bara två månader efter lanseringen i november 2022. Det är den snabbast växande konsumentappen i historien.",
  "claude":
    "Anthropic, företaget bakom Claude, grundades 2021 av Dario och Daniela Amodei som tidigare arbetade på OpenAI. Claude är uppkallad efter Claude Shannon, informationsteorins fader.",
  "gemini":
    "Google bytte namn från Bard till Gemini i februari 2024. Gemini Pro kan analysera upp till en timmes video och 11 timmar ljud i ett enda anrop.",
  "gpt-sw3":
    "GPT-SW3 tränades på 320 miljarder tokens nordisk text av AI Sweden. Det är den största svenska språkmodellen och är helt öppen för alla att använda.",
  "llama":
    "Metas Llama-modeller laddades ner av forskare miljontals gånger bara de första veckorna. Llama 3 släpptes som open source och driver idag tusentals lokala AI-lösningar.",
  "mistral":
    "Mistral AI grundades 2023 i Paris och blev Europas mest värdefulla AI-startup på under ett år. Deras modeller är kända för att prestera oväntat bra trots sin storlek.",
  "azure-openai":
    "Azure OpenAI kör GPT-modellerna i Microsofts EU-datacenter. Data stannar inom EU och Microsoft garanterar att den inte används för att träna modeller.",
  "hugging-face":
    "Hugging Face startade 2016 som en chatbot-app för tonåringar. Idag hostar de över 500 000 AI-modeller och är värderade till flera miljarder dollar.",
  "ai-hubben":
    "AI-hubben är Katrineholms kommuns egenutvecklade AI-plattform — byggd som en PWA så den fungerar som en app på både dator och mobil.",
  "ollama":
    "Med Ollama kan du köra en AI-modell lokalt med ett enda kommando. All data stannar på din egen maskin — perfekt för känslig information som inte får lämna organisationen.",
  "teams-ai":
    "Microsoft Teams har över 320 miljoner aktiva användare. AI-funktionerna i Teams kan spara uppskattningsvis 30 minuter per möte genom automatisk transkribering och sammanfattning.",
  "ai-huset":
    "AI Sweden driver AI-Huset för att bygga AI-kompetens i svenska organisationer. Programmet har hjälpt hundratals ledare att förstå hur AI kan användas strategiskt.",

  // =========================================================================
  // 12. AVANCERADE AI-KONCEPT
  // =========================================================================
  "fine-tuning":
    "OpenAI erbjuder fine-tuning av GPT-modeller till alla kunder. En specialanpassad modell kan prestera lika bra som en mycket större modell på just din specifika uppgift.",
  "rlhf":
    "RLHF (Reinforcement Learning from Human Feedback) var nyckeln till att göra ChatGPT så populärt. Det var inte den underliggande modellen som var ny — det var träningsmontoden.",
  "lora":
    "LoRA gör det möjligt att finjustera en AI-modell med miljarder parametrar på ett enda grafikkort. Innan LoRA krävdes hundratals GPU:er för samma uppgift.",
  "kvantisering":
    "Kvantisering kan krympa en AI-modell till en fjärdedel av sin storlek med bara 1-2 % kvalitetsförlust. Det gör det möjligt att köra modeller lokalt som annars kräver datacenter.",
  "knowledge-distillation":
    "GPT-4 har troligen använts för att träna mindre modeller genom distillation. OpenAI:s policy förbjuder detta explicit, men det är svårt att kontrollera.",
  "inferens":
    "Inferens (att köra en AI-modell) kostar en bråkdel av träningen. Att träna GPT-4 kostade uppskattningsvis 100 miljoner dollar, men varje fråga kostar bara bråkdelar av en krona.",
  "latens-genomstromning":
    "Moderna AI-API:er kan generera 50-100 tokens per sekund — det är snabbare än de flesta kan läsa. Streaming gör att du ser svaret växa fram i realtid.",
  "cot":
    "Chain-of-Thought-promptning kan förbättra AI:ns prestanda på matematikuppgifter med upp till 40 procentenheter. Det räcker ofta med att lägga till 'tänk steg för steg'.",
  "zero-few-shot":
    "Few-shot learning var en av GPT-3:s stora genombrott 2020. Modellen kunde lösa nya uppgifter med bara 2-3 exempel — utan någon extra träning.",
  "guardrails":
    "OpenAI har ett helt team som arbetar med att testa och förbättra ChatGPT:s guardrails. Trots det hittar användare regelbundet nya vägar runt dem.",
  "constitutional-ai":
    "Anthropics Constitutional AI använder en lista med principer — en slags 'AI-grundlag' — som modellen själv lär sig följa. Det minskar behovet av mänskliga bedömare.",
  "model-collapse":
    "Forskare visade 2023 att AI-modeller som tränats på AI-genererad text successivt förlorar kvalitet — som att kopiera en kopia tills bilden blir oigenkännlig.",
  "syntetisk-data":
    "Gartner förutspår att syntetisk data kommer att överträffa verklig data i AI-träning. Men forskare varnar för att det kan förstärka befintliga bias om man inte är försiktig.",
  "moe":
    "Mixtral, Mistrals MoE-modell, aktiverar bara 2 av 8 expertmoduler per token. Det gör den lika snabb som en liten modell men lika smart som en stor.",

  // =========================================================================
  // EXTRA UTILITY-BEGREPP
  // =========================================================================
  "embeddingmodell":
    "OpenAI:s embeddingmodell text-embedding-3 kan omvandla text till vektorer med upp till 3 072 dimensioner. Jämför det med att vi människor har svårt att tänka i mer än 3 dimensioner.",
  "transkriptionsmodell":
    "OpenAI:s Whisper-modell är helt open source och kan köras lokalt. Den tränades på 680 000 timmar taldata och stödjer över 90 språk — inklusive svenska.",
  "intric-dokument":
    "Intric kan hantera PDF, Word, Excel, PowerPoint och även ljudfiler. Dokument OCR-behandlas automatiskt så att även inskannade papper blir sökbara.",
  "personuppgiftsbehandling":
    "Begreppet 'behandling' i GDPR är extremt brett — att bara titta på personuppgifter på en skärm räknas som behandling. Det gäller även när AI läser text.",

  // =========================================================================
  // TILLAGDA BEGREPP — AI-grunderna
  // =========================================================================
  "transfer-learning":
    "Transfer learning är anledningen till att du inte behöver miljarder datapunkter för att träna en AI. En modell som lärt sig engelska kan snabbt lära sig svenska — precis som tvåspråkiga barn.",
  "sjalvovervakad-inlarning":
    "Självövervakad inlärning är hemligheten bakom GPT-serien. Modellen tränas genom att dölja ord i meningar och gissa dem — enkelt i teorin men revolutionerande i praktiken.",
  "overfitting":
    "Overfitting är så vanligt att det finns ett klassiskt skämt i AI-forskning: 'Min modell har 100 % träffsäkerhet!' — 'Visst, på träningsdata.'",

  // =========================================================================
  // TILLAGDA BEGREPP — Språkmodeller & generativ AI
  // =========================================================================
  "tokenisering":
    "Svenska ord blir ofta fler tokens än engelska eftersom tokenizers vanligtvis tränats på mest engelsk text. 'Hej' är en token men 'Katrineholm' kan bli tre-fyra.",
  "fortraning":
    "Förträning av en stor språkmodell kan ta månader och kosta tiotals miljoner dollar i beräkningskraft. Det är därför så få organisationer i världen kan bygga egna grundmodeller.",
  "streaming":
    "Streaming av AI-svar sparar inte bara tid — forskning visar att användare uppfattar streamade svar som snabbare och mer engagerande, även om totaltiden är densamma.",
  "tool-use":
    "Tool use gör att AI:n inte längre behöver 'veta allt' — den kan istället slå upp aktuell data, räkna med en kalkylator eller kolla väder via API:er.",
  "text-till-video":
    "OpenAI:s Sora visade 2024 att AI kan generera fotorealistiska videoklipp från textbeskrivningar. En minut video som förr krävde ett filmteam kan nu skapas med en prompt.",
  "reasoning-models":
    "OpenAI:s o1-modell och dess efterföljare kan spendera längre tid på att 'tänka' innan den svarar. På matematikproblem presterar den i nivå med doktorander.",
  "diffusionsmodell":
    "Diffusionsmodeller inspirerades av fysik — processen liknar hur en droppe bläck sprider sig i vatten, fast i omvänd riktning: från kaos till ordning.",

  // =========================================================================
  // TILLAGDA BEGREPP — AI på jobbet
  // =========================================================================
  "agentic-ai":
    "Gartner utnämnde agentic AI till en av de viktigaste tekniktrenderna 2025. Skillnaden mot vanliga chatbotar är att agenter kan planera, agera och lära sig av sina misstag.",
  "prompt-mall":
    "Organisationer som skapar delade promptmallar kan minska tiden det tar att skriva en bra prompt med uppskattningsvis 70 % — konsistensen i svaren ökar också markant.",
  "personalisering":
    "Netflixs rekommendationsmotor sparar företaget uppskattningsvis 1 miljard dollar per år genom att minska antalet avslutade prenumerationer. Det är kraften i personalisering.",
  "rekommendationssystem":
    "Amazons 'kunder som köpte detta köpte även' stod för hela 35 % av företagets försäljning. Rekommendationssystem är tysta men extremt lönsamma.",
  "textklassificering":
    "Ditt spamfilter i mejlen är ett av de äldsta exemplen på textklassificering. De första spamfiltren med maskininlärning dök upp redan på 1990-talet.",
  "maskinoversattning":
    "Google Translate lanserades 2006 och hanterar idag över 100 miljarder ord per dag. Den stödjer 133 språk och blev drastiskt bättre 2016 när de bytte till neurala nätverk.",
  "stt":
    "Apples Siri lanserades 2011 som en av de första kommersiella tal-till-text-assistenterna. Idag kan moderna STT-system transkribera med över 95 % noggrannhet på de flesta språk.",
  "tts":
    "Moderna TTS-system är så bra att de kan generera röster som är nästan omöjliga att skilja från riktiga människor. ElevenLabs kan klona en röst från bara 30 sekunder inspelning.",
  "bildigenkanning":
    "Googles bildigenkänning kan identifiera över 10 000 olika objektkategorier. Tekniken används bland annat för att automatiskt organisera alla foton i Google Photos.",
  "objektdetektering":
    "Teslas Autopilot analyserar bilder från åtta kameror samtidigt och identifierar hundratals objekt per sekund — fotgängare, bilar, trafikskyltar och vägmarkeringar.",
  "dataextraktion":
    "Automatisk dataextraktion kan minska manuell dataregistrering med upp till 90 %. Det frigör tid för handläggare att fokusera på kvalificerade bedömningar istället.",
  "anomalidetektering":
    "Kreditkortsföretag använder anomalidetektering i realtid — om ditt kort plötsligt används i ett annat land kan transaktionen stoppas inom millisekunder.",
  "prediktiv-analys":
    "UPS använder prediktiv analys för att optimera leveransrutter och sparar uppskattningsvis 100 miljoner kilometer per år — motsvarande 10 miljoner liter bränsle.",
  "augmentering":
    "Studier visar att AI-augmenterade radiologer hittar cancer med 20 % högre noggrannhet än antingen AI eller radiologer som arbetar ensamma.",
  "poc":
    "En bra PoC (Proof of Concept) bör kunna genomföras på 2-4 veckor. Om det tar längre är det ofta ett tecken på att projektet är för komplext för ett pilottest.",

  // =========================================================================
  // TILLAGDA BEGREPP — Teknik & infrastruktur
  // =========================================================================
  "edge-ai":
    "Din iPhones Face ID körs helt lokalt på telefonens Neural Engine — ett perfekt exempel på edge AI. Ansiktsdata lämnar aldrig din telefon.",
  "orchestration":
    "Kubernetes, ett orchestration-verktyg för containrar, skapades av Google och hanterar idag miljontals containrar världen över. AI-orchestration fungerar på liknande sätt men för AI-agenter.",
  "mlops":
    "Enligt undersökningar misslyckas 87 % av alla AI-projekt innan de når produktion. MLOps finns för att förbättra den siffran genom strukturerade processer för drift och underhåll.",

  // =========================================================================
  // TILLAGDA BEGREPP — Data & sökning
  // =========================================================================
  "knowledge-graph":
    "Googles Knowledge Graph innehåller över 500 miljarder fakta om 5 miljarder entiteter. Det är anledningen till att Google kan svara direkt på frågor som 'hur gammal är kungen?'.",
  "ner":
    "NER (Named Entity Recognition) är grunden för hur AI läser nyheter och automatiskt plockar ut vilka personer, företag och platser som nämns — utan att någon programmerat varje namn.",

  // =========================================================================
  // TILLAGDA BEGREPP — Lagar & regler
  // =========================================================================
  "ai-governance":
    "OECD publicerade sina AI-principer redan 2019, undertecknade av 42 länder. De har blivit en global referenspunkt för ansvarsfull AI-styrning.",
  "anonymisering":
    "Anonymiserad data faller utanför GDPR. Men forskning visar att det ofta krävs förvånansvärt lite information för att återidentifiera individer — redan tre datapunkter kan räcka.",
  "dataminimering":
    "Dataminimering är en av GDPR:s grundprinciper. Tumregeln: samla bara in data du faktiskt behöver, lagra den bara så länge som nödvändigt, och radera den när den inte längre behövs.",

  // =========================================================================
  // TILLAGDA BEGREPP — Säkerhet & etik
  // =========================================================================
  "ai-sakerhet":
    "Anthropic, OpenAI och Google DeepMind har alla dedikerade AI-säkerhetsteam med hundratals forskare. Det är ett av de snabbast växande forskningsområdena inom AI.",
  "alignment":
    "Stuart Russell, en av världens ledande AI-forskare, har sagt att alignment-problemet — att få AI att göra vad vi vill — är den viktigaste frågan mänskligheten står inför.",
  "red-teaming":
    "Innan GPT-4 lanserades anlitade OpenAI över 50 externa red team-experter som under månader försökte bryta modellen. Deras fynd ledde till tusentals säkerhetsförbättringar.",
  "modellgiftning":
    "Forskare har visat att det räcker med att förgifta 0,1 % av träningsdatan för att signifikant påverka en AI-modells beteende — ett oroväckande litet antal.",
  "rostkloning":
    "Det räcker med bara 3-15 sekunder av inspelat tal för moderna röstklonande AI att skapa en övertygande kopia av en persons röst. FBI har varnat för ökande bedrägerifall.",
  "ansiktsigenkanning":
    "EU:s AI Act förbjuder realtidsansiktsigenkänning i offentliga miljöer med vissa undantag. Kina har däremot ett nätverk med över 600 miljoner övervakningskameror med ansiktsigenkänning.",

  // =========================================================================
  // TILLAGDA BEGREPP — Verktyg & plattformar
  // =========================================================================
  "ai-sokning":
    "Perplexity AI lanserades 2022 och utmanar Google genom att ge AI-sammanfattade svar med källhänvisningar. Flera miljoner människor använder det dagligen som sitt primära sökverktyg.",

  // =========================================================================
  // TILLAGDA BEGREPP — Avancerade AI-koncept
  // =========================================================================
  "gan":
    "GAN:s uppfinnare Ian Goodfellow fick idén på en bar 2014. Han gick hem, kodade prototypen på en kväll, och den fungerade direkt. Det räknas som ett av AI-historiens mest lyckade 'eureka'-ögonblick.",
  "cnn":
    "CNN-arkitekturen inspirerades av biologiska experiment på 1960-talet där forskare studerade hur katter bearbetar synintryck. Katternas hjärnceller aktiverades av specifika mönster.",
  "rnn":
    "RNN var länge den dominerande tekniken för språkmodeller, men transformer-arkitekturen ersatte den nästan helt 2017. RNN hade problem med att 'glömma' information i långa texter.",
  "backpropagation":
    "Backpropagation föreslogs redan 1986 av Geoffrey Hinton. Det tog nästan 30 år innan tillräckligt snabba datorer och tillräckligt med data fanns för att verkligen utnyttja tekniken.",
  "loss-function":
    "Att välja rätt loss function är en av de viktigaste besluten när man tränar en AI-modell. Fel loss function kan leda till att modellen optimerar för helt fel sak.",
  "hyperparameter":
    "Hyperparameter-tuning kallas ibland 'den svarta konsten inom AI'. Det finns ingen perfekt formel — forskare experimenterar systematiskt med tusentals kombinationer.",
  "epoch":
    "GPT-3 tränades i ungefär en epoch — alltså bara ett varv genom all träningsdata. Mindre modeller behöver ofta 10-100 epoker för att lära sig ordentligt.",
  "multi-agent-system":
    "Microsoft och Google testar båda multi-agent-system där AI-agenter förhandlar, diskuterar och kvalitetsgranskar varandras arbete — som ett virtuellt projektteam.",
  "federated-learning":
    "Apple använder federated learning för att förbättra tangentbordsförslag utan att samla in vad du skriver. Modellen tränas lokalt på din telefon och bara lärdomarna delas.",
  "benchmark":
    "MMLU (Massive Multitask Language Understanding) testar AI på 57 ämnen från juridik till medicin. GPT-4 klarar det på universitetsnivå, medan GPT-3 låg på gymnasienivå.",
};
