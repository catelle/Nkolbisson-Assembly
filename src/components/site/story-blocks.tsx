import type { StoryBlock } from "@/lib/types";

export default function StoryBlocks({ blocks }: { blocks: StoryBlock[] }) {
  return (
    <div className="space-y-8">
      {blocks.map((block) => {
        if (block.type === "paragraph") {
          return (
            <p key={block.id} className="text-lg leading-relaxed text-sky-950/80">
              {block.text}
            </p>
          );
        }

        if (block.type === "subtitle") {
          return (
            <h2 key={block.id} className="text-2xl font-semibold text-sky-950">
              {block.text}
            </h2>
          );
        }

        if (block.type === "image") {
          return (
            <figure key={block.id} className="space-y-3">
              <img
                src={block.image}
                alt={block.caption ?? "Illustration"}
                className="w-full rounded-3xl object-cover"
                loading="lazy"
              />
              {block.caption && <figcaption className="text-sm text-sky-900/60">{block.caption}</figcaption>}
            </figure>
          );
        }

        return (
          <div
            key={block.id}
            className={`grid gap-6 rounded-3xl border border-sky-900/10 bg-white/90 p-6 shadow-sm md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] ${
              block.align === "right" ? "md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]" : ""
            }`}
          >
            {block.align === "right" ? (
              <>
                <div>
                  <p className="text-lg leading-relaxed text-sky-950/80">{block.text}</p>
                  {block.caption && <p className="mt-3 text-sm text-sky-900/60">{block.caption}</p>}
                </div>
                <img
                  src={block.image}
                  alt={block.caption ?? "Illustration"}
                  className="h-56 w-full rounded-2xl object-cover"
                  loading="lazy"
                />
              </>
            ) : (
              <>
                <img
                  src={block.image}
                  alt={block.caption ?? "Illustration"}
                  className="h-56 w-full rounded-2xl object-cover"
                  loading="lazy"
                />
                <div>
                  <p className="text-lg leading-relaxed text-sky-950/80">{block.text}</p>
                  {block.caption && <p className="mt-3 text-sm text-sky-900/60">{block.caption}</p>}
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
