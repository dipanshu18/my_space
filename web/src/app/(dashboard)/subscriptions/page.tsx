import { FeedCard } from "@/components/feed-card";
import Image from "next/image";
import Link from "next/link";

export default function Subscriptions() {
  return (
    <div className="p-5 mt-16 lg:mt-0">
      <h1 className="text-xl font-bold mb-4">Your Subscribed Channels</h1>

      <div className="my-5 flex gap-4 max-w-fit lg:max-w-[70vw] xl:max-w-[80vw] overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
        {Array(20)
          .fill("")
          .map((_, idx) => (
            <Link
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              key={idx}
              href={"/channel/:id"}
            >
              <div className="flex-shrink-0 w-16 flex flex-col items-center">
                <Image
                  src={"/logo.svg"}
                  alt="Channel profile"
                  width={64}
                  height={64}
                  quality={100}
                  className="w-16 h-16 object-cover rounded-full border border-gray-300"
                />
                <span className="text-xs mt-2 text-center truncate w-full">
                  Channel {idx + 1}
                </span>
              </div>
            </Link>
          ))}
      </div>

      <div className="my-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {Array(10)
          .fill("")
          .map((_, idx) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <FeedCard key={idx} type="public" />
          ))}
      </div>
    </div>
  );
}
