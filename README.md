# Inktober 2026 — Writing Vault

An Obsidian vault built for a month of daily writing against the official
[Inktober 2026](https://inktober.substack.com/p/2026-prompt-list) prompts.

## Open it

1. Install [Obsidian](https://obsidian.md).
2. **Open folder as vault** → choose this folder (`inktober`).
3. First launch: Obsidian asks to **trust the author and enable plugins** — say yes.
   The three community plugins below are already downloaded and pre-configured.

> **WSL note:** this vault lives in the Linux filesystem. Open it from your
> Windows Obsidian via the `\\wsl$\...` path, or keep the vault on the Windows
> side if you find file-watching sluggish.

## How a day works

- Click a date in the **Calendar** (right sidebar), or run **"Daily notes: Open
  today's daily note"** from the command palette (`Ctrl/Cmd-P`).
- A new note is created in `entries/2026/` named `YYYY-MM-DD`.
- **Templater** fires automatically and fills in that day's prompt, a word-count
  target, and a frontmatter block (`day`, `prompt`, `type`, `words`, `status`…).
- Write. When finished, set `status: done` and update `words:` in the
  properties — the dashboard tracks the rest.
- **[[index]]** is your live dashboard (days done, words, what's left).

## Structure

| Path | What |
|------|------|
| `entries/2026/` | One note per day (the daily notes folder). |
| `drafts/` | Longer pieces that outgrow a daily entry; new notes land here by default. |
| `_templates/daily-entry.md` | Templater template auto-applied to new daily notes. |
| `_prompts/2026-prompts.md` | The official 31-prompt list. |
| `_attachments/` | Images / media. |
| `index.md` | Dataview dashboard. |

## Plugins (pre-installed)

| Plugin | Version | Role |
|--------|---------|------|
| [Templater](https://github.com/SilentVoid13/Templater) | 2.25.1 | Auto-fills each daily entry with its prompt. |
| [Dataview](https://github.com/blacksmithgu/obsidian-dataview) | 0.5.68 | Powers the dashboard queries in `index.md`. |
| [Calendar](https://github.com/liamcain/obsidian-calendar-plugin) | 2.0.0 | Month view; dots show daily word count. |

To update any of them later: Settings → Community plugins → Check for updates.

## Conventions

- **Frontmatter is the source of truth.** Keep `status` and `words` current and
  every dashboard query stays accurate.
- `type` is free: `journal`, `prose`, or `poetry`.
- Tag entries `#inktober2026` (the template does this). Add your own tags freely.

## Backup

This folder is a git repo. Commit whenever you like:

```bash
git add -A && git commit -m "Day N"
```

`git push` backs it up to GitHub and publishes the site (see below).

## Publishing

Every push to `main` rebuilds the public site with [Quartz](https://quartz.jzhao.xyz)
and deploys it to GitHub Pages: <https://olidotjpeg.github.io/inktober-vault/>

- **Published:** `entries/`, `_prompts/`, `_attachments/`. Entries go live as soon
  as they are pushed, whatever their `status`.
- **Not published:** `drafts/`, `_templates/`, this README and the Dataview
  dashboard in `index.md`. The repo itself is public, though, so anything you
  commit is readable in the source.
- The site's home page is `.site/home.md`; its entries table is generated from
  each entry's frontmatter, like the dashboard.

Preview locally before pushing:

```bash
.site/build.sh --serve   # http://localhost:8080
```

Everything site-related lives in `.site/` (hidden from Obsidian) and
`.github/workflows/publish.yml`. To publish another folder, add it to the
`PUBLISH` list in `.site/build.sh`.
