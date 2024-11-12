# Baccarat Interactive Draw Trainer

An interactive web application to help learn and practice Baccarat's third card drawing rules through hands-on experience.

Try it here: https://cjensen1967.github.io/bac_trainer/

## Features

- Interactive card display with two card styles (toggle with button)
- Real-time feedback on incorrect decisions
- Score tracking with success rate
- Comprehensive drawing rules reference
- Mobile-responsive design
- Auto-hiding feedback messages
- Dealer's perspective layout
- Proper natural hand detection

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

1. Open `index.html` in a web browser
2. Practice making decisions:
   - Draw cards when appropriate
   - Declare winner when hand is complete
3. Learn from feedback:
   - Immediate feedback on incorrect decisions
   - Score tracking shows progress
4. Toggle card styles using the button
5. View drawing rules anytime by expanding the rules section

## Development

The application is built using vanilla JavaScript, HTML, and CSS, requiring no build process or dependencies.

### Project Structure
```
bac_trainer/
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── game.js
│   ├── cards.js
│   └── utils.js
└── assets/
    ├── [card images style 1]
    └── assets2/
        └── [card images style 2]
```

### Features Implementation

- **Card Management**: Handles card creation, display, and style switching
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
- Development assisted by Claude Sonnet AI - proving that with AI assistance, anyone can bring their ideas to life regardless of coding experience
- Inspired by the need for better tools to learn Baccarat dealing rules
