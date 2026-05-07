import type { ContentfulAsset } from "./types";

export async function getBlurDataURL(url: string): Promise<string | undefined> {
  try {
    const res = await fetch(`${url}?w=10&q=10&fm=jpg`);
    if (!res.ok) return undefined;
    const buf = Buffer.from(await res.arrayBuffer());
    return `data:image/jpeg;base64,${buf.toString("base64")}`;
  } catch {
    return undefined;
  }
}

export async function withBlur<T extends { coverImage: ContentfulAsset }>(
  item: T
): Promise<T> {
  const blurDataURL = await getBlurDataURL(item.coverImage.url);
  return {
    ...item,
    coverImage: { ...item.coverImage, blurDataURL },
  };
}
