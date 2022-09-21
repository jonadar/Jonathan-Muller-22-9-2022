import { FC, ReactNode } from "react";

import "./Card.scss";

type Props = {
    children?: ReactNode | undefined,
    className?: string,
    onClick?: (value: any) => void
}

export const Card: FC<Props> = ({ children, className, onClick = (() => { }) }) => {
    return (
        <div className={`card-container ${className}`} onClick={onClick}>
            {children}
        </div>
    );
};