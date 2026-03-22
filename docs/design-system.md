# AI-hubben Design System

Komplett designdokumentation for AI-hubben. Anvandbar som referens for detta och framtida projekt.

---

## 1. DESIGNFILOSOFI

- **Speakeasy-inspirerad** — premium, exklusiv, sofistikerad kansla
- Professionell design, inte generisk AI/Tailwind-look
- Ljust tema som default, morkt som toggle
- Mobile-first, PWA med app-kansla
- Max 2-3 tunga animationer per sida, resten subtilt
- WCAG 2.1 AA tillganglighet
- Bodoni Moda for rubriker ger klassisk, exklusiv typografi
- Subtila skuggor och inset-effekter pa knappar
- Regnbagsgradient som genomgaende brand-element

---

## 2. FARGER

### 2.1 Light Theme (default)

| Token | Varde | Anvandning |
|-------|-------|------------|
| `--background` | `#FAFAFA` | Sidbakgrund |
| `--foreground` | `#000000` | Primartext |
| `--card` | `#FFFFFF` | Kortbakgrund |
| `--card-foreground` | `#000000` | Text i kort |
| `--primary` | `#333333` | Knappar, CTA |
| `--primary-foreground` | `#FFFFFF` | Text pa primara knappar |
| `--secondary` | `#F4F4F5` | Hover-bakgrund, badges |
| `--secondary-foreground` | `#18181B` | Text pa sekundara element |
| `--muted` | `#F4F4F5` | Subtila bakgrunder |
| `--muted-foreground` | `#545454` | Sekundartext, etiketter |
| `--accent` | `#F4F4F5` | Accentbakgrund |
| `--destructive` | `#EF4444` | Felmeddelanden, ta bort |
| `--border` | `#DBDBDB` | Kantlinjer |
| `--input` | `#D4D4D8` | Inputfalt kant |
| `--ring` | `#3C83F6` | Fokusring |

### 2.2 Dark Theme

| Token | Varde | Andring fran light |
|-------|-------|-------------------|
| `--background` | `#000000` | Svart bakgrund |
| `--foreground` | `#FAFAFA` | Ljus text |
| `--card` | `#121212` | Mark kortbakgrund |
| `--primary` | `#F8F8F8` | Ljus knappfarg |
| `--primary-foreground` | `#000000` | Mark text pa knappar |
| `--secondary` | `#27272A` | Mark hover |
| `--muted-foreground` | `#969696` | Ljusare sekundartext |
| `--accent` | `#333333` | Morkare accent |
| `--border` | `#242424` | Morkare kanter |
| `--input` | `#27272A` | Morkare input |

### 2.3 Brand Gradient

```css
linear-gradient(90deg,
  #330f1f 0%,    /* deep maroon */
  #c83228 13%,   /* red */
  #fb873f 25%,   /* orange */
  #d3dd92 38%,   /* pale yellow-green */
  #59824f 50%,   /* muted green */
  #002414 62%,   /* very dark green */
  #00143d 74%,   /* navy blue */
  #2874d7 86%,   /* bright blue */
  #99c2ff 97%    /* light blue */
)
```

Anvands i: Navbar regnbagsbar, sektionsavdelare, chatwidget header/footer.

### 2.4 Chat Widget Gradient

```css
/* Bubble */
linear-gradient(135deg, #c83228 0%, #e5651a 50%, #f5a623 100%)

/* Header */
linear-gradient(135deg, #330f1f 0%, #c83228 40%, #e5651a 70%, #f5a623 100%)
```

### 2.5 Diagramfarger

```javascript
["#c83228", "#e5651a", "#f5a623", "#27ae60", "#3498db", "#9b59b6", "#e74c3c", "#1abc9c"]
```

### 2.6 Avatar-farger (genererade fran namn)

```javascript
["#c83228", "#fb873f", "#59824f", "#2874d7", "#9b59b6", "#e5651a", "#1abc9c", "#2c3e50", "#d4a017", "#27ae60"]
```

### 2.7 Status/Badge-farger

