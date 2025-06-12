import Image from "next/image";

import type { IUser } from "@/types";

export function UserImageNameCard({ user }: { user: IUser }) {
  return (
    <div className="flex items-center gap-2">
      <Image
        src={user.image}
        alt={`${user.name} profile`}
        width={500}
        height={500}
        quality={100}
        className="rounded-full border object-cover w-10 h-10"
      />

      <h1>{user.name}</h1>
    </div>
  );
}
