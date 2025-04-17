"use client";

import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { Send } from "lucide-react";

import { UserImageNameCard } from "./user-image-name-card";

export function CommentSection() {
  return (
    <div className="space-y-5">
      <div className="my-5 flex items-center gap-2">
        <Input placeholder="add your comment" />
        <Button>
          <Send />
        </Button>
      </div>
      <div className="xl:h-[84dvh] xl:overflow-y-auto my-5">
        <div className="grid grid-cols-1 gap-5">
          {Array(20)
            .fill("")
            .map((_, idx) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              <div key={idx} className="shadow p-5 rounded-md w-full space-y-2">
                <UserImageNameCard />
                <p>
                  Comment user written: Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Sapiente, delectus! Lorem ipsum dolor sit
                  amet consectetur adipisicing elit. Deleniti voluptatibus
                  pariatur soluta praesentium consectetur, ipsum laudantium
                  molestiae eligendi porro aspernatur et quibusdam, quam nisi
                  autem mollitia maxime vel, dicta nulla debitis voluptas?
                  Corporis animi modi qui quae reprehenderit asperiores
                  perferendis optio dicta ipsa, molestias consectetur iste cum
                  quisquam porro quasi!
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
