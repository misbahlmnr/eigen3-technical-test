export const formatDateLong = (dateString: string) => {
  const date = new Date(dateString);
  const isValidDate = date instanceof Date && !isNaN(date.getTime());

  if (!isValidDate) return "invalid date";

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
};
