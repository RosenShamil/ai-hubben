# AI-hubben Design System — Portable Reference

Use this document to replicate the AI-hubben design in another Next.js project. It contains every design decision, token, pattern, and file needed to reproduce the look and feel.

---

## 1. DESIGN PHILOSOPHY

- **Speakeasy-inspired** — premium, exclusive, sophisticated. Not generic AI/Tailwind-look.
- "Stripe meets municipal innovation"
- Light theme default, dark toggle
- Mobile-first, PWA with app-like feel
- Max 2-3 heavy animations per page, rest subtle
- WCAG 2.1 AA accessibility
- Bodoni Moda headings give classic, exclusive typography
- Subtle inset shadows on buttons
- Rainbow gradient as consistent brand element (decorative only, never on buttons)

---

## 2. TECH STACK (required)

```bash
# Framework
npx create-next-app@latest --typescript --tailwind --eslint --app --src-dir --use-pnpm

# Core dependencies
pnpm add framer-motion class-variance-authority clsx tailwind-merge lucide-react next-themes geist

# Optional (used in AI-hubben)
pnpm add gsap recharts react-hook-form @hookform/resolvers zod
```

### Tailwind CSS v4

No `tailwind.config.ts` — all config in CSS via `@theme inline` block in `globals.css`. Uses the PostCSS plugin (`@tailwindcss/postcss`).

---

## 3. FONTS

| Font | CSS Variable | Usage | Source |
|------|-------------|-------|--------|
| **Bodoni Moda** | `--font-bodoni` | Headings, display text | Local woff2 (`public/fonts/BodoniModa-Regular.woff2`) |
| **General Sans** | `--font-general` | Body text, UI text | Local woff2 (`public/fonts/GeneralSans-Regular.woff2`) |
| **Geist Sans** | `--font-geist-sans` | Fallback sans-serif | `geist` npm package |
| **Geist Mono** | `--font-geist-mono` | Labels, buttons (uppercase), code | `geist` npm package |

### Font loading (layout.tsx)

```tsx
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import localFont from "next/font/local";

const bodoniModa = localFont({
  src: "../../public/fonts/BodoniModa-Regular.woff2",
  variable: "--font-bodoni",
  weight: "400",
});

const generalSans = localFont({
  src: "../../public/fonts/GeneralSans-Regular.woff2",
  variable: "--font-general",
  weight: "400",
});

// On <html>:
className={`${GeistSans.variable} ${GeistMono.variable} ${bodoniModa.variable} ${generalSans.variable} h-full antialiased`}
```

### Font mapping in CSS

```css
@theme inline {
  --font-sans: var(--font-general), var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
  --font-heading: var(--font-bodoni);
}
```

---

## 4. COLOR TOKENS

### 4.1 Light Theme (default)

```css
:root {
  --background: #FAFAFA;
  --foreground: #000000;
  --card: #FFFFFF;
  --card-foreground: #000000;
  --popover: #FFFFFF;
  --popover-foreground: #000000;
  --primary: #333333;
  --primary-foreground: #FFFFFF;
  --secondary: #F4F4F5;
  --secondary-foreground: #18181B;
  --muted: #F4F4F5;
  --muted-foreground: #545454;
  --accent: #F4F4F5;
  --accent-foreground: #000000;
  --destructive: #EF4444;
  --border: #DBDBDB;
  --input: #D4D4D8;
  --ring: #3C83F6;
  --radius: 0.5rem;
  --chart-1: #c83228;
  --chart-2: #fb873f;
  --chart-3: #59824f;
  --chart-4: #2874d7;
  --chart-5: #99c2ff;
}
```

### 4.2 Dark Theme

