import Link from "next/link";

import { getAllVideos } from "@/actions/video";
import { FeedCard } from "@/components/feed-card";
import { FilterSearch } from "@/components/filter-search";
import { cn } from "@/lib/utils";
import { IVideo } from "@/types";

export default async function Feed() {
  const videos = (await getAllVideos()) as IVideo[];

  return (
    <div className="h-dvh lg:overflow-y-auto p-5 mt-16 lg:mt-0">
      <h1 className="text-xl font-bold">Feed</h1>
      <div className="my-5">
        <FilterSearch />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {videos && videos.length > 0 ? (
          videos.map((item, idx) => (
            <Link
              key={item.id}
              href={`/feed/${item.id}`}
              className={cn(idx + 1 === 10 && "mb-20 lg:mb-0")}
            >
              <FeedCard type="public" videoDetails={item} />
            </Link>
          ))
        ) : (
          <h1 className="col-span-1 md:col-span-2 xl:col-span-3">
            No public videos
          </h1>
        )}
      </div>
    </div>
  );
}
