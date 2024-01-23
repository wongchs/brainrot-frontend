import { useState } from "react";
import {
  CommentInterface,
  LikePostFormValue,
  PostFormValue,
  PostInterface,
  UserInterface,
} from "../../types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Props {
  post:
    | {
        content: string;
        user: UserInterface;
        id: string;
        likes?: number;
        comments?: CommentInterface[];
      }
    | null
    | undefined;
  updatePost: (
    id: PostInterface["id"],
    newObject: PostFormValue
  ) => Promise<void>;
  deletePost: (id: PostInterface["id"]) => Promise<void>;
  likePost: (
    id: PostInterface["id"],
    newObject: LikePostFormValue
  ) => Promise<void>;
  commentPost: (
    id: PostInterface["id"],
    newObject: CommentInterface
  ) => Promise<void>;
  user: UserInterface;
}

const Post = ({
  post,
  updatePost,
  deletePost,
  likePost,
  commentPost,
  user,
}: Props) => {
  const [newContent, setNewContent] = useState("");
  const [newComment, setNewComment] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);

  if (!post) {
    return <div>loading</div>;
  }

  const handleUpdate = async () => {
    const updatedPost = {
      content: newContent,
      user: post.user,
    };
    await updatePost(post.id, updatedPost);
    setIsUpdateDialogOpen(true);
  };

  const handleDelete = async () => {
    await deletePost(post.id);
  };

  const handleLike = async () => {
    const likedPost = {
      id: post.id,
      user: post.user,
    };
    await likePost(post.id, likedPost);
  };

  const handleComment = async () => {
    const commentObject = {
      comment: newComment,
      user: user,
    };
    console.log(commentObject);
    await commentPost(post.id, commentObject);
    setNewComment("");
  };

  return (
    <div>
      <h2>{post.content}</h2>
      <p>{post.user.name}</p>
      <p>by {post.user.username}</p>
      <p>likes: {post.likes}</p>
      <input
        type="text"
        value={newContent}
        onChange={(e) => setNewContent(e.target.value)}
      />
      <button onClick={handleUpdate}>Update Post</button>
      <button onClick={() => setIsDeleteDialogOpen(true)}>Delete Post</button>
      <button onClick={handleLike}>Like Post</button>
      <input
        type="text"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <button onClick={handleComment}>Comment</button>
      {isDeleteDialogOpen && (
        <AlertDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Post</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogDescription>
              Are you sure you want to delete this post?
            </AlertDialogDescription>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setIsDeleteDialogOpen(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {isUpdateDialogOpen && (
        <AlertDialog
          open={isUpdateDialogOpen}
          onOpenChange={setIsUpdateDialogOpen}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Update Post</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogDescription>
              Post successfully updated.
            </AlertDialogDescription>
            <AlertDialogFooter>
              <AlertDialogAction onClick={() => setIsUpdateDialogOpen(false)}>
                OK
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
};

export default Post;
