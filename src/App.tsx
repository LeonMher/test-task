// App.tsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getAuthorsRequest } from "./api/authors/getAuthorsRequest";
import { getCommentsRequest } from "./api/comments/getCommentsRequest";
import CommentCard from "./components/CommentCard";
import { TComment } from "./types";

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

  // Helper function to get replies for a given comment
  const buildCommentTree = (
    comments: TComment[],
    parentId: number | null
  ): TComment[] => {
    return comments
      .filter((comment) => comment.parent === parentId)
      .map((comment) => ({
        ...comment,
        replies: buildCommentTree(comments, comment.id), // Recursively build replies
      }))
      .sort(
        (a, b) => new Date(a.created).getTime() - new Date(b.created).getTime()
      );
  };

  const rootComments = comments?.users?.data
    ? buildCommentTree(comments.users.data, null)
    : [];

  return (
    <div className="flex items-center flex-col gap-1">
      {rootComments.map((comment: TComment) => (
        <CommentCard
          key={comment.id}
          comment={comment}
          replies={comment.replies || []}
          user={usersMap[comment.author]}
        />
      ))}
    </div>
  );
}

export default App;
