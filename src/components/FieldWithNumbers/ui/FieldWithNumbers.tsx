import { useMemo } from 'react';
import { generateArrayByNumber } from '../../../shared/helpers/generateArrayByNumber';
import { Fab } from '../../../shared/ui/Fab/Fab';
import { IFieldWithNumbers } from '../model/types/fieldWithNumbers';

import cls from './FieldWithNumbers.module.scss';

export const FieldWithNumbers = ({
    length,
    activeValues,
    onHandleAddValue,
    fieldType,
    mustByActive
}: IFieldWithNumbers) => {
    
    const numbersArray = useMemo(() => {
        return generateArrayByNumber(length);
    }, [length]);

    return (
        <>
            <div className={cls.field__header}>
                <p className={cls.field__text}>Поле 1</p>
                {/* Безусловно, все что ниже можно сделать более деликатно, например вынисти в компонент */}
                {/* проверка нужна для правильного склонения "4 числа, 1 число, 5 чисел" */}
                {activeValues.length !== mustByActive &&
                    <span>Отметьте {mustByActive - activeValues.length}
                        {' '}чис{
                            mustByActive - activeValues.length === 1
                                ? 'ло' :
                                activeValues.length < 4 ?
                                    'ел'
                                    : 'ла'
                        }
                    </span>
                }
            </div>

            <div className={cls.field__body}>
                {numbersArray.map((value) => (
                    <Fab
                        key={value}
                        fieldType={fieldType}
                        isActive={activeValues.includes(value)}
                        onClick={onHandleAddValue}
                    >
                        {value}
                    </Fab>
                ))}
            </div>
        </>
        
    )
}