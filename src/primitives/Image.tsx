import type { CSSProperties } from "react"
import { radius as radiusScale } from "@/foundation"

/*
 * Image — a BASE PRIMITIVE. A genuine gap: neither Radix nor shadcn ship an
 * <img> wrapper (Avatar covers the circular-fallback case, not a general
 * photo/illustration slot). This is that missing primitive — object-fit +
 * Foundation's radius scale + a lazy-load default, nothing else.
 */

type RadiusKey = keyof typeof radiusScale

export type ImageProps = {
  src: string
  /** required — decorative images should use alt="" explicitly, not omit it */
  alt: string
  width?: number | string
  height?: number | string
  fit?: "cover" | "contain"
  radius?: RadiusKey | number | string
  loading?: "lazy" | "eager"
  className?: string
  style?: CSSProperties
}

export function Image({
  src,
  alt,
  width,
  height,
  fit = "cover",
  radius,
  loading = "lazy",
  className,
  style,
}: ImageProps) {
  const resolvedRadius =
    radius == null
      ? undefined
      : typeof radius === "number"
        ? `${radius}px`
        : radius in radiusScale
          ? radiusScale[radius as RadiusKey]
          : radius

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      className={className}
      width={typeof width === "number" ? width : undefined}
      height={typeof height === "number" ? height : undefined}
      style={{
        display: "block",
        width,
        height,
        objectFit: fit,
        borderRadius: resolvedRadius,
        ...style,
      }}
    />
  )
}
