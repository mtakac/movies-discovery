import { Movie } from "@/types";
import MovieCardSkeleton from "./movie-card-skeleton";

export default function MoviesListSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 20 }).map((_, index) => (
        <MovieCardSkeleton key={index} />
      ))}
    </div>
  );
}
