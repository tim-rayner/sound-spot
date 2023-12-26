import type mongoose from "mongoose";

export type Discussion = {
  _id: string;
  itemId: new mongoose.Types.ObjectId();
  owner: string;
  createdAt: string;
  comments?: string[];
};

//TODO: add comments using Comment type
export type Comment = {
  _id: string;
  discussionId: string;
  owner: string;
  createdAt: string;
  comment: string;
  isReply: boolean;
};

export type iDiscussion = {
  _id: string;
  itemId: string;
  owner: string;
  ownerId: string;
  createdAt: string;
  comments?: string[];
  ownerName?: string;
  ownerImage?: string;
};
}