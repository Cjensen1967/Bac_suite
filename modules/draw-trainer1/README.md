# Baccarat Third Card Rules Trainer (Level 1)

An interactive web application to help dealers and players learn and practice Baccarat's third card drawing rules. This trainer provides real-time feedback and tracks performance while learning these complex rules.

## Features

- Interactive card display with realistic playing cards
- Two different card face designs (toggle with style button)
- Real-time feedback on decisions
- Performance tracking (correct/incorrect/total hands)
- Clear display of Banker's third card drawing rules
- Floating help and rules buttons for easy access
- Responsive design optimized for all devices:
  - Desktop: Full layout with integrated controls
  - Mobile: Edge-to-edge design with corner controls
  - Landscape: Optimized for wider viewing
- No installation required - runs in any modern web browser
- Step-by-step guidance for learning the rules

## Interface Layout

### Desktop View
- Help button (?) in top-right corner
- Drawing Rules button in top-left corner
- Stats counter at the bottom
- Integrated control panel with reset, style, and back buttons

### Mobile View
- Help button (?) in top-right corner
- Drawing Rules button in top-left corner
- Stats counter at bottom center
- Reset button in bottom-left corner
- Style button in bottom-right corner
- Edge-to-edge design for immersive experience
- Uses native back functionality

## Rules Reference

### Player Rules
- 0-5: Draw
- 6-7: Stand
- 8-9: Natural (initial two cards only)

### Banker Rules
- If Player stands, follow Player drawing rules
- 0-2: Always Draw
- 3: Draw unless Player's 3rd is 8
- 4: Draw on Player's 3rd 2-7
- 5: Draw on Player's 3rd 4-7
- 6: Draw on Player's 3rd 6-7
- 7: Stand
- 8-9: Natural (initial two cards only)

## License and Credits

The code for this module is released under The Unlicense - see the main project's LICENSE file for details.

### Card Assets

This module includes two sets of playing card assets:

1. **Style 1 Playing Cards** (in `assets/` directory)
   - Created by DaveKun
   - Source: [OpenGameArt.org](https://opengameart.org/content/52-set-cards-and-background-any-game)
   - License: Creative Commons Attribution 4.0 International (CC BY 4.0)
   - Attribution required when using or distributing these cards

2. **Style 2 Playing Cards** (in `assets2/` directory)
   - Created by SirDraco65
   - Source: [OpenGameArt.org](https://opengameart.org/content/generic-playing-cards)
   - License: CC0 (Public Domain)
   - No attribution required

Please note that while the code is unrestricted, you must comply with the respective licenses when using or distributing the card assets.

## Customizing Card Assets

You can use your own card designs with this module. To ensure compatibility:

### Technical Requirements
1. **File Naming Convention**:
   - Files must follow the pattern: `[suit][value].png`
   - Suits: `clubs`, `diamonds`, `hearts`, `spades`
   - Values: `2` through `9`, `T` (10), `J` (Jack), `Q` (Queen), `K` (King), `A` (Ace)
   - Example: `hearts7.png`, `clubsK.png`, `spadesA.png`

2. **Image Specifications**:
   - Format: PNG with transparency
   - Resolution: Match the existing card dimensions for consistent display
   - File Location: Place in either `assets/` or `assets2/` directory

The style button will automatically work with any card set that follows these specifications. For complete customization details, see the main project README.
