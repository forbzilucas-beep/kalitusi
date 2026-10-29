const menuButton = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

if (menuButton && mainNav) {
  menuButton.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
  });
}

const arrivalField = document.querySelector('#arrival');
const departureField = document.querySelector('#departure');
const today = new Date().toISOString().slice(0, 10);

if (arrivalField) arrivalField.min = today;
if (arrivalField && departureField) {
  arrivalField.addEventListener('change', () => {
    const nextDay = new Date(`${arrivalField.value}T12:00:00`);
    nextDay.setDate(nextDay.getDate() + 1);
    departureField.min = arrivalField.value ? nextDay.toISOString().slice(0, 10) : today;
    if (departureField.value && departureField.value < departureField.min) {
      departureField.value = '';
    }
  });
}

for (const form of document.querySelectorAll('[data-local-form]')) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const message = form.querySelector('.form-message');
    if (message) {
      message.textContent = form.dataset.localForm === 'reservation'
        ? 'Thank you. Your reservation request is ready; our team will be in touch to confirm availability.'
        : 'Thank you for reaching out. Your message has been received.';
      message.classList.add('visible');
    }
    form.reset();
    if (arrivalField) arrivalField.min = new Date().toISOString().slice(0, 10);
    if (departureField) departureField.min = arrivalField?.value || new Date().toISOString().slice(0, 10);
  });
}
