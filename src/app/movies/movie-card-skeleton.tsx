import Image from "next/image";

import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function MovieCardSkeleton() {
  return (
    <Card>
      <CardContent>
        <Skeleton className="w-full aspect-[500/281]" />
      </CardContent>

      <CardTitle>
        <Skeleton className="w-full h-[28px]" />
      </CardTitle>

      <CardContent>
        <Skeleton className="w-full h-[40px]" />
      </CardContent>

      <CardFooter>
        <Skeleton className="w-full h-[22px]" />
      </CardFooter>
    </Card>
  );
}
