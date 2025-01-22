import Image from "next/image";

export function UserImageNameCard() {
  return (
    <div className="flex items-center gap-2">
      <Image
        src={"/logo.svg"}
        alt="user name profile"
        width={500}
        height={500}
        quality={100}
        className="rounded-full border object-cover w-10 h-10"
      />

      <h1>User Channel Name</h1>
    </div>
  );
}
