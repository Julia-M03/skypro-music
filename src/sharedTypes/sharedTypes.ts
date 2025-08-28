export interface TrackType {
  _id: number
  name: string
  author: string
  release_date: Date | string
  genre: string[] | string
  duration_in_seconds: number
  album: string
  logo: string | null
  track_file: string
  stared_user: []
}
export interface AbleFilteredByAuthor {
  artist: string
  author: string
  performer: string
}
export interface AbleFilteredByYear {
  year: number | string
  release_year: number | string
  releaseYear: number | string
  releaseDate: number | string
  date: number | string
  publishedAt: number | string
  createdAt: number | string
}
export interface AbleFilteredByAnyText {
  title: string
}

export type SelectionType = {
  _id: number;
  name: string;
  items: number[];
  owner: number[];
  __v: number;
}
