export const generateArrayByNumber = (num: number) => {
    const result = [];
    for (let i = 1; i <= num; i += 1) {
        result.push(i);
    }
    return result;
};