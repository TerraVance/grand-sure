import { ImageResponse } from "next/og";

export const alt = "Grand Sure solar installation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#000000",
          color: "white",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, letterSpacing: 4, color: "#FFFFFF" }}>GRAND SURE</div>
        <div style={{ display: "flex", fontSize: 72, fontWeight: 700, lineHeight: 1.05, maxWidth: 800 }}>
          Solar systems built to last.
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#D4D4D4" }}>Panels, batteries, and installation</div>
      </div>
    ),
    { ...size },
  );
}
