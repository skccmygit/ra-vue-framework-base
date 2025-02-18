export const isValidCronExpression = (cronExpression: string): boolean => {
  const parts = cronExpression.trim().split(' ');

  // Cron expressions can have 5 or 6 parts
  if (parts.length < 5 || parts.length > 6) {
    return false;
  }

  // Regular expressions for each part of the cron expression
  const rangeValidators = {
    second: /^(\*|([0-5]?[0-9])|([0-5]?[0-9]\/[0-9]+)|([0-5]?[0-9]-[0-5]?[0-9](\/[0-9]+)?)|([0-5]?[0-9](,[0-5]?[0-9])+))$/,
    minute: /^(\*|([0-5]?[0-9])|([0-5]?[0-9]\/[0-9]+)|([0-5]?[0-9]-[0-5]?[0-9](\/[0-9]+)?)|([0-5]?[0-9](,[0-5]?[0-9])+))$/,
    hour: /^(\*|([0-5]?[0-9])|([0-5]?[0-9]\/[0-9]+)|([0-5]?[0-9]-[0-5]?[0-9](\/[0-9]+)?)|([0-5]?[0-9](,[0-5]?[0-9])+))$/,
    // hour: /^(\*|([01]?[0-9]|2[0-3])|([01]?[0-9]|2[0-3]\/[0-9]+)|([01]?[0-9]|2[0-3]-[01]?[0-9]|2[0-3](\/[0-9]+)?)|([01]?[0-9]|2[0-3](,[01]?[0-9]|2[0-3])+))$/,
    dayOfMonth: /^(\*|([01]?[0-9]|2[0-9]|3[01])|([01]?[0-9]|2[0-9]|3[01]\/[0-9]+)|([01]?[0-9]|2[0-9]|3[01]-[01]?[0-9]|2[0-9]|3[01](\/[0-9]+)?)|([01]?[0-9]|2[0-9]|3[01](,[01]?[0-9]|2[0-9]|3[01])+))$/,
    month: /^(\*|(0?[1-9]|1[0-2])|(0?[1-9]|1[0-2]\/[0-9]+)|(0?[1-9]|1[0-2]-0?[1-9]|1[0-2](\/[0-9]+)?)|(0?[1-9]|1[0-2](,0?[1-9]|1[0-2])+))$/,
    dayOfWeek: /^(\*|([0-7])|([0-7]\/[0-9]+)|([0-7]-[0-7](\/[0-9]+)?)|([0-7](,[0-7])+))$/
  } as any;

  const partKeys = ['second', 'minute', 'hour', 'dayOfMonth', 'month', 'dayOfWeek'];

  // Validate each part
  for (let i = 0; i < parts.length; i++) {
    const key = partKeys[i];
    const regex = rangeValidators[key];

    if (!regex.test(parts[i])) {
      return false;
    }
  }

  return true;
}
