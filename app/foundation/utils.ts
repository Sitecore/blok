export function convertCssVariablesToObject(
  cssString: string,
  prefix: string
): Record<string, string> {
  const lines = cssString.split("\n").map((line) => line.trim())
  const colorObject: Record<string, string> = {}

  for (const line of lines) {
    if (line.startsWith(prefix)) {
      const parts = line.split(":")
      if (parts.length === 2) {
        const key = parts[0].trim().substring(prefix.length)
        const value = parts[1].trim().replace(";", "")
        colorObject[key] = value
      }
    } else if (line.startsWith("--") && !line.startsWith("/*")) {
      const parts = line.split(":")
      if (parts.length === 2) {
        const key = parts[0].trim().substring(2)
        const value = parts[1].trim().replace(";", "")
        colorObject[key] = value
      }
    }
  }

  return colorObject
}
