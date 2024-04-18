import { IFab } from './model/types/fab';
import cls from './Fab.module.scss';

export const Fab = ({
    children,
    isActive,
    onClick,
    fieldType,
    ...otherProps
}: IFab) => {

    const onChangeHandler = () => {
        onClick?.(fieldType, children);
    };

    return (
        <button
            className={`${cls.button} ${isActive && cls.active}`}
            type="button"
            onClick={onChangeHandler}
            {...otherProps}
        >
            <span>
                { children }
            </span>
        </button>
    )
};