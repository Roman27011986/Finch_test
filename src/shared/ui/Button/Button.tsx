import { IButton } from './model/types/button';

import cls from './Button.module.scss';

export const Button = ({ children, ...otherProps }: IButton) => {

    return (
        <button
            className={cls.button}
            type="button"
            {...otherProps}
        >
            { children }
        </button>
    )
};