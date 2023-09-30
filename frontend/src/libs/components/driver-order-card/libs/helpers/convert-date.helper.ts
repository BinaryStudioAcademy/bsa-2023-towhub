const convertDate = (ISOString: string): string => {
  const dateString = new Date(ISOString).toDateString();
  const [, month, day, year] = dateString.split(' ');

  return `${day} ${month}. ${year}`;
};

export { convertDate };
