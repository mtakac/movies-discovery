import { Movie } from "@/types";
import MovieCard from "./movie-card";

export default function MoviesList({ movies }: { movies: Movie[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