| Typ | Light | Dark |
|-----|-------|------|
| Success | `bg-green-50 text-green-800 border-green-200` | `bg-green-950 text-green-200 border-green-900` |
| Error | `bg-red-50 text-red-800 border-red-200` | `bg-red-950 text-red-200 border-red-900` |
| Tillvaxt | `bg-green-500/10 text-green-600` | `text-green-400` |

---

## 3. TYPOGRAFI

### 3.1 Typsnitt

| Namn | CSS-variabel | Anvandning |
|------|-------------|------------|
| **Bodoni Moda** | `--font-bodoni` | Rubriker, display-text |
| **General Sans** | `--font-general` | Brodtext, UI-text |
| **Geist Sans** | `--font-geist-sans` | Fallback sans-serif |
| **Geist Mono** | `--font-geist-mono` | Etiketter, knappar, kod |

### 3.2 Teckenstorlekar

| Storlek | Pixlar | Anvandning |
|---------|--------|------------|
| `text-[0.5625rem]` | 9px | Mikro-badges |
| `text-[0.625rem]` | 10px | Tabellrubriker, admin-etiketter |
| `text-[0.6875rem]` | 11px | Sektionsetiketter (UPPERCASE) |
| `text-[0.75rem]` | 12px | Hjalp-text, copyright |
| `text-[0.8125rem]` | 13px | Knappar, toast, formularetiketter |
| `text-[0.875rem]` | 14px | Brodtext (kompakt) |
| `text-[0.9375rem]` | 15px | Inputs, beskrivningar |
| `text-[1rem]` | 16px | Standard brodtext |
| `text-[1.0625rem]` | 17px | Hero-beskrivningar |
| `text-[1.125rem]` | 18px | Navbar-titel, modaltitel |
| `text-[1.25rem]` | 20px | Underrubriker |
| `text-[1.5rem]` | 24px | Sektionsrubriker |
| `text-[1.75rem]` | 28px | Sidrubriker (mobil) |
| `text-[2rem]` | 32px | Admin-sidrubriker |
| `text-[2.25rem]` | 36px | Nyckeltal |
| `text-[2.75rem]` | 44px | Sidrubriker (surfplatta) |
| `text-[4.5rem]` | 72px | Sidrubriker (desktop) |
| `text-[5.625rem]` | 90px | Startsida hero (desktop) |

### 3.3 Responsiva rubriker

```
text-[1.75rem]          /* mobil (<640px) */
sm:text-[2.75rem]       /* surfplatta (640px+) */
md:text-[4.5rem]        /* desktop (768px+) */
```

### 3.4 Teckenavstand

| Varde | Anvandning |
|-------|------------|
| `tracking-[-0.04em]` | Stora rubriker |
| `tracking-[-0.02em]` | Navbar-titel |
| `tracking-tight` | Namn, mindre rubriker |
| `tracking-[0.01em]` | Knappar |
| `tracking-[0.1em]` | Tabellrubriker, admin-etiketter |
| `tracking-[0.15em]` | Sektionsetiketter (UPPERCASE) |

### 3.5 Radavstand

| Varde | Anvandning |
|-------|------------|
| `leading-[1.1]` | Display-text |
| `leading-[1.4]` | Kortrubriker |
| `leading-[1.6]` | Brodtext, formular |
| `leading-[1.7]` | Beskrivningar |
| `leading-[1.8]` | Langre texter |

### 3.6 Teckensnittsvikt

- **400** (Regular) — Rubriker (Bodoni), brodtext
- **500** (Medium) — Etiketter, knappar, kortrubriker
- **600** (Semibold) — Navbar brand, avatarinitialer

---

## 4. KNAPPAR

### 4.1 Primar CTA

```css
rounded-full px-5 py-2
text-[0.8125rem] font-medium uppercase tracking-[0.01em]
bg-primary text-primary-foreground
font-family: var(--font-geist-mono)
box-shadow: 0px 2px 1px 0px rgba(255,255,255,0.15) inset,
            0px -2px 1px 0px rgba(0,0,0,0.05) inset
transition-all duration-150
active:scale-[0.98]
```

### 4.2 Sekundar/Ghost

