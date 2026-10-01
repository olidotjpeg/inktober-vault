---
tags:
  - dashboard
cssclasses:
  - dashboard
---

# 🖋️ Inktober 2026 — Writing Dashboard

**[[2026-prompts|📜 Prompt list]]**  ·  `_templates/daily-entry` is applied automatically to new daily notes.

> [!tip] Start today
> Open the **Calendar** (right sidebar) and click a day — or use **Open today's daily note** from the command palette. A fresh entry is created in `entries/2026/` with the day's prompt pre-filled.

## Progress

```dataview
TABLE WITHOUT ID
  length(filter(rows, (r) => r.status = "done")) AS "Days done",
  (31 - length(filter(rows, (r) => r.status = "done"))) AS "Days left",
  sum(rows.words) AS "Total words"
FROM "entries/2026"
GROUP BY true
```

## Entries

```dataview
TABLE WITHOUT ID
  ("[[" + file.name + "|Day " + day + "]]") AS "Entry",
  prompt AS "Prompt",
  type AS "Type",
  words AS "Words",
  choice(status = "done", "✅", "…") AS "Done"
FROM "entries/2026"
SORT day ASC
```

## Days not yet written

```dataview
LIST prompt
FROM "entries/2026"
WHERE status != "done"
SORT day ASC
```

## Drafts in progress

```dataview
LIST
FROM "drafts"
SORT file.mtime DESC
```
