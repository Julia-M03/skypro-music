import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";
import type { AbleFilteredByAnyText, AbleFilteredByAuthor, AbleFilteredByYear, TrackType } from "@/sharedTypes/sharedTypes";


const selectPlayList = (s: RootState) => s.tracks.playList;
const selectShuffled = (s: RootState) => s.tracks.isShuffle;
const selectShuffledPlayList = (s: RootState) => s.tracks.shuffledPlayList;

export const selectActiveList = createSelector(
  [selectShuffled, selectPlayList, selectShuffledPlayList],
  (isShuffle, list, shuffled) => (isShuffle ? shuffled : list)
)

const getArtist = (track: Partial<TrackType & AbleFilteredByAuthor>) => track.artist ?? track.author ?? track.performer ?? "";

const getYear = (track: Partial<TrackType & AbleFilteredByYear>): number | null => {
  const cand = [
    track.year,
    track.release_year,
    track.releaseYear,
    track.release_date,
    track.releaseDate,
    track.date,
    track.publishedAt,
    track.createdAt,
  ]

  for (const v of cand) {
    if (typeof v === "number" && Number.isFinite(v))
      return v

    if (typeof v === "string" && v) {
      const m = v.match(/(\d{4})/)

      if (m) {
        const y = Number(m[1])

        if (y >= 1900 && y <= 2100)
          return y
      }

      const d = new Date(v);

      if (!Number.isNaN(d.getTime())) {
        const y = d.getFullYear()

        if (y >= 1900 && y <= 2100)
          return y
      }
    }
  }

  return null
}

const getGenres = (track: TrackType): string[] =>
  Array.isArray(track.genre) ? track.genre : track.genre ? [track.genre] : [];

const textMatch = (track: Partial<TrackType & AbleFilteredByAnyText & AbleFilteredByAuthor>, query: string) => {
  if (!query)
    return true;

  const low = query.trim().toLowerCase();
  const fields = [track.name, track.title, getArtist(track), track.album].filter(Boolean);

  return fields.some((v) => String(v).toLowerCase().includes(low));
};

export const selectVisibleTracks = createSelector(
  [selectActiveList, (state: RootState) => state.tracks.filters],
  (list, f) => {
    const artistSet = new Set((f.artists ?? []).map(String))
    const yearSet = new Set<number>(f.years ?? []);
    const genreSet = new Set((f.genres ?? []).map((g) => g.toLowerCase()))

    return list.filter((t) => {
      if (!textMatch(t, f.query ?? ""))
        return false

      if (artistSet.size) {
        const a = String(getArtist(t))

        if (!artistSet.has(a))
          return false
      }

      if (yearSet.size) {
        const y = getYear(t)

        if (y == null || !yearSet.has(y))
          return false
      }

      if (genreSet.size) {
        const gs = getGenres(t).map((g) => String(g).toLowerCase())

        if (!gs.length || !gs.some((g) => genreSet.has(g)))
          return false
      }

      return true
    })
  }
)

export const selectFacetOptions = createSelector([selectActiveList], (list) => {
  const artists = new Set<string>()
  const years = new Set<number>()
  const genres = new Set<string>()

  for (const track of list) {
    const artist = getArtist(track)

    if (artist)
      artists.add(String(artist))

    const year = getYear(track)

    if (typeof year === "number")
      years.add(year)

    for (const genre of getGenres(track))
      if (genre)
        genres.add(String(genre))
  }

  return {
    artists: Array.from(artists).sort((a, b) => a.localeCompare(b)),
    years: Array.from(years).sort((a, b) => a - b),
    genres: Array.from(genres).sort((a, b) => a.localeCompare(b)),
  }
})
