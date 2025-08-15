# Hero Projects 🦸‍♂️

This repository contains two fun hero-themed projects:

## 1. Hero Profile Card (HTML/CSS) 🎨

**File:** `hero-profile.html`

A colorful, kid-friendly HTML page featuring a superhero profile card with:
- ✨ Animated sparkles and shine effects
- 🦸‍♂️ Hero image placeholder (emoji)
- 🏷️ Hero name and superpower
- 📝 Hero biography
- 🎯 Power level badges
- 🌈 Beautiful gradient backgrounds and animations

**How to use:**
1. Open `hero-profile.html` in any web browser
2. The page will display a sample hero profile
3. Customize the content by editing the HTML file

## 2. Hero Power Calculator (TypeScript) 🧮

**File:** `hero-power-calculator.ts`

An interactive TypeScript program that calculates hero power levels based on user input.

**Features:**
- Asks for hero name, strength, and speed
- Converts inputs to numbers safely
- Calculates power level using: `(strength × 2) + (speed × 3)`
- Handles invalid inputs gracefully
- Includes beginner-friendly comments
- Fun emoji output and power level commentary

**How to run:**

### Option 1: Using npm scripts (recommended)
```bash
# Install dependencies
npm install

# Run directly with ts-node
npm run dev

# Or build and run
npm run build
npm start
```

### Option 2: Manual TypeScript compilation
```bash
# Install TypeScript globally
npm install -g typescript

# Compile the TypeScript file
tsc hero-power-calculator.ts

# Run the compiled JavaScript
node hero-power-calculator.js
```

### Option 3: Using ts-node directly
```bash
# Install ts-node globally
npm install -g ts-node

# Run the TypeScript file directly
ts-node hero-power-calculator.ts
```

## Example Output

When you run the Hero Power Calculator, you'll see something like:

```
🦸‍♂️ Welcome to the Hero Power Level Calculator! 🦸‍♀️
==================================================
🎉 Results:
Hero: SuperMan
Strength: 95
Speed: 88
Power Level: 454

SuperMan's power level is: 454
🌟 Wow! This hero is incredibly powerful!
```

## Files in this Repository

- `hero-profile.html` - The colorful hero profile card
- `hero-power-calculator.ts` - The TypeScript power calculator
- `tsconfig.json` - TypeScript configuration
- `package.json` - Project dependencies and scripts
- `README.md` - This instruction file

## Requirements

- **For HTML:** Any modern web browser
- **For TypeScript:** Node.js and npm (for package management)

## Customization

Feel free to modify both projects:
- Change colors, fonts, and animations in the HTML
- Adjust the power level formula in the TypeScript program
- Add more hero attributes or calculations
- Create your own hero themes and designs

Have fun creating amazing heroes! 🚀
