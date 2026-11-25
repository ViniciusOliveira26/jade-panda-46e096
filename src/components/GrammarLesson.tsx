import type { GrammarLesson as Lesson } from "../content";

export function GrammarLesson({ lesson: l }: { lesson: Lesson }) {
  return (
    <div className="feedback" style={{ margin: "10px 0" }}>
      <h4 style={{ margin: "0 0 6px" }}>{l.title}</h4>
      <p style={{ margin: "0 0 8px" }}>{l.explain}</p>
      <div style={{ overflowX: "auto" }}>
        <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 13 }}>
          <tbody>
            <tr>
              {l.head.map((h, k) => (
                <th key={k} style={{ textAlign: "left", borderBottom: "1px solid var(--line)", padding: 4 }}>
                  {h}
                </th>
              ))}
            </tr>
            {l.rows.map((r, k) => (
              <tr key={k}>
                {r.map((c, j) => (
                  <td key={j} style={{ padding: 4, borderBottom: "1px solid var(--line)" }}>
                    {c}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={{ margin: "8px 0 0", fontSize: 13 }}>💡 {l.tip}</p>
    </div>
  );
}
