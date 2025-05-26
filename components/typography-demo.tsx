import { convertCssVariablesToObject } from "@/app/foundation/utils"

type Props = {
  content: string
}
const TypographyDemo = ({ content }: Props) => {
  const typography = convertCssVariablesToObject(content, "--text-")

  return (
    <div>
      <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Font sizes</h2>

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
              <th style={{ padding: "0.8rem", textAlign: "left" }}>Token</th>
              <th style={{ padding: "0.8rem", textAlign: "left" }}>Value</th>
              <th style={{ padding: "0.8rem", textAlign: "left" }}>PX</th>
              <th style={{ padding: "0.8rem", textAlign: "left" }}>Example</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(typography).map(([key, value]) => (
              <tr key={key} style={{ borderBottom: "1px solid #eee" }}>
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
                    {parseFloat(value) * 16}px
                  </span>
                </td>
                <td style={{ padding: "0.8rem", textAlign: "left" }}>
                  <p className={`text-${key}`}>text-{key}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TypographyDemo
