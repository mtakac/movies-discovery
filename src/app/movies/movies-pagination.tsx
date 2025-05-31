"use client";

import { useSearchParams } from "next/navigation";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { PaginationType } from "@/types";

export default function MoviesPagination({ pagination }: { pagination: PaginationType }) {
  // Cap total_pages at 500 due to API limitation
  const total_pages = Math.min(pagination.total_pages, 500);
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  // Function to create URL with current filters and new page
  const createPageUrl = (pageNum: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNum.toString());
    return `/?${params.toString()}`;
  };

  const getVisiblePages = () => {
    const maxVisible = 5;
    let start = Math.max(1, page - Math.floor(maxVisible / 2));
    let end = Math.min(total_pages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const visiblePages = getVisiblePages();
  const showEllipsis = visiblePages[visiblePages.length - 1] < total_pages - 1;
  const showLastPage = !visiblePages.includes(total_pages) && total_pages > 1;

  return (
    <div className="flex justify-center items-center">
      <Pagination>
        <PaginationContent>
          {page > 1 && (
            <PaginationItem>
              <PaginationPrevious href={createPageUrl(page - 1)}>Previous</PaginationPrevious>
            </PaginationItem>
          )}

          {visiblePages.map((pageNum) => (
            <PaginationItem key={pageNum}>
              <PaginationLink isActive={pageNum === page} href={createPageUrl(pageNum)}>
                {pageNum}
              </PaginationLink>
            </PaginationItem>
          ))}

          {showEllipsis && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {showLastPage && (
            <PaginationItem>
              <PaginationLink href={createPageUrl(total_pages)}>{total_pages}</PaginationLink>
            </PaginationItem>
          )}

          {page < total_pages && (
            <PaginationItem>
              <PaginationNext href={createPageUrl(page + 1)}>Next</PaginationNext>
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
}
