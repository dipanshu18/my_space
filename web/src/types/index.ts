export interface IUser {
  id: string;
  image: string;
  name: string;
  email: string;
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
  publisher: IUser;
  comment: IComment[];
  _count: {
    likes: number;
    dislikes: number;
  };
}

export interface IComment {
  id: string;
  text: string;
  videoId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  user: IUser;
}
