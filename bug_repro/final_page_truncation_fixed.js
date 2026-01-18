
// Mocking the FIXED state and logic from gemini.web.vn.engine.js

let currentPages = [];
const isGenerating = true;
let isTyping = false;
let hasStartedTypingThisTurn = false;
let currentPageIndex = 0;
let currentCleanText = "";

// Mock functions
function startTypewriter(text) {
    console.log(`[Mock] startTypewriter called with: "${text}"`);
    isTyping = true;
    currentCleanText = text;
}
// We don't need full animation frame mock, just checking state updates

// The FIXED logic function (copied from my fix)
function receiveUpdate(newPages) {
    console.log(`Received update with ${newPages.length} pages.`);

    if (newPages.length >= currentPages.length) {
        const isNewContent = newPages.length > currentPages.length || (newPages.length > 0 && newPages[newPages.length - 1] !== currentPages[currentPages.length - 1]);

        if (isNewContent) {
            if (isGenerating && newPages.length < 2 && newPages.length > currentPages.length) {
                console.log("Ignored: purely new page check (wait for more content)");
                return;
            }

            // Re-evaluate the "don't show single short page" rule only if we are truly starting fresh
            if (isGenerating && newPages.length < 2 && currentPages.length === 0) {
                console.log("Ignored: Initial start too short");
                return;
            }

            console.log("Updating currentPages!");
            currentPages = newPages;

            if (!hasStartedTypingThisTurn && !isTyping) {
                startTypewriter(currentPages[currentPageIndex]);
            } else if (isTyping && currentPageIndex === currentPages.length - 1) {
                // We are currently typing the last page and it got updated
                const newText = currentPages[currentPageIndex];
                const nameMatch = newText.match(/^\[(.*?)\]\s*:/);
                const newCleanText = nameMatch ? newText.replace(/^\[.*?\]\s*:/, '').trim() : newText;

                if (newCleanText.length > currentCleanText.length) {
                    console.log(`[Mock] Extension detected! Old len: ${currentCleanText.length}, New len: ${newCleanText.length}`);
                    currentCleanText = newCleanText;
                    // The animate loop will naturally pick up the new length
                }
            }
        } else {
            console.log("Ignored: Content identical");
        }
    } else {
        console.log("Ignored: Page count somehow decreased?");
    }
}

// Simulation
console.log("--- Simulation Start (Fixed Logic) ---");

// Step 1: Initial partial text
const update1 = ["This is page 1, and it is a complete thought.", "This is page 2, currently typi"];
receiveUpdate(update1);
console.log("Current Pages:", currentPages);

// Simulate typing started
isTyping = true;
currentPageIndex = 1; // We are on page 2
currentCleanText = "This is page 2, currently typi";

// Step 2: More text arrives for page 2
const update2 = ["This is page 1, and it is a complete thought.", "This is page 2, currently typing more content."];
receiveUpdate(update2);
console.log("Current Pages:", currentPages);
console.log("Current Clean Text:", currentCleanText);

// Step 3: Stream finishes
const update3 = ["This is page 1, and it is a complete thought.", "This is page 2, currently typing more content. Done."];
receiveUpdate(update3);
console.log("Current Pages:", currentPages);
console.log("Current Clean Text:", currentCleanText);
