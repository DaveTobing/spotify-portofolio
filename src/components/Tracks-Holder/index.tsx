import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { ContextMenu } from "@/components/ui/context-menu";

import { SpotifyTrack } from "../../interface/track";

interface TrackHolderProps extends React.HTMLAttributes<HTMLDivElement> {
  tracks: SpotifyTrack[];
  aspectRatio?: "portrait" | "square";
  width?: number;
  height?: number;
}

export function TrackHolder({
  tracks,
  aspectRatio = "portrait",
  width,
  height,
  className,
  ...props
}: TrackHolderProps) {
  return (
    <div className={cn("space-y-3", className)} {...props}>
      <ContextMenu>
        <div className='overflow-hidden rounded-md'>
          {tracks.map((track) => (
            <Link href={track.external_urls.spotify} key={track.id}>
              <Image
                src={track.album.images?.[0].url}
                alt={track.name}
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
        {tracks.map((track) => (
          <h3 className='font-medium leading-none' key={track.id}>{track.name}</h3>
        ))}
      </div>
    </div>
  );
}
