import React, { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { TComment } from "../App";

type CommentCardProps = {
  comment: TComment;
  user: { name: string; avatar: string };
  replies: TComment[];
  usersMap: Record<number, { name: string; avatar: string }>; // Added usersMap prop
};

const CommentCard: React.FC<CommentCardProps> = ({
  comment,
  user,
  replies,
  usersMap,
}) => {
  const { text, likes, likedByUser } = comment;
  const [likesState, setLikesState] = useState(likes);
  const [likedByUserState, setLikedByUserState] = useState(likedByUser);

  const handleLike = () => {
    setLikedByUserState((prev) => !prev);
    setLikesState((prev) => (likedByUserState ? prev - 1 : prev + 1));
  };

  return (
    <div className="w-full max-w-[600px] p-3 bg-inherit flex flex-col border-l-2 border-gray-300 mx-auto">
      <div className="flex flex-col sm:flex-row items-start gap-4">
        <img
          className="rounded-full w-16 h-16 sm:w-24 sm:h-24"
          src={user?.avatar}
          alt={user?.name}
        />
        <div className="flex flex-col flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start">
            <div className="activity">
              <div className="font-bold text-white">{user?.name}</div>
              <div className="text-gray-400 text-sm">
                {new Date(comment.created).toLocaleString()}
              </div>
            </div>
            <div className="flex items-center mt-2 sm:mt-0">
              {likedByUserState ? (
                <FavoriteIcon sx={{ color: "red" }} onClick={handleLike} />
              ) : (
                <FavoriteBorderIcon
                  sx={{ color: "gray" }}
                  onClick={handleLike}
                />
              )}
              <div className="ml-1 text-sm text-white">{likesState}</div>
            </div>
          </div>
          <div className="mt-2 text-sm text-white">{text}</div>
        </div>
      </div>
      {replies.length > 0 && (
        <div className="flex flex-col mt-4 pl-4">
          {replies.map((reply) => (
            <CommentCard
              key={reply.id}
              comment={reply}
              replies={reply.replies || []}
              user={usersMap[reply.author]}
              usersMap={usersMap}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentCard;
