import Image from "next/image";
import { FC } from "react";
import Skeleton from "@mui/material/Skeleton";
import classnames from "classnames";

type PostProps = { width?: number; height?: number };
export type CardProps = {
  /**
   * @string
   * The url of the post
   * @ReactNode
   * Custom render
   */
  post: string | React.ReactNode;
  postProps?: PostProps;
  title: string;
  titleClassName?: string;
  description: string;
};

const Card: FC<CardProps> & { LoadingCard: typeof LoadingCard } = ({
  post,
  postProps,
  title,
  titleClassName,
  description,
}) => {
  return (
    <div>
      {typeof post === "string" ? (
        <Image
          src={post}
          width={postProps?.width ?? 219}
          height={postProps?.height ?? 146}
          alt={title}
        />
      ) : (
        post
      )}
      <div
        className={classnames(
          "xs:mt-[20px] truncate max-w-full text-[var(--Greyscale-white)] text-[14.9px] leading-[22.35px] tracking-[0.14px] mt-[12px]",
          titleClassName
        )}
      >
        {title}
      </div>
      <div className="text-[var(--Greyscale-400)] text-[11.175px] leading-[16.762px] tracking-[0.373px]">
        {description}
      </div>
    </div>
  );
};

type LoadingCardProps = {
  // Skeleton width and height of the post position
  post?: PostProps;
};

const LoadingCard: FC<LoadingCardProps> = ({ post }) => {
  return (
    <div>
      <Skeleton variant="rectangular" width={219} height={146} {...post} />
      <Skeleton
        variant="text"
        className="text-[var(--Greyscale-white)] text-[14.9px] leading-[22.35px] tracking-[0.14px] mt-[12px]"
      />
      <Skeleton className="text-[var(--Greyscale-400)] text-[11.175px] leading-[16.762px] tracking-[0.373px]" />
    </div>
  );
};

Card.LoadingCard = LoadingCard;
export default Card;
