"use client";

import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonTable = ({ count }: { count: number }) => {
  return (
    <div className="w-full border rounded-lg overflow-hidden">
      <div className="animate-pulse">
        {[...Array(count)].map((_, index) => (
          <Skeleton
            key={index}
            className="h-10 bg-gray-200 border-b last:border-b-0"
          />
        ))}
      </div>
    </div>
  );
};
