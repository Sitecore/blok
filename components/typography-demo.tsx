import { convertCssVariablesToObject } from "@/app/foundation/utils"

type Props = {
  content: string
}
const TypographyDemo = ({ content }: Props) => {
  const typography = convertCssVariablesToObject(content, "--text-")

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
              <th style={{ padding: "0.8rem", textAlign: "left" }}>Name</th>
              <th style={{ padding: "0.8rem", textAlign: "center" }}>
                Demonstration
              </th>
              <th style={{ padding: "0.8rem", textAlign: "left" }}>Value</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(typography).map(([key, value]) => (
              <tr key={key} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "0.8rem" }}>text-{key}</td>
                <td style={{ padding: "0.8rem", textAlign: "center" }}>
                  <p className={`text-${key}`}>Text size {key}</p>
                </td>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TypographyDemo
