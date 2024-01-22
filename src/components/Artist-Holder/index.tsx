import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { ContextMenu } from "@/components/ui/context-menu";

import { SpotifyArtist } from "../../interface/artist";

interface ArtistHolderProps extends React.HTMLAttributes<HTMLDivElement> {
  artists: SpotifyArtist[];
  aspectRatio?: "portrait" | "square";
  width?: number;
  height?: number;
}

export function ArtistHolder({
  artists,
  aspectRatio = "portrait",
  width,
  height,
  className,
  ...props
}: ArtistHolderProps) {
  return (
    <div className={cn("space-y-3", className)} {...props}>
      <ContextMenu>
        <div className='overflow-hidden rounded-md'>
          {artists.map((artist) => (
            <Link href={artist.external_urls.spotify}>
              <Image
                src={artist.images?.[0].url}
                alt={artist.name}
                width={width}
                height={height}
                className={cn(
                  "h-auto w-auto object-cover transition-all hover:scale-105",
                  aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
                )}
              />
            </Link>
          ))}
        </div>
      </ContextMenu>
      <div className='space-y-1 text-sm'>
        {artists.map((artist) => (
          <>
            <h3 className='font-medium leading-none'>{artist.name}</h3>
          </>
        ))}
      </div>
    </div>
  );
}
