"use client";

import { useEffect, useState } from "react";
import { getMovie } from "@/lib/api";
import { MovieDetails } from "@/types";
import Modal from "@/components/ui/modal";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { X, Star, Calendar, Film, Tag } from "lucide-react";
import { useRouter } from "next/navigation";

function MovieDetailsSkeleton() {
  return (
    <Card className="overflow-hidden relative">
      <Skeleton className="absolute top-4 right-4 h-8 w-8 rounded-full z-10" />
      <CardContent>
        <div className="md:flex">
          <div className="md:w-1/3 lg:w-1/4">
            <Skeleton className="w-full h-96 md:h-full rounded-t-lg md:rounded-l-lg md:rounded-t-none" />
          </div>
          <div className="md:w-2/3 lg:w-3/4">
            <CardHeader>
              <Skeleton className="h-10 w-3/4 mb-4" />
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-32" />
              </div>
              <div className="mb-6">
                <Skeleton className="h-6 w-16 mb-3" />
                <div className="flex flex-wrap gap-2">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-18" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <Skeleton className="h-6 w-20 mb-3" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Skeleton className="h-16 w-full rounded-lg" />
                <Skeleton className="h-16 w-full rounded-lg" />
              </div>
            </CardContent>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function MovieDetailsContent({ movie }: { movie: MovieDetails }) {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  return (
    <Card className="overflow-hidden relative">
      {/* Close button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full"
        onClick={handleClose}
      >
        <X className="h-4 w-4" />
      </Button>

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
                  <Star className="text-yellow-400 h-5 w-5 fill-current" />
                  <span className="text-xl font-semibold text-white">{movie.rating}</span>
                  <span className="text-gray-400">/ 10</span>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="text-gray-400 h-5 w-5" />
                  <span className="text-gray-300">{movie.releaseDate.format("MMMM DD, YYYY")}</span>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="text-gray-400 h-5 w-5" />
                  <h3 className="text-lg font-semibold text-white">Genres</h3>
                </div>
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
                  <div className="flex items-center gap-2 mb-1">
                    <Film className="text-gray-400 h-4 w-4" />
                    <h4 className="text-sm font-medium text-gray-400">Movie ID</h4>
                  </div>
                  <p className="text-white">{movie.id}</p>
                </div>

                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="text-gray-400 h-4 w-4" />
                    <h4 className="text-sm font-medium text-gray-400">Release Year</h4>
                  </div>
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

export default function MovieModal({ params }: { params: Promise<{ id: string }> }) {
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const resolvedParams = await params;
        const movieData = await getMovie(resolvedParams.id);
        if (movieData) {
          setMovie(movieData);
        } else {
          setError("Movie not found");
        }
      } catch (err) {
        setError("Failed to load movie");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [params]);

  return (
    <Modal>
      {loading && <MovieDetailsSkeleton />}
      {error && (
        <Card className="overflow-hidden relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full"
            onClick={handleClose}
          >
            <X className="h-4 w-4" />
          </Button>
          <CardContent className="p-8 text-center">
            <p className="text-red-400">{error}</p>
          </CardContent>
        </Card>
      )}
      {movie && <MovieDetailsContent movie={movie} />}
    </Modal>
  );
}
