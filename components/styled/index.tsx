import classnames from "classnames";
import { DetailedHTMLProps, FC, HTMLAttributes } from "react";

type DivProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

type HeadLineProps = {
  level: 3 | 5;
} & DivProps;

export const HeadLine: FC<HeadLineProps> = ({
  level,
  className = "",
  ...rest
}) => {
  const level3 = level === 3;
  const level5 = level === 5;
  return (
    <div
      className={classnames(
        {
          "text-2xl": level5,
          "leading-9": level5,
          "text-[48px]": level3,
          "leading-[50px]": level3,
          bold: level3,
        },
        className
      )}
      {...rest}
    />
  );
};

export const Subtitle: FC<DivProps> = ({ className = "", ...rest }) => {
  return (
    <div
      className={classnames(
        "text-[16px] leading-[24px] tracking-[0.15px]",
        className
      )}
      {...rest}
    />
  );
};

export const HeadLine5: FC<DivProps> = (props) => (
  <HeadLine {...props} level={5} />
);

export const HeadLine3: FC<DivProps> = (props) => (
  <HeadLine {...props} level={3} />
);
