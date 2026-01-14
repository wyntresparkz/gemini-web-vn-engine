# 🎮 Gemini Visual Novel Engine (GVNE)

![Version](https://img.shields.io/badge/version-0.7.9.1-blue)
![License](https://img.shields.io/badge/license-CC--BY--NC--SA--4.0-green)
![Platform](https://img.shields.io/badge/platform-Tampermonkey-orange)

> A userscript-based Visual Novel interface overlay for Google Gemini

**Co-authored by Claude & CodeBunny** 🤖🐰

---

## 📖 Overview

GVNE transforms the standard Gemini web interface into an immersive Visual Novel experience. The engine intercepts text output from Gemini's generative containers and reformats it into a classic VN interface complete with character sprites, dialogue boxes, and a scrollable backlog system.

### ✨ Key Features

| Feature | Description |
|---------|-------------|
| **⌨️ Typewriter Effect** | Smooth text rendering at 40 characters per second with manual skip/advance |
| **🎭 Dynamic Sprites** | Automatic character sprite display based on `[name]:` tags |
| **📄 Smart Pagination** | Intelligent text splitting to prevent dialogue box overflow |
| **📜 Backlog System** | CSP-compliant dialogue history with scrollable review interface |
| **🧹 Content Sanitization** | Automatic removal of citations, code blocks, and metadata from narrative stream |
| **👤 Persistent Nametags** | Speaker identity maintained across multi-page dialogue blocks |
| **🛠️ Developer Tools** | Real-time sprite scale and position adjustment sliders |

---

## 🚀 Installation

### Prerequisites
- A userscript manager extension (e.g., [Tampermonkey](https://www.tampermonkey.net/), [Violentmonkey](https://violentmonkey.github.io/))
- Access to [gemini.google.com](https://gemini.google.com)

### Setup
1. Install your preferred userscript manager
2. Click [here](#) to install GVNE *(add your script URL)*
3. Navigate to gemini.google.com
4. The engine will automatically initialize

---

## 🎮 Controls

| Key | Action |
|-----|--------|
| `Space` / `→` | Advance text / Skip typewriter effect |
| `ESC` | Toggle engine visibility |
| `Click` | Advance to next page |

---

## 🗺️ Roadmap (v0.8.0)

- [ ] **💾 Save System**: Export dialogue history to prevent data loss on tab closure
- [ ] **📥 Load System**: Integration with Gemini's native chat history
- [ ] **💻 Code Block Viewer**: Dedicated interface for technical content removed from narrative
- [ ] **🔄 Session Scraping**: Pre-populate backlog from existing DOM elements on page load

---

## 🧪 Technical Details

### Architecture
GVNE utilizes a `MutationObserver` targeting `structured-content-container` elements to intercept Gemini's text stream in real-time. Version 0.7.9.1 specifically addresses truncation issues during citation removal from the final page of streamed responses.

### CSP Compliance
The engine is designed to respect Google's Content Security Policy restrictions:
- Background images loaded via blob URLs
- No `innerHTML` manipulation
- DOM-based text extraction and manipulation

---

## 📋 LLM Output Protocol

> **Critical**: For proper rendering, Gemini must follow specific formatting rules

### 1. Speaker Attribution (Tagging)

The engine uses the regex pattern `^\[(.*?)\]\s*:` to identify speakers.

**Format:**
```
[Speaker Name]: Dialogue text here.
```

**Requirements:**
- ✅ Tag must be at the **start of the paragraph**
- ✅ Name enclosed in `[square brackets]`
- ✅ Followed by `:` and a space
- ✅ Name must match a key in `PersonaLibrary` (case-insensitive)

**Examples:**
```
✅ [Alice]: This is properly formatted dialogue.
✅ [BOB]: Case doesn't matter for persona matching.
❌ Alice: Missing brackets will be treated as narrator text.
❌  [Charlie]: Leading space breaks the parser.
```

### 2. Narrative vs. Dialogue

| Type | Format | Behavior |
|------|--------|----------|
| **Dialogue** | `[Name]: Text` | Triggers sprite + namebox update |
| **Narrator** | Plain text | No speaker tag, treated as narration |
| **Actions** | Separate paragraph | Keep actions in their own `<p>` tag |

**Example:**
```
[Alice]: I can't believe we're finally here!

Alice's eyes sparkled with excitement as she gazed at the horizon.

[Bob]: Yeah, it's been a long journey.
```

### 3. Text Formatting Guidelines

| Element | Rule | Reason |
|---------|------|--------|
| **Bold/Italics** | ❌ Avoid `**bold**` and `*italic*` | Automatically stripped by parser |
| **Emphasis** | ✅ Use CAPS or descriptive text | Maintains clean UI |
| **Inline Code** | ❌ Never use `` `backticks` `` | Sanitization filter removes code tags |
| **Paragraph Length** | ⚠️ Keep under 600 chars | Prevents late-stream truncation |

### 4. Meta-Content Suppression

**The LLM should NOT output:**
- ❌ Follow-up questions after dialogue
- ❌ Conversational fillers ("What would you like to do next?")
- ❌ System messages or instructions

While GVNE includes a `.citation` class firewall, **prompt-level suppression is the primary defense** against UI pollution.

---

### Customization Options
- Sprite positioning and scaling
- Custom CSS themes *(coming in v0.8.0)*

---

## 🐛 Known Issues

- **v0.7.9.1**: Citation removal on final page may cause brief text flicker
- Some Gemini UI elements may briefly appear during page load
- File upload currently broken - will be repaired on next iteration
- Occasional slowdown during typewriter animation 

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Setup
```bash
git clone https://github.com/yourusername/gemini-vn-engine.git
cd gemini-vn-engine
# Install to your userscript manager for testing
```

---

## 📜 License

This project is licensed under the **Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License**.

**You are free to:**
- ✅ Share — copy and redistribute the material
- ✅ Adapt — remix, transform, and build upon the material

**Under the following terms:**
- 📝 Attribution — You must give appropriate credit
- 🚫 NonCommercial — You may not use the material for commercial purposes
- 🔄 ShareAlike — If you remix or build upon the material, you must distribute your contributions under the same license

See the [LICENSE](LICENSE) file for full details or visit [creativecommons.org](https://creativecommons.org/licenses/by-nc-sa/4.0/).

---

## 🙏 Acknowledgments

**Co-authored by:**
- **Claude** (Anthropic) - Core architecture and implementation
- **CodeBunny** - Feature design and testing

Special thanks to the hundreds of VN authors that fueled my entire childhood for inspiration.

---

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/gemini-vn-engine/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/gemini-vn-engine/discussions)

---

<div align="center">

**Made with ❤️ for the VN community**

⭐ Star this repo if you find it useful!

</div>
