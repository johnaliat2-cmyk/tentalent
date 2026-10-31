---
name: Ten Talents Sovereign Editorial
colors:
  surface: '#fbf9f2'
  surface-dim: '#dcdad3'
  surface-bright: '#fbf9f2'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f4ed'
  surface-container: '#f0eee7'
  surface-container-high: '#eae8e1'
  surface-container-highest: '#e4e2dc'
  on-surface: '#1b1c18'
  on-surface-variant: '#44474d'
  inverse-surface: '#30312c'
  inverse-on-surface: '#f3f1ea'
  outline: '#74777e'
  outline-variant: '#c4c6ce'
  surface-tint: '#4b5f80'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#031c39'
  on-primary-container: '#7085a7'
  inverse-primary: '#b3c7ed'
  secondary: '#80561a'
  on-secondary: '#ffffff'
  secondary-container: '#fdc57e'
  on-secondary-container: '#784f14'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#271900'
  on-tertiary-container: '#a97c25'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d5e3ff'
  primary-fixed-dim: '#b3c7ed'
  on-primary-fixed: '#031c39'
  on-primary-fixed-variant: '#334767'
  secondary-fixed: '#ffddb7'
  secondary-fixed-dim: '#f4bc77'
  on-secondary-fixed: '#2a1700'
  on-secondary-fixed-variant: '#643f02'
  tertiary-fixed: '#ffdeab'
  tertiary-fixed-dim: '#f3be61'
  on-tertiary-fixed: '#271900'
  on-tertiary-fixed-variant: '#5f4100'
  background: '#fbf9f2'
  on-background: '#1b1c18'
  surface-variant: '#e4e2dc'
typography:
  display:
    fontFamily: Manrope
    fontSize: 56px
    fontWeight: '800'
    lineHeight: 64px
    letterSpacing: -0.035em
  display-mobile:
    fontFamily: Manrope
    fontSize: 38px
    fontWeight: '800'
    lineHeight: 44px
    letterSpacing: -0.03em
  headline-lg:
    fontFamily: Manrope
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.03em
  headline-lg-mobile:
    fontFamily: Manrope
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.025em
  headline-md:
    fontFamily: Manrope
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-sm:
    fontFamily: Manrope
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 30px
    letterSpacing: -0.015em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
    letterSpacing: 0em
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.04em
  caption:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 3rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system embodies the stately poise, intellectual depth, and serene discernment of modern British educational institutions fused with boutique private wealth management. It rejects the speculative frenzy, neon palettes, algorithmic chaos, and dopamine-driven tropes of retail trading apps in favor of timeless academic authority, considered stewardship, and long-term financial clarity.

The visual dialect pairs a grounding scholastic cream environment with deep naval ink architecture and disciplined, burnished gold accents. Surfaces feel tactile and stately—like heavy-stock parchment paired with bespoke bookbinding. Every layout encourages slow, deliberate reading, thoughtful curriculum engagement, and quiet confidence rather than impulsive execution.

## Colors

The palette establishes an atmosphere of grounded permanence through warm organic neutrals, authoritative midnight tones, and restrained metallic accents.

### Core Architecture
- **Primary Canvas (`#F5F3EC`):** A warm, unbleached vellum cream base that avoids digital glare, softens eye fatigue during study sessions, and gives structural legitimacy to white elevation cards.
- **Surface Elevation (`#FFFFFF`):** Reserved strictly for content enclosures, curriculum modules, and interactive dialogs, standing out naturally against the warm page backdrop.
- **Deep Navy Base (`#011936`):** The institutional anchor. Used for primary navigation bars, high-prominence banners, footer structures, and solid high-contrast action modules.
- **Hero Twilight Gradient:** Transitions from `navy (#0B2A52)` to `deep blue (#1B4A82)` with an optional subtle 5% radial diffusion of `#EDB671` at the edge to suggest dawn light without breaking corporate restraint.

### Typography & Content Tokens
- **Ink Primary (`#06182E`):** Deep naval ink for headline hierarchy and core body narrative. Replaces pure black to retain warmth.
- **Muted Slate (`#5A6472`):** Calm, balanced secondary tone for captions, metadata, supporting copy, and non-interactive structural indicators.

### Accent & Feedback
- **Accent Gold (`#EDB671`):** Applied strictly with editorial restraint—sparingly used for primary call-to-action buttons, high-achievement markers, active progress bars, and subtle focal highlights. Never used for massive planar surfaces.
- **Deep Gold (`#9A6F18`):** Preserves AA accessibility when gold type, text labels, or iconography sit directly on light cream (`#F5F3EC`) or white surfaces.
- **Structural Outlines:** Borders are drawn exclusively using `#011936` at 8% to 12% opacity (`rgba(1, 25, 54, 0.08)` to `rgba(1, 25, 54, 0.12)`).

## Typography

Typography balances authoritative Scandinavian-British geometric construction with effortless utilitarian legibility:

- **Headlines (Manrope):** Chosen for its disciplined precision, crisp letterforms, and structural gravitas. All headings leverage tight tracking (`-0.015em` to `-0.035em`) to evoke formal academic monographs and financial broadsheets.
- **Body & Controls (Inter):** Systematized for sustained reading comfort across educational essays, financial curriculum steps, and community discussions. Line-heights are intentionally generous (`1.6x` to `1.65x`) to maintain a calm, unhurried cadence.
- **Metadata & Badges:** Use `label-sm` or `caption` with slight positive tracking (`+0.04em` to `+0.05em`) in uppercase or title-case to lend an archival, cataloged presence to timestamps, module indicators, and membership status tags.

