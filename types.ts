export interface UserInterface {
  username: string;
  name: string;
  passwordHash: string;
  posts: [];
}

export interface PostInterface {
  id: string;
  content: string;
  user: UserInterface;
}
