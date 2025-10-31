(() => {
  'use strict'
  const forms = document.querySelectorAll('.needs-validation')

  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      // agar valid nahi to rok do
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      } else {
        // agar valid hai to submit allow karo
        form.submit(); // ✅ force actual submit
      }

      form.classList.add('was-validated')
    }, false)
  })
})()


const passwordInput = document.getElementById('password');
const toggleBtn = document.getElementById('togglePassword');
const strengthBar = document.getElementById('strengthBar');
const strengthText = document.getElementById('strengthText');

// Toggle show/hide password
toggleBtn.addEventListener('click', () => {
  const type = passwordInput.type === 'password' ? 'text' : 'password';
  passwordInput.type = type;
  toggleBtn.innerHTML = type === 'password' ? '<i class="bi bi-eye"></i>' : '<i class="bi bi-eye-slash"></i>';
});

// Simple password strength checker
passwordInput.addEventListener('input', () => {
  const val = passwordInput.value;
  let strength = 0;

  if (val.length >= 8) strength++;
  if (/[A-Z]/.test(val)) strength++;
  if (/[0-9]/.test(val)) strength++;
  if (/[^A-Za-z0-9]/.test(val)) strength++;

  // Update progress bar
  strengthBar.style.width = (strength * 25) + '%';

  // Set color based on strength
  if (strength <= 1) strengthBar.className = 'progress-bar bg-danger';
  else if (strength === 2) strengthBar.className = 'progress-bar bg-warning';
  else if (strength === 3) strengthBar.className = 'progress-bar bg-info';
  else strengthBar.className = 'progress-bar bg-success';

  // Update text
  const textArr = ['Very Weak', 'Weak', 'Medium', 'Strong', 'Very Strong'];
  strengthText.textContent = textArr[strength];
});