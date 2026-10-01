/* eslint-disable @next/next/no-img-element -- ImageResponse renders pixels. */
import type { NextRequest } from "next/server";
import { ImageResponse } from "next/og";
import sharp from "sharp";
import { posts } from ".velite";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams;
  const slug = query.get("slug");
  const post = posts.find((item) => item.slug === slug);
  if (slug && (!post?.isPublished || post.slug === "showcase")) {
    return new Response("Article not found", { status: 404 });
  }
  const square = query.get("format") === "square";
  const height = square ? 1200 : 630;
  const title =
    post?.ogTitle ||
    post?.h1 ||
    query.get("title")?.slice(0, 120) ||
    "Notes from Kristian";
  const source = post?.socialImage || post?.heroImage || post?.thumbnail;
  // Only authored local assets enter the renderer; queries cannot fetch images.
  let image: string | undefined;
  if (source?.startsWith("/") && !source.startsWith("//")) {
    try {
      const response = await fetch(new URL(source, request.url));
      const type = response.headers.get("content-type")?.split(";")[0] || "";
      if (response.ok && /^image\/(jpeg|png|webp)$/.test(type)) {
        const photo = await sharp(Buffer.from(await response.arrayBuffer()))
          .resize(1200, 1200, { fit: "inside", withoutEnlargement: true })
          .jpeg({ quality: 85 })
          .toBuffer();
        image = `data:image/jpeg;base64,${photo.toString("base64")}`;
      }
    } catch {
      // Missing photos still produce complete typographic cards.
    }
  }
  const fonts = await Promise.all(
    ([400, 700] as const).map(async (weight) => {
      const response = await fetch(
        new URL(
          `/fonts/figtree/${weight === 700 ? "bold" : "regular"}.ttf`,
          request.url,
        ),
      );
      if (!response.ok) throw new Error("Sharing font unavailable");
      return {
        name: "Figtree",
        data: await response.arrayBuffer(),
        weight,
        style: "normal" as const,
      };
    }),
  );
  return new ImageResponse(
    <div
      style={{
        width: 1200,
        height,
        display: "flex",
        flexDirection: "column",
        background: "#FAF6EE",
        color: "#1F1B14",
        fontFamily: "Figtree",
        padding: 48,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: 54,
          marginBottom: 30,
        }}
      >
        <div style={{ fontSize: 29, fontWeight: 700 }}>Kristian Elset Bø</div>
        <div style={{ fontSize: 23, color: "#B0573F" }}>kristianeboe.me</div>
      </div>
      <div
        style={{
          display: "flex",
          position: "relative",
          flex: 1,
          overflow: "hidden",
          borderRadius: 20,
          background: "linear-gradient(135deg, #304b42, #172b26)",
        }}
      >
        {image && (
          <img
            src={image}
            alt=""
            width={1104}
            height={height - 180}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        )}
        <div
          style={{
            display: "flex",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(180deg, rgba(10,20,16,0.05), rgba(10,20,16,0.5) 35%, rgba(10,20,16,0.94))",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            position: "relative",
            padding: square ? 72 : 50,
            width: "100%",
            color: "#fff",
          }}
        >
          <div
            style={{
              fontSize: 19,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#ead3b0",
              marginBottom: 20,
            }}
          >
            {post?.tags[0] || "Writing"}
          </div>
          <div
            style={{
              fontWeight: 700,
              fontSize: square
                ? 78
                : title.length > 85
                  ? 48
                  : title.length > 55
                    ? 56
                    : 66,
              lineHeight: 1.08,
              letterSpacing: -1.5,
            }}
          >
            {title}
          </div>
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height,
      fonts,
      headers: { "Cache-Control": "public, max-age=3600, s-maxage=86400" },
    },
  );
}
