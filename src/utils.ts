export const getCurrentDate = (): string => {
    const newLocal = new Date().getTime() - 7 * 3600 * 1000
    return new Date(newLocal).toISOString().split('T')[0]
}