import Image from "next/image";
import { UserImageNameCard } from "./user-image-name-card";
import { ThumbsUp } from "lucide-react";

export function TrendingCard() {
  return (
    <div className="border rounded-md flex flex-col md:flex-row">
      <Image
        src={"/header.svg"}
        alt="Video title thumbnail"
        width={1080}
        height={1920}
        quality={100}
        className="h-72 lg:h-96 w-full lg:max-w-2xl object-cover"
      />
      <div className="p-5 space-y-2">
        {/* <UserImageNameCard /> */}
        <h1 className="text-2xl font-bold">Video Title</h1>
        <p>
          Description: Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Quam aspernatur rerum fugit soluta debitis, nemo quo culpa id? Ipsam
          sint nobis repudiandae saepe dignissimos
        </p>

        <p className="flex items-center gap-2">
          No of <ThumbsUp className="inline" />
        </p>
        <p>Created at</p>
      </div>
    </div>
  );
}
