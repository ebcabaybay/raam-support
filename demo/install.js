// Chrome 154–157 on Android wrongly reports every same-origin demo as installed
// from its menu; its own install prompt checks scope correctly, so offer that.
let deferred;
const button = document.createElement('button');
button.className = 'install';
button.textContent = 'Install app';
button.hidden = true;
button.addEventListener('click', async () => {
  if (!deferred) return;
  button.hidden = true;
  deferred.prompt();
  await deferred.userChoice;
  deferred = null;
});
document.body.prepend(button);
addEventListener('beforeinstallprompt', event => {
  event.preventDefault();
  deferred = event;
  button.hidden = false;
});
addEventListener('appinstalled', () => { button.hidden = true; deferred = null; });
