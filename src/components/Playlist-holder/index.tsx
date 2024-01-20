import Image from "next/image";

import { cn } from "@/lib/utils";
import { ContextMenu } from "@/components/ui/context-menu";

import { GetSpotifyPlaylist } from "../../interface/playlist";
import Link from "next/link";

interface PlaylistHolderProps extends React.HTMLAttributes<HTMLDivElement> {
  playlists: GetSpotifyPlaylist[];
  aspectRatio?: "portrait" | "square";
  width?: number;
  height?: number;
}

export function PlaylistHolder({
  playlists,
  aspectRatio = "portrait",
  width,
  height,
  className,
  ...props
}: PlaylistHolderProps) {
  return (
    <div className={cn("space-y-3", className)} {...props}>
      <ContextMenu>
        <div className='overflow-hidden rounded-md'>
          {playlists.map((playlist) => (
            <>
              <Link href={playlist.external_urls.spotify}>
                <Image
                  src={playlist.images?.[0].url}
                  alt={playlist.external_urls.spotify}
                  width={width}
                  height={height}
                  className={cn(
                    "h-auto w-auto object-cover transition-all hover:scale-105",
                    aspectRatio === "portrait"
                      ? "aspect-[3/4]"
                      : "aspect-square"
                  )}
                />
              </Link>
            </>
          ))}
        </div>
      </ContextMenu>
      <div className='space-y-1 text-sm'>
        {playlists.map((playlist) => (
          <>
            <h3 className='font-medium leading-none'>{playlist.name}</h3>
          </>
        ))}
      </div>
    </div>
  );
}
