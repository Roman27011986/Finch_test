import { ButtonHTMLAttributes, ReactNode } from "react";

export interface IIconButton extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
}