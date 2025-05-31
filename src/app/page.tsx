import { Suspense } from "react";

import { getMovies } from "@/lib/api";
import MoviesList from "@/app/movies/movies-list";
import MoviesPagination from "@/app/movies/movies-pagination";
import MoviesFilter from "@/app/movies/movies-filter";
import { getGenres, MovieFilters } from "@/types";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = Number(params.page) || 1;

  // Parse filters from search params
  const filters: Partial<MovieFilters> = {};

  if (params.genres && typeof params.genres === "string") {
    filters.genres = params.genres.split(",");
  }

  if (params.minRating && typeof params.minRating === "string") {
    filters.minRating = parseFloat(params.minRating);
  }

  if (params.yearFrom && typeof params.yearFrom === "string") {
    filters.yearFrom = parseInt(params.yearFrom);
  }

  if (params.yearTo && typeof params.yearTo === "string") {
    filters.yearTo = parseInt(params.yearTo);
  }

  const { movies, pagination } = await getMovies(page, filters);
  const genres = await getGenres();

  return (
    <div className="space-y-8">
      <Suspense>
        <MoviesFilter genres={genres} />
      </Suspense>

      <div className="space-y-8">
        <Suspense>
          <MoviesList movies={movies} />
          <MoviesPagination pagination={pagination} />
        </Suspense>
      </div>
    </div>
  );
}
