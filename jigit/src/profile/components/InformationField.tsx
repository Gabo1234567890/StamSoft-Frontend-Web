import type { ReactNode } from "react";

const InformationField = ({
  title,
  value,
  type,
}: {
  title: string;
  value: string;
  type: string;
}) => {
  return (
    <div className="flex flex-col gap-3 font-secondary text-body2">
      <p className="text-base-40">{title}</p>
      <input className="text-secondary2" value={value} type={type} readOnly />
    </div>
  );
};

export default InformationField;
