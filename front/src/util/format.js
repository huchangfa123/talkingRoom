export function formatTime(time) {
  let hour = new Date(time).getHours();
  let mins = new Date(time).getMinutes();
  if (parseInt(mins) <= 9) {
    mins = '0' + mins;
  }
  if (parseInt(hour) <= 9) {
    hour = '0' + hour;
  }
  return hour + ':' + mins;
}

export function formatMessageContent(str) {
  var s = "";
  if(str.length == 0) return "";
  s = str.replace(/<script>/g,"&lt;script&gt;");
  s = s.replace(/<\/script>/g,"&lt;/script&gt;");
  return s; 
}

export function formatManagerItemContent(str) {
  var s = "";
  if(str.length == 0) return "";
  s = str.replace(/<p>/g, '');
  s = s.replace(/<\/p>/g, '');
  return s; 
}