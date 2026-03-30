(() => {
  const form      = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const success   = document.getElementById('form-success');

  // ── Validation rules ──────────────────────────────────
  const rules = {
    name:      { required: true },
    email:     { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
    anfrage:   { required: true },
    nachricht: { required: true },
  };

  function getField(id)  { return document.getElementById(id); }
  function getError(id)  { return document.getElementById(`${id}-error`); }

  function validate(id, value) {
    const rule = rules[id];
    if (!rule) return true;
    if (rule.required && !value.trim()) return false;
    if (rule.pattern  && !rule.pattern.test(value.trim())) return false;
    return true;
  }

  function setFieldState(id, isValid) {
    const field = getField(id);
    const error = getError(id);
    if (!field || !error) return;

    if (isValid) {
      field.classList.remove('invalid');
      error.classList.remove('visible');
    } else {
      field.classList.add('invalid');
      error.classList.add('visible');
    }
  }

  // ── Live validation on blur ───────────────────────────
  Object.keys(rules).forEach(id => {
    const field = getField(id);
    if (!field) return;

    field.addEventListener('blur', () => {
      setFieldState(id, validate(id, field.value));
    });

    field.addEventListener('input', () => {
      if (field.classList.contains('invalid')) {
        setFieldState(id, validate(id, field.value));
      }
    });
  });

  // ── Submit ────────────────────────────────────────────
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    let allValid = true;

    Object.keys(rules).forEach(id => {
      const field = getField(id);
      const ok    = validate(id, field ? field.value : '');
      setFieldState(id, ok);
      if (!ok) allValid = false;
    });

    if (!allValid) return;

    submitBtn.disabled = true;
    submitBtn.querySelector('.submit-text').textContent = 'Wird gesendet…';

    const payload = {
      name:      getField('name').value.trim(),
      email:     getField('email').value.trim(),
      anfrage:   getField('anfrage').value.trim(),
      nachricht: getField('nachricht').value.trim(),
    };

    try {
      const res = await fetch('http://localhost:3000/send', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Server error');

      form.hidden    = true;
      success.hidden = false;

    } catch (err) {
      submitBtn.disabled = false;
      submitBtn.querySelector('.submit-text').textContent = 'Anfrage abschicken';
      alert('Senden fehlgeschlagen. Bitte versuche es erneut.');
    }
  });
})();
