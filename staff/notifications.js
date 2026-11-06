(() => {
  const topbar = document.querySelector('.topbar');
  if (!topbar) return;
  const button = document.createElement('button');
  button.className = 'secondary-button';
  button.type = 'button';
  button.textContent = 'Enable order alerts';
  button.setAttribute('aria-label', 'Enable browser notifications for new orders');
  topbar.insertBefore(button, document.querySelector('#install-button'));
  button.addEventListener('click', async () => {
    if (!('Notification' in window)) {
      button.textContent = 'Notifications not supported';
      return;
    }
    try {
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        button.textContent = 'Allow alerts in browser settings';
        return;
      }
      new Notification('Karak Ghori staff alerts enabled', {
        body: 'Keep this staff app open and signed in to receive new-order alerts.',
      });
      button.textContent = 'Order alerts enabled';
    } catch (error) {
      console.error('Could not enable staff notifications:', error);
      button.textContent = 'Could not enable alerts';
    }
  });
})();