## Layout & Spacing

The design system employs a fixed-max-width grid structured around classical proportion:
- **Maximum Content Width:** Constrained to `1240px` for editorial flow, preventing wide-screen line lengths from deteriorating reading comprehension.
- **Desktop Grid:** 12 columns with `1.5rem` gutters and generous `3rem` section margins.
- **Mobile Grid:** 4 columns with `1rem` gutters and `1.25rem` outer canvas padding.
- **Vertical Rhythm:** Generous spacing rules govern section transitions (`space-xl` scaled to `4rem` or `6rem` on desktop break points). Content breathes openly; white space acts as a design material that conveys financial stability, calm deliberation, and curated exclusivity.

## Elevation & Depth

Depth is established organically via delicate atmospheric layering rather than harsh drop shadows. 

1. **Base Plane:** The creamy matte background (`#F5F3EC`) provides zero-elevation texture.
2. **Standard Elevated Canvas (Cards & Modules):** Pure white `#FFFFFF` layered over cream, bounded by a feather-light hairline border (`#011936` at 8% opacity) and an ambient, double-pass shadow:
   - Primary Ambient: `0 4px 20px -2px rgba(1, 25, 54, 0.04)`
   - Structural Definition: `0 12px 36px -4px rgba(1, 25, 54, 0.06)`
3. **Floating Overlays & Modals:** 
   - Multi-layer shadow: `0 24px 48px -12px rgba(1, 25, 54, 0.14), 0 4px 12px 0 rgba(1, 25, 54, 0.04)`
   - Backdrop filter: Ultra-dense blur (`backdrop-blur-md`) with a 40% `#011936` tinted scrim.
4. **Hero & Dark Band Depth:** Dark navy surfaces (`#011936` to `#0B2A52`) use faint inner hairline highlights (`inset 0 1px 0 rgba(255, 255, 255, 0.08)`) instead of drop shadows to emulate hand-tooled leather or fine stationery edges.

## Shapes

The shape system centers on large, welcoming silhouettes that soften institutional stiffness while remaining disciplined:

- **Cards & Primary Modules:** Uniform `24px` radius (`rounded-3xl` / `1.5rem`). This pronounced curvature creates an inviting, tactile enclosure for all curriculum lessons, community posts, and financial summaries.
- **Interactive Controls (Buttons, Inputs, Badges):** Standardized at `0.75rem` (12px) to `1rem` (16px) corner rounding to maintain structural distinction against parent card perimeters.
- **Avatars & Status Indicators:** Pure circular (`rounded-full`).

## Components

### Buttons
- **Primary:** Warm Accent Gold (`#EDB671`) background with Deep Navy Ink (`#011936`) text, font-weight 600 (`label-md`). Hover transitions smoothly to a richer tone (`#DF9E4F`). No heavy drop shadows; tactile micro-scale on active click (`scale(0.98)`).
- **Secondary (Institutional):** Navy base (`#011936`) with white (`#FFFFFF`) or soft gold text. Used within bright hero banners and dark band headers.
- **Tertiary / Outline:** Pure white or transparent background with a 1px border of `#011936` at 15% opacity, text in Deep Text Ink (`#06182E`). Hover fills with `#011936` at 4% opacity.

### Cards
- **Curriculum & Community Cards:** Background pure white (`#FFFFFF`), `24px` corner radius, hairline border (`#011936` at 10% opacity), and subtle diffused dual shadow. Internal padding is generous (`space-lg` to `space-xl`).
- **Feature/Highlight Cards:** Dark navy variant (`#011936`) featuring white body copy and Deep Gold tags, bordered with an inner hairline highlight (`inset 0 0 0 1px rgba(237, 182, 113, 0.2)`).

### Chips & Badges
- **Curriculum Category / Tier Tag:** Rounded-full pill with warm gold tint (`#EDB671` at 15% opacity), text rendered in AA-compliant Deep Gold (`#9A6F18`), font-weight 600, uppercase letter-spaced tracking (`label-sm`).
- **Institutional Status Badge:** Deep Navy background with crisp white or gold text.

### Form Inputs
- **Text Inputs & Selects:** Pure white fill, `12px` corner radius, `1px` border of `#011936` at 12% opacity. Text in `#06182E`, placeholder in `#5A6472` at 60% opacity. 
- **Focus State:** 1.5px border in Deep Navy (`#011936`) paired with a soft 3px outer glow ring of `#EDB671` at 30% opacity.

### Checkboxes & Radios
- Square with soft 4px corners (checkbox) or circle (radio). Bordered with `#011936` at 25% opacity. When checked, fills with Solid Navy (`#011936`) with a crisp gold (`#EDB671`) or white checkmark glyph.

### Specialized Education & Community Components
- **Reading Progress Bar:** Ultra-slim (3px) indicator running across card headers in Accent Gold (`#EDB671`) over a hairline track (`#011936` at 6%).
- **Socratic Callout Box:** Cream-toned inset container (`#F5F3EC`) nestled inside white cards, anchored by a 3px solid Gold accent border along the left edge, framing key principles, quotes, or discussion prompts.