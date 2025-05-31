"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, ChevronDownIcon, ChevronUp, ChevronUpIcon, Tag, Star, Calendar } from "lucide-react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Genre, MovieFilters } from "@/types";
import { Badge } from "@/components/ui/badge";

const currentYear = new Date().getFullYear();
const minYear = 1900;

export default function MoviesFilter({ genres }: { genres: Genre[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [minRating, setMinRating] = useState<number>(0);
  const [yearRange, setYearRange] = useState<[number, number]>([minYear, currentYear]);
  const [isExpanded, setIsExpanded] = useState(false);

  // Track applied filters from URL params for displaying badges
  const appliedGenres = searchParams.get("genres")?.split(",") || [];
  const appliedMinRating = searchParams.get("minRating") ? parseFloat(searchParams.get("minRating")!) : 0;
  const appliedYearFrom = searchParams.get("yearFrom") ? parseInt(searchParams.get("yearFrom")!) : minYear;
  const appliedYearTo = searchParams.get("yearTo") ? parseInt(searchParams.get("yearTo")!) : currentYear;

  // Parse URL search params to set initial filter state
  useEffect(() => {
    const genresParam = searchParams.get("genres");
    const ratingParam = searchParams.get("minRating");
    const yearFromParam = searchParams.get("yearFrom");
    const yearToParam = searchParams.get("yearTo");

    if (genresParam) {
      setSelectedGenres(genresParam.split(","));
    }
    if (ratingParam) {
      setMinRating(parseFloat(ratingParam));
    }
    if (yearFromParam || yearToParam) {
      const fromYear = yearFromParam ? parseInt(yearFromParam) : minYear;
      const toYear = yearToParam ? parseInt(yearToParam) : currentYear;
      setYearRange([fromYear, toYear]);
    }
  }, [searchParams]);

  const handleGenreToggle = (genreName: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genreName) ? prev.filter((g) => g !== genreName) : [...prev, genreName]
    );
  };

  const applyFilters = () => {
    const params = new URLSearchParams();

    // Reset page to 1 when applying filters
    params.set("page", "1");

    if (selectedGenres.length > 0) {
      params.set("genres", selectedGenres.join(","));
    }

    if (minRating > 0) {
      params.set("minRating", minRating.toString());
    }

    if (yearRange[0] > minYear) {
      params.set("yearFrom", yearRange[0].toString());
    }

    if (yearRange[1] < currentYear) {
      params.set("yearTo", yearRange[1].toString());
    }

    router.push(`/?${params.toString()}`);
  };

  const clearFilters = () => {
    setSelectedGenres([]);
    setMinRating(0);
    setYearRange([minYear, currentYear]);
    router.push("/");
  };

  // Check if any filters are active
  const hasActiveFilters =
    appliedGenres.length > 0 || appliedMinRating > 0 || appliedYearFrom > minYear || appliedYearTo < currentYear;

  return (
    <Card className="w-full">
      <CardContent className="flex items-center">
        <Button variant="secondary" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded && (
            <>
              <ChevronUp className="size-5" />
              Hide filters
            </>
          )}
          {!isExpanded && (
            <>
              <ChevronDown className="size-5" />
              Show filters
            </>
          )}
        </Button>

        <div className="ml-4 flex items-center gap-2">
          {appliedGenres.map((genre) => (
            <Badge key={genre} variant="outline">
              {genre}
            </Badge>
          ))}

          {/* Show rating range in a badge if minimum rating is set */}
          {appliedMinRating > 0 && <Badge variant="outline">Rating ≥ {appliedMinRating.toFixed(1)}</Badge>}

          {/* Show year range in a badge if year range is not minYear-currentYear */}
          {(appliedYearFrom > minYear || appliedYearTo < currentYear) && (
            <Badge variant="outline">
              {appliedYearFrom} - {appliedYearTo}
            </Badge>
          )}
        </div>
      </CardContent>

      {isExpanded && (
        <CardContent className="space-y-6">
          {/* Genres Filter */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Tag className="text-gray-400 h-4 w-4" />
              <Label className="text-sm font-medium text-gray-300">Genres</Label>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-48 overflow-y-auto">
              {genres.map((genre) => (
                <div key={genre.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`genre-${genre.id}`}
                    checked={selectedGenres.includes(genre.name)}
                    onCheckedChange={() => handleGenreToggle(genre.name)}
                  />
                  <Label htmlFor={`genre-${genre.id}`} className="text-sm text-gray-300 cursor-pointer">
                    {genre.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Rating Filter */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Star className="text-gray-400 h-4 w-4" />
              <Label className="text-sm font-medium text-gray-300">Minimum Rating: {minRating.toFixed(1)}</Label>
            </div>
            <Slider
              value={[minRating]}
              onValueChange={(value) => setMinRating(value[0])}
              max={10}
              min={0}
              step={0.1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>0.0</span>
              <span>10.0</span>
            </div>
          </div>

          {/* Year Range Filter */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Calendar className="text-gray-400 h-4 w-4" />
              <Label className="text-sm font-medium text-gray-300">
                Release Year: {yearRange[0]} - {yearRange[1]}
              </Label>
            </div>
            <Slider
              value={yearRange}
              onValueChange={(value) => setYearRange(value as [number, number])}
              max={currentYear}
              min={minYear}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>{minYear}</span>
              <span>{currentYear}</span>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button onClick={applyFilters} className="flex-1">
              Apply Filters
            </Button>
            <Button variant="outline" onClick={clearFilters} className="flex-1">
              Clear All
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
