import Image from "next/image";
import type { ReactNode } from "react";
import { ImageOff } from "lucide-react";
import type { ImageInfo } from "@/lib/images";

/** Landscape images close to the frame ratio fill it; everything else is shown whole. */
function shouldCover(img: ImageInfo, frameRatio: number, minWidth: number) {
  const ratio = img.width / img.height;
  return img.width >= minWidth && ratio >= frameRatio * 0.85 && ratio <= frameRatio * 1.2;
}

type FrameProps = {
  image: ImageInfo | null;
  alt: string;
  /** "video" = 16:9 (project covers), "photo" = 3:2 (event photos). */
  ratio?: "video" | "photo";
  sizes: string;
  placeholder: string;
  /** "contain" always shows the whole image on the gradient background, even when it could fill the frame. */
  fit?: "auto" | "contain";
  /** Drawn illustration used when the image is missing. */
  fallback?: ReactNode;
  children?: ReactNode;
  className?: string;
};

export function Placeholder({ label }: { label: string }) {
  return (
    <div className="dot-grid absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted">
      <ImageOff aria-hidden="true" className="size-7 opacity-70" />
      <span className="text-sm">{label}</span>
    </div>
  );
}

/**
 * Fixed-ratio, rounded frame. Never upscales small images and never crops portrait
 * or square ones: those are centred at most at their natural size on the gradient background.
 */
export function Cover({ image, alt, ratio = "video", sizes, placeholder, fit = "auto", fallback, children, className = "" }: FrameProps) {
  const frameRatio = ratio === "video" ? 16 / 9 : 3 / 2;
  const aspect = ratio === "video" ? "aspect-video" : "aspect-[3/2]";

  return (
    <div className={`bg-cover relative ${aspect} overflow-hidden rounded-2xl border border-line ${className}`}>
      {image ? (
        fit === "auto" && shouldCover(image, frameRatio, 720) ? (
          <Image src={image.src} alt={alt} fill sizes={sizes} className="object-cover object-center" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-5">
            <Image
              src={image.src}
              alt={alt}
              width={image.width}
              height={image.height}
              sizes={sizes}
              className="h-auto max-h-full w-auto max-w-full rounded-lg object-contain shadow-lg shadow-black/20"
            />
          </div>
        )
      ) : (
        fallback ?? <Placeholder label={placeholder} />
      )}
      {children}
    </div>
  );
}