```css
border border-border text-muted-foreground
hover:bg-secondary
rounded-full px-5 py-2
```

### 4.3 Ikonknapp

```css
h-9 w-9 rounded-full border border-border
items-center justify-center
hover:bg-secondary
```

### 4.4 Destruktiv

```css
text-muted-foreground hover:bg-destructive/10 hover:text-destructive
```

### 4.5 Admin sparaknapp

```css
rounded-md bg-primary px-4 py-2
text-[0.8125rem] font-medium text-primary-foreground
font-family: var(--font-geist-mono)
box-shadow: [samma inset-shadow som primar CTA]
disabled:opacity-50
```

### 4.6 Periodnvaljare (toggle)

```css
/* Aktiv */
rounded-full px-5 py-2 bg-primary text-primary-foreground
box-shadow: [inset shadow]

/* Inaktiv */
border border-border text-muted-foreground hover:bg-secondary
```

---

## 5. KORT

### 5.1 Standard SectionCard

```css
rounded-lg border border-border bg-card p-6 md:p-8
```

### 5.2 Interaktivt kort (hover)

```css
rounded-lg border border-border bg-card p-6
transition-all duration-300
hover:bg-secondary hover:shadow-lg
```

### 5.3 Kort med konsekvent hojd

```css
flex h-full flex-col rounded-lg border border-border bg-card p-6
/* Innehall som ska vara langst ner: */
mt-auto pt-4
```

### 5.4 Spotlight-kort (Aceternity)

```css
rounded-2xl border border-neutral-800 bg-black p-10
/* Mouse-tracking radial-gradient */
```

### 5.5 Kortgrid

```css
grid gap-5 sm:grid-cols-2 lg:grid-cols-3  /* 3 kolumner */
grid gap-5 sm:grid-cols-2 lg:grid-cols-4  /* 4 kolumner */
grid gap-5 sm:grid-cols-3                  /* 3 kolumner jamt */
grid gap-5 md:grid-cols-2                  /* 2 kolumner */
```

---

## 6. FORMULARELEMENT

### 6.1 Textinput

```css
w-full rounded-md border border-border bg-background
px-3 py-2 text-[0.875rem]
outline-none focus:border-foreground
```

### 6.2 Stort textinput (publik sida)

```css
w-full rounded-lg border border-border bg-background
py-3 px-4 text-[0.9375rem]
outline-none transition-colors focus:border-foreground
```

### 6.3 Etikett (admin)

```css
mb-1.5 block text-[0.625rem] font-medium uppercase
tracking-[0.1em] text-muted-foreground
font-family: var(--font-geist-mono)
```

### 6.4 Etikett (publik)

```css
mb-1.5 block text-[0.8125rem] font-medium
font-family: var(--font-geist-mono)
```

### 6.5 Filuppladdning

```css
flex cursor-pointer items-center gap-2
rounded-md border border-dashed border-border bg-background
px-3 py-3 text-[0.8125rem] text-muted-foreground
hover:border-foreground hover:text-foreground
```

---

## 7. NAVIGERING

### 7.1 Navbar (desktop)

```
Sticky, top: 1px (under regnbagsbar)
Hojd: 65px
Bakgrund: bg-card/95 backdrop-blur-md
Border: border-b border-border
Max bredd: 68.75rem (1100px)
Padding: px-6
```

### 7.2 Regnbagsbar

```
Sticky top-0, z-[1000]
Hojd: 4px (h-1)
Bakgrund: BRAND_GRADIENT
```

### 7.3 Bottom Tab Bar (mobil)

```
Fixed bottom-0, z-[999]
Hojd: 64px (h-16) + safe-area-inset
Bakgrund: bg-card/95 backdrop-blur-md
Border: border-t border-border
5 flikar: Hem, Assistenter, Statistik, Utbildning, Mer
```

### 7.4 Mer-meny (mobil)

```
Position: bottom-[calc(safe-area+4.5rem)] left-4 right-4
rounded-lg border border-border bg-card p-2 shadow-lg
Overlay: bg-background/80 backdrop-blur-sm
```

### 7.5 Admin Sidebar

