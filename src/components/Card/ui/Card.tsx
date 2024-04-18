import { useCallback, useState } from 'react';
import { IconButton } from '../../../shared/ui/IconButton/IconButton';
import { Button } from '../../../shared/ui/Button/Button';
import { FieldWithNumbers } from '../../FieldWithNumbers';
import { ReactComponent as Icon } from '../../../shared/assets/icons/magic-wand.svg'
import {
    IActiveFields,
    FieldsNames,
    FieldsSizes,
    FieldsMatchesSum,
    FieldsActiveSize,
    CardStatuses
} from '../model/types/card';
import { generateRandomActiveFields } from '../../../shared/helpers/generateRandomActiveFields';

import cls from './Card.module.scss';

const initFields = {
    firstField: [],
    secondField: []
}

export const Card = () => {
    const [activeFields, setActiveFields] = useState<IActiveFields>(initFields);

    const [status, setStatus] = useState('');

    const handleAddValue = useCallback((fieldType: string, value: number) => { 
        const field = fieldType as keyof typeof activeFields;
        const currentFieldSize = field === FieldsNames.FIRSTFIELD
            ? FieldsActiveSize.MAX
            : FieldsActiveSize.MIN;

        if (activeFields[field].includes(value)) {
            const filteredFerstField = activeFields[field]
                .filter((addedValue) => addedValue !== value);
            
            setActiveFields({...activeFields, [fieldType]: filteredFerstField});
            return;
        };

        if (activeFields[field].length === currentFieldSize) {
            return;
        };

        setActiveFields((p) => ({...p, [fieldType]: [...activeFields[field], value]}));
    }, [activeFields]);

    const handleGetRandomActiveFields = useCallback(() => {
        const result = generateRandomActiveFields() as IActiveFields;
        setActiveFields({secondField: result.secondField, firstField: result.firstField});
    }, []);

    const handleGetResultFields = useCallback(() => {
        const result = generateRandomActiveFields() as IActiveFields;
        const { firstField, secondField } = activeFields;
        // ищем совпадение во втором поле
        const isMatchesSecondField = result.secondField
            .some((val) => secondField.includes(val));
        // если нет совпадений - проиграли
        if (!isMatchesSecondField) {
            setStatus(CardStatuses.LOSS);
            return;
        };
        // ищем совпадение в первом поле + сортируем по возростанию
        const resultMatchesFirstField = firstField
            .filter((val) => result.firstField.includes(val))
            .sort((a, b) => a - b);
        // если совпадений больше 4 - победа
        if (resultMatchesFirstField.length >= FieldsMatchesSum.L) {
            setStatus(CardStatuses.WIN);
            return;
        };
        // если совпадений 3, смотрим первое число, если оно больше 9 - победа (для этой проверки sort выше)
        if (resultMatchesFirstField.length === FieldsMatchesSum.M && resultMatchesFirstField[0] > 9) {
            setStatus(CardStatuses.WIN);
            return;
        };

        setStatus(CardStatuses.LOSS);
    }, [activeFields]);

    const handleRefresh = () => {
        setActiveFields(initFields);
        setStatus('');
    };

    return (
        <div className={cls.card}>
            {!status &&
                <>
                    <div className={cls.card__header}>
                        <p>Билет 1</p>
                        <IconButton
                            onClick={handleGetRandomActiveFields}
                        >
                            <Icon />
                        </IconButton>
                    </div>

                    <div className={cls.card__body}>
                        <FieldWithNumbers
                            fieldType={FieldsNames.FIRSTFIELD}
                            length={FieldsSizes.L}
                            activeValues={activeFields.firstField}
                            mustByActive={FieldsActiveSize.MAX}
                            onHandleAddValue={handleAddValue}
                        />
                        <FieldWithNumbers
                            fieldType={FieldsNames.SECONDFIELD}
                            length={FieldsSizes.M}
                            activeValues={activeFields.secondField}
                            mustByActive={FieldsActiveSize.MIN}
                            onHandleAddValue={handleAddValue}
                        />
                    </div>

                    <div className={cls.card__footer}>
                        <Button
                            onClick={handleGetResultFields}
                            disabled={
                                Boolean(activeFields.firstField.length < FieldsActiveSize.MAX) ||
                            Boolean(activeFields.secondField.length < FieldsActiveSize.MIN)
                            }
                        >
                            Показать результат
                        </Button>
                    </div>
                </>
            }
            {status &&
                <>
                    <p>{status}</p>
                    <Button
                        onClick={handleRefresh}
                        disabled={
                            Boolean(activeFields.firstField.length < FieldsActiveSize.MAX) ||
                            Boolean(activeFields.secondField.length < FieldsActiveSize.MIN)
                        }
                    >
                        Еще разок
                    </Button>
                </>
            }
        </div>
    )
};