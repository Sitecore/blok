"use client";

type SizeData = {
  token: string;
  value: string;
  pixels: string;
};

// Tailwind CSS size utilities (size-*)
// These are available in Tailwind and used throughout the codebase
const SIZES_DATA: SizeData[] = [
  // Fixed sizes
  { token: "size-0", value: "0px", pixels: "0px" },
  { token: "size-px", value: "1px", pixels: "1px" },
  { token: "size-0.5", value: "0.125rem", pixels: "2px" },
  { token: "size-1", value: "0.25rem", pixels: "4px" },
  { token: "size-1.5", value: "0.375rem", pixels: "6px" },
  { token: "size-2", value: "0.5rem", pixels: "8px" },
  { token: "size-2.5", value: "0.625rem", pixels: "10px" },
  { token: "size-3", value: "0.75rem", pixels: "12px" },
  { token: "size-3.5", value: "0.875rem", pixels: "14px" },
  { token: "size-4", value: "1rem", pixels: "16px" },
  { token: "size-5", value: "1.25rem", pixels: "20px" },
  { token: "size-6", value: "1.5rem", pixels: "24px" },
  { token: "size-7", value: "1.75rem", pixels: "28px" },
  { token: "size-8", value: "2rem", pixels: "32px" },
  { token: "size-9", value: "2.25rem", pixels: "36px" },
  { token: "size-10", value: "2.5rem", pixels: "40px" },
  { token: "size-11", value: "2.75rem", pixels: "44px" },
  { token: "size-12", value: "3rem", pixels: "48px" },
  { token: "size-14", value: "3.5rem", pixels: "56px" },
  { token: "size-16", value: "4rem", pixels: "64px" },
  { token: "size-20", value: "5rem", pixels: "80px" },
  { token: "size-24", value: "6rem", pixels: "96px" },
  { token: "size-28", value: "7rem", pixels: "112px" },
  { token: "size-32", value: "8rem", pixels: "128px" },
  { token: "size-36", value: "9rem", pixels: "144px" },
  { token: "size-40", value: "10rem", pixels: "160px" },
  { token: "size-44", value: "11rem", pixels: "176px" },
  { token: "size-48", value: "12rem", pixels: "192px" },
  { token: "size-52", value: "13rem", pixels: "208px" },
  { token: "size-56", value: "14rem", pixels: "224px" },
  { token: "size-60", value: "15rem", pixels: "240px" },
  { token: "size-64", value: "16rem", pixels: "256px" },
  { token: "size-72", value: "18rem", pixels: "288px" },
  { token: "size-80", value: "20rem", pixels: "320px" },
  { token: "size-96", value: "24rem", pixels: "384px" },
  
  // Percentage sizes
  { token: "size-1/2", value: "50%", pixels: "50%" },
  { token: "size-1/3", value: "33.333333%", pixels: "33.33%" },
  { token: "size-2/3", value: "66.66%", pixels: "66.66%" },
  { token: "size-1/4", value: "25%", pixels: "25%" },
  { token: "size-2/4", value: "50%", pixels: "50%" },
  { token: "size-3/4", value: "75%", pixels: "75%" },
  { token: "size-1/5", value: "20%", pixels: "20%" },
  { token: "size-2/5", value: "40%", pixels: "40%" },
  { token: "size-3/5", value: "60%", pixels: "60%" },
  { token: "size-4/5", value: "80%", pixels: "80%" },
  { token: "size-1/6", value: "16.66%", pixels: "16.66%" },
  { token: "size-2/6", value: "33.33%", pixels: "33.33%" },
  { token: "size-3/6", value: "50%", pixels: "50%" },
  { token: "size-4/6", value: "66.66%", pixels: "66.66%" },
  { token: "size-5/6", value: "83.33%", pixels: "83.33%" },
  { token: "size-1/12", value: "8.33%", pixels: "8.33%" },
  { token: "size-2/12", value: "16.66%", pixels: "16.66%" },
  { token: "size-3/12", value: "25%", pixels: "25%" },
    { token: "size-4/12", value: "33.33%", pixels: "33.33%" },
  { token: "size-5/12", value: "41.66%", pixels: "41.66%" },
  { token: "size-6/12", value: "50%", pixels: "50%" },
  { token: "size-7/12", value: "58.33%", pixels: "58.33%" },
  { token: "size-8/12", value: "66.66%", pixels: "66.66%" },
  { token: "size-9/12", value: "75%", pixels: "75%" },
  { token: "size-10/12", value: "83.33%", pixels: "83.33%" },
  { token: "size-11/12", value: "91.66%", pixels: "91.66%" },
  
  // Special sizes
  { token: "size-auto", value: "auto", pixels: "auto" },
  { token: "size-full", value: "100%", pixels: "100%" },
  { token: "size-min", value: "min-content", pixels: "min-content" },
  { token: "size-max", value: "max-content", pixels: "max-content" },
  { token: "size-fit", value: "fit-content", pixels: "fit-content" },
];

const SizesDemo = () => {
  return (
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
          </tr>
        </thead>
        <tbody>
          {SIZES_DATA.map((item) => (
            <tr key={item.token} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "0.8rem" }}>
                <span
                  style={{
                    fontFamily: "monospace",
                    fontSize: "0.9rem",
                  }}
                >
                  {item.token}
                </span>
              </td>
              <td style={{ padding: "0.8rem" }}>
                <span
                  style={{
                    fontFamily: "monospace",
                    fontSize: "0.9rem",
                  }}
                  className="text-muted-foreground"
                >
                  {item.value}
                </span>
              </td>
              <td style={{ padding: "0.8rem" }}>
                <span
                  style={{
                    fontFamily: "monospace",
                    fontSize: "0.9rem",
                  }}
                  className="text-muted-foreground"
                >
                  {item.pixels}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SizesDemo;
