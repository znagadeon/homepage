const formatter = Intl.DateTimeFormat('sv-SE', {
  timeZone: 'Asia/Seoul',
});

export const formatDate = (date: Date) => {
  return formatter.format(date);
};
