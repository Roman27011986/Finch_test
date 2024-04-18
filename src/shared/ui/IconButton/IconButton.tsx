import { IIconButton } from "./model/types/IconButton";

import cls from './IconButton.module.scss'

export const IconButton = ({ children, ...otherProps }: IIconButton) => {

    return (
        <button
            className={cls.iconButton}
            type="button"
            {...otherProps}
        >
            { children }
        </button>
    )
};