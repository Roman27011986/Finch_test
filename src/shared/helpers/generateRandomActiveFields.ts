import { FieldsActiveSize, FieldsSizes } from "../../components/Card/model/types/card";
import { getRandomNumber } from "./getRandomNumber";

export const generateRandomActiveFields = (
    firstField: number[] = [],
    secondField: number[] = []
) => {
    const isFirstFieldFull = firstField.length === FieldsActiveSize.MAX;
    const currentField = isFirstFieldFull ? secondField : firstField;
    const currentFieldsActiveSize = isFirstFieldFull ? FieldsActiveSize.MIN : FieldsActiveSize.MAX;
    const currentFieldsSizes = isFirstFieldFull ? FieldsSizes.M : FieldsSizes.L;
        
    if (currentField.length < currentFieldsActiveSize) {
        const newValue = getRandomNumber(currentFieldsSizes);

        if (currentField.includes(newValue)) {
            generateRandomActiveFields(firstField, secondField);
        };

        if (!currentField.includes(newValue)) {
            currentField.push(newValue);
            generateRandomActiveFields(firstField, secondField);
        };
    };

    if (firstField.length === FieldsActiveSize.MAX && secondField.length === FieldsActiveSize.MIN) {
        const result = { firstField, secondField };
        return result;
    }
};