```css
.dark {
  --background: #000000;
  --foreground: #FAFAFA;
  --card: #121212;
  --card-foreground: #FAFAFA;
  --popover: #121212;
  --popover-foreground: #FAFAFA;
  --primary: #F8F8F8;
  --primary-foreground: #000000;
  --secondary: #27272A;
  --secondary-foreground: #FAFAFA;
  --muted: #18181B;
  --muted-foreground: #969696;
  --accent: #333333;
  --accent-foreground: #FAFAFA;
  --destructive: #EF4444;
  --border: #242424;
  --input: #27272A;
  --ring: #3C83F6;
}
```

### 4.3 Brand Gradient

```javascript
// Only for decorative elements (progress bars, dividers, navbar bar). NEVER on buttons.
const BRAND_GRADIENT = "linear-gradient(90deg, #330f1f 0%, #c83228 13%, #fb873f 25%, #d3dd92 38%, #59824f 50%, #002414 62%, #00143d 74%, #2874d7 86%, #99c2ff 97%)";
```

### 4.4 Chart Colors

```javascript
["#c83228", "#e5651a", "#f5a623", "#27ae60", "#3498db", "#9b59b6", "#e74c3c", "#1abc9c"]
```

---

## 5. TYPOGRAPHY SCALE

### Sizes

| Size | px | Usage |
|------|-----|-------|
| `text-[0.5625rem]` | 9 | Micro badges |
| `text-[0.625rem]` | 10 | Table headers, admin labels |
| `text-[0.6875rem]` | 11 | Section labels (UPPERCASE) |
| `text-[0.75rem]` | 12 | Help text, copyright |
| `text-[0.8125rem]` | 13 | Buttons, toast, form labels |
| `text-[0.875rem]` | 14 | Body text (compact) |
| `text-[0.9375rem]` | 15 | Inputs, descriptions |
| `text-[1rem]` | 16 | Standard body |
| `text-[1.0625rem]` | 17 | Hero descriptions |
| `text-[1.125rem]` | 18 | Navbar title, modal title |
| `text-[1.25rem]` | 20 | Subheadings |
| `text-[1.5rem]` | 24 | Section headings |
| `text-[1.75rem]` | 28 | Page headings (mobile) |
| `text-[2.75rem]` | 44 | Page headings (tablet) |
| `text-[4.5rem]` | 72 | Page headings (desktop) |

### Responsive headings

```
text-[1.75rem] sm:text-[2.75rem] md:text-[4.5rem]
```

### Letter spacing

| Value | Usage |
|-------|-------|
| `tracking-[-0.04em]` | Large headings |
| `tracking-[-0.02em]` | Navbar title |
| `tracking-[0.01em]` | Buttons |
| `tracking-[0.1em]` | Table headers |
| `tracking-[0.15em]` | Section labels (UPPERCASE) |

### Line height

| Value | Usage |
|-------|-------|
| `leading-[1.1]` | Display text |
| `leading-[1.4]` | Card headings |
| `leading-[1.6]` | Body text |
| `leading-[1.7]` | Descriptions |
| `leading-[1.8]` | Long-form text |

### Font weight

- **400** (Regular) — Headings (Bodoni), body text
- **500** (Medium) — Labels, buttons, card headings
- **600** (Semibold) — Navbar brand, avatar initials

---

## 6. SECTION PATTERN

Every page follows this consistent heading pattern:

```tsx
{/* Section label */}
<p
  className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-muted-foreground"
  style={{ fontFamily: "var(--font-geist-mono), monospace" }}
>
  SECTION LABEL
</p>

{/* Heading */}
<h1
  className="mt-4 text-[1.75rem] leading-[1.1] tracking-[-0.04em] sm:text-[2.75rem] md:text-[4.5rem]"
  style={{ fontFamily: "var(--font-bodoni), serif", fontWeight: 400 }}
>
  Page Heading
</h1>

{/* Description */}
<p className="mt-6 max-w-[42rem] text-[1.0625rem] leading-[1.7] text-muted-foreground">
  Description text...
</p>

{/* Gradient divider between sections */}
<div className="h-px" style={{ background: BRAND_GRADIENT }} />
```

