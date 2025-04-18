export interface IUser {
  id: string;
  image: string;
  name: string;
  email: string;
  provider: "GOOGLE" | "GITHUB";
  createdAt: Date;
  updatedAt: Date;
  videos: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    description: string;
    mediaUrl: string | null;
    status: "UPLOADING" | "PROCESSING" | "PUBLISHED";
    visibility: "PUBLIC" | "PRIVATE";
    publisherId: string;
  }[];
}

export interface IVideo {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  description: string;
  mediaUrl: string | null;
  status: "UPLOADING" | "PROCESSING" | "PUBLISHED";
  visibility: "PUBLIC" | "PRIVATE";
  publisherId: string;
}
