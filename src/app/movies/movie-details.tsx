import { getMovie } from "@/lib/api";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function MovieDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const movie = await getMovie(id);

  if (!movie) {
    notFound();
  }

  return (
    <Card className="overflow-hidden">
      <CardContent>
        <div className="md:flex">
          <div className="md:w-1/3 lg:w-1/4">
            {movie.posterUrl ? (
              <Image
                src={movie.posterUrl}
                alt={movie.title}
                width={500}
                height={750}
                className="w-full h-auto object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                priority
              />
            ) : (
              <div className="w-full h-96 md:h-full bg-gray-800 flex items-center justify-center rounded-t-lg md:rounded-l-lg md:rounded-t-none">
                <span className="text-gray-400 text-lg">No Image Available</span>
              </div>
            )}
          </div>

          <div className="md:w-2/3 lg:w-3/4">
            <CardHeader>
              <CardTitle className="text-3xl md:text-4xl font-bold text-white mb-4">{movie.title}</CardTitle>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400 text-xl">⭐</span>
                  <span className="text-xl font-semibold text-white">{movie.rating}</span>
                  <span className="text-gray-400">/ 10</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-gray-400">📅</span>
                  <span className="text-gray-300">{movie.releaseDate.format("MMMM DD, YYYY")}</span>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-3">Genres</h3>
                <div className="flex flex-wrap gap-2">
                  {movie.genres.map((genre) => (
                    <Badge key={genre} variant="secondary" className="text-sm">
                      {genre}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-3">Overview</h3>
                <p className="text-gray-300 leading-relaxed text-base">{movie.overview}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gray-800 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-400 mb-1">Movie ID</h4>
                  <p className="text-white">{movie.id}</p>
                </div>

                <div className="bg-gray-800 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-400 mb-1">Release Year</h4>
                  <p className="text-white">{movie.releaseDate.format("YYYY")}</p>
                </div>
              </div>
            </CardContent>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