```
Bredd: 240px
Bakgrund: bg-card
Border: border-r border-border
Mobil: slide-in med overlay (bg-black/40)
Desktop (lg+): statisk
```

### 7.6 Aktiv nav-lank

```
/* Publik */
color: var(--foreground)  /* aktiv */
color: var(--muted-foreground)  /* inaktiv */

/* Admin sidebar */
bg-secondary text-foreground font-medium  /* aktiv */
text-muted-foreground hover:bg-secondary  /* inaktiv */
```

---

## 8. AVDELARE

### 8.1 Gradient-avdelare

```css
<div class="h-px" style="background: BRAND_GRADIENT" />
```

### 8.2 Fade-avdelare

```css
<div class="h-px" style="background: linear-gradient(to right, transparent, var(--border) 50%, transparent)" />
```

---

## 9. ANIMATIONER

### 9.1 FadeIn (Framer Motion)

```javascript
initial: { opacity: 0, y: 20, filter: "blur(8px)" }
animate: { opacity: 1, y: 0, filter: "blur(0)" }
duration: 0.8s
trigger: Intersection Observer (threshold: 0.15)
delay: konfigurerbar (standard 0)
```

### 9.2 Chat widget

```javascript
// Bubbla
initial: { scale: 0, opacity: 0 }
animate: { scale: 1, opacity: 1 }
duration: 0.2s

// Fonster
initial: { scale: 0.85, opacity: 0 }
animate: { scale: 1, opacity: 1 }
duration: 0.25s
ease: [0.16, 1, 0.3, 1]
```

### 9.3 Puls (chatbubbla)

```css
animate-ping /* 1.5s infinite */
/* Tva lager med 0.3s delay */
/* Stangs automatiskt efter 8 sekunder */
```

### 9.4 Laddningsspinner

```css
h-8 w-8 rounded-full
border-2 border-primary/30 border-t-primary
animate-spin
```

### 9.5 Hover-overgongar

```css
transition-all duration-300     /* Standard */
transition-colors               /* Enbart farg */
transition-all duration-150     /* Snabb */
hover:scale-110                 /* Skalning */
active:scale-[0.98]            /* Tryck-effekt */
hover:opacity-90               /* Subtil */
```

### 9.6 CSS-animationer

```css
@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(20px); filter: blur(8px); }
  to { opacity: 1; transform: translateY(0); filter: blur(0); }
}

@keyframes spotlight {
  from { opacity: 0; transform: translate(-72%, -62%) scale(0.5); }
  to { opacity: 1; transform: translate(-50%, -40%) scale(1); }
}

@keyframes travel-flash {
  0% { transform: rotate(0deg); opacity: 0; }
  1%, 99% { opacity: 1; }
  100% { transform: rotate(360deg); opacity: 0; }
}
```

---

## 10. SKUGGOR

### 10.1 Kort (hover)

```css
shadow-lg  /* Tailwind default */
```

### 10.2 Chatbubbla

```css
0 8px 32px rgba(200,50,40,0.35),
0 4px 12px rgba(0,0,0,0.15),
inset 0 1px 0 rgba(255,255,255,0.2)
```

### 10.3 Chattfonster

```css
0 24px 80px rgba(0,0,0,0.16),
0 8px 24px rgba(0,0,0,0.08),
0 0 0 1px rgba(0,0,0,0.04)
```

### 10.4 Knappar (inset)

```css
0px 2px 1px 0px rgba(255,255,255,0.15) inset,
0px -2px 1px 0px rgba(0,0,0,0.05) inset
```

---

## 11. Z-INDEX LAGER

| Varde | Element |
|-------|---------|
| `z-[1]` | Spotlight-effekt |
| `z-50` | Navbar |
| `z-[90]` | Modaler |
| `z-[100]` | Toast-meddelanden |
| `z-[997]` | Chatbubbla |
| `z-[998]` | Mer-meny overlay |
| `z-[999]` | Bottom tab bar |
| `z-[1000]` | Regnbagsbar, chattfonster |
| `z-[1001]` | Sokmodal |

---

## 12. SPACING

### 12.1 Sektioner

