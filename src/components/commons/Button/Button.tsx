import React, { ReactNode, MouseEventHandler } from "react";

type ButtonProps = {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  className?: string;
};

function Button({
  children,
  onClick,
  disabled = false,
  className = "",
}: ButtonProps) {
  return (
    <button className={` ${className}`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;
