import { FC } from "react";
import s from "./Button.module.scss";
import { ElementType } from "react";

interface IButton {
    text: string;
    Icon?: ElementType;
    color: string;
    bgColor: string;
    handleClick?(): void;
    className?: string;
}

const Button: FC<IButton> = ({
    text,
    Icon,
    color,
    bgColor,
    handleClick,
    className = "",
}) => {
    return (
        <button
            onClick={handleClick ? handleClick : undefined}
            className={`${s.btn} ${className}`}
            style={{ color: color, backgroundColor: bgColor }}
        >
            {text}
            {Icon && <Icon />}
        </button>
    );
};

export default Button;
