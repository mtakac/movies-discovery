import MovieDetails from "@/app/movies/movie-details";

export default async function MoviePage({ params }: { params: Promise<{ id: string }> }) {
  return <MovieDetails params={params} />;
}