```css
/* Sidrubrik (hero) */
pt-20 pb-12 md:pt-28 md:pb-16

/* Innehallssektion */
py-12 md:py-16

/* Max bredd */
mx-auto max-w-[68.75rem] px-6
```

### 12.2 Kort

```css
p-6         /* Standard */
p-6 md:p-8  /* Responsiv */
p-8         /* Stor */
```

### 12.3 Grid-gap

```css
gap-1    /* 4px — ikon+text */
gap-1.5  /* 6px — knappinnehall */
gap-2    /* 8px — horisontella layouter */
gap-3    /* 12px — sektionselement */
gap-4    /* 16px — kortinnehall */
gap-5    /* 20px — kortgrid */
gap-12   /* 48px — tvakolumnslayout */
```

---

## 13. RESPONSIVA BRYTPUNKTER

| Brytpunkt | Bredd | Anvandning |
|-----------|-------|------------|
| Default | <640px | Mobil, en kolumn |
| `sm:` | 640px+ | Tva kolumner, storre text |
| `md:` | 768px+ | Desktop-nav, footer, tre kolumner |
| `lg:` | 1024px+ | Admin sidebar statisk, fler kolumner |

### 13.1 Vanliga monster

```css
/* Text */
text-[1.75rem] sm:text-[2.75rem] md:text-[4.5rem]

/* Grid */
grid-cols-1 sm:grid-cols-2 lg:grid-cols-3

/* Synlighet */
hidden md:flex      /* Dolj pa mobil */
md:hidden           /* Visa bara pa mobil */
hidden lg:block     /* Dolj till desktop */

/* Padding */
p-6 md:p-8
px-4 lg:px-6
```

---

## 14. PWA-KONFIGURATION

```javascript
{
  name: "AI-hubben",
  short_name: "AI-hubben",
  display: "standalone",
  background_color: "#0a0a0a",
  theme_color: "#0a0a0a",
  orientation: "portrait-primary",
  icons: [
    { src: "/icons/icon-192x192.png", sizes: "192x192", purpose: "maskable" },
    { src: "/icons/icon-512x512.png", sizes: "512x512" }
  ]
}
```

### Viewport

```html
width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover
```

### Service Worker (Serwist)

- Precaching av statiska resurser
- Runtime caching med defaultCache-strategi
- Offline-fallback till /~offline
- Skip waiting + clients claim
- Navigation preload aktiverat

---

## 15. TEMA-VAXLING

```javascript
// next-themes
attribute: "class"
defaultTheme: "light"
enableSystem: false
disableTransitionOnChange: true
```

Toggle-knapp: `h-9 w-9 rounded-full border border-border`
Sol-ikon (morkt lage), Mane-ikon (ljust lage)

---

## 16. IKONER

**Bibliotek:** Lucide React

| Storlek | Anvandning |
|---------|------------|
| 12px | Mikroikoner, lank-pilar |
| 14px | Admin-atgarder, smaknappar |
| 16px | Standard, navbar, knappar |
| 18px | Navigation, kontaktikoner |
| 20px | Tab bar, menyikoner |
| 22px | Chatbubbla (mobil) |
| 28px | Chatbubbla (desktop) |
| 40px | Success/error-meddelanden |

---

## 17. TOAST-MEDDELANDEN

```css
fixed right-4 top-4 z-[100]
flex items-center gap-2
rounded-lg border px-4 py-3
text-[0.8125rem] shadow-lg

/* Success */
border-green-200 bg-green-50 text-green-800
dark:border-green-900 dark:bg-green-950 dark:text-green-200

/* Error */
border-red-200 bg-red-50 text-red-800
dark:border-red-900 dark:bg-red-950 dark:text-red-200
```

Auto-dismiss: 3 sekunder

---

## 18. SEKTIONSETIKETTER

Konsekvent monster pa alla sidor:

