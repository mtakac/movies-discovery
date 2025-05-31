import Image from "next/image";
import Link from "next/link";
import { Calendar, Star } from "lucide-react";

import MovieGenresList from "@/app/movies/movie-genres-list";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Movie } from "@/types";

export default function MovieCard({ movie }: { movie: Movie }) {
  return (
    <Link href={`/movies/${movie.id}`}>
      <Card>
        <CardContent className="flex justify-center items-center">
          {movie.posterUrl && (
            <Image src={movie.posterUrl} alt={movie.title} width={500} height={281} className="object-cover" />
          )}
        </CardContent>

        <CardTitle>
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-white">{movie.title}</h4>
        </CardTitle>

        <CardContent>
          <div className="flex items-center gap-2 mb-1">
            <Calendar className="text-gray-400 h-4 w-4" />
            <p className="text-sm text-gray-400">{movie.releaseDate.format("DD MMMM YYYY")}</p>
          </div>
          <div className="flex items-center gap-2">
            <Star className="text-yellow-400 h-4 w-4 fill-current" />
            <p className="text-sm text-gray-400">{movie.rating}</p>
          </div>
        </CardContent>

        <CardFooter>
          <MovieGenresList movie={movie} />
        </CardFooter>
      </Card>
    </Link>
  );
}
