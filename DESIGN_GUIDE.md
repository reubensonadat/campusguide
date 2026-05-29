# Campus Guide: UI Design & Style Guide

Welcome to the Design Guide for the Campus Guide application. This document serves as a reference for all UI tokens, colors, typography, components, and animations. Use these standards to maintain a consistent and premium look across all pages.

---

## 1. Brand Colors (Tailwind Config / CSS Variables)

Our primary, accent, surface, and brand highlight colors are configured consistently via Tailwind CSS and CSS Variables. Always use these classes rather than arbitrary hex values.

### **Primary Palette (Slate Blue / Ocean Teal base)**
Main brand color family for buttons, active navigation states, headers, and focus rings.

| Weight | Hex / Value | Tailwind Class Example |
| :--- | :--- | :--- |
| **50** | `#f0f7fa` | `bg-primary-50` / `text-primary-50` |
| **100** | `#daebf3` | `bg-primary-100` / `text-primary-100` |
| **200** | `#bbd7e8` | `bg-primary-200` / `text-primary-200` |
| **300** | `#8dbdd8` | `bg-primary-300` / `text-primary-300` |
| **400** | `#6eabc6` | `bg-primary-400` / `text-primary-400` |
| **500** | `#468eaa` | `bg-primary-500` / `text-primary-500` |
| **600** | `#3c728f` | `bg-primary-600` / `text-primary-600` |
| **700** | `#325d76` | `bg-primary-700` / `text-primary-700` |
| **800** | `#2c4d63` | `bg-primary-800` / `text-primary-800` |
| **900** | `#274154` | `bg-primary-900` / `text-primary-900` |

### **Accent Palette (Warm Gold / Sand / Amber base)**
Used for warnings, secondary highlights, status labels, achievements, and supporter tag backgrounds.

| Weight | Hex / Value | Tailwind Class Example |
| :--- | :--- | :--- |
| **50** | `#fcf8f0` | `bg-accent-50` / `text-accent-50` |
| **100** | `#f7ebda` | `bg-accent-100` / `text-accent-100` |
| **200** | `#f0d3aa` | `bg-accent-200` / `text-accent-200` |
| **300** | `#e8b571` | `bg-accent-300` / `text-accent-300` |
| **400** | `#e3a750` | `bg-accent-400` / `text-accent-400` |
| **500** | `#c28532` (`#d78925` in CSS) | `bg-accent-500` / `text-accent-500` |
| **600** | `#a36a24` (`#bc691b` in CSS) | `bg-accent-600` / `text-accent-600` |
| **700** | `#85511b` (`#9c4c19` in CSS) | `bg-accent-700` / `text-accent-700` |
| **800** | `#6b4016` (`#7d3d19` in CSS) | `bg-accent-800` / `text-accent-800` |
| **900** | `#543014` (`#653317` in CSS) | `bg-accent-900` / `text-accent-900` |

### **Surface Palette (Warm Sage / Khaki / Sand-tinted Neutrals)**
Used for structured containers, background boxes, inputs, card borders, and off-white styling.

| Weight | Hex / Value | Tailwind Class Example |
| :--- | :--- | :--- |
| **50** | `#fdfdfc` (`#f3f3e3` in CSS) | `bg-surface-50` / `text-surface-50` |
| **100** | `#f6f6f3` (`#e9e9cd` in CSS) | `bg-surface-100` / `text-surface-100` |
| **200** | `#efefe9` (`#d8d8ae` in CSS) | `bg-surface-200` / `text-surface-200` |
| **300** | `#e6e6dc` (`#c2c286` in CSS) | `bg-surface-300` / `text-surface-300` |
| **400** | `#dbdbce` (`#afaf66` in CSS) | `bg-surface-400` / `text-surface-400` |
| **500** | `#cfcfc0` (`#99994d` in CSS) | `bg-surface-500` / `text-surface-500` |

### **Branding Highlights**
*   **Vibrant Accent (Pear Green)**: `#CBD83B` (`bg-pear` / `text-pear`)
*   **Deep Signature Navy / Teal**: `#002F45` (Widely used for premium banners, header cards, and main buttons)
*   **WhatsApp Success Green**: `#25D366`

---

## 2. Global Utilities & Gradients

Reference these built-in global classes (from `globals.css`) for consistent effects, rather than rewriting the CSS manually or relying purely on long Tailwind utility strings for repeated components.

### **Gradients**
*   `.gradient-primary`: Smooth gradient (`primary-500` → `primary-600`). Ideal for primary call-to-action buttons or banners.
*   `.gradient-accent`: Mixed gradient (`accent-500` → green shade). Can be used for highlights or achievement badges.

### **Shadows**
We rely on customized, smooth box-shadows:
*   `.shadow-soft`: Subtlest shadow, typically used on persistent internal containers (`0 4px 20px -2px rgba(0, 0, 0, 0.05)`).
*   `.shadow-medium`: Standard card shadow, ensuring depth against `bg-gray-50-soft` background.
*   `.shadow-strong`: Used for modals, popovers, or deeply elevated elements (`0 8px 30px -4px rgba(0, 0, 0, 0.1)`).

### **Interactions**
*   `.btn-hover`: Automatically adds slight upward transform (`-1px`) and standard hover shadow on buttons.
*   `.card-hover`: Use this on interactive cards to add a smooth upward shift (`-2px`) and an elevated shadow.
*   `.focus-ring`: Standardized accessibility ring (adds `3px` primary-colored outline on focus).

### **Visual Effects**
*   `.glass`: Applies our standard frosted glass effect (`rgba(255, 255, 255, 0.95)` with `10px` blur). Ideal for sticky headers or floating overlays.

---

## 3. Typography

The default typography stack is tailored to give a modern, clean, and distinct campus personality:
*   **Primary Font Family:** **Avalance** (Custom brand font), falling back to **Plus Jakarta Sans**, **Inter**, and system sans-serif fonts.
*   **Application Background:** `var(--gray-50-soft)` (`#fafbfc`) is used as the foundational body background layer.
*   **Base Text Color:** `var(--gray-800)` (`#1f2937`) provides a soft but highly legible text color, avoiding completely harsh blacks.
*   **Font Weights:** We routinely use Light (300), Regular (400), Medium (500), Semibold (600), and Bold (700) weights.

---

## 4. Animations

For components that enter the screen dynamically, we utilize smooth micro-animations defined in `globals.css`. Apply these classes to Tailwind elements to trigger on mount:

*   `.animate-fadeIn`: Simple opacity fade (duration `0.3s`). Good for general route or page transitions.
*   `.animate-slideUp`: Slight upward motion with fade-in (starts from `20px` down, duration `0.3s`). Perfect for lists, cards, or staggered grids.
*   `.animate-scaleIn`: Pops the element slightly from `0.95` scale to `1.00` (duration `0.2s`). Ideal for modals or context menus.
*   `.animate-avatar-pop`: Elastic scaling transition for avatars and badges.

---

## 5. UI Guidelines & Best Practices

1. **Accessibility First:** Always attach `.focus-ring` (or standard Tailwind focus-visible classes) on custom interactive elements to ensure keyboard navigability.
2. **Dynamic States:** Elements that the user operates should feel alive. Attach `.btn-hover` to buttons and `.card-hover` to clickable cards so they respond physically to the mouse.
3. **Contrast:** Never place light text on light backgrounds. Use legible contrast ratios.
4. **Spacing:** We rely on standard Tailwind scale (`p-4`, `m-4`, `gap-6` etc.).
5. **Modals & Overlays:** Always utilize `.modal-backdrop` and `.modal-content` or standard glass overlays with `.glass` utility for consistent floating windows.
