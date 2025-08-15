// Hero Power Level Calculator
// This program calculates a hero's power level based on their strength and speed

// Function to safely convert string input to a number
// Returns the number if valid, or null if invalid
function convertToNumber(input: string): number | null {
    // Try to convert the input to a number
    const number = Number(input);
    
    // Check if the conversion was successful and the number is valid
    if (isNaN(number) || input.trim() === '') {
        return null; // Return null if conversion failed
    }
    
    return number; // Return the valid number
}

// Function to calculate hero power level
// Formula: powerLevel = (strength * 2) + (speed * 3)
function calculatePowerLevel(strength: number, speed: number): number {
    return (strength * 2) + (speed * 3);
}

// Main program function
function main(): void {
    console.log("🦸‍♂️ Welcome to the Hero Power Level Calculator! 🦸‍♀️");
    console.log("==================================================");
    
    // Step 1: Ask for hero's name
    const heroName = prompt("What is your hero's name?");
    
    // Check if user provided a name
    if (!heroName || heroName.trim() === "") {
        console.log("❌ Error: Hero name cannot be empty!");
        return;
    }
    
    // Step 2: Ask for hero's strength
    const strengthInput = prompt(`How strong is ${heroName}? (Enter a number)`);
    const strength = convertToNumber(strengthInput);
    
    // Check if strength input is valid
    if (strength === null) {
        console.log("❌ Error: Please enter a valid number for strength!");
        return;
    }
    
    // Step 3: Ask for hero's speed
    const speedInput = prompt(`How fast is ${heroName}? (Enter a number)`);
    const speed = convertToNumber(speedInput);
    
    // Check if speed input is valid
    if (speed === null) {
        console.log("❌ Error: Please enter a valid number for speed!");
        return;
    }
    
    // Step 4: Calculate the power level
    const powerLevel = calculatePowerLevel(strength, speed);
    
    // Step 5: Display the result
    console.log("\n🎉 Results:");
    console.log(`Hero: ${heroName}`);
    console.log(`Strength: ${strength}`);
    console.log(`Speed: ${speed}`);
    console.log(`Power Level: ${powerLevel}`);
    console.log(`\n${heroName}'s power level is: ${powerLevel}`);
    
    // Bonus: Add some fun commentary based on power level
    if (powerLevel >= 100) {
        console.log("🌟 Wow! This hero is incredibly powerful!");
    } else if (powerLevel >= 50) {
        console.log("💪 This hero has good potential!");
    } else {
        console.log("💡 Every hero starts somewhere - keep training!");
    }
}

// Run the program
main();
