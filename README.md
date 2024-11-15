# Baccarat Training Suite Project

## Project Overview
The **Baccarat Training Suite** is a modular training application designed to teach and practice various aspects of Midi-Baccarat dealing and gameplay. The suite is structured into independent modules, each focusing on a specific aspect of Baccarat, from understanding the game's rules to mastering card handling and commission calculations.

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
1. Download or clone the repository
2. Open index.html in a modern web browser
3. Navigate through modules using the dashboard
4. No installation or setup required

## License
The project includes third-party assets with their own licenses:
- Card assets Style 1: CC BY 4.0 (by DaveKun)
- Card assets Style 2: CC0 (Public Domain, by SirDraco65)

See individual module LICENSE files for specific details.
