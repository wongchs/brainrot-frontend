export interface UserInterface {
  username: string;
  name: string;
  passwordHash: string;
  posts?: PostInterface[];
  id: string;
  token?: string;
}

export interface PostInterface {
  id: string;
  content: string;
  user: UserInterface;
  likes?: number;
  comments?: CommentInterface[];
}

export interface CommentInterface {
  comment: string;
  user: UserInterface;
}

export type PostFormValue = Omit<PostInterface, "id">;

export type UserFormValue = Omit<UserInterface, "id" | "passwordHash"> & {
  password: string;
};

export type LikePostFormValue = Omit<PostInterface, "content" | "likes"> & {
  user: UserInterface;
};
