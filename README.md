# Baccarat Training Suite Project

[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)

## Project Overview
The **Baccarat Training Suite** is a modular training application designed to teach and practice various aspects of Baccarat dealing and gameplay. Built entirely with the assistance of Claude Sonnet 3.5, an AI-powered code-writing tool, the suite is designed with independent modules, each focusing on a specific aspect of Baccarat—from understanding the game's rules to mastering card handling and commission calculations. This modular approach not only simplifies updates and customization but also demonstrates how AI code generators can efficiently handle smaller, self-contained files, making development accessible and scalable.

## Live Demo
Try the application here: [Baccarat Training Suite Live Demo](https://cjensen1967.github.io/Bac_suite/)

## Project Goal
The goal of this project is to create a user-friendly, educational tool that organizes Baccarat training into self-contained modules. Each module functions as a separate page without shared dependencies, making it easy to modify or add new modules without affecting others. This modular design allows the entire suite to run locally from a folder on most modern web browsers, requiring no special setup or installation.

## Modules

### 1. Introduction (`/modules/introduction`)
Learn about the history and variations of Baccarat through this informational module. Covers:
- Historical context
- Game variations
- Cultural significance
- Industry trends

### 2. Rules Guide (`/modules/instructions`)
Comprehensive instructions on Baccarat gameplay mechanics and rules, including:
- Basic game overview
- Gameplay mechanics
- Detailed rules
- Common situations

### 3. Third Card Draw Training
Split into two progressive levels for optimal learning:

#### Level 1 (`/modules/draw-trainer1`)
- Basic third card rule training with guided step-by-step learning
- Button-based interface that guides users through each decision point
- Simple performance tracking (correct/incorrect/total hands)
- Quick-reference rules display
- Two card face design options

#### Level 2 (`/modules/draw-trainer2`)
- Advanced interactive training simulating real gameplay
- Interactive card slots requiring direct application of rules
- Enhanced success rate tracking
- Toggle between card styles
- Comprehensive rules reference

### 4. Commission Calculator (`/modules/commission-drill`)
Practice calculating commissions quickly and accurately with:
- Real-time calculation practice
- Instant feedback
- Performance tracking
- Common amount references

## Project Structure
```
baccarat-training-suite/
├── index.html                # Main dashboard
├── styles.css               # Dashboard styles
├── script.js               # Dashboard logic
├── STYLE_GUIDE.md          # Design system documentation
├── README.md               # Project documentation
└── /modules                # Individual training modules
    ├── /introduction      # Game history and context
    ├── /instructions      # Rules and procedures
    ├── /draw-trainer1     # Basic third card rules
    ├── /draw-trainer2     # Advanced dealing practice
    └── /commission-drill  # Commission calculations
```

## Module Documentation
Each module contains its own README.md file with detailed information about:
- Module-specific features
- Usage instructions
- Content sections
- Implementation details
- Tips for effective use

## Design System
The project follows a consistent design system documented in STYLE_GUIDE.md, ensuring:
- Consistent visual appearance
- Responsive design
- Accessibility standards
- Performance optimization

## Guidelines

1. **Modular Independence**:  
   Each module is self-contained with its own HTML, CSS, and JavaScript files, ensuring no cross-module dependencies.

2. **Consistent Design**:  
   All modules follow the design system specified in STYLE_GUIDE.md for a cohesive user experience.

3. **Documentation**:  
   Each module maintains its own documentation while adhering to the project's overall structure.

4. **Asset Management**:  
   Module-specific resources are kept within their respective directories to maintain modularity.

5. **Accessibility**:  
   All modules follow accessibility best practices as outlined in the style guide.

## Getting Started
1. Download or clone the repository.
2. Open `index.html` in a modern web browser.
3. Navigate through modules using the dashboard.
4. No installation or setup required.

## License
This project's source code is released under The Unlicense, making it freely available for any use without restrictions. However, the project includes third-party assets that maintain their own separate licenses.

### Important License Notes
- While the project's code is unrestricted under The Unlicense, the card assets maintain their original licenses.
- Users must comply with the CC BY 4.0 license terms when using or distributing the Style 1 cards.
- The Style 2 cards can be freely used without attribution.
- See the LICENSE file for complete license texts and details.

## Credits and Attribution

### Playing Card Assets

This project includes two sets of playing card assets with different licensing requirements:

1. **Style 1 Playing Cards**
   - Creator: DaveKun
   - Source: [OpenGameArt.org](https://opengameart.org/content/52-set-cards-and-background-any-game)
   - License: Creative Commons Attribution 4.0 International (CC BY 4.0)
   - Location: `/modules/draw-trainer1/assets/` and `/modules/draw-trainer2/assets/`
   - **Attribution Requirement**: When using or distributing these cards, you must give appropriate credit to DaveKun, provide a link to the license, and indicate if changes were made.

2. **Style 2 Playing Cards**
   - Creator: SirDraco65
   - Source: [OpenGameArt.org](https://opengameart.org/content/generic-playing-cards)
   - License: CC0 (Public Domain)
   - Location: `/modules/draw-trainer1/assets2/` and `/modules/draw-trainer2/assets2/`
   - No attribution required - these assets are in the public domain.

### Customizing Card Assets
You can customize the application with your own card designs. To maintain compatibility:

#### Technical Requirements
1. **File Naming Convention**:
   - Files must follow the pattern: `[suit][value].png`
   - Suits: `clubs`, `diamonds`, `hearts`, `spades`
   - Values: `2` through `9`, `T` (10), `J` (Jack), `Q` (Queen), `K` (King), `A` (Ace)
   - Example: `hearts7.png`, `clubsK.png`, `spadesA.png`

2. **Image Specifications**:
   - Format: PNG with transparency
   - Resolution: Match the existing card dimensions for consistent display
   - File Location: Place in either `assets/` or `assets2/` directory within the respective module

#### Implementation Steps
1. Create your card set following the naming convention.
2. Place the complete set in either the `assets/` or `assets2/` directory.
3. The toggle button will automatically work with your new designs.

#### Best Practices
- Maintain consistent card dimensions across the entire set.
- Ensure clear visibility of suit and value.
- Test the display at different screen sizes.
- Consider adding attribution information to the Credits section if desired.

The application will automatically work with any card set that follows these specifications, allowing for easy customization while maintaining functionality.
