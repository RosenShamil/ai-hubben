# Everything Claude Code — Komplett kommandolista

Installerad: 2026-03-23 | Källa: github.com/affaan-m/everything-claude-code

---

## Del 1: Kommandon DU kör manuellt

Skriv dessa i chatten som `/kommando`.

### Planering & arkitektur

| Kommando | Beskrivning |
|----------|-------------|
| `/plan` | Analyserar krav, bedömer risker, skapar steg-för-steg implementationsplan. Väntar på ditt OK innan kod ändras. |
| `/prompt-optimize` | Analyserar en prompt och ger en optimerad version. Kör inte uppgiften — bara rådgivning. |
| `/context-budget` | Visar token-användning för agenter, skills, MCP-servrar och regler. Hittar optimeringsmöjligheter. |
| `/model-route` | Väljer optimal modell per uppgift (billigare för enkla saker). |

### Kodgranskning & kvalitet

| Kommando | Beskrivning |
|----------|-------------|
| `/code-review` | Granskar kod för kvalitet, säkerhet och underhållbarhet. |
| `/quality-gate` | Kör kvalitetskontroller. |
| `/refactor-clean` | Rensar död kod, dubbletter och refaktorerar. |
| `/verify` | Verifikationsloop — kontrollerar att allt fungerar. |
| `/simplify` | (Inbyggt) Granskar ändrad kod för återanvändning och effektivitet. |

### Testning

| Kommando | Beskrivning |
|----------|-------------|
| `/tdd` | Test-driven development: skriv test först, implementera sen. Säkerställer 80%+ täckning. |
| `/e2e` | Genererar och kör end-to-end tester med Playwright. Tar screenshots/video. |
| `/test-coverage` | Analyserar testtäckning. |

### Build & fix

| Kommando | Beskrivning |
|----------|-------------|
| `/build-fix` | Fixar build-fel automatiskt. |
| `/cpp-build` | Fixar C++ build/CMake/linker-fel. |
| `/go-build` | Fixar Go build/vet-fel. |
| `/rust-build` | Fixar Rust cargo build-fel. |
| `/kotlin-build` | Fixar Kotlin/Gradle build-fel. |
| `/gradle-build` | Fixar Gradle-fel för Android/KMP. |

### Språkspecifik granskning

| Kommando | Beskrivning |
|----------|-------------|
| `/python-review` | Python: PEP 8, type hints, säkerhet, idiomatiska mönster. |
| `/go-review` | Go: idiomatik, concurrency, felhantering, säkerhet. |
| `/go-test` | Go TDD: table-driven tests, 80%+ coverage med `go test -cover`. |
| `/rust-review` | Rust: ownership, lifetimes, error handling, unsafe. |
| `/rust-test` | Rust TDD: 80%+ coverage med cargo-llvm-cov. |
| `/cpp-review` | C++: minnesäkerhet, modern C++, concurrency, säkerhet. |
| `/cpp-test` | C++ TDD: GoogleTest, gcov/lcov. |
| `/kotlin-review` | Kotlin: idiomatik, null safety, coroutines, Compose. |
| `/kotlin-test` | Kotlin TDD: Kotest, 80%+ coverage med Kover. |

### Dokumentation

| Kommando | Beskrivning |
|----------|-------------|
| `/docs` | Slår upp dokumentation för ett bibliotek/API via Context7. |
| `/update-docs` | Uppdaterar projektdokumentation. |
| `/update-codemaps` | Uppdaterar code maps. |

### Sessioner & kontext

| Kommando | Beskrivning |
|----------|-------------|
| `/save-session` | Sparar sessionens kontext till fil i ~/.claude/sessions/. |
| `/resume-session` | Laddar senaste sessionen och fortsätter arbetet. |
| `/sessions` | Hantera sessionshistorik och alias. |
| `/checkpoint` | Spara en checkpoint i pågående arbete. |
| `/aside` | Svara på en sidofråga utan att tappa kontext. |
| `/prune` | Radera gamla instinkter som aldrig promotades. |

### Continuous learning

| Kommando | Beskrivning |
|----------|-------------|
| `/evolve` | Analyserar instinkter och föreslår förbättringar. |
| `/learn` | Importera lärdomar. |
| `/learn-eval` | Extraherar mönster från sessionen, utvärderar kvalitet, sparar rätt. |
| `/instinct-import` | Importera instinkter från fil eller URL. |
| `/instinct-export` | Exportera instinkter till fil. |
| `/instinct-status` | Visa inlärda instinkter med confidence-nivå. |
| `/promote` | Promota projektinstinkter till global nivå. |
| `/projects` | Lista kända projekt och deras instinktstatistik. |

### Multi-agent & orchestration

| Kommando | Beskrivning |
|----------|-------------|
| `/orchestrate` | Sekventiell och tmux/worktree-orchestrering för multi-agent workflows. |
| `/claw` | NanoClaw v2 — persistent REPL med model routing, skill hot-load, branching. |
| `/devfleet` | Parallella agenter via Claude DevFleet. Plan → dispatch → monitor → rapport. |
| `/multi-plan` | Multi-agent planering. |
| `/multi-execute` | Multi-agent exekvering. |
| `/multi-frontend` | Multi-agent frontend-arbete. |
| `/multi-backend` | Multi-agent backend-arbete. |
| `/multi-workflow` | Multi-agent workflow. |
| `/loop-start` | Starta en loop. |
| `/loop-status` | Visa loop-status. |

