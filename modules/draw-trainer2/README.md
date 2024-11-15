# Baccarat Interactive Draw Trainer (Level 2)

An advanced interactive web application for practicing Baccarat's third card drawing rules through hands-on experience. This trainer builds upon Level 1 by providing a more realistic dealing experience with direct card placement.

## Features

- Interactive card display with two card styles (toggle with button)
- Real-time feedback on incorrect decisions
- Score tracking with success rate
- Comprehensive drawing rules reference
- Mobile-responsive design
- Auto-hiding feedback messages
- Dealer's perspective layout
- Proper natural hand detection
- Direct card placement for realistic dealing practice

## Drawing Rules

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

## Usage

1. Practice making decisions:
   - Draw cards when appropriate by placing them in the correct position
   - Declare winner when hand is complete
2. Learn from feedback:
   - Immediate feedback on incorrect decisions
   - Score tracking shows progress
3. Toggle card styles using the button
4. View drawing rules anytime by expanding the rules section

## Features Implementation

- **Card Management**: 
  - Interactive card placement
  - Two card style options
  - Realistic dealing simulation
- **Game Logic**: 
  - Enforces Baccarat rules and validates decisions
  - Properly handles natural hands (8-9) in initial cards
  - Manages third card drawing rules
- **Feedback System**: 
  - Provides immediate feedback on incorrect decisions
  - Auto-hides after brief display
  - Centered overlay design
- **Score Tracking**: 
  - Maintains running totals
  - Calculates success rate
  - Resets on page load
- **Mobile Support**: 
  - Responsive design
  - Touch-friendly controls
  - Compact layout for smaller screens
- **Dealer's Perspective**: 
  - Layout matches real table view
  - Proper card positioning
  - Clear hand separation

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

The toggle button will automatically work with any card set that follows these specifications. For complete customization details, see the main project README.
