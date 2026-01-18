
// Mocking the state and logic from gemini.web.vn.engine.js

let currentPages = [];
const isGenerating = true;

// The flawed logic function
function receiveUpdate(newPages) {
    console.log(`Received update with ${newPages.length} pages.`);

    // The problematic condition
    if (newPages.length > currentPages.length) {
        if (isGenerating && newPages.length < 2) {
            console.log("Ignored: Generating and < 2 pages.");
            return;
        }
        console.log("Updating currentPages!");
        currentPages = newPages;
    } else {
        console.log("Ignored: New pages length (" + newPages.length + ") is not > current pages length (" + currentPages.length + ")");
    }
}

// Simulation
console.log("--- Simulation Start ---");

// Step 1: Initial partial text
const update1 = ["This is page 1, and it is a complete thought.", "This is page 2, currently typi"];
receiveUpdate(update1);
console.log("Current Pages:", currentPages);

// Step 2: More text arrives for page 2
const update2 = ["This is page 1, and it is a complete thought.", "This is page 2, currently typing more content."];
receiveUpdate(update2);
console.log("Current Pages:", currentPages);

// Step 3: Stream finishes (even if isGenerating becomes false, the logic handles check first)
// If checking strictly length:
const update3 = ["This is page 1, and it is a complete thought.", "This is page 2, currently typing more content. Done."];
receiveUpdate(update3);
console.log("Current Pages:", currentPages);
