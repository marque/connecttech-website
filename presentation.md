# ConnecTech Website Presentation
## Building with AI: Claude Code, GitHub & Vercel
### 10-Minute Presentation Guide

---

## Slide 1: Title
**Building ConnecTech's Website with AI**
- Team ConnecTech #27757
- Tools: Claude Code + GitHub + Vercel

---

## Slide 2: The Challenge
**What We Needed:**
- A professional website to showcase our team
- Display our innovation project (GridLock)
- Present our robot and core values
- Easy to update and maintain

**Time Available:** Limited (we're busy building robots!)

---

## Slide 3: Our Tech Stack

| Tool | Purpose |
|------|---------|
| **Claude Code** | AI assistant that writes and edits code through conversation |
| **GitHub** | Stores our code and tracks all changes |
| **Vercel** | Hosts our website and auto-deploys when we push code |
| **Next.js** | The framework our website is built on |

---

## Slide 4: How Claude Code Works

1. **We describe what we want** in plain English
2. **Claude reads our existing code** to understand the project
3. **Claude writes/edits the code** for us
4. **We review and approve** the changes
5. **We push to GitHub** → Vercel auto-deploys

*It's like having a coding partner who never sleeps!*

---

## Slide 5: Real Examples from Today

**Example 1: Fixing the Team Name**
> "The team name is ConnecTech. Please rename everything"
- Claude searched all files
- Found and updated 15+ instances
- Updated package.json, metadata, all pages

**Example 2: Redesigning the Header**
> "Make the logo and text side by side"
- Claude understood the layout change
- Modified the CSS/HTML structure
- Made it responsive for mobile too

---

## Slide 6: The Workflow Diagram

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Describe  │     │   Claude    │     │   Review    │
│   Change    │ ──► │   Writes    │ ──► │   Code      │
│   in Words  │     │   Code      │     │   Changes   │
└─────────────┘     └─────────────┘     └─────────────┘
                                               │
                                               ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Live on   │     │   Vercel    │     │   Push to   │
│   Website!  │ ◄── │   Deploys   │ ◄── │   GitHub    │
└─────────────┘     └─────────────┘     └─────────────┘
```

---

## Slide 7: Benefits of This Approach

1. **Speed** - Changes in minutes, not hours
2. **Learning** - We see the code Claude writes and learn from it
3. **Iteration** - Easy to try ideas and revert if needed
4. **Professional Results** - Production-quality code
5. **Focus** - More time for robot and innovation project!

---

## Slide 8: Live Demo
*[Do live demo here - see suggestions below]*

---

## Slide 9: What We Learned

- **AI is a tool, not a replacement** - We still make decisions
- **Clear communication matters** - Better descriptions = better results
- **Version control is essential** - GitHub lets us undo mistakes
- **Automation saves time** - Vercel deploys automatically

---

## Slide 10: Questions?

**Visit our website:**
connectech27757.com

**Our code is on GitHub:**
github.com/marque/connecttech-website

---

# Live Demo Suggestions

## Easy & Visual Changes (Pick 1-2):

### 1. Change the Primary Color (30 seconds)
Ask Claude: "Change the yellow accent color to blue"
- Shows: Find and replace across multiple files
- Impact: Immediate visual change site-wide

### 2. Update the Team Cheer (20 seconds)
Ask Claude: "Change our team cheer to [new cheer text]"
- Shows: Simple text edit
- Impact: Easy to understand

### 3. Change Button Style (30 seconds)
Ask Claude: "Make the navigation buttons square instead of rounded"
- Shows: CSS styling changes
- Impact: Visual UI change

### 4. Add a New Team Member Quote (45 seconds)
Ask Claude: "Add a quote section that says 'Innovation starts with curiosity'"
- Shows: Adding new HTML elements
- Impact: New content appears

### 5. Reorder Navigation Items (30 seconds)
Ask Claude: "Move 'Core Values' before 'Robot' in the navigation"
- Shows: Code restructuring
- Impact: Layout change

## Demo Script:
1. Show the current website
2. Open Claude Code terminal
3. Type your request in plain English
4. Show Claude reading and editing files
5. Commit and push: `git add . && git commit -m "Demo change" && git push`
6. Wait ~30 seconds, refresh website
7. Show the live change!

---

# Q&A for Judges

## Technical Questions:

**Q1: How does Claude Code know what to change in your code?**
> A: When we describe what we want, Claude reads our existing files to understand the project structure. It then makes targeted edits only to the relevant parts. We always review changes before accepting them.

**Q2: What happens if Claude makes a mistake?**
> A: We use GitHub for version control, so we can always undo changes. Also, we review every change before pushing it live. Claude also runs the code to check for errors.

**Q3: Did you write any code yourselves?**
> A: Yes! We started with a basic template and made many manual tweaks. Claude helps us write code faster, but we make all the design decisions and review everything. It's like spell-check for coding.

**Q4: How do you know the code is good quality?**
> A: Claude follows best practices for web development. We also test on different devices (phone, tablet, desktop) and browsers to make sure it works everywhere.

**Q5: What is Vercel and why do you use it?**
> A: Vercel is a hosting platform that automatically publishes our website whenever we push code to GitHub. It's free for small projects and very fast - changes go live in about 30 seconds.

## Process Questions:

**Q6: How long did it take to build the website?**
> A: The initial version took about 2-3 hours. We've been improving it over several sessions. Without AI assistance, it would have taken much longer.

**Q7: What was the hardest part?**
> A: Learning to describe what we want clearly. The more specific we are, the better results we get. Also, understanding enough about web development to review Claude's suggestions.

**Q8: How does this relate to your innovation project?**
> A: The website showcases GridLock and helps us collect survey feedback. It demonstrates our team's ability to use modern technology to solve problems - the same mindset we applied to archaeological gridding.

**Q9: Could other FLL teams use this approach?**
> A: Absolutely! Claude Code is available to anyone. Teams could use it to build websites, document their projects, or even help debug their robot code.

**Q10: What would you do differently next time?**
> A: Start earlier! And plan the website structure before building. We'd also create a style guide first so the design is consistent from the beginning.

## Core Values Questions:

**Q11: How does using AI reflect FLL Core Values?**
> A:
> - **Discovery**: We explored new AI tools
> - **Innovation**: We found a creative solution to build quickly
> - **Impact**: Our website helps share GridLock with the world
> - **Inclusion**: AI makes coding accessible to non-programmers
> - **Teamwork**: We collaborate with AI as a tool
> - **Fun**: It's exciting to see changes go live instantly!

**Q12: Is using AI "cheating"?**
> A: No - AI is a tool like any other. Calculators didn't replace math skills, they enhanced them. We still need to understand what we're building, make design decisions, and verify everything works. AI just helps us work faster.

---

## Quick Reference Card

**To make changes:**
```bash
# 1. Open Claude Code in project folder
cd connecttech-website
claude

# 2. Describe your change to Claude

# 3. Push to live
git add .
git commit -m "Description of change"
git push
```

**Website URL:** connectech27757.com
**GitHub:** github.com/marque/connecttech-website
**Vercel Dashboard:** vercel.com/dashboard
