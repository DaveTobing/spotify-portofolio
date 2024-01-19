import { SpotifyArtist } from './artist'
// import { SpotifyGenre } from './genre'
// import { PlayingTrack } from './playing'
import { GetSpotifyPlaylist } from './playlist'
// import { SpotifyTrack } from './track'
import { SpotifyUser } from './user'

export interface SpotifyData {
    artists: SpotifyArtist[]
    // tracks: SpotifyTrack[]
    // genres: SpotifyGenre[]
    user: SpotifyUser
    playlists: GetSpotifyPlaylist[]
    // playingTrack?: PlayingTrack
}

export interface Tracks {
    href: string
    total: number
}

export interface ExternalUrls {
    spotify: string
}

export interface Followers {
    href: string
    total: number
}

export interface Image {
    url: string
    height: number
    width: number
}