### Page layout

```tsx
<section className="pt-20 pb-12 md:pt-28 md:pb-16">
  <div className="mx-auto max-w-[68.75rem] px-6">
    {/* Content */}
  </div>
</section>
```

---

## 7. BUTTONS

### Primary CTA

```tsx
<button className="rounded-full px-5 py-2 text-[0.8125rem] font-medium uppercase tracking-[0.01em] bg-primary text-primary-foreground transition-all duration-150 active:scale-[0.98]"
  style={{
    fontFamily: "var(--font-geist-mono), monospace",
    boxShadow: "0px 2px 1px 0px rgba(255,255,255,0.15) inset, 0px -2px 1px 0px rgba(0,0,0,0.05) inset"
  }}
>
  Button Text
</button>
```

### Secondary / Ghost

```tsx
<button className="rounded-full border border-border px-5 py-2 text-[0.8125rem] font-medium text-muted-foreground transition-colors hover:bg-secondary">
  Secondary
</button>
```

### In-context button (e.g. lesson navigation)

```tsx
<button className="rounded-lg bg-primary px-6 py-2.5 text-[0.875rem] font-medium text-primary-foreground transition-all hover:bg-primary/90">
  Nasta
</button>
```

### Icon button

```tsx
<button className="flex h-9 w-9 items-center justify-center rounded-full border border-border transition-colors hover:bg-secondary">
  <Icon size={16} />
</button>
```

### Destructive

```tsx
<button className="text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive">
  Delete
</button>
```

### Period selector (toggle group)

```tsx
{/* Active */}
<button className="rounded-full bg-primary px-5 py-2 text-primary-foreground"
  style={{ boxShadow: "0px 2px 1px 0px rgba(255,255,255,0.15) inset, 0px -2px 1px 0px rgba(0,0,0,0.05) inset" }}>
  Active
</button>

{/* Inactive */}
<button className="rounded-full border border-border px-5 py-2 text-muted-foreground hover:bg-secondary">
  Inactive
</button>
```

---

## 8. CARDS

```tsx
{/* Standard */}
<div className="rounded-lg border border-border bg-card p-6 md:p-8">

{/* Interactive (hover) */}
<div className="rounded-lg border border-border bg-card p-6 transition-all duration-300 hover:bg-secondary hover:shadow-lg">

{/* Grid */}
<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
```

---

## 9. FORM ELEMENTS

```tsx
{/* Input */}
<input className="w-full rounded-md border border-border bg-background px-3 py-2 text-[0.875rem] outline-none focus:border-foreground" />

{/* Label (admin) */}
<label className="mb-1.5 block text-[0.625rem] font-medium uppercase tracking-[0.1em] text-muted-foreground"
  style={{ fontFamily: "var(--font-geist-mono), monospace" }}>
  Label
</label>

{/* Label (public) */}
<label className="mb-1.5 block text-[0.8125rem] font-medium"
  style={{ fontFamily: "var(--font-geist-mono), monospace" }}>
  Label
</label>
```

---

## 10. NAVIGATION

### Rainbow bar (top of page)

```tsx
<div className="sticky top-0 z-[1000] h-1" style={{ background: BRAND_GRADIENT }} />
```

### Navbar (desktop)

```
Sticky below rainbow bar, height 65px
bg-card/95 backdrop-blur-md border-b border-border
Max width: 68.75rem (1100px), padding px-6
```

### Bottom tab bar (mobile)

```
Fixed bottom-0, z-[999], height 64px + safe-area-inset
bg-card/95 backdrop-blur-md border-t border-border
5 tabs: customizable
Hidden on md+ (desktop shows top nav)
```

---

## 11. DIVIDERS

```tsx
{/* Gradient (between major sections) */}
<div className="h-px" style={{ background: BRAND_GRADIENT }} />

{/* Fade (subtle) */}
<div className="h-px" style={{ background: "linear-gradient(to right, transparent, var(--border) 50%, transparent)" }} />
```

