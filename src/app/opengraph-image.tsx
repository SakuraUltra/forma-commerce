import { ImageResponse } from "next/og";
import { storeConfig } from "@/lib/store-config";

export const alt = `${storeConfig.name} — everyday pieces, thoughtfully chosen. An open-source storefront demo.`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        background: "#f7f4ed",
        color: "#3e4935",
        padding: 64,
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 22,
          letterSpacing: 4,
        }}
      >
        <span>EVERYDAY, CONSIDERED.</span>
        <span>STOREFRONT DEMO</span>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 140, letterSpacing: 14, lineHeight: 1 }}>
            {storeConfig.name}
          </span>
          <span style={{ fontSize: 32, marginTop: 30 }}>
            Everyday pieces. A complete shopping journey.
          </span>
        </div>
        <div
          style={{
            display: "flex",
            width: 130,
            height: 190,
            borderRadius: "70px 70px 8px 8px",
            background: "#3e4935",
            marginLeft: 36,
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingTop: 24,
          borderTop: "1px solid #c6c7b8",
          fontSize: 21,
        }}
      >
        <span>Browse · Choose · Demo checkout · Track</span>
        <span>Next.js / TypeScript / MIT</span>
      </div>
    </div>,
    size,
  );
}
