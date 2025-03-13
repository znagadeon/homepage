const dateFormatter = Intl.DateTimeFormat('sv-SE', {
  timeZone: 'Asia/Seoul',
});

const timeFormatter = Intl.DateTimeFormat('sv-SE', {
  timeStyle: 'medium',
});

export const formatDate = (date: Date) => {
  return dateFormatter.format(date);
};

export const formatTime = (date: Date) => {
  return timeFormatter.format(date);
};
