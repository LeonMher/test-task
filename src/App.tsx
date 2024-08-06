import { useQuery } from "@tanstack/react-query";
import { getAuthorsRequest } from "./api/authors/getAuthorsRequest";
import { getCommentsRequest } from "./api/comments/getCommentsRequest";
import CommentCard from "./components/CommentCard";
import { TComment } from "./types";
import "./index.css";

function App() {
  const { data: authors } = useQuery({
    queryKey: ["authors"],
    queryFn: getAuthorsRequest,
  });

  const { data: comments } = useQuery({
    queryKey: ["comments"],
    queryFn: getCommentsRequest,
  });

  const usersMap = authors?.users?.reduce((map, user) => {
    map[user.id] = user;
    return map;
  }, {} as Record<number, { name: string; avatar: string }>);

  const buildCommentTree = (
    comments: TComment[],
    parentId: number | null
  ): TComment[] => {
    return comments
      .filter((comment) => comment.parent === parentId)
      .map((comment) => ({
        ...comment,
        replies: buildCommentTree(comments, comment.id),
      }))
      .sort(
        (a, b) => new Date(a.created).getTime() - new Date(b.created).getTime()
      );
  };

  const rootComments = comments?.users?.data
    ? buildCommentTree(comments.users.data, null)
    : [];

  return (
    <div className="flex items-center flex-col gap-1 app">
      {rootComments.map((comment: TComment) => (
        <CommentCard
          key={comment.id}
          comment={comment}
          replies={comment.replies || []}
          user={usersMap[comment.author]}
          usersMap={usersMap} // Pass the usersMap to replies
        />
      ))}
    </div>
  );
}

export default App;
