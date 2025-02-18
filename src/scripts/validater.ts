import { notifyError } from "./store-popups";

export const getEmptyInputs = (args: { label: string; value: any }[]): string[] => {
  return args.filter(({ value }) => value == null || value.toString().trim() === "").map(({ label }) => label);
}


export const validateAndNotify = (args: { label: string; value: any }[]): boolean => {
  const emptyInputs = getEmptyInputs(args)
  if (emptyInputs.length > 0) {
    notifyError('입력공백: ' + emptyInputs.join(','))
    return false
  } else {
    return true
  }
}

export const isEmpty = (value: any) => {
  if (value == null) return true;
  if (typeof value === 'string' && value.trim() === '') return true;
  if (typeof value === 'number' && isNaN(value)) return true;
  if (Array.isArray(value) && value.length === 0) return true;
  if (typeof value === 'object' && !Array.isArray(value) && Object.keys(value).length === 0) return true;
  return false;
}

export const isAnyEmpty = (...values: any[]) => {
  return values.some(isEmpty);
}