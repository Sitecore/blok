"use client"

import { convertCssVariablesToObject } from "@/app/foundation/utils"

type Props = {
  content: string // The CSS content containing your @theme breakpoints
}

const NOTES: Record<string, string> = {
  md: "The most common rounded. Used on many elements, such as inputs, cards, tags, and more.",
  lg: "The preferred larger rounded. Used on modals and large panels.",
  full: "Used for circular elements, such as avatars and buttons.",
}

const BorderroundedDemo = ({ content }: Props) => {
  const borderRadiuses = convertCssVariablesToObject(content, "--rounded-")

  return (
    <div>
      <div style={{ width: "100%", overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "1rem",
          }}
        >
          <thead>
            <tr style={{ borderBottom: "2px solid #ccc" }}>
              <th style={{ padding: "0.8rem", textAlign: "left" }}>Example</th>
              <th style={{ padding: "0.8rem", textAlign: "left" }}>Token</th>
              <th style={{ padding: "0.8rem", textAlign: "left" }}>
                Value (rem)
              </th>
              <th style={{ padding: "0.8rem", textAlign: "left" }}>
                Value (px)
              </th>
              <th style={{ padding: "0.8rem", textAlign: "left" }}>Notes</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(borderRadiuses).map(([key, value]) => {
              const pxValue = parseFloat(value) * 16

              return (
                <tr key={key} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "0.8rem" }}>
                    <div
                      className={`h-16 w-16 bg-pink-200 rounded-${key}`}
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
                      {pxValue}px
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

export default BorderroundedDemo
