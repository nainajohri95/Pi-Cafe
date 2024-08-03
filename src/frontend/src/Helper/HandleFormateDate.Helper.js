export const HandleformatDate = (currentDate) => {
  const indianTimeZoneOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
  const indianDate = new Date(currentDate.getTime() + indianTimeZoneOffset);

  const year = indianDate.getUTCFullYear();
  const month = String(indianDate.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const day = String(indianDate.getUTCDate()).padStart(2, '0');
  const hours = String(indianDate.getUTCHours()).padStart(2, '0');
  const minutes = String(indianDate.getUTCMinutes()).padStart(2, '0');
  const seconds = String(indianDate.getUTCSeconds()).padStart(2, '0');
  const milliseconds = String(indianDate.getUTCMilliseconds()).padStart(3, '0');

  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;

  return (
    formattedDate
  );
};
