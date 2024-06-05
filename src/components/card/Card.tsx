// import Image from "next/image";
import Image from "next/image";
import React, { ReactElement, ReactNode } from "react";
import TextCard from "./TextCard";
import StockCard from "./StockCard";

const Card = ({
  img_src,
  title,
  desc,
  buttons,
}: {
  img_src?: string;
  title: string;
  desc?: ReactNode;
  buttons?: ReactElement[];
}) => {
  return (
    <div className="flex flex-col justify-between border-primary-100 border-2">
      <div>
        {img_src && (
          <div>
            <Image
              width={0}
              height={0}
              src={img_src}
              alt=""
              sizes="100vw"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        )}

        <div className="p-3">
          <h4>{title}</h4>
          {desc && desc}
        </div>
      </div>

      {buttons && <div className="m-3">{buttons.map((btn) => btn)}</div>}
    </div>
  );
};
Card.Stock = StockCard;
Card.Text = TextCard;

export default Card;
