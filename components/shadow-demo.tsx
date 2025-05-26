"use client"

import { convertCssVariablesToObject } from "@/app/foundation/utils"

type Props = {
  content: string // The CSS content containing your @theme breakpoints
}

const NOTES: Record<string, string> = {
  xs: "Looks like a light 1px border",
  base: "Top bar",
  lg: "Modal, Drawer",
  outline: "Used as focus ring",
  "dark-lg": "Only used in dark mode",
}

const ShadowDemo = ({ content }: Props) => {
  const shadows = convertCssVariablesToObject(content, "--shadow-")

  return (
    <div>
      <div style={{ width: "100%", overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "1rem",
          }}
          className="rounded-lg bg-neutral-50"
        >
          <thead>
            <tr style={{ borderBottom: "2px solid #ccc" }}>
              <th style={{ padding: "0.8rem", textAlign: "left" }}>Example</th>
              <th style={{ padding: "0.8rem", textAlign: "left" }}>Token</th>
              <th style={{ padding: "0.8rem", textAlign: "left" }}>Value</th>
              <th style={{ padding: "0.8rem", textAlign: "left" }}>Notes</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(shadows).map(([key, value]) => {
              return (
                <tr key={key} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "0.8rem" }}>
                    <div
                      className={`h-16 w-16 rounded-md bg-white shadow-${key}`}
                    ></div>
                  </td>
                  <td style={{ padding: "0.8rem" }}>{key}</td>
                  <td style={{ padding: "0.8rem" }}>
                    <span
                      style={{
                        fontFamily: "monospace",
                        fontSize: "0.9rem",
                        color: "#555",
                      }}
                    >
                      {value}
                    </span>
                  </td>

                  <td style={{ padding: "0.8rem" }}>
                    <span
                      style={{
                        fontFamily: "monospace",
                        fontSize: "0.9rem",
                        color: "#555",
                      }}
                    >
                      {NOTES[key] ?? ""}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ShadowDemo
