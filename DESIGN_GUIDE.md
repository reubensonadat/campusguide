# Campus Guide: UI Design & Style Guide

Welcome to the Design Guide for the Campus Guide application. This document serves as a reference for all UI tokens, colors, typography, components, and animations. Use these standards to maintain a consistent and premium look across all pages.

---

## 1. Brand Colors (Tailwind Config)

Our primary and accent colors are configured consistently via Tailwind CSS. Always use these classes rather than custom hex values directly.

### **Primary Palette (Indigo base)**
Main brand color for buttons, active states, and focus rings.

| Weight | Hex / RGB | Tailwind Class Example |
| :--- | :--- | :--- |
| **50** | `#eef2ff` | `bg-primary-50` / `text-primary-50` |
| **100** | `#e0e7ff` | `bg-primary-100` / `text-primary-100` |
| **200** | `#c7d2fe` | `bg-primary-200` / `text-primary-200` |
| **300** | `#a5b4fc` | `bg-primary-300` / `text-primary-300` |
| **400** | `#818cf8` | `bg-primary-400` / `text-primary-400` |
| **500** | `rgb(99, 102, 241)` | `bg-primary-500` / `text-primary-500` |
| **600** | `#4f46e5` | `bg-primary-600` / `text-primary-600` |
| **700** | `#4338ca` | `bg-primary-700` / `text-primary-700` |
| **800** | `#3730a3` | `bg-primary-800` / `text-primary-800` |
| **900** | `#1e1b4b` | `bg-primary-900` / `text-primary-900` |

### **Accent Palette (Purple base)**
Used for secondary actions, highlights, and subtle backgrounds.

| Weight | Hex | Tailwind Class Example |
| :--- | :--- | :--- |
| **50** | `#f5f3ff` | `bg-accent-50` / `text-accent-50` |
| **100** | `#ede9fe` | `bg-accent-100` / `text-accent-100` |
| **200** | `#ddd6fe` | `bg-accent-200` / `text-accent-200` |
| **300** | `#c4b5fd` | `bg-accent-300` / `text-accent-300` |
| **400** | `#a78bfa` | `bg-accent-400` / `text-accent-400` |
| **500** | `#8b5cf6` | `bg-accent-500` / `text-accent-500` |
| **600** | `#7c3aed` | `bg-accent-600` / `text-accent-600` |
| **700** | `#6d28d9` | `bg-accent-700` / `text-accent-700` |
| **800** | `#5b21b6` | `bg-accent-800` / `text-accent-800` |
| **900** | `#4c1d95` | `bg-accent-900` / `text-accent-900` |

---

## 2. Global Utilities & Gradients

Reference these built-in global classes (from `globals.css`) for consistent effects, rather than rewriting the CSS manually or relying purely on long Tailwind utility strings for repeated components.

### **Gradients**
*   `.gradient-primary`: Smooth gradient (`primary-500` → `primary-600`). Ideal for primary call-to-action buttons or banners.
*   `.gradient-accent`: Mixed gradient (`accent-500` → green shade). Can be used for highlights or achievement badges.

### **Shadows**
We rely on customized, smooth box-shadows:
*   `.shadow-soft`: Subtlest shadow, typically used on persistent internal containers.
*   `.shadow-medium`: Standard card shadow, ensuring depth against `bg-gray-50-soft` background.
*   `.shadow-strong`: Used for modals, popovers, or deeply elevated elements.

### **Interactions**
*   `.btn-hover`: Automatically adds slight upward transform (`-1px`) and standard hover shadow on buttons.
*   `.card-hover`: Use this on interactive cards to add a smooth upward shift (`-2px`) and an elevated shadow.
*   `.focus-ring`: Standardized accessibility ring (adds `3px` primary-colored outline on focus).

### **Visual Effects**
*   `.glass`: Applies our standard frosted glass effect (`rgba(255, 255, 255, 0.95)` with `10px` blur). Ideal for sticky headers or floating overlays.

---

## 3. Typography

The default application font is **Inter**, falling back to system fonts (Apple System, BlinkMacSystemFont, Segoe UI, Roboto).

*   **Application Background:** `bg-gray-50-soft` (via CSS variable) is used as the foundational body background layer.
*   **Base Text Color:** `var(--gray-800)` provides a soft but highly legible text color, avoiding completely harsh blacks.
*   **Font Weights:** We routinely use Light (300), Regular (400), Medium (500), Semibold (600), and Bold (700) weights. 

---

## 4. Animations

For components that enter the screen dynamically, we utilize smooth micro-animations defined in `globals.css`. Apply these classes to Tailwind elements to trigger on mount:

*   `.animate-fadeIn`: Simple opacity fade (duration `0.3s`). Good for general route or page transitions.
*   `.animate-slideUp`: Slight upward motion with fade-in (starts from `20px` down, duration `0.3s`). Perfect for lists, cards, or staggered grids.
*   `.animate-scaleIn`: Pops the element slightly from `0.95` scale to `1.00` (duration `0.2s`). Ideal for modals or context menus.

---

## 5. UI Guidelines & Best Practices

1. **Accessibility First:** Always attach `.focus-ring` (or standard Tailwind focus-visible classes) on custom interactive elements to ensure keyboard navigability.
2. **Dynamic States:** Elements that the user operates should feel alive. Attach `.btn-hover` to buttons and `.card-hover` to clickable cards so they respond physically to the mouse.
3. **Contrast:** Never place light text (e.g., `text-accent-100`) on light backgrounds (`bg-white` or `bg-primary-50`). Ensure legible contrast ratios.
4. **Spacing:** We rely on standard Tailwind scale (`p-4`, `m-4`, `gap-6` etc.). 
5. **Modals & Overlays:** Always utilize `.modal-backdrop` and `.modal-content` or standard glass overlays with `.glass` utility for consistent floating windows. 
