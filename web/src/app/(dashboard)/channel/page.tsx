import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PenBox } from "lucide-react";

import { EditChannelForm } from "@/components/edit-channel-form";
import { UserImageNameCard } from "@/components/user-image-name-card";
import { FeedCard } from "@/components/feed-card";
import { getUserProfile } from "@/actions/user";
import type { IUser } from "@/types";

export default async function ChannelProfile() {
  const userProfile = (await getUserProfile()) as IUser;

  return (
    <div className="mt-16 lg:mt-0 p-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Your channel</h1>

        <Dialog>
          <DialogTrigger className="">
            <PenBox />
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit your channel details</DialogTitle>
            </DialogHeader>
            <div>
              <EditChannelForm />
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="my-5">
        <UserImageNameCard user={userProfile} />
        {/* 
          User Channel Description
        <p className="my-2">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. In, rem?
          Dolore neque saepe quod magnam dignissimos voluptate impedit, mollitia
          doloremque!
        </p> */}
      </div>

      <div className="w-full my-5">
        <Tabs defaultValue="public" className="w-full">
          <TabsList className="w-full lg:max-w-md">
            <TabsTrigger value="public" className="w-full">
              Public
            </TabsTrigger>
            <TabsTrigger value="private" className="w-full">
              Private
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="public"
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 w-full"
          >
            {userProfile.videos.filter((v) => v.visibility !== "PRIVATE")
              .length > 0 ? (
              userProfile.videos
                .filter((v) => v.visibility !== "PRIVATE")
                .map((item) => (
                  <FeedCard key={item.id} type="profile" videoDetails={item} />
                ))
            ) : (
              <h1>No public videos</h1>
            )}
          </TabsContent>
          <TabsContent
            value="private"
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 w-full"
          >
            {userProfile.videos.filter((v) => v.visibility === "PRIVATE")
              .length > 0 ? (
              userProfile.videos
                .filter((v) => v.visibility === "PRIVATE")
                .map((item) => (
                  <FeedCard type="private" key={item.id} videoDetails={item} />
                ))
            ) : (
              <h1>No private videos</h1>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
