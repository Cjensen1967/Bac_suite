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

## License

This module is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Beautiful card designs by DaveKun (Style 1) and SirDraco65 (Style 2) from OpenGameArt.org
- Inspired by the need for better tools to learn Baccarat dealing rules
