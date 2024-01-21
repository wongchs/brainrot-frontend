export interface UserInterface {
  username: string;
  name: string;
  passwordHash: string;
  posts: PostInterface[];
  id: string;
  token: string;
}

export interface PostInterface {
  id: string;
  content: string;
  user: UserInterface;
}

export type PostFormValue = Omit<PostInterface, "id">;
