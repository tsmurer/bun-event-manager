export const dateToIsoDate = (date: Date):string => {
    return date.toISOString().split('T')[0];
}