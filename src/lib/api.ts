import * as v from "valibot";

import { MovieSchema, PaginationSchema, MovieFilters, getGenres, MovieDetails, MovieDetailsSchema } from "@/types";
import { Movie } from "@/types";

export async function getMovies(page: number = 1, filters?: Partial<MovieFilters>) {
  const genres = await getGenres();

  let url = `https://api.themoviedb.org/3/discover/movie?api_key=5118448f0df78266f8f992a2967ddfd1&include_adult=false&page=${page}&l`;

  if (filters) {
    if (filters.genres && filters.genres.length > 0) {
      const genres = await getGenres();
      const genreIds = filters.genres
        .map((genreName) => genres.find((genre: any) => genre.name === genreName)?.id)
        .filter((id) => id !== undefined);

      if (genreIds.length > 0) {
        url += `&with_genres=${genreIds.join("|")}`;
      }
    }

    if (filters.minRating !== undefined) {
      url += `&vote_average.gte=${filters.minRating}`;
    }

    if (filters.yearFrom !== undefined) {
      url += `&primary_release_date.gte=${filters.yearFrom}-01-01`;
    }

    if (filters.yearTo !== undefined) {
      url += `&primary_release_date.lte=${filters.yearTo}-12-31`;
    }
  }

  const response = await fetch(url);
  const data = await response.json();
  const parsedPagination = await v.parseAsync(PaginationSchema, data);
  let parsedResults: Movie[] = [];

  for (const movie of data.results) {
    const parsedMovie = await v.safeParseAsync(MovieSchema, movie);
    if (parsedMovie.success) {
      parsedResults = [...parsedResults, parsedMovie.output];
    } else {
      console.error(parsedMovie.issues);
    }
  }

  return { movies: parsedResults, pagination: parsedPagination };
}

export async function getMovie(id: string): Promise<MovieDetails | null> {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=5118448f0df78266f8f992a2967ddfd1`);

    if (!response.ok) {
      throw new Error(`Failed to fetch movie: ${response.status}`);
    }

    const data = await response.json();
    const parsedMovie = await v.safeParseAsync(MovieDetailsSchema, data);

    if (parsedMovie.success) {
      return parsedMovie.output;
    } else {
      console.error("Failed to parse movie:", JSON.stringify(parsedMovie.issues, null, 2));
      return null;
    }
  } catch (error) {
    console.error("Error fetching movie:", error);
    return null;
  }
}
