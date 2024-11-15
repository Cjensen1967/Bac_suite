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

## Acknowledgments

- Beautiful card designs by DaveKun (Style 1) and SirDraco65 (Style 2) from OpenGameArt.org
- Inspired by the need for better tools to learn Baccarat dealing rules
