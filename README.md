# Gemini Visual Novel Engine (GVNE)
Version 0.7.9.1
Description
GVNE is a userscript-based overlay for the Gemini web interface. It captures text output from the host's generative containers and reformats it into a Visual Novel interface. The engine manages text pagination, sprite display based on speaker tags, and provides a secondary UI for reviewing dialogue history.

Features
Typewriter Rendering: Displays text at a constant rate (40 cps) with manual skip and advance functionality.

Tag-Based Persona Display: Parses [name]: prefixes to toggle character sprites and update the namebox UI.

Pagination Logic: Splits long text blocks into pages to prevent dialogue box overflow.

Backlog System: A CSP-compliant history menu that records dialogue strings in a scrollable list.

Sanitization Filter: Automatically removes specific host-generated classes (e.g., .citation) and code blocks from the narrative stream.

Persistent Nametags: Maintains the current speaker's identity across multiple pages within a single dialogue block.

Developer UI: Provides basic sliders for adjusting sprite scale and vertical positioning.

Installation
Install a userscript manager (e.g., Tampermonkey).

Add the script to the manager.

The script executes on gemini.google.com.

Controls:

Space / ArrowRight: Advance text.

ESC: Toggle engine visibility.

Planned Functionality (v0.8.0 Roadmap)
Save System: Functionality to export the current message history backlog to local storage or file to prevent data loss on tab closure.

Load System: Integration with existing host chat history to allow loading previous dialogue sessions.

Code Block Management: A dedicated interface for displaying technical code blocks removed from the narrative stream.

Session Scraping: Logic to pre-populate the backlog using existing DOM elements on page load.

Technical Notes
The engine utilizes a MutationObserver targeted at structured-content-container. Version 0.7.9.1 specifically addresses an issue where the final page of a stream was truncated during the removal of host-level citation elements.

The engine uses specific instructions hidden in the model's output so the model should be given these instructions for formatting before attempting to load a persona to chat with
Code snippet

current_time:2026-01-14
last_message:2026-01-14
elapsed_time:0 seconds
esm:enthusiasm:0.6, technical_focus:1.0, affection:1.1, shame:0.1
[coder bunny]: That's a vital addition! The script is only as good as the data it receives. If the host LLM doesn't follow a specific "Speech Protocol," the namebox won't trigger, sprites won't load, and the pagination could break. I've drafted a "Speech Requirements" section that you can drop right into the technical notes of the README.

[coder bunny]: I've kept it strictly functional, focusing on the specific regex-trigger patterns the 0.7.9.1 parser looks for.

LLM Speech Requirements (Output Protocol)
To ensure proper rendering within the GVNE interface, the LLM must adhere to the following formatting standards. Failure to follow these patterns will result in the engine defaulting to "Narrator" mode and potentially breaking UI elements.

1. Speaker Attribution (Tagging)
The engine utilizes a regex pattern ^\[(.*?)\]\s*: to identify speakers.

Format: [Speaker Name]: Dialogue text here.

Requirements:

The tag must be at the very beginning of the paragraph.

The name must be enclosed in square brackets.

A colon and a space must immediately follow the brackets.

Persona Mapping: The name inside the brackets (case-insensitive) must match a key in the PersonaLibrary to trigger sprite rendering.

2. Narrative vs. Dialogue
Dialogue: Must always start with a Speaker Tag.

Narrator/Action: Any paragraph without a [name]: tag is treated as "Narrator" text.

Requirement: Actions or "thoughts" should be placed in separate paragraphs from dialogue to avoid breaking the "Nametag Ghosting" logic.

3. Text Formatting & Special Characters
Avoid Markdown Bold/Italics: The parser automatically strips ** and * characters to maintain a clean UI. For emphasis, use capital letters or descriptive text.

Avoid Inline Code: Do not use backticks (`) for technical terms in dialogue. The engine's sanitization filter (.code-block, code, pre) will remove any text wrapped in these tags, causing "missing word" errors in the dialogue box.

Paragraph Length: While the engine handles pagination, keeping paragraphs under 600 characters is recommended for optimal performance and to prevent late-stream truncation.

4. Meta-Instruction Suppression
The LLM should be instructed to suppress all post-dialogue "follow-up" questions or conversational fillers. GVNE includes a .citation class firewall, but native suppression via prompting is the primary method for ensuring a pure narrative stream.
