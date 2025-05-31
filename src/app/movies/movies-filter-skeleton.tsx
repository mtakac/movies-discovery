import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function MoviesFilterSkeleton() {
  return (
    <Card className="w-full">
      <CardContent className="flex items-center">
        <Skeleton className="h-9 w-28 rounded-md" />

        <div className="ml-4 flex items-center gap-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>
      </CardContent>
    </Card>
  );
}
