import MoviesListSkeleton from "@/app/movies/movies-list-skeleton";
import MoviesFilterSkeleton from "@/app/movies/movies-filter-skeleton";
import MoviesPaginationSkeleton from "@/app/movies/movies-pagination-skeleton";

export default function Loading() {
  return (
    <div className="space-y-8">
      <MoviesFilterSkeleton />

      <div className="space-y-8">
        <MoviesListSkeleton />
        <MoviesPaginationSkeleton />
      </div>
    </div>
  );
}
