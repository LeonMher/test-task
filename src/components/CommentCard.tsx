// CommentCard.tsx
import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { TComment } from "../types";

type CommentCardProps = {
  comment: TComment;
  user: { name: string; avatar: string };
  replies: TComment[];
};

const CommentCard: React.FC<CommentCardProps> = ({
  comment,
  user,
  replies,
}) => {
  const { text, likes } = comment;

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
            <FavoriteIcon sx={{ color: "red" }} />
            <div className="ml-1">{likes}</div>
          </div>
        </div>
        <div className="mt-2">{text}</div>
        {replies.length > 0 && (
          <div className="ml-4 mt-2">
            {replies.map((reply) => (
              <CommentCard
                key={reply.id}
                comment={reply}
                user={user} // Use the appropriate user for the reply if different
                replies={reply.replies || []} // Pass replies recursively
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentCard;

// {replies.length > 0 &&
//   replies?.map(
//     (reply: any) => (
//       console.log(reply, "reply"),
//       (
//         <CommentCard
//           comment={reply}
//           key={reply.id}
//           replies={[]}
//           user={user}
//         />
//       )
//     )
//   )}
