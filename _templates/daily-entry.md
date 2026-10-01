<%*
// Inktober 2026 — daily writing entry
// The note title is the date (YYYY-MM-DD); the day-of-month selects the prompt.
const prompts = ["Apple","Relic","Miniature","Cactus","Smack","Ogre","Panic","Stinky","Ram","Mystical","Rescue","Toss","Flimsy","Lady","Hooray","Gangly","Contraption","Flightless","Confused","Lounge","Hero","Beacon","Dapper","Bake","Fracture","Zip","Dumb","Trophy","Tusk","Cookie","Flex"];
const title = tp.file.title;                 // e.g. 2026-10-01
const day = parseInt(title.split("-")[2], 10) || 0;
const prompt = prompts[day - 1] || "—";
tR += `---
date: ${title}
day: ${day}
prompt: ${prompt}
type: ""        # journal | prose | poetry
target: 250
words: 0
mood: ""
status: todo    # todo | done
tags:
  - inktober2026
---

# Day ${day} — ${prompt}

> **Prompt:** ${prompt}  ·  **Target:** 250 words

`;
%>
