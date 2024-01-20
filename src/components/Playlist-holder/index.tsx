import Image from "next/image";
import { PlusCircledIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { ContextMenu } from "@/components/ui/context-menu";

import { SpotifyTrack } from "../../interface/track";
import { GetSpotifyPlaylist } from "../../interface/playlist";

interface PlaylistHolderProps extends React.HTMLAttributes<HTMLDivElement> {
  playlists: GetSpotifyPlaylist[];
  aspectRatio?: "portrait" | "square";
  width?: number;
  height?: number;
  // users: SpotifyUser;
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
            <Image
              src={playlist.images?.[0].url}
              alt={playlist.name}
              width={width}
              height={height}
              className={cn(
                "h-auto w-auto object-cover transition-all hover:scale-105",
                aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
              )}
            />
          ))}
        </div>
      </ContextMenu>
      <div className='space-y-1 text-sm'>
        {playlists.map((playlist) => (
          <>
            <h3 className='font-medium leading-none'>{playlist.name}</h3>
            <p className='text-xs text-muted-foreground'>
              {playlist.description}
            </p>
          </>
        ))}
      </div>
    </div>
  );
}
