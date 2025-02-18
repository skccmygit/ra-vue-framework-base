export const getTimestamp = (date?: Date | null): string => {
  const now = date ? date : new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return `${year}${month}${day}${hours}${minutes}${seconds}`;
}

export const getDateTime = (date?: Date | null, dateDelimeter?: string | null, timeDelimeter?: string | null): string => {
  const now = date ? date : new Date();
  const dateBar = dateDelimeter ? dateDelimeter : '-'
  const timeBar = timeDelimeter ? timeDelimeter : ':'

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return `${year}${dateBar}${month}${dateBar}${day} ${hours}${timeBar}${minutes}${timeBar}${seconds}`;
}

export const getDate = (date?: Date | null, dateDelimeter?: string | null): string => {
  const now = date ? date : new Date();
  const dateBar = dateDelimeter ? dateDelimeter : '-'

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');

  return `${year}${dateBar}${month}${dateBar}${day}`;
}

export const getTime = (date?: Date | null, timeDelimeter?: string | null): string => {
  const now = date ? date : new Date();
  const timeBar = timeDelimeter ? timeDelimeter : ':'

  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return `${hours}${timeBar}${minutes}${timeBar}${seconds}`;
}
