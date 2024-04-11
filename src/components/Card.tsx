import Image from "next/image";
import React, { ReactElement } from "react";

const Card = ({
  img_src,
  title,
  desc,
  buttons,
}: {
  img_src: string;
  title: string;
  desc: string;
  buttons: ReactElement[];
}) => {
  return (
    <div className="flex flex-col justify-between border-primary-100 border-2 ">
      <div>
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

        <div className="mt-3 ml-3">
          <h4>{title}</h4>
          <p>{desc}</p>
        </div>
      </div>

      <div className="m-3">{buttons.map((btn) => btn)}</div>
    </div>
  );
};

export default Card;
