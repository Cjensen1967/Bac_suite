# Baccarat Third Card Rules Trainer (Level 1)

An interactive web application to help dealers and players learn and practice Baccarat's third card drawing rules. This trainer provides real-time feedback and tracks performance while learning these complex rules.

## Features

- Interactive card display with realistic playing cards
- Two different card face designs (toggle with button)
- Real-time feedback on decisions
- Performance tracking (correct/incorrect/total hands)
- Clear display of Banker's third card drawing rules
- Responsive design that works on all devices
- No installation required - runs in any modern web browser
- Step-by-step guidance for learning the rules

## How to Use

1. The trainer will display two cards each for Player and Banker hands
2. Determine if there's a natural win (8 or 9 total)
3. If no natural, decide if the Player should draw based on their total
4. Finally, determine if the Banker should draw based on their total and the Player's third card (if any)
5. Get immediate feedback on your decisions
6. Track your progress with the score counter
7. Use the toggle button to switch between different card face designs

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

The toggle button will automatically work with any card set that follows these specifications. For complete customization details, see the main project README.
