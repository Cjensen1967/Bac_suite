# Baccarat Training Suite Style Guide

## Overview
This style guide documents the design system for the Baccarat Training Suite, implementing a modern, professional color scheme that ensures consistency across all modules while maintaining readability and usability across different devices.

## Color Palette

### Primary Colors
```css
--primary-darker: #3E3E40;  /* Buttons (improved contrast) */
--primary-dark: #4E4E50;    /* Headers, footers */
--primary-medium: #647C90;  /* Main background */
--primary-base: #647C90;    /* Backgrounds, accents */
--primary-light: #746C70;   /* Borders, hover states */
```

### Secondary Colors
```css
--soft-gray: #4E4E50;     /* Body text */
--muted-ivory: #E2DED0;   /* Light backgrounds */
--text-white: #FFFFFF;    /* Button text (improved contrast) */
```

### Background Colors
```css
--bg-section: #E2DED0;    /* Content sections */
--bg-highlight: rgba(100, 124, 144, 0.1); /* Subtle highlights */
```

### Game-Specific Colors
```css
/* Draw Trainer 1 */
--table-green: #006B3E;   /* Traditional baccarat table */

/* Draw Trainer 2 */
--table-red: #8B0000;     /* Alternative table color */
```

### Status Colors
```css
--success-color: #5B8A4B;
--success-bg: #EDF7EA;
--error-color: #B4432C;
--error-bg: #FDEAE7;
```

## Typography

### Font Families
```css
--font-primary: 'Arial', sans-serif;
--font-secondary: 'Helvetica Neue', sans-serif;
```

### Font Sizes
```css
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
```

### Font Weights
```css
--font-light: 300;
--font-regular: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### Line Heights
```css
--line-height-normal: 1.5;
--line-height-heading: 1.2;
```

## Spacing System

### Base Spacing Units
```css
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-6: 1.5rem;   /* 24px */
```

## Component Guidelines

### Headers
- Use Cool Gray background
- Blue Gray accents
- Sticky positioning
- Consistent padding across devices

```css
header {
    background-color: var(--primary-dark);
    color: var(--muted-ivory);
    padding: var(--space-2) var(--space-3);
    border-bottom: 2px solid var(--primary-medium);
}
```

### Content Sections
- Ivory backgrounds for readability
- Consistent spacing
- Subtle hover effects
- Clear visual hierarchy

```css
.section {
    background-color: var(--bg-section);
    padding: var(--space-3);
    border-radius: 4px;
    border: 1px solid var(--primary-light);
}
```

### Buttons
- Clear hover states
- Adequate padding for touch targets
- Consistent border treatments
- High contrast for accessibility (10.5:1 ratio)

```css
.btn {
    background-color: var(--primary-darker);
    color: var(--text-white);
    padding: var(--space-2) var(--space-3);
    border: 1px solid var(--primary-light);
    border-radius: 4px;
}

.btn:hover {
    background-color: var(--primary-light);
}
```

**Contrast Ratios:**
- Primary buttons: `#3E3E40` + `#FFFFFF` = 10.5:1 (WCAG AAA) ✓
- Secondary buttons: `#647C90` + `#FFFFFF` = 5.8:1 (WCAG AA) ✓
- Hover state: `#746C70` + `#FFFFFF` = 4.9:1 (WCAG AA) ✓

## Responsive Design

### Mobile First Approach
- Compact spacing on mobile
- Touch-friendly interface elements
- Readable font sizes
- Optimized content width

### Desktop Enhancements
- Increased spacing for better visual rhythm
- Larger font sizes where appropriate
- Enhanced hover effects
- Wider content area (max-width: 800px)

```css
@media (min-width: 768px) {
    header {
        padding: var(--space-3) var(--space-4);
    }

    .content {
        margin: var(--space-4) auto;
        padding: 0 var(--space-4);
    }
}
```

## Best Practices

### Accessibility
- Maintain sufficient color contrast (minimum WCAG AA 4.5:1, aim for AAA 7:1)
- All buttons now use 10.5:1 contrast ratio for excellent readability
- Use semantic HTML elements
- Ensure adequate touch targets (minimum 44x44px)
- Provide hover/focus states
- Test all color combinations with contrast checker tools

### Performance
- Use system fonts
- Minimize shadow effects on mobile
- Optimize transitions for smooth performance

### Maintainability
- Use CSS variables for consistent theming
- Follow mobile-first approach
- Maintain consistent naming conventions
- Document significant style changes

## Implementation Notes

1. Always use the defined CSS variables for:
   - Colors
   - Spacing
   - Typography
   - Border radius
   
2. Follow the mobile-first approach:
   - Start with mobile styles
   - Add desktop styles in media queries
   
3. Maintain consistency:
   - Use provided color palette
   - Follow spacing system
   - Implement consistent component styles

4. Consider performance:
   - Minimize complex animations on mobile
   - Use system fonts for better performance
   - Optimize box-shadow usage

5. Game-Specific Considerations:
   - **Draw Trainer 1 (Desktop & Mobile):** Use `#006B3E` (traditional green felt)
   - **Draw Trainer 2:** Use `#8B0000` (red felt) to differentiate
   - Keep consistent UI elements around game areas
   - Ensure button colors remain consistent across all game variations

This style guide should be referenced when creating new modules or updating existing ones to maintain consistency across the Baccarat Training Suite.
