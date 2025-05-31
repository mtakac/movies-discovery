import { Skeleton } from "@/components/ui/skeleton";
import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination";

export default function MoviesPaginationSkeleton() {
  return (
    <div className="flex justify-center items-center">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <Skeleton className="h-9 w-20 rounded-md" />
          </PaginationItem>

          <PaginationItem>
            <Skeleton className="h-9 w-9 rounded-md" />
          </PaginationItem>
          <PaginationItem>
            <Skeleton className="h-9 w-9 rounded-md" />
          </PaginationItem>
          <PaginationItem>
            <Skeleton className="h-9 w-9 rounded-md" />
          </PaginationItem>

          <PaginationItem>
            <Skeleton className="h-9 w-9 rounded-md" />
          </PaginationItem>

          <PaginationItem>
            <Skeleton className="h-9 w-9 rounded-md" />
          </PaginationItem>

          <PaginationItem>
            <Skeleton className="h-9 w-16 rounded-md" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
