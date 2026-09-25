/* Shared email RSVP behavior; no responses are sent or stored by the site. */
window.initWeddingRSVP = (form, config, names) => {
  form.innerHTML = `<label for="rsvp-name">Your full name</label>
    <input id="rsvp-name" name="guestName" autocomplete="name" maxlength="120" placeholder="First and last name" required>
    <label for="rsvp-attendance">Will you be joining us?</label>
    <select id="rsvp-attendance" name="attendance" required>
      <option value="">Please select your response</option>
      <option value="yes">Joyfully accepts</option>
      <option value="no">Regretfully declines</option>
    </select>
    <div id="rsvp-party" hidden><label for="rsvp-count">Number of guests attending</label>
      <input id="rsvp-count" name="guestCount" type="number" min="1" max="100" step="1" value="1" disabled aria-describedby="rsvp-count-help">
      <small id="rsvp-count-help">Including yourself</small></div>
    <button type="submit" class="action rsvp-link">Prepare RSVP email</button>
    <p class="rsvp-help" role="status"></p>`;
  const name = form.querySelector('#rsvp-name');
  const attendance = form.querySelector('#rsvp-attendance');
  const count = form.querySelector('#rsvp-count');
  const party = form.querySelector('#rsvp-party');
  const help = form.querySelector('.rsvp-help');
  const email = String(config.email || '').trim();
  const validEmail = /^[^\s@<>?,;:%]+@[^\s@<>?,;:%]+\.[^\s@<>?,;:%]+$/.test(email);
  const sync = () => {
    const attending = attendance.value === 'yes';
    party.hidden = !attending;
    count.disabled = !attending;
    count.required = attending;
  };
  attendance.addEventListener('change', sync);
  name.addEventListener('input', () => name.setCustomValidity(''));
  sync();
  help.textContent = validEmail
    ? 'Your email app will open with your reply. Please send the email to confirm your RSVP.'
    : 'You’re welcome to fill in your details. Email RSVP will be available once the host adds their address.';
  form.addEventListener('submit', event => {
    event.preventDefault();
    name.setCustomValidity(name.value.trim() ? '' : 'Please enter your full name.');
    if (!form.reportValidity()) return;
    if (!validEmail) {
      help.textContent = 'The host’s RSVP email is not available yet. Your reply has not been sent.';
      return;
    }
    const attending = attendance.value === 'yes';
    const body = `Dear ${names},\n\nThank you for your kind invitation.\n\nGuest name: ${name.value.trim()}\nResponse: ${attending ? 'Joyfully accepts' : 'Regretfully declines'}\nNumber of guests attending: ${attending ? count.value : '0'}\n\nWith warm wishes,\n${name.value.trim()}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(`Wedding RSVP — ${names}`)}&body=${encodeURIComponent(body)}`;
    help.textContent = 'Your reply is ready in your email app. Please press Send there to confirm your RSVP.';
  });
};
