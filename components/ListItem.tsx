import Image from "next/image";
import { FC } from "react";
import Skeleton from "@mui/material/Skeleton";

export type ListItemProps = {
  // The url of the avatar
  avatar: string;
  title: string;
  description: string;
  // Custom action of list item
  action?: React.ReactNode;
};
const ListItem: FC<ListItemProps> & {
  LoadingListItem: typeof LoadingListItem;
} = ({ avatar, title, description, action }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        <Image
          className="w-[40px] h-[40px] border bordor-[#F8F8F8] rounded-[5px]"
          src={avatar}
          width={40}
          height={40}
          alt={title}
        />
        <div className="ml-[15px]">
          <div className="text-[var(--White)] text-[16px] leading-[24px] tracking-[0.15px]">
            {title}
          </div>
          <div className="text-[var(--White)] text-[14px] leading-[21px] tracking-[0.25px] opacity-50">
            {description}
          </div>
        </div>
      </div>
      {action}
    </div>
  );
};

const LoadingListItem: FC = () => {
  return (
    <div>
      <div className="flex  items-center">
        <Skeleton variant="rectangular" width={40} height={40} />
        <div className="flex-auto ml-[16px]">
          <Skeleton variant="text" height={24} />
          <Skeleton variant="text" height={21} />
        </div>
      </div>
    </div>
  );
};

ListItem.LoadingListItem = LoadingListItem;
export default ListItem;
