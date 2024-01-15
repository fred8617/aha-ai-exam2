import { DOMAttributes, FC, PropsWithChildren } from "react";
import { HeadLine5 } from "./styled";
import Left from "./icons/Left";
export type NavBackProps = {
  onBackIconClick: DOMAttributes<HTMLDivElement>["onClick"];
};
const NavBack: FC<PropsWithChildren<NavBackProps>> = ({
  onBackIconClick,
  children,
}) => {
  return (
    <HeadLine5 className="xs:flex items-center hidden relative my-[17px]">
      <div className="pr-[13px]" onClick={onBackIconClick}>
        <Left />
      </div>
      {children}
    </HeadLine5>
  );
};
export default NavBack;