### Skills & konfiguration

| Kommando | Beskrivning |
|----------|-------------|
| `/skill-create` | Analyserar git-historik, extraherar mönster, genererar SKILL.md. |
| `/skill-health` | Visa skill-portfolio med charts och analytics. |
| `/rules-distill` | Extraherar principer från skills och destillerar till regler. |
| `/setup-pm` | Konfigurera pakethanterare (npm/pnpm/yarn/bun). |
| `/harness-audit` | Granska harness-konfiguration. |
| `/eval` | Kör evaluering. |
| `/pm2` | PM2-hantering. |

### Inbyggda Claude Code-kommandon

| Kommando | Beskrivning |
|----------|-------------|
| `/help` | Hjälp med Claude Code. |
| `/clear` | Rensa konversationen. |
| `/compact` | Komprimera kontexten för att spara tokens. |
| `/fast` | Växla snabbläge (samma modell, snabbare output). |
| `/commit` | Skapa git commit. |
| `/review-pr` | Granska en pull request. |
| `/loop` | Kör ett kommando på återkommande intervall. |

---

## Del 2: Vad Claude kör AUTOMATISKT (hooks)

Dessa körs i bakgrunden utan att du behöver göra något.

### Innan verktyg körs (PreToolUse)

| Hook | Triggas av | Effekt |
|------|-----------|--------|
| Git --no-verify blockering | `git commit/push` med --no-verify | **Blockerar** — skyddar pre-commit hooks från att skippas |
| Dev server i tmux | `npm run dev` etc. | **Blockerar** utanför tmux — säkerställer loggåtkomst |
| Tmux-påminnelse | Långa kommandon (npm test, cargo build, docker) | Varnar — föreslår tmux |
| Git push-påminnelse | `git push` | Varnar — påminner att granska ändringar först |
| Doc-fil varning | Skapar .md/.txt-filer | Varnar om icke-standardfiler |
| Strategic compact | Var ~50:e edit | Varnar — föreslår `/compact` |
| Config-skydd | Ändrar linter/formatter-config | **Blockerar** — tvingar fixa kod istället för config |
| MCP health check | MCP-verktygsanrop | **Blockerar** om MCP-server är ohälsosam |
| Continuous learning (observe) | Alla verktygsanrop | Sparar observationer (async) |
| InsAIts säkerhetsmonitor | Bash/Write/Edit (opt-in: `ECC_ENABLE_INSAITS=1`) | **Blockerar** vid kritiska säkerhetsproblem |
| Governance capture | Bash/Write/Edit (opt-in: `ECC_GOVERNANCE_CAPTURE=1`) | Loggar governance-händelser |

### Efter verktyg körs (PostToolUse)

| Hook | Triggas av | Effekt |
|------|-----------|--------|
| PR-loggare | `gh pr create` | Loggar PR-URL och review-kommando |
| Build-analys | Build-kommandon | Bakgrundsanalys (async, blockerar inte) |
| Quality gate | Edit/Write | Snabb kvalitetskontroll |
| Prettier auto-format | Edit av JS/TS-filer | Formaterar automatiskt med Prettier/Biome |
| TypeScript check | Edit av .ts/.tsx-filer | Kör `tsc --noEmit` |
| console.log varning | Edit | Varnar om console.log i redigerade filer |
| Continuous learning (observe) | Alla verktygsanrop | Sparar resultat (async) |
| Governance capture | Bash/Write/Edit (opt-in) | Loggar governance-händelser |

### Vid misslyckade verktyg (PostToolUseFailure)

| Hook | Triggas av | Effekt |
|------|-----------|--------|
| MCP health check | Misslyckade MCP-anrop | Markerar ohälsosamma servrar, försöker reconnect |

### Livscykelhändelser

| Hook | Triggas av | Effekt |
|------|-----------|--------|
| Session start | Ny session startar | Laddar föregående kontext, detekterar pakethanterare |
| Pre-compact | Innan `/compact` | Sparar tillstånd innan komprimering |
| console.log audit | Efter varje svar (Stop) | Kollar alla ändrade filer för console.log |
| Session summary | Efter varje svar (Stop) | Sparar sessionstillstånd |
| Pattern extraction | Efter varje svar (Stop) | Utvärderar sessionen för extraherbara mönster |
| Cost tracker | Efter varje svar (Stop) | Spårar token- och kostnadsmetrik |
| Session end marker | Session avslutas | Livscykelmarkör och cleanup |

---

## Del 3: Agenter (Claude delegerar till dessa)

Dessa är specialiserade agenter som Claude använder automatiskt vid behov.

### Generella

