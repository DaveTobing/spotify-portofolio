import { ExternalUrls } from '.'
import { SpotifyArtist } from './artist'
import { SpotifyAlbum } from './album'

export interface SpotifyTrack {
    album: SpotifyAlbum
    artists: Partial<SpotifyArtist>[]
    available_markets: string[]
    disc_number: number
    duration_ms: number
    explicit: boolean
    external_ids: ExternalIds
    external_urls: ExternalUrls
    href: string
    id: string
    name: string
    popularity: number
    preview_url: string
    track_number: number
    type: string
    uri: string
    is_local: boolean
}

export interface ExternalIds {
    isrc: string
}

