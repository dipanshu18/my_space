import Image from "next/image";

export function FeedCard() {
  return (
    <div className="border rounded-md">
      <Image
        src={"/header.svg"}
        alt="Video title thumbnail"
        width={1080}
        height={1920}
        quality={100}
        className="aspect-video object-cover"
      />
      <div className="p-5">
        <h1 className="text-xl font-bold">Video Title</h1>
      </div>
    </div>
  );
}
