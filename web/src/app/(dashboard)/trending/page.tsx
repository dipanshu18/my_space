import Link from "next/link";

import { TrendingCard } from "@/components/trending-card";

export default function Trending() {
  return (
    <div className="h-dvh lg:overflow-y-auto p-5">
      <h1 className="text-xl font-bold mb-5">Trending</h1>

      <div className="grid grid-cols-1 gap-5">
        {Array(10)
          .fill("")
          .map((_, idx) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <Link key={idx} href={"/feed/:id"}>
              <TrendingCard />
            </Link>
          ))}
      </div>
    </div>
  );
}
