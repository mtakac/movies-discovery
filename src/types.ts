import * as v from "valibot";
import dayjs from "dayjs";

const getGenres = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=5118448f0df78266f8f992a2967ddfd1`
  );
  const data = await response.json();
  return data.genres;
};

export const PaginationSchema = v.pipeAsync(
  v.object({
    page: v.number(),
    total_pages: v.number(),
  })
);

export const MovieSchema = v.pipeAsync(
  v.object({
    id: v.number(),
    title: v.string(),
    backdrop_path: v.string(),
    release_date: v.string(),
    vote_average: v.number(),
    genre_ids: v.array(v.number()),
  }),
  v.transformAsync(async (data) => {
    const { backdrop_path, release_date, vote_average, genre_ids, ...restData } = data;

    const genres = await getGenres();

    return {
      ...restData,
      posterUrl: backdrop_path ? `https://image.tmdb.org/t/p/w500/${backdrop_path}` : null,
      releaseDate: dayjs(release_date),
      rating: vote_average.toFixed(1),
      genres: genre_ids.map((id) => genres.find((genre: { id: number }) => genre.id === id)?.name),
    };
  })
);

export const MovieDetailsSchema = v.pipe(
  v.object({
    id: v.number(),
    title: v.string(),
    backdrop_path: v.string(),
    overview: v.string(),
    release_date: v.string(),
    vote_average: v.number(),
    genres: v.array(v.object({ id: v.number(), name: v.string() })),
  }),
  v.transform((data) => {
    const { id, title, overview, backdrop_path, release_date, vote_average, genres } = data;
    return {
      id,
      title,
      overview,
      posterUrl: backdrop_path ? `https://image.tmdb.org/t/p/w500/${backdrop_path}` : null,
      releaseDate: dayjs(release_date),
      rating: vote_average.toFixed(1),
      genres: genres.map((genre) => genre.name),
    };
  })
);

export type Movie = v.InferOutput<typeof MovieSchema>;
export type PaginationType = v.InferOutput<typeof PaginationSchema>;
export type MovieDetails = v.InferOutput<typeof MovieDetailsSchema>;

// Filter types
export interface MovieFilters {
  genres: string[];
  minRating: number;
  yearFrom: number;
  yearTo: number;
}

export interface Genre {
  id: number;
  name: string;
}

// Export getGenres for use in other files
export { getGenres };
