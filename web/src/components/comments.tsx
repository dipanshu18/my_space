import type { IComment } from "@/types";
import { CommentInput } from "./comment-input";

import { UserImageNameCard } from "./user-image-name-card";

export function CommentSection({
  videoId,
  comments,
}: {
  videoId: string;
  comments: IComment[];
}) {
  return (
    <div className="space-y-5">
      <CommentInput videoId={videoId} />
      <div className="xl:h-[84dvh] xl:overflow-y-auto my-5">
        <div className="grid grid-cols-1 gap-5">
          {comments && comments.length > 0 ? (
            comments.map((item) => (
              <div
                key={item.id}
                className="border shadow-sm p-5 rounded-md w-full space-y-2"
              >
                <UserImageNameCard user={item.user} />
                <p>{item.text}</p>
              </div>
            ))
          ) : (
            <h1>No comments yet</h1>
          )}
        </div>
      </div>
    </div>
  );
}
