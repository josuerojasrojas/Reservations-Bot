const MONTHS = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

function formatDate(date) {
  let dateObj = new Date(date);
  if(!dateObj.getMonth()) return '';
  return `${MONTHS[dateObj.getMonth()]} ${dateObj.getDate()}, ${dateObj.getFullYear()} ${dateObj.getHours()}:${dateObj.getMinutes()  > 9 ? dateObj.getMinutes() : `0${dateObj.getMinutes()}`}`;
}

function formatTime(milli) {
  if(!(typeof milli === 'number')) milli = 0;
  let days = Math.floor(milli / 86400000);
  milli -= days * 86400000;
  let hours = Math.floor(milli / 3600000);
  milli -= hours * 3600000;
  let minutes = Math.floor(milli / 60000);
  milli -= minutes * 60000;
  let seconds = Math.floor(milli / 1000);
  return `${days} Days ${hours > 9 ? hours : `0${hours}`}:${minutes > 9 ? minutes : `0${minutes}`}:${seconds > 9 ? seconds : `0${seconds}`}`;
}



export { formatDate, formatTime }
