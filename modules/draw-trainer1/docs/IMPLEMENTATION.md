# CSS Restructuring Implementation Guide

## File Structure

### base.css
- Reset styles (*, html, body)
- Typography defaults
- Base background color (#006B3E)
- Common utilities
- Touch handling for mobile

### layout.css
- .game-container
- .baccarat-table
- .player-area
- .banker-area
- .middle-buttons
- .cards-area
- .back-section (desktop only)

### cards.css
- .card-slot
- .card-slot.draw-btn
- .vertical-text
- Card images and states
- Draw button variations

### components.css
- .prompt (and variations)
- .stats
- .counter
- .stand-btn
- .decision-btn
- .back-btn (desktop only)
- .reset-btn
- .card-style-btn

### floating.css
- .floating-help (top-right)
- .floating-rules (top-left)
- .rules-content
- .rules-list
- Overlay animations and states
- Transparent button styling

### responsive.css
Portrait mode (max-width: 768px):
- Edge-to-edge layout
- No viewport padding
- Bottom corner controls
- Centered stats
- Hidden back button
- Floating button adaptations

Landscape mode (max-height: 500px):
- Compact layout
- Optimized control positioning
- Adjusted card sizes
- Bottom corner controls
- Hidden back button

## Implementation Steps

1. Create CSS Directory
```bash
mkdir css
```

2. Create Individual Files
```bash
touch css/base.css
touch css/layout.css
touch css/cards.css
touch css/components.css
touch css/floating.css
touch css/responsive.css
touch css/main.css
```

3. Migration Process
- Copy relevant sections from styles.css to new files
- Maintain original styles.css until verification
- Test each component individually
- Update HTML to reference new structure
- Verify mobile-specific layouts

4. Testing Checklist
Desktop View:
- [ ] Base styles applied correctly
- [ ] Layout maintains structure
- [ ] Cards display properly
- [ ] Components function as expected
- [ ] Floating elements work
- [ ] Back button visible and functional

Mobile Portrait View:
- [ ] Edge-to-edge layout
- [ ] No viewport padding/margins
- [ ] Bottom corner controls visible
- [ ] Stats centered at bottom
- [ ] Back button hidden
- [ ] Floating buttons properly positioned

Mobile Landscape View:
- [ ] Compact layout
- [ ] Controls accessible
- [ ] Card sizes appropriate
- [ ] Stats visible
- [ ] Back button hidden
- [ ] No layout overflow

General:
- [ ] No visual regressions
- [ ] Performance maintained
- [ ] Touch interactions working
- [ ] All transitions smooth

## Notes
- Keep original styles.css as backup
- Test on multiple mobile devices
- Verify both portrait and landscape
- Test all touch interactions
- Document any deviations from plan
- Track any bugs or issues found
- Ensure consistent button styling across views
