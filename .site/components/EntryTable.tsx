import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { resolveRelative } from "../util/path"

const TOTAL_DAYS = 31

// Home-page stand-in for the Dataview dashboard in the vault's index.md:
// progress summary plus one row per daily entry, read from frontmatter.
const EntryTable: QuartzComponent = ({ fileData, allFiles }: QuartzComponentProps) => {
  if (fileData.slug !== "index") return null

  const entries = allFiles
    .filter((f) => f.slug?.startsWith("entries/") && f.frontmatter?.day != null)
    .sort((a, b) => Number(a.frontmatter!.day) - Number(b.frontmatter!.day))

  const done = entries.filter((f) => f.frontmatter!.status === "done").length
  const words = entries.reduce((sum, f) => sum + (Number(f.frontmatter!.words) || 0), 0)

  return (
    <div class="entry-table">
      <h2>Entries</h2>
      <p class="entry-summary">
        <strong>{done}</strong> of {TOTAL_DAYS} days done · <strong>{words.toLocaleString("en-US")}</strong>{" "}
        words
      </p>
      {entries.length > 0 && (
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Entry</th>
                <th>Prompt</th>
                <th>Type</th>
                <th>Words</th>
                <th>Done</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((f) => {
                const fm = f.frontmatter!
                return (
                  <tr>
                    <td>
                      <a href={resolveRelative(fileData.slug!, f.slug!)} class="internal">
                        Day {String(fm.day)}
                      </a>
                    </td>
                    <td>{String(fm.prompt ?? "—")}</td>
                    <td>{String(fm.type || "—")}</td>
                    <td>{Number(fm.words) || 0}</td>
                    <td>{fm.status === "done" ? "✅" : "…"}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

EntryTable.css = `
.entry-table .entry-summary {
  color: var(--darkgray);
}
`

export default (() => EntryTable) satisfies QuartzComponentConstructor
