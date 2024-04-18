export interface IFieldWithNumbers {
    length: number;
    activeValues: number[];
    fieldType: string;
    mustByActive: number;
    onHandleAddValue?: (fieldType:string, value: number) => void;
}