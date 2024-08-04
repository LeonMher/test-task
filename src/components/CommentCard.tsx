import React, { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { TComment } from "../types";

type CommentCardProps = {
  comment: TComment;
  user: { name: string; avatar: string };
  replies: TComment[];
  onLike: () => void;
};

const CommentCard: React.FC<CommentCardProps> = ({
  comment,
  user,
  replies,
  onLike,
}) => {
  const { text, likes, likedByUser } = comment;
  const [likesState, setLikesState] = useState(likes);
  const [likedByUserState, setLikedByUserState] = useState(likedByUser);
  const handleLike = () => {
    setLikedByUserState((prev) => !prev);
    setLikesState((prev) => (likedByUserState ? prev - 1 : prev + 1));
    onLike();
  };
  return (
    <div className="w-full p-3 bg-gray-200 flex items-start gap-4 border-l-2 border-gray-300">
      <div>
        <img
          className="rounded-full w-[60px] h-[60px]"
          src={user?.avatar}
          alt={user?.name}
        />
      </div>
      <div className="flex flex-col w-full">
        <div className="flex justify-between">
          <div className="activity">
            <div className="font-bold">{user?.name}</div>
            <div className="text-gray-600">Just now</div>
          </div>
          <div className="flex items-center">
            {likedByUserState ? (
              <FavoriteIcon sx={{ color: "red" }} onClick={handleLike} />
            ) : (
              <FavoriteBorderIcon sx={{ color: "gray" }} onClick={handleLike} />
            )}

            <div className="ml-1">{likesState}</div>
          </div>
        </div>
        <div className="mt-2">{text}</div>
        {replies.length > 0 && (
          <div className="ml-4 mt-2">
            {replies.map((reply) => (
              <CommentCard
                key={reply.id}
                comment={reply}
                user={user}
                replies={reply.replies || []}
                onLike={() => onLike()}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentCard;
