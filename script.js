document.addEventListener('DOMContentLoaded', function () {
  const formOpenBtn = document.getElementById('form-open');
  const home = document.querySelector('.home');
  const formContainer = document.querySelector('.form_container');
  const formClose = document.querySelector('.form_close');
  const signupLink = document.getElementById('signup');
  const loginLink = document.getElementById('login');
  const loginForm = document.querySelector('.login_form');
  const signupForm = document.querySelector('.signup_form');
  const pwToggles = document.querySelectorAll('.pw_hide');
  const requestImageInput = document.getElementById('image');
  const requestImagePreview = document.getElementById('imagePreview');

  let signedUp = false; // 🚫 No one is signed up initially

  // Open modal
  if (formOpenBtn) {
    formOpenBtn.addEventListener('click', () => {
      home.classList.add('show');
      formContainer.setAttribute('aria-hidden', 'false');
    });
  }

  // Close modal
  formClose.addEventListener('click', () => {
    home.classList.remove('show');
    formContainer.setAttribute('aria-hidden', 'true');
  });

  // Close when clicking outside
  home.addEventListener('click', (e) => {
    if (!formContainer.contains(e.target)) {
      home.classList.remove('show');
      formContainer.setAttribute('aria-hidden', 'true');
    }
  });

  // Switch to Signup form
  signupLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.style.display = 'none';
    signupForm.style.display = 'block';
  });

  // Switch to Login form
  loginLink.addEventListener('click', (e) => {
    e.preventDefault();
    signupForm.style.display = 'none';
    loginForm.style.display = 'block';
  });

  // ✅ Handle Signup
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    signedUp = true; // ✅ Mark user as signed up
    alert('Signup successful! You can now log in.');
    signupForm.style.display = 'none';
    loginForm.style.display = 'block';
  });

  // 🚫 Block Login if not signed up
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = loginForm.querySelector('input[type="email"]');
    const passwordInput = loginForm.querySelector('input[type="password"]');
    const email = emailInput?.value.trim();
    const password = passwordInput?.value.trim();

    if (!signedUp) {
      alert('Please sign up before logging in!');
      signupForm.style.display = 'block';
      loginForm.style.display = 'none';
      return;
    }

    if (email && password) {
      alert('Login successful! Redirecting to request form...');
      window.location.href = 'request_from.html';
    } else {
      alert('Please enter both email and password.');
    }
  });

  // Password Show/Hide
  pwToggles.forEach((toggle) => {
    toggle.addEventListener('click', () => {
      const input = toggle.closest('.input_box').querySelector('input');
      if (!input) return;
      if (input.type === 'password') {
        input.type = 'text';
        toggle.classList.remove('uil-eye-slash');
        toggle.classList.add('uil-eye');
      } else {
        input.type = 'password';
        toggle.classList.remove('uil-eye');
        toggle.classList.add('uil-eye-slash');
      }
    });
  });

  // Close with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && home.classList.contains('show')) {
      home.classList.remove('show');
      formContainer.setAttribute('aria-hidden', 'true');
    }
  });

  // 🖼️ Image Preview for Request Page
  if (requestImageInput && requestImagePreview) {
    requestImageInput.addEventListener('change', function(){
      const file = this.files && this.files[0];
      if (!file) {
        requestImagePreview.style.display = 'none';
        requestImagePreview.removeAttribute('src');
        return;
      }
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file.');
        requestImagePreview.style.display = 'none';
        requestImagePreview.removeAttribute('src');
        this.value = '';
        return;
      }
      const reader = new FileReader();
      reader.onload = function(e){
        requestImagePreview.src = e.target.result;
        requestImagePreview.style.display = 'block';
      };
      reader.readAsDataURL(file);
    });
  }
});
