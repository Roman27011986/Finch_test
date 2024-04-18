import { ButtonHTMLAttributes } from "react";

type HTMLButtonProps = Omit<
ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'
>

export interface IFab extends HTMLButtonProps {
    children: number;
    isActive?: boolean;
    fieldType: string;
    onClick?: (fieldType: string, value: number) => void;
}