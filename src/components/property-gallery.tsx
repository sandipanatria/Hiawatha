import { photos } from "@/lib/property";

export function PropertyGallery() {
  return (
    <section className="border-t border-border bg-background py-24 sm:py-32">
      <div className="site-container">
        <div className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">The collection / 04</p>
            <h2 className="mt-5 max-w-3xl font-display text-5xl leading-[0.95] sm:text-7xl">
              The house, <em>in full.</em>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            A photographic tour of 18334 Hiawatha — from its Palmer & Krisel
            architecture to the garden, pool, interiors, and creative spaces.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {photos.gallery.map(([src, alt, label], index) => (
            <figure
              key={src}
              className={`group scroll-reveal ${
                index % 7 === 0 ? "sm:col-span-2 lg:col-span-2" : ""
              }`}
            >
              <div
                className={`photo-frame overflow-hidden ${
                  index % 7 === 0 ? "aspect-[16/9]" : "aspect-[4/3]"
                }`}
              >
                <img
                  src={src}
                  alt={alt}
                  loading={index < 3 ? "eager" : "lazy"}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                />
              </div>
              <figcaption className="mt-3 flex items-center justify-between text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                <span>{label}</span>
                <span>{String(index + 1).padStart(2, "0")}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