```css
/* Etikett */
<p class="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-muted-foreground"
   style="font-family: var(--font-geist-mono)">
  ETIKETT
</p>

/* Rubrik */
<h1 class="mt-4 text-[1.75rem] leading-[1.1] tracking-[-0.04em] sm:text-[2.75rem] md:text-[4.5rem]"
    style="font-family: var(--font-bodoni); font-weight: 400">
  Rubrik
</h1>

/* Beskrivning */
<p class="mt-6 max-w-[42rem] text-[1.0625rem] leading-[1.7] text-muted-foreground">
  Beskrivning...
</p>
```

---

## 19. TABELL (Admin)

```css
/* Wrapper */
overflow-x-auto rounded-lg border border-border bg-card

/* Tabellrubrik */
px-4 py-3 text-left font-medium uppercase tracking-[0.1em]
text-muted-foreground text-[0.625rem]
font-family: var(--font-geist-mono)

/* Tabellrad */
border-b border-border last:border-0
transition-colors hover:bg-secondary/50

/* Varannan rad */
i % 2 !== 0 ? "bg-secondary/20" : ""
```

---

## 20. BORDER RADIUS

| Klass | Varde | Anvandning |
|-------|-------|------------|
| `rounded-sm` | 2px | Navlankar |
| `rounded-md` | 4px | Knappar (admin), celler |
| `rounded-lg` | 8px | Kort, inputs, modaler |
| `rounded-xl` | 12px | Stora kort |
| `rounded-2xl` | 16px | Chattfonster, spotlight |
| `rounded-full` | 50% | Avatarer, CTA-knappar, badges |

---

## 21. SPECIAL-KOMPONENTER

### 21.1 CountUp (nummeranimation)

Animerar fran 0 till malvarde. Formatering: `sv-SE` locale.

### 21.2 FadeIn (scroll-trigger)

Wrapper-komponent med Intersection Observer. Konfigurerbar delay.

### 21.3 MovingBorder (Aceternity)

SVG-baserad animerad kant. Duration: 3000ms. Framer Motion useAnimationFrame.

### 21.4 CardSpotlight (Aceternity)

Mus-tracking spotlight. Radie: 350px. Spring: stiffness 500, damping 30.

### 21.5 TextGenerateEffect (Aceternity)

Tecken-for-tecken animation med stagger timing.

---

## 22. CHATWIDGET

### Bubbla

```
Storlek: 48px (mobil) / 64px (desktop)
Position: fixed bottom-right
Mobil: right 1rem, bottom 6.5rem (ovanfor tab bar)
Desktop: right 2rem, bottom 2rem
Gradient: 135deg #c83228 -> #e5651a -> #f5a623
Puls-animation: 8 sekunder, sedan stopp
```

### Fonster

```
Storlek: 400x600 (desktop) / fullskarm (mobil)
Fullskarm: 800x700
Header: gradient med online-indikator
Iframe: Intric embed
Footer: 3px gradient-linje
z-index: 1000
```

---

## 23. FAQ ACCORDION

```css
/* Container */
rounded-lg border border-border bg-card
transition-colors hover:border-foreground/20

/* Fraga (knapp) */
w-full flex items-center justify-between px-5 py-4
text-left text-[0.9375rem] font-medium leading-snug

/* Svar (expanderat) */
border-t border-border px-5 pb-5 pt-4
text-[0.875rem] leading-[1.7] text-muted-foreground

/* Chevron-rotation */
transition-transform duration-200
rotate-180 nar oppet
```

---

## 24. SOKMODAL

```css
/* Overlay */
fixed inset-0 z-[1001]
bg-black/50 backdrop-blur-sm
pt-[15vh]  /* Centrerad uppat */

/* Modal */
max-w-[560px] rounded-xl border border-border bg-card shadow-2xl

/* Input */
flex items-center gap-3 border-b border-border px-4 py-3
bg-transparent text-[0.9375rem]

/* Resultat */
max-h-[60vh] overflow-y-auto
```

---

## 25. TILLGANGLIGHET

- Alla interaktiva element har `aria-label`
- Fokusringar: `focus-visible:border-ring focus-visible:ring-3`
- Minsta touch-target: 44x44px (tab bar)
- Kontrast: WCAG AA (muted-foreground mot background)
- `prefers-reduced-motion`: Respekteras av Framer Motion
- Semantisk HTML: `nav`, `main`, `section`, `header`
