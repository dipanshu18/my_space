import Link from "next/link";

import { TrendingCard } from "@/components/trending-card";
import { cn } from "@/lib/utils";

export default function Trending() {
  return (
    <div className="h-dvh lg:overflow-y-auto p-5 mt-16 lg:mt-0">
      <h1 className="text-xl font-bold mb-5">Trending</h1>

      <div className="grid grid-cols-1 gap-5">
        {Array(10)
          .fill("")
          .map((_, idx) => (
            <Link
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              key={idx}
              href={"/feed/:id"}
              className={cn(idx + 1 === 10 && "mb-20 lg:mb-0")}
            >
              <TrendingCard />
            </Link>
          ))}
      </div>
    </div>
  );
}
