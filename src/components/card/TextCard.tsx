import React from "react";

type TProps = {
  label?: React.ReactNode;
  content?: React.ReactNode;
  children?: React.ReactNode;
};
const TextCard = (props: TProps) => {
  const { children, label, content } = props;
  return (
    <div className="flex justify-between items-center">
      {label && <span className="text-gray-500">{label}</span>}
      {content && <h5>{content}</h5>}
      {children}
    </div>
  );
};

export default TextCard;
