import { ImageResponse } from "next/og";
import { join } from "path";
import { readFile } from "fs/promises";

export type Props = {
  title?: string;
};

export default async function OpengraphImage(
  props?: Props,
): Promise<ImageResponse> {
  const { title } = {
    ...{
      title: process.env.SITE_NAME,
    },
    ...props,
  };

  const file = await readFile(join(process.cwd(), "./fonts/Inter-Bold.ttf"));
  const font = Uint8Array.from(file).buffer;

  return new ImageResponse(
    (
      <div
        tw="flex h-full w-full flex-col items-center justify-center"
        style={{ backgroundColor: "#fafaf9" }}
      >
        <div
          tw="flex flex-none items-center justify-center h-[120px] w-[120px] rounded-full"
          style={{ backgroundColor: "#9CAF88" }}
        >
          <span
            tw="text-5xl text-white"
            style={{ fontFamily: "Georgia, serif" }}
          >
            GP
          </span>
        </div>
        <p tw="mt-8 text-5xl text-stone-800" style={{ fontWeight: 400 }}>
          {title}
        </p>
        <p tw="mt-2 text-xl text-stone-500">Premium Research Peptides</p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Inter",
          data: font,
          style: "normal",
          weight: 700,
        },
      ],
    },
  );
}
