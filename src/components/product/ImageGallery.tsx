"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export default function ImageGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  /* ── Embla carousel (mobile) ────────────────────────── */
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Sync carousel when thumbnail is tapped
  const scrollTo = useCallback(
    (index: number) => {
      setSelectedIndex(index);
      emblaApi?.scrollTo(index);
    },
    [emblaApi],
  );

  /* ── Lightbox nav ───────────────────────────────────── */
  const lightboxPrev = () =>
    setSelectedIndex((i) => (i - 1 + images.length) % images.length);
  const lightboxNext = () => setSelectedIndex((i) => (i + 1) % images.length);

  if (images.length === 0) {
    return (
      <div className="relative aspect-square overflow-hidden rounded-xl bg-muted" />
    );
  }

  return (
    <>
      {/* ── Mobile carousel ──────────────────────────────── */}
      <div className="md:hidden">
        <div className="overflow-hidden rounded-xl" ref={emblaRef}>
          <div className="flex">
            {images.map((img, idx) => (
              <div
                key={idx}
                className="relative aspect-square w-full flex-[0_0_100%] bg-muted"
              >
                <Image
                  src={img}
                  alt={`${name} ${idx + 1}`}
                  fill
                  sizes="(max-width: 767px) calc(100vw - 40px), 50vw"
                  className="object-cover"
                  priority={idx === 0}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Dot indicators */}
        {images.length > 1 && (
          <div className="mt-4 flex justify-center gap-2">
            {images.map((_, idx) => (
              <button
                key={idx}
                aria-label={`Show image ${idx + 1}`}
                onClick={() => scrollTo(idx)}
                className={`h-2 w-2 rounded-full transition-colors ${
                  idx === selectedIndex
                    ? "bg-primary"
                    : "bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Desktop static image + lightbox ──────────────── */}
      <div className="hidden md:block">
        <button
          onClick={() => setLightboxOpen(true)}
          aria-label={`Enlarge ${name} image`}
          className="relative aspect-[4/5] w-full cursor-zoom-in overflow-hidden rounded-xl bg-muted focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          <Image
            src={images[selectedIndex]}
            alt={name}
            fill
            sizes="(max-width: 1279px) 50vw, 584px"
            className="object-cover"
            priority
          />
        </button>

        {/* Thumbnail strip */}
        {images.length > 1 && (
          <div className="mt-4 flex gap-2 overflow-x-auto">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedIndex(idx)}
                aria-label={`Show image ${idx + 1}`}
                aria-pressed={selectedIndex === idx}
                className={`relative h-16 w-16 flex-shrink-0 cursor-pointer overflow-hidden rounded transition-opacity hover:opacity-80 ${
                  idx === selectedIndex
                    ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                    : ""
                }`}
              >
                <Image
                  src={img}
                  alt={`${name} ${idx + 1}`}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Fullscreen lightbox dialog ───────────────────── */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="flex max-w-5xl flex-col items-center gap-4 bg-background p-4 sm:p-6">
          <DialogTitle className="sr-only">{name}</DialogTitle>

          <div className="relative aspect-square w-full max-h-[70vh]">
            <Image
              src={images[selectedIndex]}
              alt={name}
              fill
              sizes="(max-width: 1024px) 90vw, 960px"
              className="object-contain"
            />

            {/* Left arrow */}
            {images.length > 1 && (
              <button
                aria-label="Previous image"
                onClick={lightboxPrev}
                className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-background/90 text-foreground shadow hover:bg-background"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            )}

            {/* Right arrow */}
            {images.length > 1 && (
              <button
                aria-label="Next image"
                onClick={lightboxNext}
                className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-background/90 text-foreground shadow hover:bg-background"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Lightbox thumbnail strip */}
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedIndex(idx)}
                  aria-label={`Show image ${idx + 1}`}
                  aria-pressed={selectedIndex === idx}
                  className={`relative h-14 w-14 flex-shrink-0 cursor-pointer overflow-hidden rounded transition-opacity hover:opacity-80 ${
                    idx === selectedIndex
                      ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                      : ""
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${name} ${idx + 1}`}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
