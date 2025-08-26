import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";


const selectPlayList = (s: RootState) => s.tracks.playList;
const selectShuffled = (s: RootState) => s.tracks.isShuffle;
const selectShuffledPlayList = (s: RootState) => s.tracks.shuffledPlayList;

export const selectActiveList = createSelector(
  [selectShuffled, selectPlayList, selectShuffledPlayList],
  (isShuffle, list, shuffled) => (isShuffle ? shuffled : list)
)

const getArtist = (t: any) => t.artist ?? t.author ?? t.performer ?? "";

const getYear = (t: any): number | null => {
  const cand = [
    t.year,
    t.release_year,
    t.releaseYear,
    t.release_date,
    t.releaseDate,
    t.date,
    t.publishedAt,
    t.createdAt,
  ]

  for (const v of cand) {
    if (typeof v === "number" && Number.isFinite(v)) return v
    if (typeof v === "string" && v) {
      const m = v.match(/(\d{4})/)
      if (m) {
        const y = Number(m[1])
        if (y >= 1900 && y <= 2100) return y
      }

      const d = new Date(v);
      if (!Number.isNaN(d.getTime())) {
        const y = d.getFullYear()
        if (y >= 1900 && y <= 2100) return y
      }
    }
  }
  return null
}

const getGenres = (t: any): string[] =>
  Array.isArray(t.genre) ? t.genre : t.genre ? [t.genre] : [];

const textMatch = (t: any, q: string) => {
  if (!q) return true;
  const low = q.trim().toLowerCase();
  const fields = [t.name, t.title, getArtist(t), t.album].filter(Boolean);
  return fields.some((v) => String(v).toLowerCase().includes(low));
};

export const selectVisibleTracks = createSelector(
  [selectActiveList, (s: RootState) => s.tracks.filters],
  (list, f) => {
    const artistSet = new Set((f.artists ?? []).map(String))
    const yearSet = new Set<number>(f.years ?? []);
    const genreSet = new Set((f.genres ?? []).map((g) => g.toLowerCase()))

    return list.filter((t) => {
      if (!textMatch(t, f.query ?? "")) return false

      if (artistSet.size) {
        const a = String(getArtist(t))
        if (!artistSet.has(a)) return false
      }

      if (yearSet.size) {
        const y = getYear(t)
        if (y == null || !yearSet.has(y)) return false
      }

      if (genreSet.size) {
        const gs = getGenres(t).map((g) => String(g).toLowerCase())
        if (!gs.length || !gs.some((g) => genreSet.has(g))) return false
      }

      return true
    })
  }
)

export const selectFacetOptions = createSelector([selectActiveList], (list) => {
  const artists = new Set<string>()
  const years = new Set<number>()
  const genres = new Set<string>()

  for (const t of list) {
    const a = getArtist(t)
    if (a) artists.add(String(a))

    const y = getYear(t)
    if (typeof y === "number") years.add(y)

    for (const g of getGenres(t)) if (g) genres.add(String(g))
  }

  return {
    artists: Array.from(artists).sort((a, b) => a.localeCompare(b)),
    years: Array.from(years).sort((a, b) => a - b),
    genres: Array.from(genres).sort((a, b) => a.localeCompare(b)),
  }
})
