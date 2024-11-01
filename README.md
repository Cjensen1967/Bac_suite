
# Baccarat Training Suite Project

## Project Overview
The **Baccarat Training Suite** is a modular training application designed to teach and practice various aspects of Midi-Baccarat dealing and gameplay. The suite is structured into independent modules, each focusing on a specific aspect of Baccarat, from understanding the game’s history to mastering advanced card handling and commission calculations.

## Project Goal
The goal of this project is to create a user-friendly, educational tool that organizes Baccarat training into self-contained modules. Each module functions as a separate page, allowing users to practice specific skills without requiring shared dependencies across modules.

## Structure and Folder Organization
Each module is organized in a way that promotes independence and modularity. Here is the intended structure:

```
/baccarat-training-suite
├── index.html                # Main dashboard linking to each module
├── /styles                   # Shared stylesheet folder for the dashboard
├── /assets                   # Shared assets folder (optional, for images/icons used on the dashboard)
├── /modules                  # Folder containing all individual modules
│   ├── /introduction-history
│   │   ├── index.html        # HTML file for Introduction & History content
│   │   ├── styles.css        # Styles specific to this module
│   │   └── script.js         # JavaScript specific to this module
│   ├── /midi-baccarat
│   │   ├── index.html        # HTML file for Midi-Baccarat Instructions content
│   │   ├── styles.css        # Styles specific to this module
│   │   └── script.js         # JavaScript specific to this module
│   ├── /third-card-rules
│   │   ├── index.html        # HTML file for Third Card Rules Training content
│   │   ├── styles.css        # Styles specific to this module
│   │   └── script.js         # JavaScript specific to this module
│   └── /commission-drill
│       ├── index.html        # HTML file for Commission Drill content
│       ├── styles.css        # Styles specific to this module
│       └── script.js         # JavaScript specific to this module
```

## Guidelines

1. **Modular Independence**:  
   Each module is contained in its own folder within `/modules`. Every module should have its own HTML, CSS, and JavaScript files to ensure that there is no file sharing between modules. This design allows each module to function independently, making updates and debugging easier.

2. **No Cross-Module File Sharing**:  
   Files within a module should not depend on or interact with files in other module folders. This helps maintain the modular structure and prevents unintended dependencies.

3. **Shared Resources (Optional)**:  
   Shared assets (such as images or icons for the dashboard) should be placed in the `/assets` folder. Shared styles for the dashboard can be placed in `/styles`.

4. **Naming Conventions**:  
   For consistency, each module’s primary HTML file should be named `index.html`, with styles in `styles.css` and JavaScript in `script.js`. This ensures a uniform structure, making it easier to navigate and understand the project.

5. **Dashboard as Central Hub**:  
   The main `index.html` file in the root directory acts as the dashboard. It links to each module page, allowing users to navigate between modules. This dashboard page should not rely on any specific module’s CSS or JavaScript.

## Future Development
Following this structure will ensure that future modules can be added easily without disrupting existing ones. Each new module can follow the same folder setup, maintaining the project's modular integrity and simplicity.