---

## 12. ANIMATIONS

### FadeIn on scroll (Framer Motion + IntersectionObserver)

```javascript
initial: { opacity: 0, y: 20, filter: "blur(8px)" }
animate: { opacity: 1, y: 0, filter: "blur(0)" }
duration: 0.8s
trigger: threshold 0.15
```

### Page transitions (carousel/step navigation)

```javascript
initial: { opacity: 0, x: 30 }
animate: { opacity: 1, x: 0 }
exit: { opacity: 0, x: -30 }
duration: 0.25s
// Wrap in <AnimatePresence mode="wait">
```

### Hover transitions

```css
transition-all duration-300     /* Standard */
transition-colors               /* Color only */
transition-all duration-150     /* Fast (buttons) */
active:scale-[0.98]            /* Press feedback */
```

### Reduced motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 13. SHADOWS

```css
/* Card hover */
shadow-lg

/* Button inset */
0px 2px 1px 0px rgba(255,255,255,0.15) inset,
0px -2px 1px 0px rgba(0,0,0,0.05) inset

/* Chat window */
0 24px 80px rgba(0,0,0,0.16),
0 8px 24px rgba(0,0,0,0.08),
0 0 0 1px rgba(0,0,0,0.04)
```

---

## 14. Z-INDEX LAYERS

| Value | Element |
|-------|---------|
| `z-50` | Navbar |
| `z-[90]` | Modals |
| `z-[100]` | Toast messages |
| `z-[997]` | Floating widgets |
| `z-[998]` | Menu overlays |
| `z-[999]` | Bottom tab bar |
| `z-[1000]` | Rainbow bar, chat window |
| `z-[1001]` | Search modal |

---

## 15. SPACING

```css
/* Section hero */
pt-20 pb-12 md:pt-28 md:pb-16

/* Content section */
py-12 md:py-16

/* Max width container */
mx-auto max-w-[68.75rem] px-6

/* Card padding */
p-6 /* standard */
p-6 md:p-8 /* responsive */

/* Grid gaps */
gap-1    /* 4px — icon+text */
gap-2    /* 8px — horizontal layouts */
gap-3    /* 12px — section elements */
gap-4    /* 16px — card content */
gap-5    /* 20px — card grids */
```

---

## 16. RESPONSIVE BREAKPOINTS

| Breakpoint | Width | Usage |
|-----------|-------|-------|
| Default | <640px | Mobile, single column |
| `sm:` | 640px+ | Two columns, larger text |
| `md:` | 768px+ | Desktop nav, footer, three columns |
| `lg:` | 1024px+ | Admin sidebar static, more columns |

---

## 17. TOAST MESSAGES

```tsx
<div className="fixed right-4 top-4 z-[100] flex items-center gap-2 rounded-lg border px-4 py-3 text-[0.8125rem] shadow-lg">

{/* Success */}
className="border-green-200 bg-green-50 text-green-800 dark:border-green-900 dark:bg-green-950 dark:text-green-200"

{/* Error */}
className="border-red-200 bg-red-50 text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-200"
```

Auto-dismiss: 3 seconds.

---

## 18. ADMIN TABLE

```tsx
{/* Wrapper */}
<div className="overflow-x-auto rounded-lg border border-border bg-card">

{/* Table header cell */}
<th className="px-4 py-3 text-left text-[0.625rem] font-medium uppercase tracking-[0.1em] text-muted-foreground"
  style={{ fontFamily: "var(--font-geist-mono), monospace" }}>

{/* Table row */}
<tr className="border-b border-border last:border-0 transition-colors hover:bg-secondary/50">

{/* Alternating rows */}
className={i % 2 !== 0 ? "bg-secondary/20" : ""}
```

---

## 19. THEME TOGGLE

```javascript
// next-themes config
attribute: "class"
defaultTheme: "light"
enableSystem: false
disableTransitionOnChange: true
```

