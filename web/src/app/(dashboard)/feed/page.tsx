import Link from "next/link";

import { FeedCard } from "@/components/feed-card";
import { FilterSearch } from "@/components/filter-search";

export default function Feed() {
  return (
    <div className="h-dvh lg:overflow-y-auto p-5">
      <h1 className="text-xl font-bold">Feed</h1>
      <div className="my-5">
        <FilterSearch />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {Array(10)
          .fill("")
          .map((_, idx) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <Link key={idx} href={"/feed/:id"}>
              <FeedCard />
            </Link>
          ))}
      </div>
    </div>
  );
}
