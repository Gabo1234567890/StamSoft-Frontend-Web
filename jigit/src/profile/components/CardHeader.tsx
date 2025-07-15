const CardHeader = ({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) => (
  <div className="flex justify-between">
    <p className="font-primary text-heading2 text-secondary2">{title}</p>
    <div className="flex gap-8">{children}</div>
  </div>
);

export default CardHeader;
