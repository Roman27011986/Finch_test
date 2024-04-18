export const getRandomNumber = (max: number) => {
    return Math.round(1 - 0.5 + Math.random() * (max - 1 + 1));
}