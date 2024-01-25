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
import { Link } from "react-router-dom";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

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
      user: user,
    };
    await likePost(post.id, likedPost);
  };

  const handleComment = async () => {
    const commentObject = {
      text: newComment,
      username: user.username,
      name: user.name,
      id: user.id,
    };
    console.log(commentObject);
    await commentPost(post.id, commentObject);
    setNewComment("");
  };

  console.log(post.comments);

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="block p-4 shadow rounded-lg bg-slate-50 dark:bg-gray-800">
          <div className="flex justify-between">
            <Link to={`/profile/${post.user.id}/${post.user.username}`}>
              <p>{post.user.name}</p>
              <p>@{post.user.username}</p>
            </Link>
          {post.user.id === user.id && (
            <>
              <input
                type="text"
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
              />
              <DropdownMenu>
                <DropdownMenuTrigger>Options</DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onSelect={handleUpdate}>
                    Update Post
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={() => setIsDeleteDialogOpen(true)}
                  >
                    Delete Post
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
          </div>
          <h2>{post.content}</h2>
          <p>likes: {post.likes}</p>
          <button onClick={handleLike}>Like Post</button>
        </div>
        <div className="flex flex-row gap-4">
          <Input
            className="bg-slate-50 dark:bg-gray-800"
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Leave a comment"
          />
          <Button
            variant="outline"
            className="rounded-lg bg-slate-50 dark:bg-gray-800"
            onClick={handleComment}
          >
            Comment
          </Button>
        </div>
        {post.comments &&
          post.comments.map((comment) => (
            <div
              className="bg-slate-50 dark:bg-gray-800 p-4 rounded-lg"
              key={comment.id}
            >
              <p>
                {comment.name}: {comment.text}
              </p>
            </div>
          ))}
      </div>
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
    </>
  );
};

export default Post;
