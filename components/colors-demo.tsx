import { convertCssVariablesToObject } from "@/app/foundation/utils"

type Props = {
  content: string
}

const ColorsDemo = ({ content }: Props) => {
  const colors = convertCssVariablesToObject(content, "--color-")

  return (
    <div style={{ width: "100%", overflowX: "auto" }}>
      <table
        style={{ width: "100%", borderCollapse: "collapse", marginTop: "1rem" }}
      >
        <thead>
          <tr style={{ borderBottom: "2px solid #ccc" }}>
            <th style={{ padding: "0.8rem", textAlign: "left" }}>Name</th>
            <th style={{ padding: "0.8rem", textAlign: "center" }}>Color</th>
            <th style={{ padding: "0.8rem", textAlign: "left" }}>Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(colors).map(([key, value]) => (
            <tr key={key} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "0.8rem" }}>{key}</td>
              <td style={{ padding: "0.8rem", textAlign: "center" }}>
                <div
                  style={{
                    backgroundColor: value,
                    width: "40px",
                    height: "20px",
                    borderRadius: "4px",
                    border: "1px solid #ddd",
                    margin: "0 auto",
                  }}
                ></div>
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
  )
}

export default ColorsDemo
