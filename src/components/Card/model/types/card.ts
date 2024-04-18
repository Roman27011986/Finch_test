export interface IActiveFields {
    firstField: number[];
    secondField: number[];
}

export enum FieldsNames {
    FIRSTFIELD = 'firstField',
    SECONDFIELD = 'secondField',
}

export enum FieldsSizes {
    M = 2,
    L = 19,
}

export enum FieldsActiveSize {
    MIN = 1,
    MAX = 8,
}

export enum FieldsMatchesSum {
    M = 3,
    L = 4,
}

export enum CardStatuses {
    PLAY = '',
    WIN = 'Победа!',
    LOSS = 'Проигрышь!'
}