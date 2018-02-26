export function formatTime(time) {
  let hour = new Date(time).getHours();
  let mins = new Date(time).getMinutes();
  if (parseInt(mins) <= 9) {
    mins = '0' + mins;
  }
  if (parseInt(hour) <= 9) {
    hout = '0' + hour;
  }
  return hour + ':' + mins;
}