# Baccarat Training Suite Style Guide

## Overview
This style guide documents the design system for the Baccarat Training Suite, implementing the Rustic Haven Corporate Manual & Training Guide standards. It ensures consistency across all modules while maintaining readability and usability across different devices.

## Color Palette

### Primary Colors
```css
--rust-red: #8B2D1E;      /* Headers, primary actions */
--golden-ochre: #C2874E;  /* Accents, highlights */
--weathered-brown: #5A4634; /* Main background */
```

### Secondary Colors
```css
--moss-green: #7A8C6D;    /* Success states, secondary actions */
--muted-ivory: #F2E8D5;   /* Light backgrounds */
```

### Neutral Colors
```css
--soft-gray: #4A4A4A;     /* Body text */
--warm-beige: #E6D5B1;    /* Alternative backgrounds */
```

### Accent Colors
```css
--burnt-umber: #96583D;   /* Decorative elements */
--slate-gray: #4E4E4E;    /* Secondary text */
```

### Background Colors
```css
--bg-intro: #A66B51;      /* Introduction sections */
--bg-section: #F7F0E6;    /* Content sections */
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
- Use rust-red background
- Golden ochre accents
- Sticky positioning
- Consistent padding across devices

```css
header {
    background-color: var(--rust-red);
    color: var(--muted-ivory);
    padding: var(--space-2) var(--space-3);
    border-bottom: 2px solid var(--golden-ochre);
}
```

### Content Sections
- Light backgrounds for readability
- Consistent spacing
- Subtle hover effects
- Clear visual hierarchy

```css
.history-section {
    background-color: var(--bg-section);
    padding: var(--space-3);
    border-radius: 4px;
    border: 1px solid var(--warm-beige);
}
```

### Buttons
- Clear hover states
- Adequate padding for touch targets
- Consistent border treatments

```css
.back-btn {
    color: var(--muted-ivory);
    padding: var(--space-1) var(--space-2);
    border: 1px solid var(--golden-ochre);
    border-radius: 4px;
}
```

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
- Maintain sufficient color contrast
- Use semantic HTML elements
- Ensure adequate touch targets
- Provide hover/focus states

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

This style guide should be referenced when creating new modules or updating existing ones to maintain consistency across the Baccarat Training Suite.