Toggle button: `h-9 w-9 rounded-full border border-border` with Sun/Moon icons.

---

## 20. BORDER RADIUS

| Class | Usage |
|-------|-------|
| `rounded-sm` | Nav links |
| `rounded-md` | Admin buttons, cells |
| `rounded-lg` | Cards, inputs, modals |
| `rounded-xl` | Large cards |
| `rounded-2xl` | Chat window, spotlight |
| `rounded-full` | Avatars, CTA buttons, badges |

---

## 21. ICONS

Library: **Lucide React**

| Size | Usage |
|------|-------|
| 12px | Micro icons, link arrows |
| 14px | Admin actions, small buttons |
| 16px | Standard, navbar, buttons |
| 18px | Navigation, contact icons |
| 20px | Tab bar, menu icons |

---

## 22. ACCESSIBILITY

- All interactive elements have `aria-label`
- Focus rings: `focus-visible` with `outline: 2px solid var(--ring)`
- Min touch target: 44x44px
- Color contrast: WCAG AA compliant
- `prefers-reduced-motion` respected
- Semantic HTML: `nav`, `main`, `section`, `header`
- Skip-to-content link

---

## 23. FILES TO COPY

### Required

| File | Purpose |
|------|---------|
| `src/app/globals.css` | All CSS tokens, theme, animations, Tailwind config |
| `src/lib/utils.ts` | `cn()` helper (clsx + tailwind-merge) |
| `src/lib/constants.ts` | `BRAND_GRADIENT` definition |
| `src/app/layout.tsx` | Font loading, ThemeProvider, metadata, viewport |
| `src/components/shared/theme-provider.tsx` | next-themes wrapper |
| `public/fonts/BodoniModa-Regular.woff2` | Heading font |
| `public/fonts/GeneralSans-Regular.woff2` | Body font |

### Optional (cherry-pick what you need)

| File | Purpose |
|------|---------|
| `src/components/shared/navbar.tsx` | Top navigation with rainbow bar |
| `src/components/shared/footer.tsx` | Footer with gradient divider |
| `src/components/shared/bottom-tab-bar.tsx` | Mobile tab navigation |
| `src/components/shared/fade-in.tsx` | Scroll-triggered animation wrapper |
| `src/components/shared/count-up.tsx` | Animated number counter |
| `src/components/shared/search-modal.tsx` | Ctrl+K search modal |
| `src/components/shared/pull-to-refresh.tsx` | Mobile pull-to-refresh |
| `src/components/ui/button.tsx` | shadcn button with cva variants |
| `src/components/ui/spotlight.tsx` | Aceternity spotlight effect |
| `src/components/ui/moving-border.tsx` | Aceternity animated border |
| `src/components/ui/card-spotlight.tsx` | Aceternity mouse-tracking card |
| `src/components/ui/text-generate-effect.tsx` | Aceternity text animation |
| `src/hooks/use-swipe-navigation.ts` | Framer Motion swipe gesture hook |

---

## 24. QUICK START FOR NEW PROJECT

```bash
# 1. Create project
npx create-next-app@latest my-project --typescript --tailwind --eslint --app --src-dir --use-pnpm
cd my-project

# 2. Install dependencies
pnpm add framer-motion class-variance-authority clsx tailwind-merge lucide-react next-themes geist

# 3. Copy these files from AI-hubben:
#    - src/app/globals.css (replace entirely)
#    - src/lib/utils.ts
#    - src/lib/constants.ts (at minimum BRAND_GRADIENT)
#    - public/fonts/ (BodoniModa + GeneralSans woff2 files)
#    - src/components/shared/theme-provider.tsx

# 4. Update layout.tsx with font loading (see section 3)

# 5. Start building pages following the section pattern (see section 6)
```

---

*Exported from AI-hubben (aihubben.se), Katrineholms kommun. 2026-03-23.*