| Agent | Beskrivning |
|-------|-------------|
| planner | Planerar implementation av komplexa features |
| architect | Systemdesign, skalbarhet, tekniska beslut |
| chief-of-staff | Koordinerar arbete, triagerar kommunikation |
| code-reviewer | Granskar kod för kvalitet, säkerhet, underhållbarhet |
| security-reviewer | Hittar sårbarheter: SSRF, injection, OWASP Top 10 |
| database-reviewer | PostgreSQL-optimering, schemadesign, Supabase best practices |
| refactor-cleaner | Rensar död kod med knip/depcheck/ts-prune |
| tdd-guide | Guidar test-driven development |
| e2e-runner | End-to-end testning med Playwright |
| doc-updater | Uppdaterar codemaps och dokumentation |
| docs-lookup | Hämtar aktuell dokumentation via Context7 MCP |
| harness-optimizer | Optimerar ECC-konfigurationen |
| loop-operator | Hanterar autonoma agent-loopar |

### Språkspecifika granskare

| Agent | Språk |
|-------|-------|
| typescript-reviewer | TypeScript/JavaScript |
| python-reviewer | Python |
| go-reviewer | Go |
| rust-reviewer | Rust |
| java-reviewer | Java/Spring Boot |
| kotlin-reviewer | Kotlin/Android/KMP |
| cpp-reviewer | C++ |
| flutter-reviewer | Flutter/Dart |

### Språkspecifika build-fixare

| Agent | Språk |
|-------|-------|
| build-error-resolver | TypeScript/generellt |
| go-build-resolver | Go |
| rust-build-resolver | Rust |
| java-build-resolver | Java/Maven/Gradle |
| kotlin-build-resolver | Kotlin/Gradle |
| cpp-build-resolver | C++/CMake |
| pytorch-build-resolver | PyTorch/CUDA |

---

## Del 4: Regler (alltid aktiva i bakgrunden)

Regler som styr hur Claude skriver kod. Aktiveras automatiskt baserat på filtyp.

### Gemensamma regler (alla språk)

| Regel | Innehåll |
|-------|----------|
| agents | Hur agenter ska användas och delegeras |
| coding-style | Kodstil och formatering |
| development-workflow | Utvecklingsworkflow |
| git-workflow | Git-arbetsflöde |
| hooks | Hook-hantering |
| patterns | Designmönster |
| performance | Prestandaoptimering |
| security | Säkerhetsregler |
| testing | Testregler |

### Språkspecifika regler

Varje språk har regler för: **coding-style**, **hooks**, **patterns**, **security**, **testing**.

| Språk |
|-------|
| TypeScript |
| Python |
| Go |
| Rust |
| Java |
| Kotlin |
| C++ |
| C# |
| Swift |
| PHP |
| Perl |

---

## Del 5: Skills (stödjer kommandon och agenter)

45 installerade skills som ger djupare funktionalitet.

| Skill | Beskrivning |
|-------|-------------|
| ai-regression-testing | AI-regressionstestning |
| android-clean-architecture | Clean architecture för Android |
| api-design | API-designmönster |
| backend-patterns | Backend-mönster |
| coding-standards | Kodstandarder |
| compose-multiplatform-patterns | Compose Multiplatform-mönster |
| configure-ecc | Konfigurera ECC |
| continuous-learning | Continuous learning v1 |
| continuous-learning-v2 | Continuous learning v2 med hooks |
| cpp-coding-standards | C++ kodstandarder |
| cpp-testing | C++ testning |
| django-patterns | Django-mönster |
| django-tdd | Django TDD |
| django-verification | Django-verifiering |
| e2e-testing | End-to-end testning |
| eval-harness | Evaluerings-harness |
| frontend-patterns | Frontend-mönster |
| frontend-slides | Frontend-presentationer |
| golang-patterns | Go-mönster |
| golang-testing | Go-testning |
| iterative-retrieval | Iterativ sökning |
| java-coding-standards | Java kodstandarder |
| kotlin-coroutines-flows | Kotlin coroutines & flows |
| kotlin-exposed-patterns | Kotlin Exposed ORM-mönster |
| kotlin-ktor-patterns | Kotlin Ktor-mönster |
| kotlin-patterns | Kotlin-mönster |
| kotlin-testing | Kotlin-testning |
| laravel-patterns | Laravel-mönster |
| laravel-tdd | Laravel TDD |
| laravel-verification | Laravel-verifiering |
| mcp-server-patterns | MCP server-mönster |
| perl-patterns | Perl-mönster |
| perl-testing | Perl-testning |
| plankton-code-quality | Kodkvalitet |
| project-guidelines-example | Projektguide-exempel |
| python-patterns | Python-mönster |
| python-testing | Python-testning |
| rust-patterns | Rust-mönster |
| rust-testing | Rust-testning |
| skill-stocktake | Inventering av skills |
| springboot-patterns | Spring Boot-mönster |
| springboot-tdd | Spring Boot TDD |
| springboot-verification | Spring Boot-verifiering |
| strategic-compact | Smart komprimering av kontext |
| tdd-workflow | TDD-workflow |
| verification-loop | Verifikationsloop |

---

*Backup av original-konfiguration finns i ~/.claude-backup/*
*Avinstallera: `rm -rf ~/.claude && mv ~/.claude-backup ~/.claude`*
