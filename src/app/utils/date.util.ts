import { differenceInYears, parse, isDate, isValid, isFuture } from 'date-fns';

export const isValidDate = (value: string): boolean => {
  const date = parse(value);
  return isDate(date)
    && isValid(date)
    && !isFuture(date)
    && differenceInYears(Date.now(), date) < 150;
};
