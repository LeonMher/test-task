import React, { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { TComment } from "../types";

type CommentCardProps = {
  comment: TComment;
  user: { name: string; avatar: string };
  replies: TComment[];
  usersMap: Record<number, { name: string; avatar: string }>; // Added usersMap prop
  onLike?: () => void; // Make onLike optional
};

const CommentCard: React.FC<CommentCardProps> = ({
  comment,
  user,
  replies,
  usersMap,
  onLike,
}) => {
  const { text, likes, likedByUser } = comment;
  const [likesState, setLikesState] = useState(likes);
  const [likedByUserState, setLikedByUserState] = useState(likedByUser);

  const handleLike = () => {
    setLikedByUserState((prev) => !prev);
    setLikesState((prev) => (likedByUserState ? prev - 1 : prev + 1));
    if (onLike) onLike(); // Ensure onLike is called only if it exists
  };

  return (
    <div className="w-[600px] p-3 bg-inherit flex flex-col border-l-2 border-gray-300">
      <div className="flex items-start gap-4">
        <img
          className="rounded-full w-[60px] h-[60px]"
          src={user?.avatar}
          alt={user?.name}
        />
        <div className="flex flex-col flex-1">
          <div className="flex justify-between items-start">
            <div className="activity">
              <div className="font-bold">{user?.name}</div>
              <div className="text-gray-600">Just now</div>
            </div>
            <div className="flex items-center">
              {likedByUserState ? (
                <FavoriteIcon sx={{ color: "red" }} onClick={handleLike} />
              ) : (
                <FavoriteBorderIcon
                  sx={{ color: "gray" }}
                  onClick={handleLike}
                />
              )}
              <div className="ml-1">{likesState}</div>
            </div>
          </div>
          <div className="mt-2">{text}</div>
        </div>
      </div>
      {replies.length > 0 && (
        <div className="flex flex-col mt-4 pl-4">
          {" "}
          {/* Adjust padding-left here */}
          {replies.map((reply) => (
            <CommentCard
              key={reply.id}
              comment={reply}
              replies={reply.replies || []}
              user={usersMap[reply.author]} // Use the correct user for replies
              usersMap={usersMap} // Pass usersMap to nested replies
              onLike={() => onLike && onLike()} // Ensure onLike is called only if it exists
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentCard;
