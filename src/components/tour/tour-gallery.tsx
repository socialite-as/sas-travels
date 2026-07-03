import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

type Image = { url: string; caption?: string };

export function TourGallery({ images }: { images: Image[] }) {
  const [open, setOpen] = useState<number | null>(null);
  if (images.length === 0) return null;
  const [hero, ...rest] = images;
  return (
    <>
      <div className="grid grid-cols-4 grid-rows-2 gap-2 overflow-hidden rounded-2xl">
        <button
          onClick={() => setOpen(0)}
          className="col-span-4 row-span-2 md:col-span-2 aspect-[4/3] overflow-hidden md:aspect-auto"
        >
          <img src={hero.url} alt={hero.caption ?? ""} className="h-full w-full object-cover transition-transform hover:scale-105" />
        </button>
        {rest.slice(0, 4).map((img, i) => (
          <button
            key={i}
            onClick={() => setOpen(i + 1)}
            className="hidden md:block aspect-square overflow-hidden"
          >
            <img src={img.url} alt={img.caption ?? ""} className="h-full w-full object-cover transition-transform hover:scale-105" />
          </button>
        ))}
      </div>
      <Dialog open={open !== null} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-w-5xl p-0">
          {open !== null && images[open] && (
            <img src={images[open].url} alt={images[open].caption ?? ""} className="w-full rounded-lg" />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
