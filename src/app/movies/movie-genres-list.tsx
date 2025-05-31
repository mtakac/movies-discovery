import { Movie } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Tag } from "lucide-react";

export default function MovieGenresList({ movie }: { movie: Movie }) {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      <Tag className="text-gray-400 h-3 w-3" />
      {movie.genres.map((genre) => (
        <Badge key={genre} variant="secondary">
          {genre}
        </Badge>
      ))}
    </div>
  );
}
