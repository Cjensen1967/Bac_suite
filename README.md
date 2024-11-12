# Baccarat Training Suite Project

## Project Overview
The **Baccarat Training Suite** is a modular training application designed to teach and practice various aspects of Midi-Baccarat dealing and gameplay. The suite is structured into independent modules, each focusing on a specific aspect of Baccarat, from understanding the game's rules to mastering card handling and commission calculations.

## Project Goal
The goal of this project is to create a user-friendly, educational tool that organizes Baccarat training into self-contained modules. Each module functions as a separate page, allowing users to practice specific skills without requiring shared dependencies across modules.

## Modules

### 1. Rules Guide
Located in `/modules/instructions`, this module provides comprehensive instructions on Baccarat gameplay mechanics and rules.

### 2. Third Card Draw Training
Split into two progressive levels for optimal learning:

#### Level 1 (`/modules/draw-trainer1`)
- Basic third card rule training
- Simple, focused interface
- Performance tracking (correct/incorrect/total hands)
- Two card face design options
- Includes quick-reference rules display

#### Level 2 (`/modules/draw-trainer2`)
- Advanced interactive draw training
- More detailed success rate tracking
- Enhanced UI with draw placeholders
- Modular code structure with separated JavaScript files
- Toggle between card styles
- Comprehensive rules reference

### 3. Commission Calculator (`/modules/commission-drill`)
Practice calculating commissions quickly and accurately with this dedicated training module.

### 4. Additional Information (`/modules/introduction`)
Learn about the history and variations of Baccarat through this informational module.

## Structure and Folder Organization
Each module is organized in a way that promotes independence and modularity:

```
/baccarat-training-suite
├── index.html                # Main dashboard linking to each module
├── styles.css               # Styles for the main dashboard
├── script.js               # JavaScript for the main dashboard
├── /modules                # Folder containing all individual modules
│   ├── /instructions
│   │   ├── index.html     # HTML for rules guide
│   │   ├── styles.css     # Module-specific styles
│   │   └── script.js      # Module-specific JavaScript
│   ├── /draw-trainer1
│   │   ├── index.html     # Level 1 draw trainer
│   │   ├── styles.css     # Styles for level 1
│   │   ├── script.js      # JavaScript for level 1
│   │   └── /assets        # Card images for level 1
│   ├── /draw-trainer2
│   │   ├── index.html     # Level 2 draw trainer
│   │   ├── /css          # Styles for level 2
│   │   ├── /js           # JavaScript modules for level 2
│   │   └── /assets       # Card images for level 2
│   ├── /commission-drill
│   │   ├── index.html     # Commission calculator
│   │   ├── styles.css     # Calculator styles
│   │   └── script.js      # Calculator logic
│   └── /introduction
│       ├── index.html     # Additional information
│       ├── styles.css     # Information page styles
│       └── script.js      # Information page logic
```

## Guidelines

1. **Modular Independence**:  
   Each module is contained in its own folder within `/modules`. Every module has its own HTML, CSS, and JavaScript files to ensure that there is no file sharing between modules. This design allows each module to function independently, making updates and debugging easier.

2. **No Cross-Module File Sharing**:  
   Files within a module should not depend on or interact with files in other module folders. This helps maintain the modular structure and prevents unintended dependencies.

3. **Module-Specific Resources**:  
   Each module maintains its own assets and styles within its directory structure. This ensures complete modularity and prevents conflicts between different modules' resources.

4. **Naming Conventions**:  
   For consistency, each module's primary HTML file should be named `index.html`. CSS and JavaScript files should follow the module's specific needs, whether as single files or organized in subdirectories for more complex modules.

5. **Dashboard as Central Hub**:  
   The main `index.html` file in the root directory acts as the dashboard, linking to each module page and allowing users to navigate between modules.

## Future Development
Following this structure will ensure that future modules can be added easily without disrupting existing ones. Each new module can follow the same folder setup, maintaining the project's modular integrity and simplicity.
