export interface UserInterface {
  username: string;
  name: string;
  passwordHash: string;
  posts?: PostInterface[];
  id: string;
  token?: string;
  following: string[];
  followers: string[];
}

export interface PostInterface {
  id: string;
  content: string;
  user: UserInterface;
  likes?: number;
  comments?: CommentInterface[];
}

export interface CommentInterface {
  text: string;
  username: string;
  name: string;
  id: string;
}

export type PostFormValue = Omit<PostInterface, "id">;

export type UserFormValue = Omit<
  UserInterface,
  "id" | "passwordHash" | "following" | "followers"
> & {
  password: string;
};

export type LikePostFormValue = Omit<PostInterface, "content" | "likes"> & {
  user: UserInterface;
};
