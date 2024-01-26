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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Heart, MoreHorizontal } from "lucide-react";

interface Props {
  post:
    | {
        content: string;
        user: UserInterface;
        id: string;
        likes?: number;
        comments?: CommentInterface[];
        likedBy?: UserInterface[];
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
    if (
      post.likedBy?.some((userId) => userId.toString() === user.id.toString())
    ) {
      post.likedBy = post.likedBy.filter(
        (userId) => userId.toString() !== user.id.toString()
      );
    } else {
      post.likedBy = [...(post.likedBy || []), user];
    }
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
        <div className="block p-4 shadow rounded-lg space-y-4 bg-slate-50 dark:bg-gray-800">
          <div className="flex justify-between">
            <Link to={`/profile/${post.user.id}/${post.user.username}`}>
              <p>{post.user.name}</p>
              <p>@{post.user.username}</p>
            </Link>
            {post.user.id === user.id && (
              <Dialog>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <MoreHorizontal />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DialogTrigger asChild>
                      <DropdownMenuItem>
                        <span>Update Post</span>
                      </DropdownMenuItem>
                    </DialogTrigger>
                    <DropdownMenuItem
                      onSelect={() => setIsDeleteDialogOpen(true)}
                    >
                      Delete Post
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DialogContent className="bg-slate-50 dark:bg-gray-800">
                  <DialogHeader>
                    <DialogTitle>Edit Poast</DialogTitle>
                  </DialogHeader>
                  <DialogDescription>
                    <Input
                      type="text"
                      value={newContent}
                      onChange={(e) => setNewContent(e.target.value)}
                    />
                  </DialogDescription>
                  <DialogFooter>
                    <Button onClick={handleUpdate}>Update</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
          <h2>{post.content}</h2>
          <div>
            <p>likes: {post.likes}</p>
            <button
              onClick={handleLike}
              style={{
                color: post.likedBy?.some(
                  (userId) => userId.toString() === user.id.toString()
                )
                  ? "red"
                  : "black",
              }}
            >
              <Heart />
            </button>
          </div>
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
              <AlertDialogTitle>Edit Post</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogDescription>
              Post edited successfully.
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
