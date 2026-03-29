import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 100,
          background: "#0D7377",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          borderRadius: "32px",
          fontFamily: "Georgia, serif",
          fontWeight: 400,
          letterSpacing: "-2px",
        }}
      >
        LC
      </div>
    ),
    {
      ...size,
    },
  );
}
