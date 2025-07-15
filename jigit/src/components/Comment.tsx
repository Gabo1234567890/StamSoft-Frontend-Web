interface CommentProps {
  user: User;
  date: string;
  time: string;
  content: string;
}

const Comment = ({ user, date, time, content }: CommentProps) => {
  return (
    <div className="flex w-full gap-4">
      <div className="pb-3">
        <div className="flex items-center justify-center aspect-square bg-base-30 rounded-sm p-1">
          <p className="font-secondary text-paragraph-medium1 text-secondary2">
            {user.email.slice(0, 2).toUpperCase()}
          </p>
        </div>
      </div>
      <div className="items-start justify-between flex flex-col gap-3">
        <div className="flex gap-2">
          <p className="text-paragraph-regular2 font-secondary text-primary1">
            {date}
          </p>
          <p className="text-paragraph-regular2 font-secondary text-secondary2">
            {time}
          </p>
        </div>
        <p className="text-paragraph-regular2 font-secondary">{content}</p>
      </div>
    </div>
  );
};

export default Comment;
