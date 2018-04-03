export default function openNotification(message) {
  console.log('nesssage', message)
  if(window.Notification && window.Notification.permission === 'granted') {
    const notification = new window.Notification(
      message.From.name,
      {
        icon: null,
        body: message.content,
        tag: message.From.id
      }
    )
    notification.onclick = function () {
      window.blur();
      window.focus();
      this.close();
    };
    setTimeout(notification.close.bind(notification), 3000);
  }
}