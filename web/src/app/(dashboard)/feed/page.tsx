// import Link from "next/link";

// import { FeedCard } from "@/components/feed-card";
import { FilterSearch } from "@/components/filter-search";
// import { cn } from "@/lib/utils";

export default function Feed() {
  return (
    <div className="h-dvh lg:overflow-y-auto p-5 mt-16 lg:mt-0">
      <h1 className="text-xl font-bold">Feed</h1>
      <div className="my-5">
        <FilterSearch />
      </div>

      {/* <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {Array(10)
          .fill("")
          .map((_, idx) => (
            <Link
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              key={idx}
              href={"/feed/:id"}
              className={cn(idx + 1 === 10 && "mb-20 lg:mb-0")}
            >
              <FeedCard type="public" />
            </Link>
          ))}
      </div> */}
      <h1>No public videos</h1>
    </div>
  );
}
